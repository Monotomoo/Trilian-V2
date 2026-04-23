import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import LangToggle from './LangToggle'
import VennLogo from './VennLogo'
import { useContent, useLang } from '../hooks/useContent'

const NAV_META = [
  { num: '01', href: '#hero', key: 'home' },
  { num: '02', href: '#story', key: 'about' },
  { num: '03', href: '#services', key: 'packages' },
  { num: '04', href: '#approach', key: 'approach' },
  { num: '05', href: '#contact', key: 'contact' },
  { num: '06', href: '/blog', key: 'blog', external: true },
] as const

export default function Nav() {
  const t = useContent()
  const lang = useLang()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [activeHref, setActiveHref] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const isBlogPage = location.pathname.endsWith('/blog')
  const anchorHome = lang === 'hr' ? '/hr' : '/'

  const navItems = useMemo(
    () =>
      NAV_META.map((m) => {
        const isExternal = 'external' in m && m.external === true
        let href: string
        if (isExternal) {
          href = m.href === '/blog' && lang === 'hr' ? '/hr/blog' : m.href
        } else {
          // Scroll anchor — prefix with route base when we're on a sub-page
          href = isBlogPage ? `${anchorHome}${m.href}` : m.href
        }
        return {
          num: m.num,
          href,
          key: m.key,
          external: isExternal,
          label: t.nav[m.key as keyof typeof t.nav] as string,
        }
      }),
    [t, lang, isBlogPage, anchorHome]
  )

  const applyHref = isBlogPage ? `${anchorHome}#contact` : '#contact'

  useEffect(() => {
    let raf = 0
    const compute = () => {
      raf = 0
      setScrolled(window.scrollY > 40)
      const trigger = window.scrollY + window.innerHeight * 0.3
      let current: string | null = null
      for (const item of NAV_META) {
        if (!item.href.startsWith('#')) continue
        const el = document.querySelector(item.href) as HTMLElement | null
        if (el) {
          const offset = el.getBoundingClientRect().top + window.scrollY
          if (offset <= trigger) current = item.href
        }
      }
      setActiveHref(current)
    }
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(compute)
    }
    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled
            ? 'color-mix(in srgb, var(--color-bone) 82%, transparent)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(14px) saturate(1.15)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(1.15)' : 'none',
          borderBottom: scrolled ? '1px solid var(--color-hairline)' : '1px solid transparent',
          transition:
            'background 400ms cubic-bezier(0.16, 1, 0.3, 1), border-color 400ms cubic-bezier(0.16, 1, 0.3, 1), backdrop-filter 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          className="mx-auto max-w-[1440px] px-6 md:px-12 flex items-center justify-between"
          style={{
            paddingTop: scrolled ? '0.95rem' : '1.4rem',
            paddingBottom: scrolled ? '0.95rem' : '1.4rem',
            transition: 'padding 400ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Wordmark */}
          <a
            href="/"
            className="group flex items-center gap-2.5"
            style={{ textDecoration: 'none', color: 'var(--color-ink)' }}
          >
            <span
              aria-hidden
              className="nav-pin"
              style={{
                display: 'inline-flex',
                alignSelf: 'center',
                transition: 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <VennLogo variant="minimal" size={22} />
            </span>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.125rem',
                fontWeight: 500,
                letterSpacing: '-0.01em',
                fontVariationSettings: '"opsz" 14, "SOFT" 30',
              }}
            >
              {t.meta.wordmark}
            </span>
            <span
              className="hidden sm:inline"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-micro)',
                color: 'var(--color-ink-mute)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              / {t.meta.location}
            </span>
          </a>

          {/* Desktop chapter list */}
          <ul
            className="hidden lg:flex items-center list-none m-0 p-0"
            style={{ gap: '2.2rem' }}
          >
            {navItems.map((item) => {
              const isActive = activeHref === item.href
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="nav-chapter"
                    data-active={isActive ? 'true' : undefined}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pin"
                        className="nav-chapter-pin"
                        aria-hidden
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      />
                    )}
                    <span className="nav-chapter-label">{item.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Right cluster */}
          <div className="flex items-center gap-5 md:gap-7">
            <LangToggle />

            <a href={applyHref} className="nav-apply hidden sm:inline-flex items-center">
              <span className="nav-apply-label">{t.nav.apply}</span>
              <span className="nav-apply-arrow" aria-hidden>
                ↗
              </span>
            </a>

            <button
              type="button"
              aria-label="Open index"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="nav-index-btn inline-flex lg:hidden"
            >
              <span className="nav-index-lines" aria-hidden>
                <span />
                <span />
              </span>
              Index
            </button>
          </div>
        </div>
      </nav>

      <NavStyles />

      <AnimatePresence>
        {menuOpen && (
          <MobileIndex
            onClose={() => setMenuOpen(false)}
            items={navItems}
            applyLabel={t.nav.apply}
            applyHref={applyHref}
          />
        )}
      </AnimatePresence>
    </>
  )
}

function MobileIndex({
  onClose,
  items,
  applyLabel,
  applyHref,
}: {
  onClose: () => void
  items: { num: string; href: string; label: string }[]
  applyLabel: string
  applyHref: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[60] flex flex-col"
      style={{
        background: 'var(--color-bone)',
        padding: '1.5rem',
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Index"
    >
      <div className="flex items-center justify-between">
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-micro)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--color-ink-mute)',
          }}
        >
          Index
        </span>
        <button type="button" onClick={onClose} className="nav-close-btn">
          Close
          <span aria-hidden className="nav-close-glyph">
            ×
          </span>
        </button>
      </div>

      <ul
        className="list-none p-0"
        style={{ margin: 'auto 0', display: 'flex', flexDirection: 'column' }}
      >
        {items.map((item, i) => (
          <motion.li
            key={item.href}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 + i * 0.06, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{ borderBottom: '1px solid var(--color-hairline)' }}
          >
            <a href={item.href} onClick={onClose} className="nav-mobile-link">
              <span className="nav-mobile-num">{item.num}</span>
              <span className="nav-mobile-label">{item.label}</span>
              <span className="nav-mobile-arrow" aria-hidden>
                →
              </span>
            </a>
          </motion.li>
        ))}
      </ul>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-between"
        style={{
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--color-hairline)',
        }}
      >
        <LangToggle />
        <a
          href={applyHref}
          onClick={onClose}
          style={{
            background: 'var(--color-ink)',
            color: 'var(--color-bone)',
            padding: '0.65rem 1.2rem',
            fontSize: '0.875rem',
            fontWeight: 500,
            textDecoration: 'none',
            borderRadius: '2px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          {applyLabel}
          <span aria-hidden>↗</span>
        </a>
      </motion.div>
    </motion.div>
  )
}

