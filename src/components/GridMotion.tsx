import { useEffect, useRef, type FC } from 'react'
import { gsap } from 'gsap'
import { bgImages } from 'virtual:bg-images'

// ─── Placeholder (used when the background folder is empty) ───────────────
const PLACEHOLDER =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMTExMTExIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZpbGw9IiMyMjIyMjIiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPk5vIGltYWdlPC90ZXh0Pjwvc3ZnPg=='

const TOTAL_CELLS = 28 // 4 rows × 7 cols

/**
 * Build a 28-element array of image URLs.
 * - If background images exist, cycle through them.
 * - Otherwise fall back to a dark placeholder so the grid is still visible.
 */
function buildItems(): string[] {
  const src = bgImages.length > 0 ? bgImages : [PLACEHOLDER]
  return Array.from({ length: TOTAL_CELLS }, (_, i) => src[i % src.length])
}

// ─── Component ────────────────────────────────────────────────────────────

const GridMotion: FC = () => {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])
  const mouseXRef = useRef<number>(
    typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
  )

  const items = buildItems()

  useEffect(() => {
    gsap.ticker.lagSmoothing(0)

    const handleMouseMove = (e: MouseEvent) => {
      mouseXRef.current = e.clientX
    }

    const updateMotion = () => {
      const maxMove = 280
      const baseDuration = 0.8
      const inertia = [0.6, 0.4, 0.3, 0.2]

      rowRefs.current.forEach((row, i) => {
        if (!row) return
        const dir = i % 2 === 0 ? 1 : -1
        const move =
          ((mouseXRef.current / window.innerWidth) * maxMove - maxMove / 2) * dir
        gsap.to(row, {
          x: move,
          duration: baseDuration + inertia[i % inertia.length],
          ease: 'power3.out',
          overwrite: 'auto',
        })
      })
    }

    const removeAnimationLoop = gsap.ticker.add(updateMotion)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      removeAnimationLoop()
    }
  }, [])

  return (
    <div className="grid-motion-root" aria-hidden="true">
      {/* Dark radial vignette so hero text stays readable */}
      <div className="grid-motion-vignette" />

      {/* 4-row × 7-col rotated grid */}
      <div className="grid-motion-grid">
        {Array.from({ length: 4 }, (_, rowIdx) => (
          <div
            key={rowIdx}
            className="grid-motion-row"
            ref={(el) => {
              rowRefs.current[rowIdx] = el
            }}
          >
            {Array.from({ length: 7 }, (_, colIdx) => {
              const src = items[rowIdx * 7 + colIdx]
              return (
                <div key={colIdx} className="grid-motion-cell">
                  <div
                    className="grid-motion-img"
                    style={{ backgroundImage: `url(${src})` }}
                  />
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export default GridMotion
