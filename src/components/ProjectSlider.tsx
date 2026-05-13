import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo, useState } from 'react'

type ProjectSliderProps = {
  folder: string
  title: string
}

const imageSlots = Array.from({ length: 8 }, (_, index) => index + 1)

export function ProjectSlider({ folder, title }: ProjectSliderProps) {
  const candidates = useMemo(
    () => imageSlots.map((slot) => `/assets/projects/${folder}/${slot}.png`),
    [folder],
  )
  const [available, setAvailable] = useState(candidates)
  const [active, setActive] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)

  const current = available[Math.min(active, Math.max(available.length - 1, 0))]
  const canSlide = available.length > 1

  const removeMissing = (src: string) => {
    setAvailable((images) => {
      const next = images.filter((image) => image !== src)
      setActive((currentIndex) => Math.min(currentIndex, Math.max(next.length - 1, 0)))
      return next
    })
  }

  const goTo = (direction: -1 | 1) => {
    if (!canSlide) return
    setActive((currentIndex) => (currentIndex + direction + available.length) % available.length)
  }

  const onTouchEnd = (x: number) => {
    if (touchStart === null) return
    const delta = x - touchStart
    if (Math.abs(delta) > 36) {
      goTo(delta < 0 ? 1 : -1)
    }
    setTouchStart(null)
  }

  if (!current) {
    return <div className="project-slider project-slider-empty" />
  }

  return (
    <div
      className="project-slider"
      onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
      onTouchEnd={(event) => onTouchEnd(event.changedTouches[0].clientX)}
    >
      <img src={current} alt={`${title} visual ${active + 1}`} loading="lazy" onError={() => removeMissing(current)} />
      {canSlide ? (
        <>
          <button
            className="project-slider-button project-slider-prev"
            type="button"
            aria-label={`Show previous ${title} image`}
            onClick={() => goTo(-1)}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            className="project-slider-button project-slider-next"
            type="button"
            aria-label={`Show next ${title} image`}
            onClick={() => goTo(1)}
          >
            <ChevronRight size={18} />
          </button>
          <div className="project-slider-dots" aria-hidden="true">
            {available.map((image, index) => (
              <span className={index === active ? 'is-active' : ''} key={image} />
            ))}
          </div>
        </>
      ) : null}
    </div>
  )
}
