import { motion } from 'framer-motion'
import LangToggle from './LangToggle'
import VennLogo from './VennLogo'
import { useContent } from '../hooks/useContent'

export default function Footer() {
  const t = useContent()

  return (
    <footer
      className="relative border-t overflow-hidden"
      style={{
        background: 'var(--color-bone-warm)',
        borderColor: 'var(--color-hairline)',
      }}
    >
      {/* Ambient moss wash bottom-left */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 60% at 8% 95%, color-mix(in srgb, var(--color-moss) 10%, transparent) 0%, transparent 60%)',
        }}
      />
      <div aria-hidden className="absolute inset-0 pointer-events-none grain-overlay" />

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-12 pt-20 md:pt-28 pb-10 md:pb-12">
        {/* Top label row */}
        <div
          className="flex items-center justify-between mb-10 md:mb-14"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-micro)',
            color: 'var(--color-ink-mute)',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
          }}
        >
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--color-moss)',
                display: 'inline-block',
              }}
            />
            <span>End of file</span>
          </div>
          <div>{t.meta.location} · Est. 2026</div>
        </div>

        {/* Gigantic wordmark with minimal mark alongside */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3.5rem, 12vw, 11rem)',
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
            fontWeight: 400,
            color: 'var(--color-ink)',
            fontVariationSettings: '"opsz" 144, "SOFT" 50, "WONK" 1',
            display: 'flex',
            alignItems: 'center',
            gap: '0.32em',
            flexWrap: 'wrap',
          }}
        >
          <motion.span
            aria-hidden
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'inline-flex', width: '0.82em', height: '0.82em' }}
          >
            <VennLogo
              variant="minimal"
              size={200}
              style={{ width: '100%', height: '100%' }}
            />
          </motion.span>
          <span style={{ display: 'inline-flex', alignItems: 'baseline' }}>
            {t.meta.wordmark}
            <span
              aria-hidden
              style={{
                color: 'var(--color-ochre)',
                marginLeft: '0.05em',
                fontStyle: 'italic',
                fontVariationSettings: '"opsz" 144, "SOFT" 80, "WONK" 1',
              }}
            >
              .
            </span>
          </span>
        </motion.div>

        {/* Signature line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-6 md:mt-8 flex items-center gap-4 flex-wrap"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.125rem, 1.6vw, 1.375rem)',
            fontStyle: 'italic',
            color: 'var(--color-ink-soft)',
            fontVariationSettings: '"opsz" 24, "SOFT" 80, "WONK" 1',
            letterSpacing: '-0.005em',
          }}
        >
          <span>A practice of {t.meta.practitioner}.</span>
        </motion.div>

        {/* Three-column meta */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          <FooterColumn
            label="Where"
            rows={[t.contact.direct.location, 'Remote + in-person']}
          />
          <FooterColumn
            label="Write"
            rows={[
              { text: t.contact.direct.email, href: `mailto:${t.contact.direct.email}` },
              { text: t.contact.direct.phone, href: `tel:${t.contact.direct.phone.replace(/\s/g, '')}` },
            ]}
          />
          <FooterColumn
            label="2026"
            rows={[
              { text: t.footer.blogLabel, href: t.footer.blogHref },
              'Founding cohort · twelve seats',
              'Applications open',
            ]}
            align="right"
          />
        </div>

        {/* Bottom rail */}
        <div
          className="mt-16 md:mt-20 pt-6 border-t flex flex-wrap items-center justify-between gap-6"
          style={{
            borderColor: 'var(--color-hairline)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-micro)',
            color: 'var(--color-ink-mute)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
          }}
        >
          <div className="flex items-center gap-3 flex-wrap">
            <span>{t.footer.copyright}</span>
            <span aria-hidden style={{ opacity: 0.5 }}>·</span>
            <span>{t.footer.legal}</span>
          </div>

          <div className="flex items-center gap-5">
            <LangToggle />
            <span aria-hidden style={{ opacity: 0.5 }}>·</span>
            <span>v0.1 Prototype</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

type FooterRow = string | { text: string; href: string }

function FooterColumn({
  label,
  rows,
  align = 'left',
}: {
  label: string
  rows: FooterRow[]
  align?: 'left' | 'right'
}) {
  return (
    <div style={{ textAlign: align }}>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-micro)',
          color: 'var(--color-ink-mute)',
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
        }}
      >
        {align === 'left' && (
          <span
            aria-hidden
            style={{
              width: 16,
              height: 1,
              background: 'var(--color-moss)',
              opacity: 0.6,
              display: 'inline-block',
            }}
          />
        )}
        <span>{label}</span>
        {align === 'right' && (
          <span
            aria-hidden
            style={{
              width: 16,
              height: 1,
              background: 'var(--color-moss)',
              opacity: 0.6,
              display: 'inline-block',
            }}
          />
        )}
      </div>
      <ul className="list-none p-0 m-0 space-y-2">
        {rows.map((row, i) => {
          const isLink = typeof row !== 'string'
          const content = isLink ? (
            <a
              href={row.href}
              className="footer-link"
              style={{
                color: 'var(--color-ink)',
                textDecoration: 'none',
                position: 'relative',
                display: 'inline-block',
              }}
            >
              {row.text}
            </a>
          ) : (
            row
          )
          return (
            <li
              key={i}
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '1rem',
                color: isLink ? 'var(--color-ink)' : 'var(--color-ink-soft)',
                lineHeight: 1.5,
              }}
            >
              {content}
            </li>
          )
        })}
      </ul>
      <style>{`
        .footer-link::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -2px;
          height: 1px;
          background: var(--color-moss);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 380ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .footer-link:hover::after,
        .footer-link:focus-visible::after {
          transform: scaleX(1);
        }
      `}</style>
    </div>
  )
}
