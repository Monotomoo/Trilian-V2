import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import RevealOnScroll from './RevealOnScroll'
import SectionLabel from './SectionLabel'
import MagneticButton from './MagneticButton'
import { useContent } from '../hooks/useContent'

export default function ContactForm() {
  const t = useContent()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const from = (formData.get('from') as string) ?? ''
    const message = (formData.get('message') as string) ?? ''

    setStatus('sending')

    const subject = encodeURIComponent('Trillian HR — note')
    const body = encodeURIComponent(`From: ${from}\n\n${message}`)

    setTimeout(() => {
      window.location.href = `mailto:${t.contact.direct.email}?subject=${subject}&body=${body}`
      setStatus('sent')
    }, 400)
  }

  return (
    <section
      id="contact"
      className="relative py-32 md:py-48 border-t overflow-hidden"
      style={{
        background: 'var(--color-bone)',
        borderColor: 'var(--color-hairline)',
      }}
    >
      {/* Ambient moss wash behind */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 45% 40% at 12% 28%, color-mix(in srgb, var(--color-moss) 9%, transparent) 0%, transparent 60%)',
        }}
      />
      <div aria-hidden className="absolute inset-0 pointer-events-none grain-overlay" />

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-12">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-10 md:gap-20 items-end mb-16 md:mb-24">
          <div>
            <RevealOnScroll>
              <SectionLabel>{t.contact.eyebrow}</SectionLabel>
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
                }}
              >
                {t.contact.headline}
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
                maxWidth: '54ch',
              }}
            >
              {t.contact.sub}
            </p>
          </RevealOnScroll>
        </div>

        {/* Three paths */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[color:var(--color-hairline)] border-y" style={{ borderColor: 'var(--color-hairline)' }}>
          {t.contact.paths.map((p, i) => (
            <RevealOnScroll key={i} delay={0.1 + i * 0.08}>
              <PathCard path={p} accent={i === 0 ? 'moss' : i === 1 ? 'ochre' : 'ink'} />
            </RevealOnScroll>
          ))}
        </div>

        {/* Direct row */}
        <RevealOnScroll delay={0.3}>
          <div
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-micro)',
              color: 'var(--color-ink-mute)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
            }}
          >
            <span>{t.contact.direct.label}</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <a
              href={`mailto:${t.contact.direct.email}`}
              style={{ color: 'var(--color-ink)', textDecoration: 'none' }}
              className="hover:opacity-60"
            >
              {t.contact.direct.email}
            </a>
            <span style={{ opacity: 0.5 }}>·</span>
            <a
              href={`tel:${t.contact.direct.phone.replace(/\s/g, '')}`}
              style={{ color: 'var(--color-ink)', textDecoration: 'none' }}
              className="hover:opacity-60"
            >
              {t.contact.direct.phone}
            </a>
            <span style={{ opacity: 0.5 }}>·</span>
            <span>{t.contact.direct.location}</span>
          </div>
        </RevealOnScroll>

        {/* Quick note form — centered editorial composition */}
        <div id="note" className="relative mt-28 md:mt-40">
          {/* Breathing moss halo behind form */}
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ width: 620, height: 620 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  'radial-gradient(ellipse 50% 45% at 50% 50%, color-mix(in srgb, var(--color-moss) 12%, transparent) 0%, transparent 70%)',
              }}
              animate={{ scale: [1, 1.06, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

          <div className="relative mx-auto max-w-[640px]">
            {/* Eyebrow with rule */}
            <RevealOnScroll>
              <div className="flex items-center justify-center gap-3 mb-6">
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
                  {t.contact.note.eyebrow}
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
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <h3
                className="text-center"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 4.2vw, 3.5rem)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  fontWeight: 400,
                  color: 'var(--color-ink)',
                  margin: '0 0 1rem 0',
                  fontVariationSettings: '"opsz" 48, "SOFT" 50, "WONK" 1',
                  fontStyle: 'italic',
                }}
              >
                {t.contact.note.headline}
              </h3>
            </RevealOnScroll>

            <RevealOnScroll delay={0.18}>
              <p
                className="text-center"
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '1.0625rem',
                  lineHeight: 1.6,
                  color: 'var(--color-ink-soft)',
                  margin: '0 auto 3rem',
                  maxWidth: '42ch',
                }}
              >
                {t.contact.note.sub}
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.26}>
              <form onSubmit={handleSubmit} className="space-y-7">
                <Field
                  name="from"
                  label={t.contact.note.fromLabel}
                  placeholder={t.contact.note.fromPlaceholder}
                  type="email"
                  required
                />

                <div>
                  <label
                    htmlFor="message"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-micro)',
                      color: 'var(--color-ink-mute)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      marginBottom: '0.75rem',
                    }}
                  >
                    {t.contact.note.placeholder}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full resize-none"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid var(--color-hairline)',
                      padding: '0.75rem 0',
                      fontSize: '1.0625rem',
                      fontFamily: 'var(--font-ui)',
                      color: 'var(--color-ink)',
                      outline: 'none',
                      lineHeight: 1.55,
                    }}
                  />
                </div>

                <div className="flex items-center justify-between gap-6 pt-2 flex-wrap">
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-micro)',
                      color: 'var(--color-ink-mute)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                    }}
                  >
                    Usually within 48h
                  </span>
                  <MagneticButton
                    as="button"
                    type="submit"
                    disabled={status === 'sending'}
                    style={{
                      background: 'var(--color-ink)',
                      color: 'var(--color-bone)',
                      padding: '1rem 2.25rem',
                      fontSize: '0.9375rem',
                      fontWeight: 500,
                      border: 'none',
                      borderRadius: '2px',
                      cursor: status === 'sending' ? 'wait' : 'pointer',
                      fontFamily: 'var(--font-ui)',
                      letterSpacing: '0.01em',
                      alignItems: 'center',
                    }}
                  >
                    {status === 'idle' && t.contact.note.submit}
                    {status === 'sending' && t.contact.note.sending}
                    {status === 'sent' && t.contact.note.sent}
                  </MagneticButton>
                </div>
              </form>
            </RevealOnScroll>
          </div>

          {/* Signature flourish */}
          <RevealOnScroll delay={0.4}>
            <div className="mt-24 md:mt-32 flex flex-col items-center gap-4">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden
                  style={{
                    width: 56,
                    height: 1,
                    background: 'var(--color-hairline)',
                  }}
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
                  Vedra
                </span>
                <span
                  aria-hidden
                  style={{
                    width: 56,
                    height: 1,
                    background: 'var(--color-hairline)',
                  }}
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
                Zagreb · 2026
              </span>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}

