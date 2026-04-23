import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RevealOnScroll from './RevealOnScroll'
import SectionLabel from './SectionLabel'
import { useContent } from '../hooks/useContent'

export default function AboutSlider() {
  const t = useContent()
  const trackRef = useRef<HTMLDivElement | null>(null)
  const manualUntilRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)

  const slides = t.about.slides

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const slideEls = Array.from(track.querySelectorAll<HTMLElement>('[data-slide]'))
    if (!slideEls.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        // While the user just clicked a pagination control, trust the
        // optimistic state instead of whatever IntersectionObserver reports
        // mid-scroll or at the edges (last slide can't fully center).
        if (Date.now() < manualUntilRef.current) return
        let best: IntersectionObserverEntry | null = null
        for (const e of entries) {
          if (!e.isIntersecting) continue
          if (!best || e.intersectionRatio > best.intersectionRatio) best = e
        }
        if (best) {
          const idx = slideEls.indexOf(best.target as HTMLElement)
          if (idx !== -1) setActiveIndex(idx)
        }
      },
      { root: track, threshold: [0.4, 0.6, 0.8] }
    )
    slideEls.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [slides.length])

  const scrollToSlide = (i: number) => {
    const track = trackRef.current
    if (!track) return
    const slideEl = track.querySelectorAll<HTMLElement>('[data-slide]')[i]
    if (!slideEl) return
    // Optimistic: claim the active slide immediately, and lock the observer
    // out briefly — otherwise edge slides (last/first) that can't fully center
    // get overridden mid-scroll.
    setActiveIndex(i)
    manualUntilRef.current = Date.now() + 1400
    const targetLeft =
      slideEl.offsetLeft - (track.clientWidth - slideEl.clientWidth) / 2
    track.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' })
  }

  const handlePrev = () => scrollToSlide(Math.max(0, activeIndex - 1))
  const handleNext = () => scrollToSlide(Math.min(slides.length - 1, activeIndex + 1))

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      handlePrev()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      handleNext()
    }
  }

  const progress = slides.length > 1 ? activeIndex / (slides.length - 1) : 0
  const activeSlide = slides[activeIndex]

  return (
    <section
      aria-labelledby="about-slider-heading"
      className="relative py-24 md:py-36 border-t overflow-hidden"
      style={{
        background: 'var(--color-bone)',
        borderColor: 'var(--color-hairline)',
      }}
    >
      {/* Ambient wash behind the active slide */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 40%, color-mix(in srgb, var(--color-moss) 8%, transparent) 0%, transparent 70%)',
        }}
      />
      <div aria-hidden className="absolute inset-0 pointer-events-none grain-overlay" />

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-12 mb-12 md:mb-16">
        <RevealOnScroll>
          <SectionLabel>{t.about.eyebrow}</SectionLabel>
        </RevealOnScroll>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-8 md:gap-16 items-end">
          <h2
            id="about-slider-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-headline)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              fontWeight: 400,
              color: 'var(--color-ink)',
              margin: 0,
              maxWidth: '18ch',
              fontVariationSettings: '"opsz" 48, "SOFT" 50',
            }}
          >
            {t.about.headline}
          </h2>
          <RevealOnScroll delay={0.18}>
            <p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 'clamp(1rem, 1.2vw, 1.0625rem)',
                lineHeight: 1.65,
                color: 'var(--color-ink-soft)',
                margin: 0,
                maxWidth: '54ch',
              }}
            >
              {t.about.intro}
            </p>
          </RevealOnScroll>
        </div>
      </div>

      {/* Active-slide editorial header — GIANT number + title. The number
          dominates; it's the visual anchor of the slider. */}
      <div className="relative mx-auto max-w-[1440px] px-6 md:px-12 mb-10 md:mb-14">
        <div className="about-active-line">
          <div className="about-active-numwrap">
            <AnimatePresence mode="wait">
              <motion.span
                key={activeIndex}
                className="about-active-num-giant"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                aria-hidden
              >
                {String(activeIndex + 1).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
            <span className="about-active-num-total" aria-hidden>
              <span className="about-active-num-sep">/</span>
              {String(slides.length).padStart(2, '0')}
            </span>
          </div>

          <div className="about-active-meta">
            <span aria-hidden className="about-active-rule" />
            <AnimatePresence mode="wait">
              <motion.span
                key={activeIndex}
                className="about-active-title"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {activeSlide.title}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        onKeyDown={handleKey}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label={t.about.headline}
        className="about-slider-track"
      >
        {slides.map((slide, i) => {
          const isActive = i === activeIndex
          return (
            <article
              key={i}
              data-slide
              aria-label={`${t.about.labels.progress} ${i + 1} / ${slides.length} — ${slide.title}`}
              className="about-slide"
              data-active={isActive ? 'true' : undefined}
            >
              <div className="about-slide-inner">
                {/* Photo */}
                <div className="about-slide-photo">
                  {slide.photo ? (
                    <motion.img
                      src={slide.photo}
                      alt={slide.photoAlt}
                      loading={i < 2 ? 'eager' : 'lazy'}
                      animate={{
                        scale: isActive ? 1.04 : 1.0,
                        opacity: isActive ? 1 : 0.6,
                      }}
                      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  ) : (
                    <div className="about-slide-placeholder">
                      <span>{t.about.labels.missingPhoto}</span>
                    </div>
                  )}
                  <span className="about-slide-num" aria-hidden>
                    {slide.num}
                  </span>
                  {/* Corner accent ochre dot */}
                  <span className="about-slide-corner-dot" aria-hidden />
                  {/* Active ring overlay */}
                  <motion.span
                    aria-hidden
                    className="about-slide-active-ring"
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.6 }}
                  />
                </div>

                {/* Copy */}
                <div className="about-slide-copy">
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-micro)',
                      color: 'var(--color-moss)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.14em',
                      marginBottom: '1rem',
                      display: 'block',
                    }}
                  >
                    {slide.num} · {t.about.labels.progress}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.5rem, 2.4vw, 2.125rem)',
                      lineHeight: 1.15,
                      letterSpacing: '-0.015em',
                      fontWeight: 400,
                      color: 'var(--color-ink)',
                      margin: '0 0 1.25rem 0',
                      maxWidth: '22ch',
                      fontVariationSettings: '"opsz" 36, "SOFT" 50',
                    }}
                  >
                    {slide.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '1rem',
                      lineHeight: 1.65,
                      color: 'var(--color-ink-soft)',
                      margin: 0,
                      maxWidth: '48ch',
                    }}
                  >
                    {slide.body}
                  </p>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {/* Controls + progress rail */}
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 mt-10">
        {/* Progress rail */}
        <div className="about-progress-rail">
          <motion.div
            className="about-progress-fill"
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        <div className="mt-6 flex items-center justify-between gap-6 flex-wrap">
          {/* Pagination dots */}
          <div
            className="flex items-center gap-1.5 flex-wrap"
            role="tablist"
            aria-label={t.about.labels.progress}
          >
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`${t.about.labels.progress} ${i + 1}`}
                onClick={() => scrollToSlide(i)}
                className="about-dot"
                data-active={i === activeIndex ? 'true' : undefined}
              >
                <span className="about-dot-num">{String(i + 1).padStart(2, '0')}</span>
              </button>
            ))}
          </div>

          {/* Prev/Next arrows */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="about-arrow"
              onClick={handlePrev}
              aria-label={t.about.labels.prev}
              disabled={activeIndex === 0}
            >
              <span aria-hidden>←</span>
            </button>
            <button
              type="button"
              className="about-arrow"
              onClick={handleNext}
              aria-label={t.about.labels.next}
              disabled={activeIndex === slides.length - 1}
            >
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .about-active-line {
          display: grid;
          grid-template-columns: auto 1fr;
          align-items: end;
          gap: clamp(1.25rem, 3vw, 2.5rem);
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--color-hairline);
        }
        .about-active-numwrap {
          display: flex;
          align-items: baseline;
          gap: 0.4rem;
          line-height: 1;
          position: relative;
        }
        .about-active-num-giant {
          font-family: var(--font-display);
          font-size: clamp(4.5rem, 12vw, 10rem);
          line-height: 0.9;
          font-weight: 400;
          color: var(--color-ink);
          letter-spacing: -0.045em;
          font-variation-settings: "opsz" 144, "SOFT" 50, "WONK" 1;
          display: inline-block;
          font-feature-settings: "tnum" 1;
        }
        .about-active-num-total {
          font-family: var(--font-mono);
          font-size: clamp(0.8rem, 1.1vw, 1rem);
          letter-spacing: 0.16em;
          color: var(--color-ink-mute);
          text-transform: uppercase;
          white-space: nowrap;
          align-self: flex-end;
          padding-bottom: 0.75rem;
        }
        .about-active-num-sep {
          margin-right: 0.35rem;
          color: var(--color-ink-mute);
          opacity: 0.6;
        }
        .about-active-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-bottom: 1.15rem;
          min-width: 0;
        }
        .about-active-rule {
          flex: 0 0 clamp(28px, 5vw, 72px);
          height: 1px;
          background: var(--color-moss);
          opacity: 0.55;
        }
        .about-active-title {
          font-family: var(--font-display);
          font-size: clamp(1.125rem, 1.8vw, 1.625rem);
          color: var(--color-ink);
          font-weight: 400;
          font-style: italic;
          letter-spacing: -0.005em;
          font-variation-settings: "opsz" 32, "SOFT" 80, "WONK" 1;
          display: inline-block;
          line-height: 1.2;
        }

        .about-slider-track {
          display: flex;
          flex-direction: row;
          overflow-x: auto;
          overflow-y: hidden;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          scrollbar-width: none;
          -ms-overflow-style: none;
          outline: none;
          /* Padding lets the first AND last slides fully center — the slider
             reserves half a viewport minus half a slide as bookend padding. */
          padding-inline: max(6vw, calc(50% - min(44vw, 490px)));
          gap: 2.5rem;
        }
        .about-slider-track::-webkit-scrollbar { display: none; }
        .about-slider-track:focus-visible {
          outline: 2px solid var(--color-moss);
          outline-offset: 4px;
        }

        .about-slide {
          flex: 0 0 min(88vw, 980px);
          scroll-snap-align: center;
          scroll-snap-stop: always;
          transition: opacity 700ms cubic-bezier(0.16, 1, 0.3, 1);
          opacity: 0.85;
        }
        .about-slide[data-active] {
          opacity: 1;
        }
        .about-slide-inner {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          align-items: stretch;
        }
        @media (min-width: 900px) {
          .about-slide-inner {
            grid-template-columns: 1.05fr 1fr;
            gap: 4rem;
          }
        }
        .about-slide-photo {
          position: relative;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          border-radius: 2px;
          background: color-mix(in srgb, var(--color-moss) 10%, var(--color-bone-warm));
        }
        .about-slide-placeholder {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          text-align: center;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--color-ink-mute);
          text-transform: uppercase;
          letter-spacing: 0.14em;
          line-height: 1.6;
          background: repeating-linear-gradient(
            45deg,
            color-mix(in srgb, var(--color-moss) 6%, transparent),
            color-mix(in srgb, var(--color-moss) 6%, transparent) 12px,
            transparent 12px,
            transparent 24px
          );
          border: 1px dashed color-mix(in srgb, var(--color-moss) 35%, transparent);
        }
        .about-slide-num {
          position: absolute;
          top: 1rem;
          left: 1rem;
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--color-bone);
          text-transform: uppercase;
          letter-spacing: 0.18em;
          padding: 0.35rem 0.6rem;
          background: color-mix(in srgb, var(--color-ink) 65%, transparent);
          border-radius: 2px;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          z-index: 2;
        }
        .about-slide-corner-dot {
          position: absolute;
          top: 1.1rem;
          right: 1.1rem;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--color-ochre);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-bone) 85%, transparent);
          z-index: 2;
        }
        .about-slide-active-ring {
          position: absolute;
          inset: 0;
          pointer-events: none;
          border: 1px solid color-mix(in srgb, var(--color-moss) 55%, transparent);
          border-radius: 2px;
        }
        .about-slide-copy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-right: 1rem;
        }

        .about-progress-rail {
          position: relative;
          width: 100%;
          height: 1px;
          background: var(--color-hairline);
          overflow: hidden;
        }
        .about-progress-fill {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: var(--color-moss);
        }

        .about-dot {
          background: transparent;
          border: 1px solid var(--color-hairline);
          border-radius: 2px;
          padding: 0.45rem 0.7rem;
          cursor: pointer;
          transition: border-color 260ms, background 260ms, color 260ms, transform 260ms;
        }
        .about-dot:hover,
        .about-dot:focus-visible {
          border-color: var(--color-moss);
          outline: none;
        }
        .about-dot[data-active] {
          border-color: var(--color-moss);
          background: color-mix(in srgb, var(--color-moss) 12%, transparent);
          transform: translateY(-1px);
        }
        .about-dot-num {
          font-family: var(--font-mono);
          font-size: 0.6875rem;
          color: var(--color-ink-mute);
          letter-spacing: 0.12em;
        }
        .about-dot[data-active] .about-dot-num {
          color: var(--color-moss);
          font-weight: 500;
        }

        .about-arrow {
          background: transparent;
          border: 1px solid var(--color-hairline);
          border-radius: 2px;
          padding: 0.55rem 0.85rem;
          cursor: pointer;
          color: var(--color-ink);
          font-family: var(--font-mono);
          font-size: 0.875rem;
          transition: border-color 260ms, background 260ms, opacity 260ms;
        }
        .about-arrow:hover,
        .about-arrow:focus-visible {
          border-color: var(--color-ink);
          background: color-mix(in srgb, var(--color-ink) 4%, transparent);
        }
        .about-arrow:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
      `}</style>
    </section>
  )
}
