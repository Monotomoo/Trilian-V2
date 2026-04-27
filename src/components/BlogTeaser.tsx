import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import RevealOnScroll from './RevealOnScroll'
import { useContent, useLang } from '../hooks/useContent'

export default function BlogTeaser() {
  const t = useContent()
  const lang = useLang()
  const blogHref = lang === 'hr' ? '/hr/blog' : '/blog'

  // Show top 2 queued posts as a preview strip
  const preview = t.blog.upcomingPosts.slice(0, 2)

  return (
    <section
      aria-labelledby="blog-teaser-heading"
      className="relative py-28 md:py-40 border-t overflow-hidden"
      style={{
        background: 'var(--color-bone)',
        borderColor: 'var(--color-hairline)',
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 40% 50% at 85% 22%, color-mix(in srgb, var(--color-ochre) 8%, transparent) 0%, transparent 65%)',
        }}
      />
      <div aria-hidden className="absolute inset-0 pointer-events-none grain-overlay" />

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-12 md:gap-24 items-end">
          {/* Left — teaser headline */}
          <div>
            <RevealOnScroll>
              <div
                className="flex items-center gap-3 mb-8"
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
                    width: 24,
                    height: 1,
                    background: 'var(--color-moss)',
                    opacity: 0.6,
                  }}
                />
                <span>{t.blogTeaser.eyebrow}</span>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <h2
                id="blog-teaser-heading"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-headline)',
                  lineHeight: 1.02,
                  letterSpacing: '-0.025em',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: 'var(--color-ink)',
                  margin: '0 0 1.75rem 0',
                  maxWidth: '14ch',
                  fontVariationSettings: '"opsz" 96, "SOFT" 80, "WONK" 1',
                }}
              >
                {t.blogTeaser.headline}
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={0.18}>
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 'clamp(1rem, 1.3vw, 1.125rem)',
                  lineHeight: 1.65,
                  color: 'var(--color-ink-soft)',
                  margin: '0 0 2.5rem 0',
                  maxWidth: '44ch',
                }}
              >
                {t.blogTeaser.body}
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.26}>
              <Link to={blogHref} className="blog-teaser-cta">
                <span className="blog-teaser-cta-label">{t.blogTeaser.cta}</span>
                <span aria-hidden className="blog-teaser-cta-arrow">
                  ↗
                </span>
              </Link>
            </RevealOnScroll>
          </div>

          {/* Right — queued post preview */}
          <RevealOnScroll delay={0.22}>
            <div>
              <div
                className="flex items-center gap-2 mb-5"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-micro)',
                  color: 'var(--color-ink-mute)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                }}
              >
                <motion.span
                  aria-hidden
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: 'var(--color-ochre)',
                    display: 'inline-block',
                  }}
                  animate={{
                    boxShadow: [
                      '0 0 0 0 color-mix(in srgb, var(--color-ochre) 55%, transparent)',
                      '0 0 0 8px color-mix(in srgb, var(--color-ochre) 0%, transparent)',
                      '0 0 0 0 color-mix(in srgb, var(--color-ochre) 0%, transparent)',
                    ],
                  }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: [0.16, 1, 0.3, 1] }}
                />
                <span>{t.blogTeaser.previewLabel}</span>
              </div>

              <ul
                className="list-none m-0 p-0 border-t"
                style={{ borderColor: 'var(--color-hairline)' }}
              >
                {preview.map((post, i) => (
                  <li
                    key={i}
                    className="blog-teaser-item"
                    style={{ borderBottom: '1px solid var(--color-hairline)' }}
                  >
                    <Link to={blogHref} className="blog-teaser-item-link">
                      <div className="blog-teaser-item-meta">
                        <span className="blog-teaser-item-num">{post.num}</span>
                        <span className="blog-teaser-item-category">{post.category}</span>
                      </div>
                      <div className="blog-teaser-item-title">{post.title}</div>
                      <span aria-hidden className="blog-teaser-item-arrow">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnScroll>
        </div>

        {/* Pitch strip — call for guest contributors */}
        <RevealOnScroll delay={0.3}>
          <aside className="blog-pitch">
            <div className="blog-pitch-meta">
              <span className="blog-pitch-eyebrow">{t.blogTeaser.pitch.eyebrow}</span>
              <h3 className="blog-pitch-headline">{t.blogTeaser.pitch.headline}</h3>
            </div>
            <p className="blog-pitch-body">{t.blogTeaser.pitch.body}</p>
            <a href={t.blogTeaser.pitch.ctaHref} className="blog-pitch-cta">
              <span className="blog-pitch-cta-pulse" aria-hidden />
              <span>{t.blogTeaser.pitch.cta}</span>
              <span aria-hidden className="blog-pitch-cta-arrow">
                ↗
              </span>
            </a>
          </aside>
        </RevealOnScroll>
      </div>

      <style>{`
        .blog-teaser-cta {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.7rem;
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
        .blog-teaser-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--color-moss);
          transform: translateY(101%);
          transition: transform 420ms cubic-bezier(0.16, 1, 0.3, 1);
          z-index: -1;
        }
        .blog-teaser-cta:hover::before,
        .blog-teaser-cta:focus-visible::before {
          transform: translateY(0);
        }
        .blog-teaser-cta:hover,
        .blog-teaser-cta:focus-visible {
          padding-right: 2.15rem;
        }
        .blog-teaser-cta-arrow {
          display: inline-block;
          transition: transform 320ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .blog-teaser-cta:hover .blog-teaser-cta-arrow,
        .blog-teaser-cta:focus-visible .blog-teaser-cta-arrow {
          transform: translate(3px, -3px);
        }

        .blog-teaser-item {
          transition: background 320ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .blog-teaser-item:hover {
          background: color-mix(in srgb, var(--color-moss) 5%, transparent);
        }
        .blog-teaser-item-link {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 0.5rem 1.5rem;
          align-items: baseline;
          padding: 1.25rem 0.5rem;
          text-decoration: none;
          color: var(--color-ink);
          transition: padding 320ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .blog-teaser-item:hover .blog-teaser-item-link {
          padding-left: 0.85rem;
          padding-right: 0.85rem;
        }
        .blog-teaser-item-meta {
          grid-column: 1 / 3;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-mono);
          font-size: var(--text-micro);
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--color-ink-mute);
          margin-bottom: 0.35rem;
        }
        .blog-teaser-item-num {
          color: var(--color-moss);
          font-weight: 500;
        }
        .blog-teaser-item-category {
          color: var(--color-ink-mute);
        }
        .blog-teaser-item-title {
          font-family: var(--font-display);
          font-size: clamp(1rem, 1.3vw, 1.1875rem);
          line-height: 1.3;
          letter-spacing: -0.01em;
          font-weight: 400;
          color: var(--color-ink);
          max-width: 32ch;
          font-variation-settings: "opsz" 24, "SOFT" 50;
        }
        .blog-teaser-item-arrow {
          font-family: var(--font-mono);
          color: var(--color-ink-mute);
          transform: translateX(-4px);
          opacity: 0;
          transition: transform 320ms cubic-bezier(0.16, 1, 0.3, 1), opacity 280ms;
        }
        .blog-teaser-item:hover .blog-teaser-item-arrow {
          transform: translateX(0);
          opacity: 1;
          color: var(--color-ink);
        }

        /* Pitch strip — quiet invitation for guest contributors. */
        .blog-pitch {
          margin-top: 4.5rem;
          padding: 2.25rem 0 0;
          border-top: 1px solid var(--color-hairline);
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          align-items: end;
        }
        @media (min-width: 900px) {
          .blog-pitch {
            grid-template-columns: minmax(220px, 320px) minmax(0, 1fr) auto;
            gap: 2rem 3rem;
            margin-top: 5.5rem;
          }
        }
        .blog-pitch-meta {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .blog-pitch-eyebrow {
          font-family: var(--font-mono);
          font-size: var(--text-micro);
          color: var(--color-ochre);
          text-transform: uppercase;
          letter-spacing: 0.16em;
        }
        .blog-pitch-headline {
          font-family: var(--font-display);
          font-size: clamp(1.375rem, 2.2vw, 1.875rem);
          line-height: 1.15;
          letter-spacing: -0.018em;
          font-weight: 400;
          font-style: italic;
          color: var(--color-ink);
          margin: 0;
          max-width: 18ch;
          font-variation-settings: "opsz" 36, "SOFT" 80, "WONK" 1;
        }
        .blog-pitch-body {
          font-family: var(--font-ui);
          font-size: 0.9375rem;
          line-height: 1.6;
          color: var(--color-ink-soft);
          margin: 0;
          max-width: 52ch;
        }

        .blog-pitch-cta {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.85rem 1.45rem;
          background: transparent;
          color: var(--color-ink);
          font-family: var(--font-ui);
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.01em;
          text-decoration: none;
          border: 1px solid var(--color-ink);
          border-radius: 999px;
          overflow: hidden;
          isolation: isolate;
          white-space: nowrap;
          transition: color 280ms cubic-bezier(0.16, 1, 0.3, 1),
            border-color 280ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .blog-pitch-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--color-ink);
          transform: translateY(101%);
          transition: transform 420ms cubic-bezier(0.16, 1, 0.3, 1);
          z-index: -1;
        }
        .blog-pitch-cta:hover,
        .blog-pitch-cta:focus-visible {
          color: var(--color-bone);
        }
        .blog-pitch-cta:hover::before,
        .blog-pitch-cta:focus-visible::before {
          transform: translateY(0);
        }
        .blog-pitch-cta-pulse {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--color-ochre);
          flex-shrink: 0;
          box-shadow: 0 0 0 0 color-mix(in srgb, var(--color-ochre) 55%, transparent);
          animation: blog-pitch-cta-pulse 2.4s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
        @keyframes blog-pitch-cta-pulse {
          0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--color-ochre) 55%, transparent); }
          70% { box-shadow: 0 0 0 8px color-mix(in srgb, var(--color-ochre) 0%, transparent); }
          100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--color-ochre) 0%, transparent); }
        }
        .blog-pitch-cta-arrow {
          transition: transform 320ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .blog-pitch-cta:hover .blog-pitch-cta-arrow,
        .blog-pitch-cta:focus-visible .blog-pitch-cta-arrow {
          transform: translate(2px, -2px);
        }

        @media (prefers-reduced-motion: reduce) {
          .blog-pitch-cta-pulse {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}
