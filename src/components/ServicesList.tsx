import { motion } from 'framer-motion'
import RevealOnScroll from './RevealOnScroll'
import SectionLabel from './SectionLabel'
import ServiceCard from './ServiceCard'
import { useContent } from '../hooks/useContent'

export default function ServicesList() {
  const t = useContent()

  return (
    <section
      id="services"
      className="relative py-32 md:py-48 border-t"
      style={{
        background: 'var(--color-bone)',
        borderColor: 'var(--color-hairline)',
      }}
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <RevealOnScroll>
              <SectionLabel>{t.services.eyebrow}</SectionLabel>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <motion.h2
                initial={{ opacity: 0, y: 16, letterSpacing: '-0.035em' }}
                whileInView={{ opacity: 1, y: 0, letterSpacing: '-0.02em' }}
                viewport={{ once: true, margin: '-15% 0px' }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-headline)',
                  lineHeight: 1.05,
                  fontWeight: 400,
                  color: 'var(--color-ink)',
                  margin: '2rem 0 1.5rem 0',
                  maxWidth: '18ch',
                  fontVariationSettings: '"opsz" 48, "SOFT" 50',
                }}
              >
                {t.services.headline}
              </motion.h2>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delay={0.18}>
            <p
              className="hidden md:block max-w-[26ch] text-right"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-micro)',
                color: 'var(--color-ink-mute)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                lineHeight: 1.7,
              }}
            >
              {t.services.hint}
            </p>
          </RevealOnScroll>
        </div>

        <div
          className="mt-12 border-b"
          style={{ borderColor: 'var(--color-hairline)' }}
        >
          {t.services.items.map((item, i) => (
            <ServiceCard
              key={i}
              index={i}
              outcome={item.outcome}
              body={item.body}
              scope={item.scope}
              format={item.format}
              who={item.who}
              beats={item.beats}
              deliverables={item.deliverables}
              principle={item.principle}
              labels={t.services.labels}
              defaultOpen={i === 0}
            />
          ))}
        </div>

        <RevealOnScroll delay={0.2}>
          <div
            className="mt-8"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-micro)',
              color: 'var(--color-ink-mute)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
            }}
          >
            {t.services.pricing}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  )
}

