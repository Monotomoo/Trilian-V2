import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import RotatingWord from './RotatingWord'
import { useContent } from '../hooks/useContent'

export default function Hero() {
  const t = useContent()
  const ref = useRef<HTMLElement | null>(null)
  const { pathname } = useLocation()
  const auditHref = pathname.startsWith('/hr') ? '/hr/audit' : '/audit'

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-6%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])
  const markY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])

  const line1Words = t.hero.line1.split(' ')
  const wordStagger = (i: number) => 0.25 + i * 0.07

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-[100dvh] overflow-hidden"
      style={{ background: 'var(--color-bone)' }}
    >
      {/* Ambient drift — behind everything */}
      <div aria-hidden className="hero-ambient-a" />
      <div aria-hidden className="hero-ambient-b" />

      {/* Decorative moss vertical rule — left margin, draws in on mount */}
      <motion.div
        aria-hidden
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-6 md:left-12 top-0 bottom-0 w-px origin-top"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, var(--color-hairline) 18%, var(--color-hairline) 82%, transparent 100%)',
        }}
      />

      {/* Decorative mark — breathing moss disc, bottom-right */}
      <motion.div
        aria-hidden
        style={{ y: markY }}
        className="absolute bottom-[18vh] right-[6%] md:right-[8%] hidden sm:block pointer-events-none"
      >
        <motion.svg
          width="180"
          height="180"
          viewBox="0 0 180 180"
          style={{ display: 'block', opacity: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.8 }}
        >
          {/* Outer breathing ring */}
          <motion.circle
            cx="90"
            cy="90"
            r="72"
            fill="none"
            stroke="var(--color-moss)"
            strokeWidth="0.6"
            opacity={0.35}
            animate={{ r: [72, 82, 72], opacity: [0.35, 0.15, 0.35] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Mid ring */}
          <motion.circle
            cx="90"
            cy="90"
            r="48"
            fill="none"
            stroke="var(--color-moss)"
            strokeWidth="0.7"
            opacity={0.55}
            animate={{ r: [48, 55, 48], opacity: [0.55, 0.3, 0.55] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          />
          {/* Inner ring */}
          <motion.circle
            cx="90"
            cy="90"
            r="26"
            fill="none"
            stroke="var(--color-moss)"
            strokeWidth="0.9"
            opacity={0.75}
            animate={{ r: [26, 30, 26], opacity: [0.75, 0.5, 0.75] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          />
          {/* Center ochre dot */}
          <motion.circle
            cx="90"
            cy="90"
            r="4"
            fill="var(--color-ochre)"
            animate={{ r: [4, 5.5, 4], opacity: [0.9, 1, 0.9] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Crosshair marks */}
          <line x1="90" y1="4" x2="90" y2="14" stroke="var(--color-moss)" strokeWidth="0.5" opacity="0.3" />
          <line x1="90" y1="166" x2="90" y2="176" stroke="var(--color-moss)" strokeWidth="0.5" opacity="0.3" />
          <line x1="4" y1="90" x2="14" y2="90" stroke="var(--color-moss)" strokeWidth="0.5" opacity="0.3" />
          <line x1="166" y1="90" x2="176" y2="90" stroke="var(--color-moss)" strokeWidth="0.5" opacity="0.3" />
        </motion.svg>
      </motion.div>

      {/* Main content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative mx-auto max-w-[1440px] w-full px-6 md:px-12 min-h-[100dvh] flex flex-col z-10"
      >
        {/* TOP — eyebrow + meta */}
        <div className="pt-28 md:pt-36 flex items-start justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-micro)',
              color: 'var(--color-ink-mute)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
            }}
          >
            <span
              aria-hidden
              style={{
                width: '24px',
                height: '1px',
                background: 'var(--color-moss)',
                display: 'inline-block',
                opacity: 0.6,
              }}
            />
            {t.hero.eyebrow}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-right"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-micro)',
              color: 'var(--color-ink-mute)',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              lineHeight: 1.7,
            }}
          >
            <div>{t.meta.wordmark}</div>
            <div>{t.meta.location} · Est. 2026</div>
          </motion.div>
        </div>

        {/* CENTER — headline + sub */}
        <div className="flex-1 flex flex-col justify-center py-16 md:py-20">
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.75rem, 8.2vw, 8rem)',
              fontWeight: 400,
              lineHeight: 0.96,
              letterSpacing: '-0.032em',
              color: 'var(--color-ink)',
              margin: 0,
              maxWidth: '16ch',
              fontVariationSettings: '"opsz" 96, "SOFT" 50, "WONK" 0',
              textWrap: 'balance' as 'balance',
            }}
          >
            <span style={{ display: 'block' }}>
              {line1Words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: '0.5em' }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: wordStagger(i), ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: 'inline-block', marginRight: '0.24em' }}
                >
                  {word}
                </motion.span>
              ))}
            </span>

            <span style={{ display: 'block', marginTop: '0.04em' }}>
              <motion.span
                initial={{ opacity: 0, y: '0.5em' }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: wordStagger(line1Words.length),
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ display: 'inline-block', marginRight: '0.3em' }}
              >
                {t.hero.line2Prefix}
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: wordStagger(line1Words.length + 1) }}
                style={{ display: 'inline-block' }}
              >
                <RotatingWord
                  words={t.hero.rotating}
                  startDelay={wordStagger(line1Words.length + 1) + 0.3}
                />
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: wordStagger(line1Words.length + 2) }}
                style={{ display: 'inline-block' }}
              >
                {t.hero.line2Suffix}
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: wordStagger(line1Words.length + 3),
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 'clamp(1.0625rem, 1.5vw, 1.3125rem)',
              lineHeight: 1.55,
              maxWidth: '46ch',
              color: 'var(--color-ink-soft)',
              margin: '2.25rem 0 0 0',
            }}
          >
            {t.hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: wordStagger(line1Words.length + 4),
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-10 flex items-center gap-6 flex-wrap"
          >
            <Link to={auditHref} className="hero-audit-cta">
              <span className="hero-audit-cta-pulse" aria-hidden />
              <span className="hero-audit-cta-label">Run the 15-minute audit</span>
              <span aria-hidden className="hero-audit-cta-arrow">→</span>
            </Link>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-micro)',
                color: 'var(--color-ink-mute)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
              }}
            >
              Free · 7 questions · 3 minutes
            </span>
          </motion.div>
        </div>

        {/* BOTTOM — dossier + scroll + byline */}
        <div className="pb-10 md:pb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
            className="pt-5 border-t flex flex-wrap items-center gap-x-5 gap-y-2"
            style={{
              borderColor: 'var(--color-hairline)',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-micro)',
              color: 'var(--color-ink-mute)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              maxWidth: '64ch',
            }}
          >
            {t.hero.dossier.map((d, i) => (
              <span key={i} className="flex items-center gap-5">
                <span>{d}</span>
                {i < t.hero.dossier.length - 1 && (
                  <span
                    aria-hidden
                    style={{
                      width: '3px',
                      height: '3px',
                      borderRadius: '50%',
                      background: 'var(--color-moss)',
                      opacity: 0.6,
                    }}
                  />
                )}
              </span>
            ))}
          </motion.div>

          <div className="mt-8 md:mt-10 flex items-end justify-between gap-6">
            <motion.a
              href="#manifesto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.55 }}
              className="flex items-center gap-3 group w-fit"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-micro)',
                color: 'var(--color-ink-mute)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                textDecoration: 'none',
              }}
            >
              <span className="group-hover:text-[color:var(--color-ink)] transition-colors duration-300">
                {t.hero.scroll}
              </span>
              <motion.span
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{ display: 'inline-block' }}
              >
                ↓
              </motion.span>
            </motion.a>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.7 }}
              className="flex items-center gap-3"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-micro)',
                color: 'var(--color-ink-mute)',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
              }}
            >
              <span>{t.meta.practitioner}</span>
              <span
                aria-hidden
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'var(--color-moss)',
                  opacity: 0.8,
                }}
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      <style>{`
        .hero-audit-cta {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.95rem 1.85rem;
          background: var(--color-ink);
          color: var(--color-bone);
          font-family: var(--font-ui);
          font-size: 0.9375rem;
          font-weight: 500;
          letter-spacing: 0.01em;
          text-decoration: none;
          border-radius: 2px;
          overflow: hidden;
          isolation: isolate;
          transition: padding 320ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero-audit-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--color-moss);
          transform: translateY(101%);
          transition: transform 420ms cubic-bezier(0.16, 1, 0.3, 1);
          z-index: -1;
        }
        .hero-audit-cta:hover::before,
        .hero-audit-cta:focus-visible::before {
          transform: translateY(0);
        }
        .hero-audit-cta-pulse {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--color-ochre);
          box-shadow: 0 0 0 0 color-mix(in srgb, var(--color-ochre) 60%, transparent);
          animation: hero-cta-pulse 2.4s cubic-bezier(0.16, 1, 0.3, 1) infinite;
          flex-shrink: 0;
        }
        @keyframes hero-cta-pulse {
          0% {
            box-shadow: 0 0 0 0 color-mix(in srgb, var(--color-ochre) 55%, transparent);
          }
          70% {
            box-shadow: 0 0 0 9px color-mix(in srgb, var(--color-ochre) 0%, transparent);
          }
          100% {
            box-shadow: 0 0 0 0 color-mix(in srgb, var(--color-ochre) 0%, transparent);
          }
        }
        .hero-audit-cta-arrow {
          display: inline-block;
          transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero-audit-cta:hover .hero-audit-cta-arrow,
        .hero-audit-cta:focus-visible .hero-audit-cta-arrow {
          transform: translateX(5px);
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-audit-cta-pulse {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}
