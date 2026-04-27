import { motion } from 'framer-motion'
import type { AuditContent } from './audit-data'

export default function AuditIntro({
  content,
  onBegin,
}: {
  content: AuditContent
  onBegin: () => void
}) {
  return (
    <section className="mx-auto max-w-[1440px] px-6 md:px-12 min-h-[82vh] flex flex-col justify-center py-20">
      <div className="max-w-[780px] mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <span
            aria-hidden
            style={{
              width: 28,
              height: 1,
              background: 'var(--color-moss)',
              opacity: 0.5,
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
            {content.meta.eyebrow}
          </span>
          <span
            aria-hidden
            style={{
              width: 28,
              height: 1,
              background: 'var(--color-moss)',
              opacity: 0.5,
            }}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6.5vw, 5.5rem)',
            lineHeight: 1.02,
            letterSpacing: '-0.028em',
            fontWeight: 400,
            color: 'var(--color-ink)',
            margin: 0,
            fontVariationSettings: '"opsz" 96, "SOFT" 50, "WONK" 0',
          }}
        >
          {content.meta.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 'clamp(1.0625rem, 1.35vw, 1.1875rem)',
            lineHeight: 1.6,
            color: 'var(--color-ink-soft)',
            margin: '1.75rem auto 0',
            maxWidth: '48ch',
          }}
        >
          {content.meta.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex items-center justify-center gap-6 flex-wrap"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-micro)',
            color: 'var(--color-ink-mute)',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
          }}
        >
          <span>Seven questions</span>
          <Dot />
          <span>~15 minutes</span>
          <Dot />
          <span>One written diagnosis</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 flex items-center justify-center"
        >
          <button
            type="button"
            onClick={onBegin}
            className="audit-begin-btn"
          >
            <span>{content.meta.begin}</span>
            <span aria-hidden className="audit-begin-arrow">↓</span>
          </button>
        </motion.div>
      </div>

      <style>{`
        .audit-begin-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.8rem;
          background: var(--color-ink);
          color: var(--color-bone);
          padding: 1rem 2.25rem;
          font-size: 0.9375rem;
          font-weight: 500;
          border: none;
          border-radius: 2px;
          cursor: pointer;
          font-family: var(--font-ui);
          letter-spacing: 0.02em;
          position: relative;
          overflow: hidden;
          isolation: isolate;
          transition: padding 320ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .audit-begin-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--color-moss);
          transform: translateY(101%);
          transition: transform 420ms cubic-bezier(0.16, 1, 0.3, 1);
          z-index: -1;
        }
        .audit-begin-btn:hover::before,
        .audit-begin-btn:focus-visible::before {
          transform: translateY(0);
        }
        .audit-begin-arrow {
          display: inline-block;
          transform: translateY(0);
          transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .audit-begin-btn:hover .audit-begin-arrow,
        .audit-begin-btn:focus-visible .audit-begin-arrow {
          transform: translateY(4px);
        }
      `}</style>
    </section>
  )
}

function Dot() {
  return (
    <span
      aria-hidden
      style={{
        width: 4,
        height: 4,
        borderRadius: '50%',
        background: 'var(--color-moss)',
        opacity: 0.6,
        display: 'inline-block',
      }}
    />
  )
}
