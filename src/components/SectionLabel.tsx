type Props = {
  children: string
  className?: string
}

export default function SectionLabel({ children, className = '' }: Props) {
  return (
    <span
      className={`font-mono text-[color:var(--color-ink-mute)] ${className}`}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-micro)',
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
      }}
    >
      {children}
    </span>
  )
}
