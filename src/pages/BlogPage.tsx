import { useEffect, useState, type FormEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import VennLogo from '../components/VennLogo'
import { useContent, useLang } from '../hooks/useContent'

// TODO (Notion CMS): once Vedra's Notion DB is wired, replace the upcoming
// posts with a real fetch (title, slug, cover, publishedAt, body). Today the
// page is a styled "coming soon" with the queued post list + notify form.

export default function BlogPage() {
  const t = useContent()
  const lang = useLang()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [location.pathname])

  const homeHref = lang === 'hr' ? '/hr' : '/'

  const handleSubscribe = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed) return
    setStatus('sending')
    const subject = encodeURIComponent(
      lang === 'hr' ? 'Prijava na prvi blog tekst' : 'Subscribe to first blog post'
    )
    const body = encodeURIComponent(
      lang === 'hr'
        ? `Hej Vedra,\n\nJavi mi kad prvi tekst izađe.\n\nOd: ${trimmed}`
        : `Hi Vedra,\n\nPlease notify me when the first post is published.\n\nFrom: ${trimmed}`
    )
    setTimeout(() => {
      window.location.href = `mailto:vedra.re.ondrusek@gmail.com?subject=${subject}&body=${body}`
      setStatus('sent')
    }, 400)
  }

  return (
    <main>
      <Nav />

      {/* Editorial hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'var(--color-bone)',
          paddingTop: '9rem',
          paddingBottom: '4rem',
          borderBottom: '1px solid var(--color-hairline)',
        }}
      >
        {/* Ambient washes */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 55% 60% at 18% 30%, color-mix(in srgb, var(--color-moss) 10%, transparent) 0%, transparent 65%), radial-gradient(ellipse 45% 50% at 82% 70%, color-mix(in srgb, var(--color-ochre) 7%, transparent) 0%, transparent 60%)',
          }}
        />
        <div aria-hidden className="absolute inset-0 pointer-events-none grain-overlay" />

        {/* Trillian mark — large decorative placement, top-right */}
        <motion.div
          aria-hidden
          className="hidden md:block absolute"
          style={{ top: '18%', right: '7%', width: 180, height: 180 }}
          initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
          animate={{ opacity: 0.9, scale: 1, rotate: 0 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <VennLogo variant="minimal" size={180} />
        </motion.div>

        <div className="relative mx-auto max-w-[1440px] px-6 md:px-12">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-micro)',
              color: 'var(--color-ink-mute)',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
            }}
          >
            <span
              aria-hidden
              style={{
                width: 28,
                height: 1,
                background: 'var(--color-moss)',
                opacity: 0.6,
              }}
            />
            <span>{t.blog.eyebrow}</span>
          </motion.div>

          {/* Headline with blooming underline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="blog-hero-headline"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6.5vw, 5.5rem)',
              lineHeight: 0.98,
              letterSpacing: '-0.03em',
              fontWeight: 400,
              color: 'var(--color-ink)',
              margin: '1.5rem 0 0 0',
              maxWidth: '18ch',
              fontVariationSettings: '"opsz" 96, "SOFT" 50, "WONK" 1',
            }}
          >
            {t.blog.headline}
          </motion.h1>

          {/* Intro paragraph + divider */}
          <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-8 md:gap-16 items-end">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.125rem, 1.6vw, 1.375rem)',
                lineHeight: 1.45,
                fontStyle: 'italic',
                color: 'var(--color-moss)',
                fontVariationSettings: '"opsz" 24, "SOFT" 80',
                maxWidth: '34ch',
              }}
            >
              {t.blog.intro}
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '1rem',
                lineHeight: 1.65,
                color: 'var(--color-ink-soft)',
                margin: 0,
                maxWidth: '50ch',
                borderLeft: '1px solid var(--color-hairline)',
                paddingLeft: '1.25rem',
              }}
            >
              {t.blog.empty.body}
            </motion.p>
          </div>
        </div>

        <style>{`
          .blog-hero-headline {
            display: inline-block;
            position: relative;
          }
          .blog-hero-headline::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -0.18em;
            width: 28%;
            height: 1px;
            background: var(--color-moss);
            transform: scaleX(0);
            transform-origin: left;
            animation: blog-underline-bloom 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.9s forwards;
          }
          @keyframes blog-underline-bloom {
            from { transform: scaleX(0); }
            to { transform: scaleX(1); }
          }
        `}</style>
      </section>

      {/* Upcoming posts — queued for first drop */}
      <section
        className="relative"
        style={{
          background: 'var(--color-bone-warm)',
          padding: '5rem 0 6rem',
        }}
      >
        <div aria-hidden className="absolute inset-0 pointer-events-none grain-overlay" />

        <div className="relative mx-auto max-w-[1440px] px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.7 }}
            className="flex items-baseline justify-between gap-6 flex-wrap mb-10"
          >
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                style={{
                  width: 28,
                  height: 1,
                  background: 'var(--color-ochre)',
                  opacity: 0.65,
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
                {t.blog.upcomingLabel}
              </span>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-micro)',
                color: 'var(--color-ink-mute)',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
              }}
            >
              {String(t.blog.upcomingPosts.length).padStart(2, '0')} queued
            </span>
          </motion.div>

          <ul
            className="list-none m-0 p-0 border-t"
            style={{ borderColor: 'var(--color-hairline)' }}
          >
            {t.blog.upcomingPosts.map((post, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8% 0px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="blog-queue-item"
              >
                <article className="blog-queue-inner">
                  <div className="blog-queue-meta">
                    <span className="blog-queue-num">{post.num}</span>
                    <span className="blog-queue-sep" aria-hidden />
                    <span className="blog-queue-category">{post.category}</span>
                  </div>
                  <h2 className="blog-queue-title">{post.title}</h2>
                  <p className="blog-queue-teaser">{post.teaser}</p>
                  <div className="blog-queue-status">
                    <span className="blog-queue-status-dot" aria-hidden />
                    <span>{lang === 'hr' ? 'U redu · uskoro' : 'Queued · soon'}</span>
                  </div>
                </article>
                <div aria-hidden className="blog-queue-rule" />
              </motion.li>
            ))}
          </ul>
        </div>

        <style>{`
          .blog-queue-item {
            border-bottom: 1px solid var(--color-hairline);
            position: relative;
          }
          .blog-queue-inner {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.25rem;
            padding: 2.25rem 0;
            position: relative;
            transition: padding 420ms cubic-bezier(0.16, 1, 0.3, 1),
              background 420ms cubic-bezier(0.16, 1, 0.3, 1);
          }
          @media (min-width: 900px) {
            .blog-queue-inner {
              grid-template-columns: 9rem 1fr 12rem;
              gap: 3rem;
              align-items: baseline;
              padding: 2.5rem 0;
            }
          }
          .blog-queue-item:hover .blog-queue-inner {
            padding-left: 1rem;
            padding-right: 1rem;
            background: color-mix(in srgb, var(--color-moss) 5%, transparent);
          }
          .blog-queue-meta {
            display: flex;
            align-items: center;
            gap: 0.7rem;
            font-family: var(--font-mono);
            font-size: var(--text-micro);
            text-transform: uppercase;
            letter-spacing: 0.14em;
          }
          .blog-queue-num {
            color: var(--color-moss);
            font-weight: 500;
          }
          .blog-queue-sep {
            display: inline-block;
            width: 18px;
            height: 1px;
            background: var(--color-hairline);
          }
          .blog-queue-category {
            color: var(--color-ink-mute);
          }
          .blog-queue-title {
            font-family: var(--font-display);
            font-size: clamp(1.375rem, 2.4vw, 2rem);
            line-height: 1.2;
            letter-spacing: -0.015em;
            font-weight: 400;
            color: var(--color-ink);
            margin: 0;
            max-width: 30ch;
            font-variation-settings: "opsz" 36, "SOFT" 50, "WONK" 1;
            transition: color 320ms;
          }
          .blog-queue-teaser {
            display: none;
          }
          @media (min-width: 900px) {
            .blog-queue-teaser {
              display: block;
              grid-column: 2 / 3;
              font-family: var(--font-ui);
              font-size: 0.9375rem;
              line-height: 1.6;
              color: var(--color-ink-soft);
              margin: 0.75rem 0 0 0;
              max-width: 58ch;
            }
          }
          .blog-queue-status {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            font-family: var(--font-mono);
            font-size: var(--text-micro);
            text-transform: uppercase;
            letter-spacing: 0.14em;
            color: var(--color-ink-mute);
            white-space: nowrap;
          }
          @media (min-width: 900px) {
            .blog-queue-status {
              grid-column: 3 / 4;
              grid-row: 1 / 2;
              justify-self: end;
              align-self: baseline;
            }
          }
          .blog-queue-status-dot {
            display: inline-block;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: var(--color-ochre);
            box-shadow: 0 0 0 0 color-mix(in srgb, var(--color-ochre) 55%, transparent);
            animation: blog-queue-pulse 2.4s cubic-bezier(0.16, 1, 0.3, 1) infinite;
          }
          @keyframes blog-queue-pulse {
            0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--color-ochre) 55%, transparent); }
            70% { box-shadow: 0 0 0 8px color-mix(in srgb, var(--color-ochre) 0%, transparent); }
            100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--color-ochre) 0%, transparent); }
          }
          @media (prefers-reduced-motion: reduce) {
            .blog-queue-status-dot { animation: none; }
          }
        `}</style>
      </section>

      {/* Subscribe — notify when first post drops */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'var(--color-bone)',
          padding: '6rem 0 7rem',
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 55% 55% at 50% 45%, color-mix(in srgb, var(--color-moss) 10%, transparent) 0%, transparent 70%)',
          }}
        />
        <div aria-hidden className="absolute inset-0 pointer-events-none grain-overlay" />

        <div className="relative mx-auto max-w-[720px] px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <span
              aria-hidden
              style={{ width: 28, height: 1, background: 'var(--color-moss)', opacity: 0.6 }}
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
              {t.blog.subscribe.eyebrow}
            </span>
            <span
              aria-hidden
              style={{ width: 28, height: 1, background: 'var(--color-moss)', opacity: 0.6 }}
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3.6vw, 2.75rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              fontWeight: 400,
              fontStyle: 'italic',
              color: 'var(--color-ink)',
              margin: '0 auto 1rem',
              maxWidth: '22ch',
              fontVariationSettings: '"opsz" 48, "SOFT" 80, "WONK" 1',
            }}
          >
            {t.blog.subscribe.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '1rem',
              lineHeight: 1.65,
              color: 'var(--color-ink-soft)',
              margin: '0 auto 2.5rem',
              maxWidth: '42ch',
            }}
          >
            {t.blog.subscribe.sub}
          </motion.p>

          <motion.form
            onSubmit={handleSubscribe}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="blog-subscribe-form"
          >
            <input
              type="email"
              required
              placeholder={t.blog.subscribe.placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label={t.blog.subscribe.placeholder}
              className="blog-subscribe-input"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="blog-subscribe-btn"
            >
              {status === 'idle' && t.blog.subscribe.submit}
              {status === 'sending' && t.blog.subscribe.sending}
              {status === 'sent' && t.blog.subscribe.sent}
              <span aria-hidden>→</span>
            </button>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.625rem',
              color: 'var(--color-ink-mute)',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
              marginTop: '1rem',
              opacity: 0.7,
            }}
          >
            {t.blog.subscribe.note}
          </motion.p>

          {/* Back to site */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-16"
          >
            <Link
              to={homeHref}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.55rem',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-micro)',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: 'var(--color-ink)',
                textDecoration: 'none',
              }}
              className="blog-back-link"
            >
              <span aria-hidden>←</span>
              {t.blog.empty.cta}
            </Link>
          </motion.div>
        </div>

        <style>{`
          .blog-subscribe-form {
            display: flex;
            align-items: stretch;
            border-bottom: 1px solid var(--color-ink);
            max-width: 480px;
            margin: 0 auto;
            transition: border-color 320ms;
          }
          .blog-subscribe-form:focus-within {
            border-color: var(--color-moss);
          }
          .blog-subscribe-input {
            flex: 1;
            background: transparent;
            border: none;
            outline: none;
            padding: 0.9rem 0.4rem;
            font-family: var(--font-ui);
            font-size: 1rem;
            color: var(--color-ink);
          }
          .blog-subscribe-input::placeholder {
            color: color-mix(in srgb, var(--color-ink) 35%, transparent);
          }
          .blog-subscribe-btn {
            background: transparent;
            border: none;
            padding: 0.9rem 0.2rem;
            font-family: var(--font-mono);
            font-size: var(--text-micro);
            text-transform: uppercase;
            letter-spacing: 0.14em;
            color: var(--color-ink);
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            white-space: nowrap;
            transition: color 320ms, transform 320ms cubic-bezier(0.16, 1, 0.3, 1);
          }
          .blog-subscribe-btn:hover,
          .blog-subscribe-btn:focus-visible {
            color: var(--color-moss);
            transform: translateX(3px);
            outline: none;
          }
          .blog-subscribe-btn:disabled {
            color: var(--color-ink-mute);
            cursor: wait;
          }
          .blog-back-link {
            position: relative;
            transition: color 280ms;
          }
          .blog-back-link::after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: -4px;
            height: 1px;
            background: var(--color-moss);
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 320ms cubic-bezier(0.16, 1, 0.3, 1);
          }
          .blog-back-link:hover::after,
          .blog-back-link:focus-visible::after {
            transform: scaleX(1);
          }
        `}</style>
      </section>

      <Footer />
    </main>
  )
}
