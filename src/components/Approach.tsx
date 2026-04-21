import RevealOnScroll from './RevealOnScroll'
import RevealHeading from './RevealHeading'
import SectionLabel from './SectionLabel'
import { useContent } from '../hooks/useContent'

function GridMotif() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden style={{ opacity: 0.55 }}>
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <circle
            key={`${r}-${c}`}
            cx={5 + c * 10}
            cy={5 + r * 10}
            r={1.4}
            fill="var(--color-moss)"
          />
        ))
      )}
    </svg>
  )
}

function CurveMotif() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden style={{ opacity: 0.65 }}>
      <g fill="none" stroke="var(--color-moss)" strokeWidth="1.3" strokeLinecap="round">
        <path d="M 4 32 C 8 20 16 12 32 6" />
        <path d="M 4 36 C 10 28 18 22 36 16" opacity="0.55" />
      </g>
    </svg>
  )
}

export default function Approach() {
  const t = useContent()

  return (
    <section
      id="approach"
      className="relative py-32 md:py-48 border-t"
      style={{
        background: 'var(--color-bone-warm)',
        borderColor: 'var(--color-hairline)',
      }}
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <RevealOnScroll>
          <SectionLabel>{t.approach.eyebrow}</SectionLabel>
        </RevealOnScroll>

        <RevealHeading
          delay={0.1}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-headline)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            fontWeight: 400,
            color: 'var(--color-ink)',
            margin: '2rem 0 5rem 0',
            maxWidth: '16ch',
            fontVariationSettings: '"opsz" 48, "SOFT" 50',
          }}
        >
          {t.approach.headline}
        </RevealHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 relative">
          {/* Center rule */}
          <div
            aria-hidden
            className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px"
            style={{ background: 'color-mix(in srgb, var(--color-moss) 40%, transparent)' }}
          />

          {/* Left column */}
          <RevealOnScroll delay={0.15}>
            <div className="md:pr-12 lg:pr-20">
              <div className="mb-5">
                <GridMotif />
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-micro)',
                  color: 'var(--color-moss)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  marginBottom: '1.5rem',
                }}
              >
                {t.approach.left.label} / {t.approach.left.tag}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.015em',
                  fontWeight: 400,
                  color: 'var(--color-ink)',
                  margin: '0 0 1.5rem 0',
                  fontVariationSettings: '"opsz" 36, "SOFT" 50',
                }}
              >
                {t.approach.left.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '1.0625rem',
                  lineHeight: 1.65,
                  color: 'var(--color-ink-soft)',
                  margin: 0,
                  maxWidth: '42ch',
                }}
              >
                {t.approach.left.body}
              </p>
            </div>
          </RevealOnScroll>

          {/* Right column */}
          <RevealOnScroll delay={0.25}>
            <div className="md:pl-12 lg:pl-20">
              <div className="mb-5">
                <CurveMotif />
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-micro)',
                  color: 'var(--color-moss)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  marginBottom: '1.5rem',
                }}
              >
                {t.approach.right.label} / {t.approach.right.tag}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.015em',
                  fontWeight: 400,
                  color: 'var(--color-ink)',
                  margin: '0 0 1.5rem 0',
                  fontVariationSettings: '"opsz" 36, "SOFT" 50',
                }}
              >
                {t.approach.right.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '1.0625rem',
                  lineHeight: 1.65,
                  color: 'var(--color-ink-soft)',
                  margin: 0,
                  maxWidth: '42ch',
                }}
              >
                {t.approach.right.body}
              </p>
            </div>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delay={0.4}>
          <div
            className="mt-16 md:mt-24 pt-8 border-t max-w-[720px]"
            style={{ borderColor: 'var(--color-hairline)' }}
          >
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.375rem, 2vw, 1.75rem)',
                lineHeight: 1.3,
                fontWeight: 400,
                fontStyle: 'italic',
                color: 'var(--color-moss)',
                margin: 0,
                fontVariationSettings: '"opsz" 24, "SOFT" 80',
              }}
            >
              {t.approach.unifier}
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}
