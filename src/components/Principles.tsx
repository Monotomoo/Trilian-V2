import { motion } from 'framer-motion'
import RevealOnScroll from './RevealOnScroll'
import SectionLabel from './SectionLabel'
import { useContent } from '../hooks/useContent'

export default function Principles() {
  const t = useContent()

  return (
    <section
      id="principles"
      className="relative py-32 md:py-48 border-t overflow-hidden"
      style={{
        background: 'var(--color-bone-warm)',
        borderColor: 'var(--color-hairline)',
      }}
    >
      {/* Ambient moss wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 90% 20%, color-mix(in srgb, var(--color-moss) 10%, transparent) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 10% 80%, color-mix(in srgb, var(--color-ochre) 14%, transparent) 0%, transparent 65%)',
        }}
      />
      <div aria-hidden className="absolute inset-0 pointer-events-none grain-overlay" />

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-12">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-10 md:gap-20 items-end mb-16 md:mb-24">
          <div>
            <RevealOnScroll>
              <SectionLabel>{t.principles.eyebrow}</SectionLabel>
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
                  margin: '2rem 0 0 0',
                  fontVariationSettings: '"opsz" 48, "SOFT" 50',
                  maxWidth: '18ch',
                }}
              >
                {t.principles.headline}
              </motion.h2>
            </RevealOnScroll>
          </div>
          <RevealOnScroll delay={0.18}>
            <p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 'clamp(1.0625rem, 1.35vw, 1.1875rem)',
                lineHeight: 1.6,
                color: 'var(--color-ink-soft)',
                margin: 0,
                maxWidth: '52ch',
              }}
            >
              {t.principles.sub}
            </p>
          </RevealOnScroll>
        </div>

        {/* Principles list — editorial, numbered */}
        <ol className="list-none m-0 p-0">
          {t.principles.items.map((p, i) => (
            <PrincipleRow
              key={i}
              index={i + 1}
              title={p.title}
              body={p.body}
              tag={p.tag}
              total={t.principles.items.length}
            />
          ))}
        </ol>
      </div>
    </section>
  )
}

function PrincipleRow({
  index,
  title,
  body,
  tag,
  total,
}: {
  index: number
  title: string
  body: string
  tag: string
  total: number
}) {
  return (
    <li
      className="group relative grid grid-cols-1 md:grid-cols-[5rem_1fr_auto] gap-6 md:gap-12 py-10 md:py-14 border-t"
      style={{
        borderColor: 'var(--color-hairline)',
        transition: 'background 400ms var(--ease-out-smooth)',
      }}
    >
      {/* Moss wash on hover (desktop) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(90deg, color-mix(in srgb, var(--color-moss) 6%, transparent), transparent)',
          transition: 'opacity 500ms var(--ease-out-smooth)',
        }}
      />

      {/* Index */}
      <div
        className="relative"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-micro)',
          color: 'var(--color-ink-mute)',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          paddingTop: '0.75rem',
        }}
      >
        <motion.span
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'inline-block' }}
        >
          {String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </motion.span>
      </div>

      {/* Principle */}
      <div className="relative">
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.018em',
            fontWeight: 400,
            fontStyle: 'italic',
            color: 'var(--color-ink)',
            margin: '0 0 1rem 0',
            maxWidth: '28ch',
            fontVariationSettings: '"opsz" 48, "SOFT" 80, "WONK" 1',
          }}
        >
          {title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '1.0625rem',
            lineHeight: 1.65,
            color: 'var(--color-ink-soft)',
            margin: 0,
            maxWidth: '56ch',
          }}
        >
          {body}
        </motion.p>
      </div>

      {/* Tag */}
      <motion.div
        initial={{ opacity: 0, x: 8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex md:justify-end md:items-start pt-3"
      >
        <span
          className="inline-flex items-center gap-2"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-micro)',
            color: 'var(--color-moss)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            padding: '0.375rem 0.75rem',
            border: '1px solid color-mix(in srgb, var(--color-moss) 30%, transparent)',
            borderRadius: '999px',
          }}
        >
          <span
            aria-hidden
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--color-moss)',
            }}
          />
          {tag}
        </span>
      </motion.div>
    </li>
  )
}
