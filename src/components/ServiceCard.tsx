import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import RevealOnScroll from './RevealOnScroll'

type Beat = { label: string; text: string }

type Props = {
  index: number
  outcome: string
  body: string
  scope: string
  format: string
  who: string
  beats: readonly Beat[]
  deliverables: readonly string[]
  principle: string
  labels: {
    who: string
    beats: string
    deliverables: string
    principle: string
    expand: string
    collapse: string
  }
  defaultOpen?: boolean
}

export default function ServiceCard({
  index,
  outcome,
  body,
  scope,
  format,
  who,
  beats,
  deliverables,
  principle,
  labels,
  defaultOpen = false,
}: Props) {
  const [open, setOpen] = useState(defaultOpen)
  const contentId = `service-panel-${index}`

  return (
    <RevealOnScroll delay={index * 0.04}>
      <article
        className="group relative border-t"
        style={{
          borderColor: 'var(--color-hairline)',
          transition: 'background 300ms ease',
          background: open ? 'color-mix(in srgb, var(--color-bone-warm) 60%, var(--color-bone))' : 'transparent',
        }}
      >
        <button
          type="button"
          aria-expanded={open}
          aria-controls={contentId}
          onClick={() => setOpen((o) => !o)}
          className="w-full text-left cursor-pointer"
          style={{
            background: 'transparent',
            border: 'none',
            padding: 0,
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 md:gap-12 py-10 md:py-14 px-0">
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-micro)',
                color: 'var(--color-ink-mute)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                paddingTop: '0.5rem',
                minWidth: '3rem',
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </div>

            <div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.625rem, 2.4vw, 2.125rem)',
                  lineHeight: 1.15,
                  letterSpacing: '-0.015em',
                  fontWeight: 400,
                  color: 'var(--color-ink)',
                  margin: '0 0 1rem 0',
                  maxWidth: '22ch',
                  fontVariationSettings: '"opsz" 36, "SOFT" 50',
                  position: 'relative',
                  display: 'inline-block',
                }}
                className="service-outcome"
              >
                <span style={{ position: 'relative', display: 'inline' }}>
                  {outcome}
                  <span
                    aria-hidden
                    className="service-underline"
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: '-0.1em',
                      height: '2px',
                      background: 'var(--color-moss)',
                      transformOrigin: 'left',
                      transform: open ? 'scaleX(1)' : 'scaleX(0)',
                      transition: 'transform 450ms var(--ease-out-expo)',
                    }}
                  />
                </span>
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  color: 'var(--color-ink-soft)',
                  margin: 0,
                  maxWidth: '54ch',
                }}
              >
                {body}
              </p>
            </div>

            <div className="md:text-right md:min-w-[14rem] space-y-2 flex flex-col md:items-end">
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-micro)',
                  color: 'var(--color-ink)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                }}
              >
                {scope}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-micro)',
                  color: 'var(--color-ink-mute)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                }}
              >
                {format}
              </div>
              <div className="pt-2 flex items-center gap-2" style={{ color: 'var(--color-moss)' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-micro)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                  }}
                >
                  {open ? labels.collapse : labels.expand}
                </span>
                <motion.span
                  animate={{ rotate: open ? 90 : 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: 'inline-block', lineHeight: 1 }}
                >
                  →
                </motion.span>
              </div>
            </div>
          </div>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={contentId}
              key="expanded"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.4, delay: 0.1 },
              }}
              style={{ overflow: 'hidden' }}
            >
              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 md:gap-12 pb-12 md:pb-16">
                <div className="hidden md:block" />
                <div className="space-y-10">
                  {/* Who it's for */}
                  <ExpandedRow label={labels.who}>
                    <p
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '1.0625rem',
                        lineHeight: 1.65,
                        color: 'var(--color-ink)',
                        margin: 0,
                        maxWidth: '56ch',
                      }}
                    >
                      {who}
                    </p>
                  </ExpandedRow>

                  {/* What happens */}
                  <ExpandedRow label={labels.beats}>
                    <ol className="list-none m-0 p-0 space-y-4">
                      {beats.map((b, i) => (
                        <li
                          key={i}
                          className="grid grid-cols-[5.5rem_1fr] gap-4 items-baseline"
                        >
                          <span
                            style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: 'var(--text-micro)',
                              color: 'var(--color-moss)',
                              textTransform: 'uppercase',
                              letterSpacing: '0.12em',
                              paddingTop: '0.15rem',
                            }}
                          >
                            {b.label}
                          </span>
                          <span
                            style={{
                              fontFamily: 'var(--font-ui)',
                              fontSize: '1rem',
                              lineHeight: 1.6,
                              color: 'var(--color-ink-soft)',
                            }}
                          >
                            {b.text}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </ExpandedRow>

                  {/* Deliverables */}
                  <ExpandedRow label={labels.deliverables}>
                    <ul className="list-none m-0 p-0 space-y-2">
                      {deliverables.map((d, i) => (
                        <li
                          key={i}
                          className="flex items-baseline gap-3"
                          style={{
                            fontFamily: 'var(--font-ui)',
                            fontSize: '1rem',
                            lineHeight: 1.6,
                            color: 'var(--color-ink-soft)',
                          }}
                        >
                          <span
                            aria-hidden
                            style={{
                              display: 'inline-block',
                              width: '14px',
                              height: '1px',
                              background: 'var(--color-moss)',
                              flexShrink: 0,
                              transform: 'translateY(-4px)',
                            }}
                          />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </ExpandedRow>

                  {/* Principle */}
                  <ExpandedRow label={labels.principle}>
                    <blockquote
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.375rem, 2vw, 1.75rem)',
                        fontStyle: 'italic',
                        lineHeight: 1.3,
                        color: 'var(--color-moss-deep)',
                        margin: 0,
                        paddingLeft: '1rem',
                        borderLeft: '2px solid var(--color-moss)',
                        maxWidth: '50ch',
                        fontVariationSettings: '"opsz" 24, "SOFT" 80, "WONK" 1',
                      }}
                    >
                      {principle}
                    </blockquote>
                  </ExpandedRow>
                </div>
                <div />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </article>
    </RevealOnScroll>
  )
}

function ExpandedRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[10rem_1fr] gap-3 md:gap-6">
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-micro)',
          color: 'var(--color-ink-mute)',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          paddingTop: '0.25rem',
        }}
      >
        {label}
      </div>
      <div>{children}</div>
    </div>
  )
}