type PathItem = {
  label: string
  title: string
  body: string
  cta: string
  href: string
}

function PathCard({ path, accent }: { path: PathItem; accent: 'moss' | 'ochre' | 'ink' }) {
  const dot =
    accent === 'moss' ? 'var(--color-moss)' : accent === 'ochre' ? 'var(--color-ochre)' : 'var(--color-ink)'
  return (
    <a
      href={path.href}
      className="group block relative p-8 md:p-10 h-full"
      style={{
        background: 'var(--color-bone)',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'background 400ms var(--ease-out-smooth)',
        minHeight: '16rem',
      }}
    >
      {/* Hover wash */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        style={{
          background: `linear-gradient(160deg, color-mix(in srgb, ${dot} 6%, transparent), transparent 60%)`,
          transition: 'opacity 500ms var(--ease-out-smooth)',
        }}
      />

      <div className="relative flex flex-col h-full">
        <div
          className="flex items-center gap-2"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-micro)',
            color: 'var(--color-ink-mute)',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
          }}
        >
          <span aria-hidden style={{ width: '6px', height: '6px', borderRadius: '50%', background: dot }} />
          {path.label}
        </div>

        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.375rem, 2vw, 1.75rem)',
            lineHeight: 1.15,
            letterSpacing: '-0.015em',
            fontWeight: 400,
            color: 'var(--color-ink)',
            margin: '1.5rem 0 0.75rem 0',
            fontVariationSettings: '"opsz" 36, "SOFT" 50',
          }}
        >
          {path.title}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.9375rem',
            lineHeight: 1.55,
            color: 'var(--color-ink-soft)',
            margin: '0 0 auto 0',
            maxWidth: '32ch',
          }}
        >
          {path.body}
        </p>

        <div
          className="mt-8 flex items-center gap-2"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-micro)',
            color: 'var(--color-ink)',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
          }}
        >
          <span>{path.cta}</span>
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1"
            style={{ display: 'inline-block' }}
          >
            →
          </span>
        </div>
      </div>
    </a>
  )
}

function Field({
  name,
  label,
  placeholder,
  type = 'text',
  required,
}: {
  name: string
  label: string
  placeholder: string
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label
        htmlFor={name}
        style={{
          display: 'block',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-micro)',
          color: 'var(--color-ink-mute)',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          marginBottom: '0.75rem',
        }}
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full"
        style={{
          background: 'transparent',
          border: 'none',
          borderBottom: '1px solid var(--color-hairline)',
          padding: '0.75rem 0',
          fontSize: '1.0625rem',
          fontFamily: 'var(--font-ui)',
          color: 'var(--color-ink)',
          outline: 'none',
          borderRadius: 0,
        }}
      />
    </div>
  )
}
