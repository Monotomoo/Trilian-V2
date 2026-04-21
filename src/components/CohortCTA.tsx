import RevealOnScroll from './RevealOnScroll'
import MagneticButton from './MagneticButton'
import { useContent } from '../hooks/useContent'

export default function CohortCTA() {
  const t = useContent()

  return (
    <section
      id="cohort"
      className="relative py-32 md:py-48 overflow-hidden"
      style={{ background: 'var(--color-moss)' }}
    >
      {/* Subtle ambient light blob */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 80% 30%, color-mix(in srgb, var(--color-ochre) 18%, transparent) 0%, transparent 65%)',
        }}
      />
      {/* Hairlines */}
      <div
        aria-hidden
        className="absolute left-6 md:left-12 top-0 bottom-0 w-px"
        style={{ background: 'color-mix(in srgb, var(--color-bone) 25%, transparent)' }}
      />
      <div
        aria-hidden
        className="absolute right-6 md:right-12 top-0 bottom-0 w-px hidden md:block"
        style={{ background: 'color-mix(in srgb, var(--color-bone) 25%, transparent)' }}
      />

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="max-w-[960px]">
          <RevealOnScroll>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-micro)',
                color: 'color-mix(in srgb, var(--color-bone) 70%, transparent)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: '2rem',
              }}
            >
              {t.cohort.eyebrow}
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-headline)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                fontWeight: 400,
                color: 'var(--color-bone)',
                margin: '0 0 2rem 0',
                maxWidth: '18ch',
                fontVariationSettings: '"opsz" 48, "SOFT" 50',
              }}
            >
              {t.cohort.headline}
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 'clamp(1.125rem, 1.4vw, 1.25rem)',
                lineHeight: 1.5,
                color: 'color-mix(in srgb, var(--color-bone) 85%, transparent)',
                margin: '0 0 3rem 0',
                maxWidth: '44ch',
              }}
            >
              {t.cohort.sub}
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.3}>
            <MagneticButton
              as="a"
              href="#contact"
              className="group"
              style={{
                background: 'var(--color-bone)',
                color: 'var(--color-moss-deep)',
                padding: '1.125rem 2rem',
                fontSize: '1rem',
                fontWeight: 500,
                textDecoration: 'none',
                borderRadius: '2px',
                fontFamily: 'var(--font-ui)',
                letterSpacing: '0.01em',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <span>{t.cohort.cta}</span>
              <span
                style={{
                  transition: 'transform 300ms var(--ease-out-expo)',
                  display: 'inline-block',
                }}
                className="group-hover:translate-x-1"
              >
                →
              </span>
            </MagneticButton>
          </RevealOnScroll>

          {/* Cohort counter — optional visual element */}
          <RevealOnScroll delay={0.4}>
            <div
              className="mt-16 pt-8 border-t grid grid-cols-3 gap-4 md:gap-8 max-w-[560px]"
              style={{ borderColor: 'color-mix(in srgb, var(--color-bone) 25%, transparent)' }}
            >
              <Stat label="Spots" value="12" />
              <Stat label="Taken" value="0" />
              <Stat label="Rolling" value="2026" />
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 4vw, 3rem)',
          lineHeight: 1,
          letterSpacing: '-0.02em',
          fontWeight: 400,
          color: 'var(--color-bone)',
          fontVariationSettings: '"opsz" 48, "SOFT" 50',
        }}
      >
        {value}
      </div>
      <div
        className="mt-2"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-micro)',
          color: 'color-mix(in srgb, var(--color-bone) 60%, transparent)',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
        }}
      >
        {label}
      </div>
    </div>
  )
}
