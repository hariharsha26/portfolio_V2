import { type FC, type PointerEvent, useEffect, useId, useMemo, useRef, useState } from 'react'

interface CurvedLoopProps {
  marqueeText?: string
  speed?: number
  className?: string
  curveAmount?: number
  direction?: 'left' | 'right'
  interactive?: boolean
  variant?: 'top' | 'bottom'
}

export const CurvedLoop: FC<CurvedLoopProps> = ({
  marqueeText = '',
  speed = 2,
  className,
  curveAmount = 95,
  direction = 'left',
  interactive = true,
  variant = 'top',
}) => {
  const text = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText)
    return `${hasTrailing ? marqueeText.replace(/\s+$/, '') : marqueeText}\u00A0`
  }, [marqueeText])

  const measureRef = useRef<SVGTextElement | null>(null)
  const textPathRef = useRef<SVGTextPathElement | null>(null)
  const [spacing, setSpacing] = useState(0)
  const [offset, setOffset] = useState(0)
  const uid = useId().replace(/:/g, '')
  const pathId = `curve-${variant}-${uid}`
  const curveY = variant === 'bottom' ? 70 - curveAmount : 70 + curveAmount
  const pathD = `M-180,70 Q720,${curveY} 1620,70`

  const dragRef = useRef(false)
  const lastXRef = useRef(0)
  const dirRef = useRef<'left' | 'right'>(direction)
  const velRef = useRef(0)

  const totalText = spacing ? Array(Math.ceil(2200 / spacing) + 3).fill(text).join('') : text
  const ready = spacing > 0

  useEffect(() => {
    if (measureRef.current) {
      setSpacing(measureRef.current.getComputedTextLength())
    }
  }, [text, className])

  useEffect(() => {
    if (!spacing || !textPathRef.current) return
    const initial = -spacing
    textPathRef.current.setAttribute('startOffset', `${initial}px`)
    setOffset(initial)
  }, [spacing])

  useEffect(() => {
    if (!spacing || !ready) return

    let frame = 0
    const step = () => {
      if (!dragRef.current && textPathRef.current) {
        const delta = dirRef.current === 'right' ? speed : -speed
        const currentOffset = Number.parseFloat(
          textPathRef.current.getAttribute('startOffset') || '0',
        )
        let newOffset = currentOffset + delta
        if (newOffset <= -spacing) newOffset += spacing
        if (newOffset > 0) newOffset -= spacing
        textPathRef.current.setAttribute('startOffset', `${newOffset}px`)
        setOffset(newOffset)
      }
      frame = requestAnimationFrame(step)
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [spacing, speed, ready])

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!interactive) return
    dragRef.current = true
    lastXRef.current = event.clientX
    velRef.current = 0
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!interactive || !dragRef.current || !textPathRef.current) return

    const dx = event.clientX - lastXRef.current
    lastXRef.current = event.clientX
    velRef.current = dx
    const currentOffset = Number.parseFloat(textPathRef.current.getAttribute('startOffset') || '0')
    let newOffset = currentOffset + dx
    if (newOffset <= -spacing) newOffset += spacing
    if (newOffset > 0) newOffset -= spacing
    textPathRef.current.setAttribute('startOffset', `${newOffset}px`)
    setOffset(newOffset)
  }

  const endDrag = () => {
    if (!interactive) return
    dragRef.current = false
    dirRef.current = velRef.current > 0 ? 'right' : 'left'
  }

  return (
    <div
      className={`curved-loop curved-loop-${variant}`}
      style={{ visibility: ready ? 'visible' : 'hidden', cursor: interactive ? 'grab' : 'auto' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <svg className="curved-loop-svg" viewBox="0 0 1440 140" aria-hidden="true">
        <text ref={measureRef} xmlSpace="preserve" className="curved-loop-measure">
          {text}
        </text>
        <defs>
          <path id={pathId} d={pathD} fill="none" stroke="transparent" />
        </defs>
        {ready ? (
          <text xmlSpace="preserve" className={`curved-loop-text ${className ?? ''}`}>
            <textPath ref={textPathRef} href={`#${pathId}`} startOffset={`${offset}px`}>
              {totalText}
            </textPath>
          </text>
        ) : null}
      </svg>
    </div>
  )
}
