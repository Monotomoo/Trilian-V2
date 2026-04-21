import { Link, useLocation } from 'react-router-dom'
import { useLang } from '../hooks/useContent'

export default function LangToggle() {
  const lang = useLang()
  const location = useLocation()

  // Preserve scroll position via sessionStorage key
  const handleClick = () => {
    sessionStorage.setItem('preserveScroll', String(window.scrollY))
  }

  const hrPath = location.pathname.startsWith('/hr') ? location.pathname : '/hr'
  const enPath = '/'

  return (
    <div
      className="inline-flex items-center gap-2 select-none"
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-micro)',
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
      }}
    >
      <Link
        to={enPath}
        onClick={handleClick}
        style={{
          color: lang === 'en' ? 'var(--color-ink)' : 'var(--color-ink-mute)',
          textDecoration: 'none',
          transition: 'color 200ms ease',
        }}
        aria-current={lang === 'en' ? 'page' : undefined}
      >
        EN
      </Link>
      <span style={{ color: 'var(--color-ink-mute)' }}>·</span>
      <Link
        to={hrPath}
        onClick={handleClick}
        style={{
          color: lang === 'hr' ? 'var(--color-ink)' : 'var(--color-ink-mute)',
          textDecoration: 'none',
          transition: 'color 200ms ease',
        }}
        aria-current={lang === 'hr' ? 'page' : undefined}
      >
        HR
      </Link>
    </div>
  )
}
