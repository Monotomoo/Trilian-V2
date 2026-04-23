import RevealOnScroll from './RevealOnScroll'
import RevealHeading from './RevealHeading'
import SectionLabel from './SectionLabel'
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

        <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-10 md:gap-20 items-start">
          {/* Left — headline */}
          <div className="md:sticky md:top-24">
            <RevealHeading
              delay={0.1}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-headline)',
                lineHeight: 1.03,
                letterSpacing: '-0.025em',
                fontWeight: 400,
                color: 'var(--color-ink)',
                margin: 0,
                fontVariationSettings: '"opsz" 96, "SOFT" 50, "WONK" 1',
              }}
            >
              {t.story.headline}
            </RevealHeading>
          </div>

          {/* Right — paragraphs */}
          <div>
            <div className="space-y-7">
              {t.story.paragraphs.map((p, i) => (
                <RevealOnScroll key={i} delay={0.15 + i * 0.08}>
                  <p
                    style={{
                      fontFamily: i === 0 ? 'var(--font-display)' : 'var(--font-ui)',
                      fontSize:
                        i === 0 ? 'clamp(1.375rem, 2vw, 1.75rem)' : '1.0625rem',
                      lineHeight: i === 0 ? 1.3 : 1.7,
                      color: i === 0 ? 'var(--color-moss)' : 'var(--color-ink-soft)',
                      fontStyle: i === 0 ? 'italic' : 'normal',
                      fontWeight: 400,
                      margin: 0,
                      maxWidth: '56ch',
                      fontVariationSettings:
                        i === 0 ? '"opsz" 24, "SOFT" 80, "WONK" 1' : undefined,
                    }}
                  >
                    {p}
                  </p>
                </RevealOnScroll>
              ))}
            </div>

            <RevealOnScroll delay={0.5}>
              <div
                className="mt-10 pt-6 border-t flex flex-wrap items-center gap-x-6 gap-y-2"
                style={{
                  borderColor: 'var(--color-hairline)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-micro)',
                  color: 'var(--color-ink-mute)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  maxWidth: '54ch',
                  lineHeight: 1.7,
                }}
              >
                <span>{t.story.credentials}</span>
              </div>
            </RevealOnScroll>

            {/* Scroll-hint into the slider */}
            <RevealOnScroll delay={0.6}>
              <div className="mt-12 flex items-center gap-3">
                <span
                  aria-hidden
                  style={{
                    width: 32,
                    height: 1,
                    background: 'var(--color-moss)',
                    opacity: 0.6,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-micro)',
                    color: 'var(--color-ink-mute)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                  }}
                >
                  {t.story.moreLabel} ↓
                </span>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  )
}
