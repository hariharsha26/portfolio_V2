type MarqueeProps = {
  items: string[]
  tone?: 'light' | 'dark'
}

export function Marquee({ items, tone = 'light' }: MarqueeProps) {
  const repeated = [...items, ...items]

  return (
    <div className={`marquee marquee-${tone}`} aria-label={items.join(', ')}>
      <div className="marquee-track">
        {repeated.map((item, index) => (
          <span key={`${item}-${index}`} className="marquee-item">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