function NavStyles() {
  return (
    <style>{`
      .group:hover .nav-pin {
        transform: translateY(1px) scale(1.35);
      }

      .nav-chapter {
        position: relative;
        display: inline-flex;
        align-items: center;
        gap: 0.55rem;
        padding: 0.3rem 0;
        text-decoration: none;
        color: var(--color-ink);
      }
      .nav-chapter-pin {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: var(--color-ochre);
        display: inline-block;
        flex-shrink: 0;
      }
      .nav-chapter-label {
        font-family: var(--font-ui);
        font-size: 0.9375rem;
        font-weight: 400;
        opacity: 0.72;
        letter-spacing: -0.002em;
        transition: opacity 300ms cubic-bezier(0.16, 1, 0.3, 1),
          color 300ms cubic-bezier(0.16, 1, 0.3, 1),
          font-style 0ms;
      }
      .nav-chapter:hover .nav-chapter-label,
      .nav-chapter:focus-visible .nav-chapter-label {
        opacity: 1;
        color: var(--color-moss-deep);
        font-style: italic;
      }
      .nav-chapter[data-active] .nav-chapter-label {
        opacity: 1;
      }

      .nav-apply {
        position: relative;
        padding: 0.55rem 1rem 0.55rem 1.05rem;
        background: transparent;
        color: var(--color-ink);
        font-family: var(--font-ui);
        font-size: 0.8125rem;
        font-weight: 500;
        text-decoration: none;
        border-radius: 999px;
        border: 1px solid var(--color-ink);
        overflow: hidden;
        isolation: isolate;
        letter-spacing: 0.01em;
        transition: color 280ms cubic-bezier(0.16, 1, 0.3, 1),
          border-color 280ms cubic-bezier(0.16, 1, 0.3, 1);
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
      }
      .nav-apply::before {
        content: '';
        position: absolute;
        inset: 0;
        background: var(--color-ink);
        transform: translateY(101%);
        transition: transform 420ms cubic-bezier(0.16, 1, 0.3, 1);
        z-index: -1;
      }
      .nav-apply:hover,
      .nav-apply:focus-visible {
        color: var(--color-bone);
        border-color: var(--color-ink);
      }
      .nav-apply:hover::before,
      .nav-apply:focus-visible::before {
        transform: translateY(0);
      }
      .nav-apply-arrow {
        display: inline-block;
        font-size: 0.875rem;
        line-height: 1;
        transform: translate(0, 0);
        transition: transform 320ms cubic-bezier(0.16, 1, 0.3, 1);
      }
      .nav-apply:hover .nav-apply-arrow,
      .nav-apply:focus-visible .nav-apply-arrow {
        transform: translate(2px, -2px);
      }

      .nav-index-btn {
        align-items: center;
        gap: 0.55rem;
        background: transparent;
        border: 1px solid var(--color-hairline);
        padding: 0.5rem 0.85rem;
        font-family: var(--font-mono);
        font-size: var(--text-micro);
        color: var(--color-ink);
        letter-spacing: 0.12em;
        text-transform: uppercase;
        cursor: pointer;
        border-radius: 2px;
        transition: border-color 260ms, background 260ms;
      }
      .nav-index-btn:hover,
      .nav-index-btn:focus-visible {
        border-color: var(--color-ink);
        background: color-mix(in srgb, var(--color-ink) 4%, transparent);
      }
      .nav-index-lines {
        display: inline-flex;
        flex-direction: column;
        gap: 3px;
      }
      .nav-index-lines span {
        display: block;
        width: 14px;
        height: 1px;
        background: var(--color-ink);
      }
      .nav-index-lines span:last-child {
        width: 10px;
        align-self: flex-end;
      }

      .nav-close-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: transparent;
        border: none;
        cursor: pointer;
        font-family: var(--font-mono);
        font-size: var(--text-micro);
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: var(--color-ink);
        padding: 0.25rem 0;
      }
      .nav-close-glyph {
        font-family: var(--font-display);
        font-size: 1.3rem;
        line-height: 1;
        transform: translateY(-1px);
        transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1);
      }
      .nav-close-btn:hover .nav-close-glyph,
      .nav-close-btn:focus-visible .nav-close-glyph {
        transform: translateY(-1px) rotate(90deg);
      }

      .nav-mobile-link {
        display: flex;
        align-items: baseline;
        gap: 1.1rem;
        padding: 1.1rem 0;
        text-decoration: none;
        color: var(--color-ink);
        position: relative;
      }
      .nav-mobile-num {
        font-family: var(--font-mono);
        font-size: 0.75rem;
        color: var(--color-ink-mute);
        letter-spacing: 0.12em;
        min-width: 2.2rem;
      }
      .nav-mobile-label {
        font-family: var(--font-display);
        font-size: clamp(2.25rem, 10vw, 3.75rem);
        line-height: 1;
        letter-spacing: -0.02em;
        font-variation-settings: "opsz" 40, "SOFT" 40;
        text-transform: lowercase;
        flex: 1;
      }
      .nav-mobile-arrow {
        font-family: var(--font-display);
        font-size: 1.3rem;
        opacity: 0.35;
        transform: translateX(-6px);
        transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1), opacity 300ms;
      }
      .nav-mobile-link:hover .nav-mobile-arrow,
      .nav-mobile-link:focus-visible .nav-mobile-arrow {
        opacity: 1;
        transform: translateX(0);
      }

      @media (prefers-reduced-motion: reduce) {
        .nav-chapter::after,
        .nav-apply::before,
        .nav-apply-arrow,
        .nav-pin,
        .nav-close-glyph,
        .nav-mobile-arrow {
          transition: none !important;
        }
      }
    `}</style>
  )
}
