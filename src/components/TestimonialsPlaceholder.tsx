import RevealOnScroll from './RevealOnScroll'
import RevealHeading from './RevealHeading'
import SectionLabel from './SectionLabel'
import { useContent } from '../hooks/useContent'

export default function TestimonialsPlaceholder() {
  const t = useContent()

  return (
    <section
      id="testimonials"
      className="relative py-24 md:py-36 border-t"
      style={{
        background: 'var(--color-bone)',
        borderColor: 'var(--color-hairline)',
      }}
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="max-w-[640px] mx-auto text-center">
          <RevealOnScroll>
            <SectionLabel>{t.testimonials.eyebrow}</SectionLabel>
          </RevealOnScroll>

          <RevealHeading
            delay={0.1}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.625rem, 3vw, 2.5rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              fontWeight: 400,
              color: 'var(--color-ink)',
              margin: '1.5rem 0 2rem 0',
              fontVariationSettings: '"opsz" 36, "SOFT" 50',
            }}
          >
            {t.testimonials.headline}
          </RevealHeading>

          <RevealOnScroll delay={0.2}>
            <p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '1.0625rem',
                lineHeight: 1.7,
                color: 'var(--color-ink-soft)',
                margin: 0,
              }}
            >
              {t.testimonials.body}
            </p>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
