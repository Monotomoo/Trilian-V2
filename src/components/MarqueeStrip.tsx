import { useContent } from '../hooks/useContent'

export default function MarqueeStrip() {
  const t = useContent()
  const words = t.marquee.words
  // duplicate list twice for seamless infinite scroll
  const looped = [...words, ...words]

  return (
    <section
      aria-label="Keyword marquee"
      className="relative overflow-hidden border-t border-b"
      style={{
        background: 'var(--color-bone-warm)',
        borderColor: 'var(--color-hairline)',
        padding: '1.25rem 0',
      }}
    >
      <div
        className="marquee-track"
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          width: 'max-content',
          animation: 'marquee-scroll 60s linear infinite',
        }}
      >
        {looped.map((word, i) => (
          <span
            key={`${word}-${i}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '2.25rem',
              paddingRight: '2.25rem',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              fontStyle: 'italic',
              fontWeight: 400,
              letterSpacing: '-0.01em',
              color: 'var(--color-ink)',
              fontVariationSettings: '"opsz" 48, "SOFT" 80, "WONK" 1',
            }}
          >
            {word}
            <span
              aria-hidden
              style={{
                display: 'inline-block',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--color-moss)',
                opacity: 0.7,
              }}
            />
          </span>
        ))}
      </div>
    </section>
  )
}
