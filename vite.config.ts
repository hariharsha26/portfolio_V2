import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'

// ─── Virtual module: background image list ────────────────────────────────
// Scans /public/assets/projects/background/ at dev-server start and build
// time, then exposes the list as a typed virtual import so GridMotion always
// reflects the actual files present in the folder.
const VIRTUAL_ID = 'virtual:bg-images'
const RESOLVED_ID = '\0' + VIRTUAL_ID

function bgImagesPlugin(): Plugin {
  return {
    name: 'vite-plugin-bg-images',
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID
    },
    load(id) {
      if (id !== RESOLVED_ID) return

      const bgDir = path.resolve(__dirname, 'public/assets/projects/background')
      let files: string[] = []

      if (fs.existsSync(bgDir)) {
        files = fs
          .readdirSync(bgDir)
          .filter((f) => /\.(png|jpe?g|webp|avif)$/i.test(f))
          .sort((a, b) => {
            // numeric sort: 1.png < 2.png < … < 30.png
            const numA = parseInt(a, 10)
            const numB = parseInt(b, 10)
            if (!isNaN(numA) && !isNaN(numB)) return numA - numB
            return a.localeCompare(b)
          })
          .map((f) => `/assets/projects/background/${f}`)
      }

      return `export const bgImages = ${JSON.stringify(files)};`
    },
    // Re-run when files are added/removed in the folder during dev
    configureServer(server) {
      const bgDir = path.resolve(__dirname, 'public/assets/projects/background')
      if (fs.existsSync(bgDir)) {
        fs.watch(bgDir, () => {
          const mod = server.moduleGraph.getModuleById(RESOLVED_ID)
          if (mod) server.moduleGraph.invalidateModule(mod)
          server.ws.send({ type: 'full-reload' })
        })
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), bgImagesPlugin()],
})
