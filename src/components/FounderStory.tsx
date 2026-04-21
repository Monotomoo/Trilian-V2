import RevealOnScroll from './RevealOnScroll'
import SectionLabel from './SectionLabel'
import Portrait from './Portrait'
import { useContent } from '../hooks/useContent'

export default function FounderStory() {
  const t = useContent()

  return (
    <section
      id="story"
      className="relative py-32 md:py-48 border-t overflow-hidden"
      style={{
        background: 'var(--color-bone-warm)',
        borderColor: 'var(--color-hairline)',
      }}
    >
      <div aria-hidden className="absolute inset-0 pointer-events-none grain-overlay" />

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-12">
        <RevealOnScroll>
          <SectionLabel>{t.story.eyebrow}</SectionLabel>
        </RevealOnScroll>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-12 md:gap-16 lg:gap-24 items-start">
          {/* Text */}
          <div className="order-2 md:order-1">
            <RevealOnScroll delay={0.1}>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-headline)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  fontWeight: 400,
                  color: 'var(--color-ink)',
                  margin: '0 0 3rem 0',
                  fontVariationSettings: '"opsz" 48, "SOFT" 50',
                }}
              >
                {t.story.headline}
              </h2>
            </RevealOnScroll>

            <div className="space-y-6">
              {t.story.paragraphs.map((p, i) => (
                <RevealOnScroll key={i} delay={0.15 + i * 0.08}>
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '1.0625rem',
                      lineHeight: 1.7,
                      color: 'var(--color-ink-soft)',
                      margin: 0,
                      maxWidth: '54ch',
                    }}
                  >
                    {p}
                  </p>
                </RevealOnScroll>
              ))}
            </div>

            <RevealOnScroll delay={0.5}>
              <div
                className="mt-10 pt-6 border-t"
                style={{
                  borderColor: 'var(--color-hairline)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-micro)',
                  color: 'var(--color-ink-mute)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  maxWidth: '52ch',
                  lineHeight: 1.7,
                }}
              >
                {t.story.credentials}
              </div>
            </RevealOnScroll>
          </div>

          {/* Images column */}
          <div className="order-1 md:order-2 space-y-6">
            <RevealOnScroll delay={0.2} y={20}>
              <div className="relative">
                <Portrait
                  src="/vedra-1.jpg"
                  alt={t.story.portraitAlt}
                  tone="natural"
                  breathing
                  objectPosition="50% 25%"
                  aspectRatio="3 / 4"
                  className="w-full"
                />
                <div
                  aria-hidden
                  className="absolute top-4 left-4"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6875rem',
                    color: 'var(--color-bone)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    mixBlendMode: 'difference',
                  }}
                >
                  01 / Portrait
                </div>
                <div
                  aria-hidden
                  className="absolute bottom-4 right-4 text-right"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6875rem',
                    color: 'var(--color-bone)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    mixBlendMode: 'difference',
                  }}
                >
                  Vedra · 2026
                </div>
              </div>
            </RevealOnScroll>

          </div>
        </div>
      </div>
    </section>
  )
}
