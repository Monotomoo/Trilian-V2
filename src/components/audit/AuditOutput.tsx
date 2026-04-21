import { useState } from 'react'
import { motion } from 'framer-motion'
import type { AuditContent, Diagnosis } from './audit-data'
import { diagnosisToText } from './audit-scoring'

const VEDRA_EMAIL = 'vedra.re.ondrusek@gmail.com'

export default function AuditOutput({
  content,
  diagnosis,
  onRestart,
}: {
  content: AuditContent
  diagnosis: Diagnosis
  onRestart: () => void
}) {
  const diagnosisText = diagnosisToText(diagnosis, content.output.signatureName)

  const bookHref = `mailto:${VEDRA_EMAIL}?subject=${encodeURIComponent(
    '15-minute audit — from the web diagnostic'
  )}&body=${encodeURIComponent(
    `Hi Vedra,\n\nI ran the leak audit on your site. Here's what it returned:\n\n${diagnosisText}\n\nI'd like to book the real 15-minute audit.\n\nThanks.`
  )}`

  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSendToSelf = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed) return
    const href = `mailto:${encodeURIComponent(trimmed)}?subject=${encodeURIComponent(
      'Your Trillian HR leak audit'
    )}&body=${encodeURIComponent(diagnosisText)}`
    window.location.href = href
    setSent(true)
  }

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  })

  return (
    <section className="mx-auto max-w-[1440px] px-6 md:px-12 py-24 md:py-32">
      <div className="mx-auto w-full max-w-[760px]">
        {/* Eyebrow */}
        <motion.div
          {...reveal(0)}
          className="flex items-center gap-3"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-micro)',
            color: 'var(--color-ink-mute)',
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
          }}
        >
          <span
            aria-hidden
            style={{
              width: 24,
              height: 1,
              background: 'var(--color-moss)',
              opacity: 0.6,
            }}
          />
          {content.output.eyebrow}
        </motion.div>

        {/* You said */}
        <motion.div {...reveal(0.1)} className="mt-10">
          <Label>{content.output.youSaid}</Label>
          <blockquote
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 2.8vw, 2.25rem)',
              lineHeight: 1.25,
              letterSpacing: '-0.01em',
              fontStyle: 'italic',
              color: 'var(--color-moss-deep)',
              margin: 0,
              fontVariationSettings: '"opsz" 36, "SOFT" 80, "WONK" 1',
            }}
          >
            “{diagnosis.userQuote}”
          </blockquote>
        </motion.div>

        {/* Biggest leak */}
        <motion.div {...reveal(0.2)} className="mt-14">
          <Label>{content.output.biggestLeak}</Label>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.25rem, 4.8vw, 4rem)',
              lineHeight: 1.02,
              letterSpacing: '-0.028em',
              fontWeight: 400,
              color: 'var(--color-ink)',
              margin: 0,
              fontVariationSettings: '"opsz" 96, "SOFT" 50, "WONK" 0',
            }}
          >
            {diagnosis.biggestLeak}
          </h2>
        </motion.div>

        {/* One lever */}
        <motion.div {...reveal(0.32)} className="mt-14 pt-8 border-t" style={{ borderColor: 'var(--color-hairline)' }}>
          <Label>{content.output.oneLever}</Label>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 2.6vw, 2rem)',
              lineHeight: 1.3,
              fontStyle: 'italic',
              color: 'var(--color-moss)',
              margin: 0,
              fontVariationSettings: '"opsz" 36, "SOFT" 80, "WONK" 1',
            }}
          >
            {diagnosis.oneLever}
          </p>
        </motion.div>

        {/* Principle breaking */}
        <motion.div {...reveal(0.44)} className="mt-14 pt-8 border-t" style={{ borderColor: 'var(--color-hairline)' }}>
          <Label>{content.output.principleBreaking}</Label>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 2.4vw, 2rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.015em',
              fontWeight: 400,
              color: 'var(--color-ink)',
              margin: '0 0 0.75rem 0',
              fontVariationSettings: '"opsz" 36, "SOFT" 50',
            }}
          >
            {diagnosis.principleTitle}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '1.0625rem',
              lineHeight: 1.6,
              color: 'var(--color-ink-soft)',
              margin: 0,
              maxWidth: '52ch',
            }}
          >
            {diagnosis.principleBreaking}
          </p>
        </motion.div>

        {/* Service */}
        <motion.div {...reveal(0.56)} className="mt-14 pt-8 border-t" style={{ borderColor: 'var(--color-hairline)' }}>
          <Label>{content.output.serviceFits}</Label>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 2.4vw, 2rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.015em',
              fontWeight: 400,
              color: 'var(--color-ink)',
              margin: '0 0 0.75rem 0',
              fontVariationSettings: '"opsz" 36, "SOFT" 50',
            }}
          >
            {diagnosis.serviceTitle}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '1.0625rem',
              lineHeight: 1.6,
              color: 'var(--color-ink-soft)',
              margin: 0,
              maxWidth: '52ch',
            }}
          >
            {diagnosis.serviceDescription}
          </p>
        </motion.div>

        {/* Signature flourish */}
        <motion.div {...reveal(0.7)} className="mt-16 flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <span
              aria-hidden
              style={{ width: 56, height: 1, background: 'var(--color-hairline)' }}
            />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.125rem',
                fontStyle: 'italic',
                color: 'var(--color-moss)',
                letterSpacing: '0.04em',
                fontVariationSettings: '"opsz" 24, "SOFT" 80, "WONK" 1',
              }}
            >
              {content.output.signatureName}
            </span>
            <span
              aria-hidden
              style={{ width: 56, height: 1, background: 'var(--color-hairline)' }}
            />
          </div>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-micro)',
              color: 'var(--color-ink-mute)',
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
            }}
          >
            {content.output.signatureLocation}
          </span>
        </motion.div>

        {/* CTAs */}
        <motion.div {...reveal(0.82)} className="mt-16 flex flex-col sm:flex-row gap-4 justify-center">
          <a href={bookHref} className="audit-cta-primary">
            <span>{content.output.bookCta}</span>
            <span aria-hidden>↗</span>
          </a>

          <form onSubmit={handleSendToSelf} className="audit-cta-secondary-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              placeholder={content.output.sendPlaceholder}
              required
              className="audit-cta-email"
              aria-label="Your email"
              disabled={sent}
            />
            <button type="submit" className="audit-cta-secondary" disabled={sent}>
              {sent ? content.output.sendSent : content.output.sendCta}
            </button>
          </form>
        </motion.div>

        {/* Restart */}
        <motion.div {...reveal(0.95)} className="mt-14 text-center">
          <button
            type="button"
            onClick={onRestart}
            className="audit-restart-btn"
          >
            Run it again
          </button>
        </motion.div>
      </div>

      <style>{`
        .audit-cta-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          background: var(--color-ink);
          color: var(--color-bone);
          padding: 1rem 1.75rem;
          font-size: 0.9375rem;
          font-weight: 500;
          text-decoration: none;
          border-radius: 2px;
          position: relative;
          overflow: hidden;
          isolation: isolate;
          font-family: var(--font-ui);
          letter-spacing: 0.01em;
          transition: padding 320ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .audit-cta-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--color-moss);
          transform: translateY(101%);
          transition: transform 420ms cubic-bezier(0.16, 1, 0.3, 1);
          z-index: -1;
        }
        .audit-cta-primary:hover::before,
        .audit-cta-primary:focus-visible::before {
          transform: translateY(0);
        }

        .audit-cta-secondary-form {
          display: flex;
          gap: 0;
          align-items: stretch;
          border: 1px solid var(--color-hairline);
          border-radius: 2px;
          overflow: hidden;
          background: var(--color-bone);
          transition: border-color 260ms;
        }
        .audit-cta-secondary-form:focus-within {
          border-color: var(--color-ink);
        }
        .audit-cta-email {
          flex: 1;
          background: transparent;
          border: none;
          padding: 1rem 1.2rem;
          font-size: 0.9375rem;
          font-family: var(--font-ui);
          color: var(--color-ink);
          outline: none;
          min-width: 180px;
        }
        .audit-cta-secondary {
          border: none;
          background: transparent;
          color: var(--color-ink);
          font-family: var(--font-mono);
          font-size: var(--text-micro);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0 1.5rem;
          cursor: pointer;
          border-left: 1px solid var(--color-hairline);
          transition: background 260ms;
        }
        .audit-cta-secondary:hover:not(:disabled),
        .audit-cta-secondary:focus-visible:not(:disabled) {
          background: color-mix(in srgb, var(--color-moss) 8%, transparent);
        }
        .audit-cta-secondary:disabled {
          cursor: default;
          color: var(--color-moss);
        }

        .audit-restart-btn {
          background: transparent;
          border: none;
          padding: 0.5rem 0;
          cursor: pointer;
          font-family: var(--font-mono);
          font-size: var(--text-micro);
          color: var(--color-ink-mute);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          position: relative;
        }
        .audit-restart-btn::after {
          content: '';
          position: absolute;
          left: 0; right: 0; bottom: 0;
          height: 1px;
          background: var(--color-moss);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 380ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .audit-restart-btn:hover::after,
        .audit-restart-btn:focus-visible::after {
          transform: scaleX(1);
        }
      `}</style>
    </section>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mb-3"
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-micro)',
        color: 'var(--color-ink-mute)',
        textTransform: 'uppercase',
        letterSpacing: '0.14em',
      }}
    >
      {children}
    </div>
  )
}
