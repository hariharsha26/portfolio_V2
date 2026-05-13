type SectionLabelProps = {
  eyebrow: string
  title: string
  description?: string
  dark?: boolean
}

export function SectionLabel({ eyebrow, title, description, dark }: SectionLabelProps) {
  return (
    <div className={`section-label ${dark ? 'section-label-dark' : ''}`}>
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      {description ? <span>{description}</span> : null}
    </div>
  )
}
