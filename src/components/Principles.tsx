import { motion } from 'framer-motion'
import RevealOnScroll from './RevealOnScroll'
import RevealHeading from './RevealHeading'
import SectionLabel from './SectionLabel'
import { useContent, useLang } from '../hooks/useContent'

// Short tags per About slide — kept here as a presentation concern (rather
// than baked into the strings) so the same about.slides data can power both
// the photo-slider and this card-grid presentation.
const ABOUT_TAGS = {
  en: ['Career', 'Academia', 'Coaching', 'Phyto', 'Body', 'Life', 'Family'],
  hr: ['Karijera', 'Akademija', 'Coaching', 'Fito', 'Tijelo', 'Život', 'Obitelj'],
} as const

// This component used to render the operating-manual principles. It now
// renders the About-me chapters in the same editorial card-grid format
// (intentional reuse — the bio chapters effectively are the operating
// manual). Photos from the slider data are dropped here.
export default function Principles() {
  const t = useContent()
  const lang = useLang()
  const tags = ABOUT_TAGS[lang]

  return (
    <section
      id="principles"
      className="relative py-32 md:py-48 border-t overflow-hidden"
      style={{
        background: 'var(--color-bone-warm)',
        borderColor: 'var(--color-hairline)',
      }}
    >
      {/* Ambient moss + ochre wash */}
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
              <SectionLabel>{t.about.eyebrow}</SectionLabel>
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
                margin: '2rem 0 0 0',
                fontVariationSettings: '"opsz" 48, "SOFT" 50',
                maxWidth: '18ch',
              }}
            >
              {t.about.headline}
            </RevealHeading>
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
              {t.about.intro}
            </p>
          </RevealOnScroll>
        </div>

        {/* About-me chapters as numbered editorial rows */}
        <ol className="list-none m-0 p-0">
          {t.about.slides.map((slide, i) => (
            <PrincipleRow
              key={i}
              num={slide.num}
              total={t.about.slides.length}
              title={slide.title}
              body={slide.body}
              tag={tags[i] ?? '—'}
              photo={slide.photo ?? undefined}
              photoAlt={slide.photoAlt}
            />
          ))}
        </ol>
      </div>

      <style>{`
        .principle-row-photo {
          position: relative;
          width: 100%;
          max-width: 19.5rem;
          overflow: hidden;
          border-radius: 2px;
          border: 1px solid color-mix(in srgb, var(--color-ink) 12%, transparent);
          background: color-mix(in srgb, var(--color-moss) 8%, var(--color-bone-warm));
          transition: transform 500ms cubic-bezier(0.16, 1, 0.3, 1),
            border-color 400ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .principle-row-photo img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 700ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .group:hover .principle-row-photo {
          transform: translateY(-2px);
          border-color: color-mix(in srgb, var(--color-moss) 50%, transparent);
        }
        .group:hover .principle-row-photo img {
          transform: scale(1.04);
        }
        .principle-row-photo-empty {
          aspect-ratio: 4 / 5;
          background: repeating-linear-gradient(
            45deg,
            color-mix(in srgb, var(--color-moss) 6%, transparent),
            color-mix(in srgb, var(--color-moss) 6%, transparent) 8px,
            transparent 8px,
            transparent 16px
          );
        }
        .principle-row-index {
          font-family: var(--font-mono);
          font-size: var(--text-micro);
          color: var(--color-ink-mute);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          line-height: 1;
          padding-left: 0.85rem;
        }
      `}</style>
    </section>
  )
}

function PrincipleRow({
  num,
  title,
  body,
  tag,
  total,
  photo,
  photoAlt,
}: {
  num: string
  title: string
  body: string
  tag: string
  total: number
  photo?: string
  photoAlt: string
}) {
  return (
    <li
      className="group relative grid grid-cols-1 md:grid-cols-[auto_1fr_20rem] gap-6 md:gap-12 py-10 md:py-14 border-t"
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

      {/* Tag pill (left) + small index below */}
      <motion.div
        initial={{ opacity: 0, x: -8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex flex-col gap-3 items-start pt-3"
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
        <div className="principle-row-index">
          {num} / {String(total).padStart(2, '0')}
        </div>
      </motion.div>

      {/* Chapter */}
      <div className="relative">
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.625rem, 2.6vw, 2.375rem)',
            lineHeight: 1.15,
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
            maxWidth: '64ch',
          }}
        >
          {body}
        </motion.p>
      </div>

      {/* Photo (right) — small portrait per chapter */}
      <motion.div
        initial={{ opacity: 0, x: 8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="relative md:justify-self-end"
      >
        {photo ? (
          <div className="principle-row-photo">
            <img src={photo} alt={photoAlt} loading="lazy" />
          </div>
        ) : (
          <div className="principle-row-photo principle-row-photo-empty" aria-hidden />
        )}
      </motion.div>
    </li>
  )
}
