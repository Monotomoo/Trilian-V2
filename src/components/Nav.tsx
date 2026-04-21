import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LangToggle from './LangToggle'
import { useContent } from '../hooks/useContent'

const NAV_META = [
  { num: '03', href: '#approach', key: 'approach' },
  { num: '05', href: '#services', key: 'services' },
  { num: '07', href: '#story', key: 'story' },
  { num: '09', href: '#principles', key: 'principles' },
  { num: '10', href: '#contact', key: 'contact' },
] as const

export default function Nav() {
  const t = useContent()
  const [scrolled, setScrolled] = useState(false)
  const [activeHref, setActiveHref] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = useMemo(
    () =>
      NAV_META.map((m) => ({
        ...m,
        label: t.nav[m.key as keyof typeof t.nav] as string,
      })),
    [t]
  )

  useEffect(() => {
    let raf = 0
    const compute = () => {
      raf = 0
      setScrolled(window.scrollY > 40)
      const trigger = window.scrollY + window.innerHeight * 0.3
      let current: string | null = null
      for (const item of NAV_META) {
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
            className="group flex items-baseline gap-2.5"
            style={{ textDecoration: 'none', color: 'var(--color-ink)' }}
          >
            <span
              aria-hidden
              className="nav-pin"
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--color-moss)',
                display: 'inline-block',
                alignSelf: 'center',
                transform: 'translateY(1px)',
                transition: 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1), background 300ms',
              }}
            />
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
            style={{ gap: '2rem' }}
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
                    <span className="nav-chapter-num">{item.num}</span>
                    <span className="nav-chapter-label">{item.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-underline"
                        className="nav-chapter-underline"
                        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                      />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Right cluster */}
          <div className="flex items-center gap-5 md:gap-7">
            <LangToggle />

            <a href="#contact" className="nav-apply hidden sm:inline-flex items-center">
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
}: {
  onClose: () => void
  items: { num: string; href: string; label: string }[]
  applyLabel: string
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
          href="#contact"
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
        align-items: baseline;
        gap: 0.45rem;
        padding: 0.3rem 0;
        text-decoration: none;
        color: var(--color-ink);
      }
      .nav-chapter-num {
        font-family: var(--font-mono);
        font-size: 0.6875rem;
        letter-spacing: 0.12em;
        color: var(--color-ink-mute);
        transition: color 300ms cubic-bezier(0.16, 1, 0.3, 1);
      }
      .nav-chapter-label {
        font-size: 0.9375rem;
        font-weight: 400;
        opacity: 0.78;
        transition: opacity 300ms cubic-bezier(0.16, 1, 0.3, 1);
      }
      .nav-chapter:hover .nav-chapter-label,
      .nav-chapter:focus-visible .nav-chapter-label,
      .nav-chapter[data-active] .nav-chapter-label {
        opacity: 1;
      }
      .nav-chapter[data-active] .nav-chapter-num {
        color: var(--color-ochre);
      }
      .nav-chapter-underline {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 1px;
        background: var(--color-moss);
        border-radius: 1px;
      }
      .nav-chapter::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 1px;
        background: color-mix(in srgb, var(--color-moss) 55%, transparent);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 420ms cubic-bezier(0.16, 1, 0.3, 1);
        pointer-events: none;
      }
      .nav-chapter:hover::after,
      .nav-chapter:focus-visible::after {
        transform: scaleX(1);
      }
      .nav-chapter[data-active]::after {
        transform: scaleX(0);
      }

      .nav-apply {
        position: relative;
        padding: 0.6rem 1.1rem;
        background: var(--color-ink);
        color: var(--color-bone);
        font-size: 0.875rem;
        font-weight: 500;
        text-decoration: none;
        border-radius: 2px;
        overflow: hidden;
        isolation: isolate;
        transition: padding 320ms cubic-bezier(0.16, 1, 0.3, 1);
      }
      .nav-apply::before {
        content: '';
        position: absolute;
        inset: 0;
        background: var(--color-moss);
        transform: translateY(101%);
        transition: transform 420ms cubic-bezier(0.16, 1, 0.3, 1);
        z-index: -1;
      }
      .nav-apply:hover::before,
      .nav-apply:focus-visible::before {
        transform: translateY(0);
      }
      .nav-apply:hover,
      .nav-apply:focus-visible {
        padding-right: 1.55rem;
      }
      .nav-apply-arrow {
        display: inline-block;
        max-width: 0;
        overflow: hidden;
        white-space: nowrap;
        transform: translateX(-6px);
        opacity: 0;
        transition: max-width 320ms cubic-bezier(0.16, 1, 0.3, 1),
          transform 320ms cubic-bezier(0.16, 1, 0.3, 1),
          opacity 240ms ease;
      }
      .nav-apply:hover .nav-apply-arrow,
      .nav-apply:focus-visible .nav-apply-arrow {
        max-width: 1.2em;
        margin-left: 0.45rem;
        transform: translateX(0);
        opacity: 1;
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
