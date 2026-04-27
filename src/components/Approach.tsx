import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import RevealOnScroll from './RevealOnScroll'
import SectionLabel from './SectionLabel'
import { useContent } from '../hooks/useContent'

// Each pillar's signature color — three distinct earthy tones, one per ring.
// Cool / green / warm-brown spread so every petal reads as its own pillar.
const PILLAR_COLORS = [
  '#3A4C5E', // 01 Corporate tools — slate blue-grey (cool, structural)
  '#5B7A5A', // 02 Coaching — moss (growth, present-future)
  '#8E5236', // 03 Body work + care — clay/umber (body, plants, grounded)
] as const

// Classic three-circle Venn (triangle pointing up). viewBox 0 0 800 800,
// stage center (400, 400). d = 130, r = 240. Distance between adjacent
// circle centers = d√3 ≈ 225, overlap = 2r − d√3 ≈ 255. The 3-way central
// overlap has radius (r − d) = 110 viewBox units — the Trillian mark fits.
const SVG_CIRCLES = [
  { cx: 400, cy: 270 }, // top
  { cx: 513, cy: 465 }, // bottom-right (cos30°·d ≈ 113, sin30°·d = 65)
  { cx: 287, cy: 465 }, // bottom-left
] as const
const CIRCLE_R = 240
const STAGE_C = { x: 400, y: 400 }

// Pure-lobe center for each circle — where the click-reveal tag lands. Each
// position sits in the OUTER part of its circle, away from the 3-way overlap.
const LOBE_TEXT = [
  { x: 400, y: 165 }, // top — above center of top circle
  { x: 615, y: 545 }, // bottom-right — outer corner of BR circle
  { x: 185, y: 545 }, // bottom-left — outer corner of BL circle
] as const

export default function Approach() {
  const t = useContent()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const setActive = (i: number) => {
    // Always set (don't toggle). Clicking the same circle restarts the
    // 3-second auto-collapse timer — effect below handles cleanup.
    setActiveIndex(i)
  }

  // Auto-collapse: 3 seconds after a circle becomes active, release it.
  useEffect(() => {
    if (activeIndex === null) return
    const timer = setTimeout(() => setActiveIndex(null), 3000)
    return () => clearTimeout(timer)
  }, [activeIndex])

  return (
    <section
      id="approach"
      className="approach-section"
      style={{
        background: 'var(--color-bone-warm)',
        borderColor: 'var(--color-hairline)',
      }}
    >
      {/* Ambient moss wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at 50% 50%, color-mix(in srgb, var(--color-moss) 7%, transparent) 0%, transparent 70%)',
        }}
      />
      <div aria-hidden className="absolute inset-0 pointer-events-none grain-overlay" />

      <div className="relative mx-auto max-w-[1440px] w-full h-full px-6 md:px-12 py-10 md:py-14 flex flex-col">
        {/* Header row */}
        <div className="approach-header">
          <RevealOnScroll>
            <SectionLabel>{t.approach.eyebrow}</SectionLabel>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h2 className="approach-headline">{t.approach.headline}</h2>
          </RevealOnScroll>
        </div>

        {/* Stage: Venn (left) + pillar stack (right) */}
        <div className="approach-stage">
          {/* Venn diagram */}
          <div className="approach-venn">
            <svg
              viewBox="0 0 800 800"
              preserveAspectRatio="xMidYMid meet"
              className="approach-venn-svg"
            >
              <defs>
                {t.approach.pillars.map((_, i) => (
                  <radialGradient
                    key={`fill-${i}`}
                    id={`approach-fill-${i}`}
                    cx="50%"
                    cy="50%"
                    r="50%"
                  >
                    <stop offset="0%" style={{ stopColor: PILLAR_COLORS[i], stopOpacity: 0.36 }} />
                    <stop offset="55%" style={{ stopColor: PILLAR_COLORS[i], stopOpacity: 0.18 }} />
                    <stop offset="100%" style={{ stopColor: PILLAR_COLORS[i], stopOpacity: 0 }} />
                  </radialGradient>
                ))}
                {t.approach.pillars.map((_, i) => (
                  <linearGradient
                    key={`stroke-${i}`}
                    id={`approach-stroke-${i}`}
                    x1="50%"
                    y1="0%"
                    x2="50%"
                    y2="100%"
                  >
                    <stop offset="0%" style={{ stopColor: PILLAR_COLORS[i], stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: PILLAR_COLORS[i], stopOpacity: 0.82 }} />
                    <stop offset="100%" style={{ stopColor: PILLAR_COLORS[i], stopOpacity: 0.5 }} />
                  </linearGradient>
                ))}
                {/* Glow filter — active circle gets a soft outer bloom */}
                <filter id="approach-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Subtle fills (multiply blend gives soft color bleed in
                  overlaps). Each one breathes at a different phase — the
                  organic pulse that made you want "cool effect" without the
                  blinking problem. */}
              <g style={{ mixBlendMode: 'multiply' }}>
                {SVG_CIRCLES.map((c, i) => (
                  <motion.circle
                    key={`fill-${i}`}
                    cx={c.cx}
                    cy={c.cy}
                    r={CIRCLE_R}
                    fill={`url(#approach-fill-${i})`}
                    style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                    animate={{
                      opacity:
                        activeIndex === null ? 1 : activeIndex === i ? 1 : 0.28,
                      scale: activeIndex === i ? 1.04 : [1, 1.018, 1],
                    }}
                    transition={{
                      opacity: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                      scale:
                        activeIndex === i
                          ? { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
                          : {
                              duration: 12 + i * 1.2,
                              repeat: Infinity,
                              ease: 'easeInOut',
                              delay: i * 1.1,
                            },
                    }}
                  />
                ))}
              </g>

              {/* Outline rings — the hero of the diagram. Clickable. */}
              <g fill="transparent" strokeLinecap="round">
                {SVG_CIRCLES.map((c, i) => (
                  <motion.circle
                    key={`stroke-${i}`}
                    cx={c.cx}
                    cy={c.cy}
                    r={CIRCLE_R}
                    stroke={`url(#approach-stroke-${i})`}
                    strokeWidth={activeIndex === i ? 3.2 : 1.8}
                    filter={activeIndex === i ? 'url(#approach-glow)' : undefined}
                    onClick={() => setActive(i)}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActive(i)}
                    tabIndex={0}
                    role="button"
                    aria-label={t.approach.pillars[i].tag}
                    aria-pressed={activeIndex === i}
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    animate={{
                      opacity: activeIndex === null ? 1 : activeIndex === i ? 1 : 0.35,
                    }}
                    transition={{
                      pathLength: { duration: 1.6, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 0.45 },
                      strokeWidth: { duration: 0.25 },
                    }}
                    className="approach-ring"
                  />
                ))}
              </g>

              {/* Anchor rings — a small concentric dashed ring + a solid dot
                  at each circle's geometric center. The dashed ring rotates
                  slowly; the dot is the "compass pin" of that pillar. Adds
                  detail without noise. */}
              {SVG_CIRCLES.map((c, i) => (
                <g key={`anchor-${i}`}>
                  <circle
                    cx={c.cx}
                    cy={c.cy}
                    r="14"
                    fill="none"
                    stroke={PILLAR_COLORS[i]}
                    strokeWidth="0.6"
                    strokeDasharray="2 3.5"
                    opacity={activeIndex === null ? 0.55 : activeIndex === i ? 0.9 : 0.2}
                    style={{ transition: 'opacity 400ms cubic-bezier(0.16, 1, 0.3, 1)' }}
                  >
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from={`0 ${c.cx} ${c.cy}`}
                      to={`360 ${c.cx} ${c.cy}`}
                      dur={`${45 + i * 5}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle
                    cx={c.cx}
                    cy={c.cy}
                    r="3"
                    fill={PILLAR_COLORS[i]}
                    opacity={activeIndex === null ? 0.85 : activeIndex === i ? 1 : 0.25}
                    style={{ transition: 'opacity 400ms cubic-bezier(0.16, 1, 0.3, 1)' }}
                  />
                </g>
              ))}

              {/* Orbiting dots — one traveling the perimeter of each circle.
                  Lives even when the page is still, so the diagram feels
                  alive without blinking. Each dot ~12s loop, offset phase so
                  they never align. */}
              {SVG_CIRCLES.map((c, i) => {
                const orbitPath = `M ${c.cx} ${c.cy - CIRCLE_R} a ${CIRCLE_R} ${CIRCLE_R} 0 1 1 0 ${CIRCLE_R * 2} a ${CIRCLE_R} ${CIRCLE_R} 0 1 1 0 ${-CIRCLE_R * 2}`
                return (
                  <g key={`orbit-${i}`}>
                    <circle
                      r={activeIndex === i ? 5.5 : 3.5}
                      fill={PILLAR_COLORS[i]}
                      style={{
                        transition: 'r 320ms cubic-bezier(0.16, 1, 0.3, 1)',
                        opacity: activeIndex === null ? 0.9 : activeIndex === i ? 1 : 0.3,
                      }}
                    >
                      <animateMotion
                        dur={`${10 + i * 1.5}s`}
                        repeatCount="indefinite"
                        path={orbitPath}
                        rotate="auto"
                        keyPoints="0;1"
                        keyTimes="0;1"
                        begin={`${i * 0.7}s`}
                      />
                    </circle>
                  </g>
                )
              })}

              {/* Click-reveal labels — each pillar's tag appears inside its
                  own pure lobe when that circle (or its corner card) is
                  active. Replaces the hover-reveal that didn't land. */}
              {t.approach.pillars.map((pillar, i) => (
                <motion.g
                  key={`label-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: activeIndex === i ? 1 : 0,
                    y: activeIndex === i ? 0 : 6,
                  }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  style={{ pointerEvents: 'none' }}
                >
                  <text
                    x={LOBE_TEXT[i].x}
                    y={LOBE_TEXT[i].y - 8}
                    textAnchor="middle"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      letterSpacing: '2px',
                      fill: PILLAR_COLORS[i],
                      textTransform: 'uppercase',
                      opacity: 0.85,
                    }}
                  >
                    {pillar.label}
                  </text>
                  <text
                    x={LOBE_TEXT[i].x}
                    y={LOBE_TEXT[i].y + 14}
                    textAnchor="middle"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 20,
                      fill: PILLAR_COLORS[i],
                      fontStyle: 'italic',
                      letterSpacing: '-0.5px',
                      fontVariationSettings: '"opsz" 24, "SOFT" 50, "WONK" 1',
                    }}
                  >
                    {pillar.tag}
                  </text>
                </motion.g>
              ))}

              {/* Crosshair ticks around the exact center — tiny decorative
                  detail that reinforces "the center is the point". */}
              <g stroke="var(--color-moss)" strokeWidth="0.7" opacity="0.45">
                <line x1="400" y1="310" x2="400" y2="320" />
                <line x1="400" y1="480" x2="400" y2="490" />
                <line x1="310" y1="400" x2="320" y2="400" />
                <line x1="480" y1="400" x2="490" y2="400" />
              </g>

              {/* Trillian wordmark — SVG text directly at the exact overlap
                  center, no background box. tspan for ochre dot. */}
              <motion.text
                x={STAGE_C.x}
                y={STAGE_C.y + 14}
                textAnchor="middle"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 1.1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 56,
                  letterSpacing: '-1.8px',
                  fontWeight: 400,
                  fontVariationSettings: '"opsz" 56, "SOFT" 50, "WONK" 1',
                }}
              >
                <tspan style={{ fill: 'var(--color-ink)' }}>{t.meta.wordmark}</tspan>
                <tspan
                  style={{
                    fill: 'var(--color-ochre)',
                    fontStyle: 'italic',
                    fontVariationSettings: '"opsz" 56, "SOFT" 80, "WONK" 1',
                  }}
                >
                  .
                </tspan>
              </motion.text>

              {/* Tiny rule under wordmark — "one operator" hint */}
              <motion.g
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                <line
                  x1="376"
                  y1="428"
                  x2="424"
                  y2="428"
                  stroke="var(--color-moss)"
                  strokeWidth="0.7"
                  opacity="0.55"
                />
                <text
                  x={STAGE_C.x}
                  y={446}
                  textAnchor="middle"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 9.5,
                    letterSpacing: '2px',
                    fill: 'var(--color-ink-mute)',
                    textTransform: 'uppercase',
                  }}
                >
                  one operator
                </text>
              </motion.g>
            </svg>
          </div>

          {/* Pillar stack — all 3 in the right column. Hover/click syncs
              with the matching Venn circle on the left. */}
          <div className="approach-pillars-column">
            <RevealOnScroll>
              <p className="approach-unifier-top">{t.approach.unifier}</p>
            </RevealOnScroll>
            {t.approach.pillars.map((pillar, i) => {
              const isActive = activeIndex === i
              return (
                <RevealOnScroll key={i} delay={0.2 + i * 0.06}>
                  <article
                    className="approach-pillar"
                    data-active={isActive ? 'true' : undefined}
                    onClick={() => setActive(i)}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setActive(i)}
                    tabIndex={0}
                    role="button"
                    aria-pressed={isActive}
                    aria-label={`${pillar.label} ${pillar.tag}`}
                  >
                    <div className="approach-pillar-head">
                      <span
                        className="approach-pillar-num"
                        style={{ color: PILLAR_COLORS[i] }}
                      >
                        {pillar.label}
                      </span>
                      <span
                        className="approach-pillar-rule"
                        style={{ background: PILLAR_COLORS[i], opacity: 0.55 }}
                        aria-hidden
                      />
                      <span className="approach-pillar-tag">{pillar.tag}</span>
                    </div>

                    <h3 className="approach-pillar-title">{pillar.title}</h3>

                    <p className="approach-pillar-body">{pillar.body}</p>
                  </article>
                </RevealOnScroll>
              )
            })}
          </div>
        </div>

      </div>

      <style>{`
        .approach-section {
          position: relative;
          min-height: 100vh;
          /* overflow-x: clip prevents horizontal overflow (the bg washes are
             absolute-positioned) without trapping vertical content — earlier
             `overflow: hidden` was clipping pillar 03 on shorter viewports. */
          overflow-x: clip;
          border-top: 1px solid var(--color-hairline);
          border-bottom: 1px solid var(--color-hairline);
          display: flex;
          flex-direction: column;
        }

        .approach-header {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          max-width: 42ch;
          margin-bottom: 1rem;
        }
        .approach-headline {
          font-family: var(--font-display);
          font-size: clamp(1.75rem, 3.4vw, 3rem);
          line-height: 1.05;
          letter-spacing: -0.025em;
          font-weight: 400;
          color: var(--color-ink);
          margin: 0;
          font-variation-settings: "opsz" 48, "SOFT" 50, "WONK" 1;
          max-width: 16ch;
        }

        .approach-stage {
          flex: 1;
          min-height: 0;
          display: grid;
          /* Side by side: Venn left, pillar stack right.
             minmax(0, 1fr) on the right column lets it shrink below
             content-width so the section never overflows horizontally. */
          grid-template-columns: minmax(320px, 1.05fr) minmax(0, 1fr);
          gap: 2.5rem 3rem;
          align-items: center;
        }
        @media (min-width: 1200px) {
          .approach-stage {
            gap: 3rem 4.5rem;
          }
        }
        @media (max-width: 900px) {
          .approach-stage {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            align-items: start;
          }
        }

        .approach-unifier-top {
          font-family: var(--font-display);
          font-size: clamp(1.125rem, 1.7vw, 1.5rem);
          line-height: 1.3;
          font-weight: 400;
          font-style: italic;
          color: var(--color-moss);
          margin: 0 0 0.5rem 0;
          padding: 0 1.25rem;
          max-width: 36ch;
          text-align: left;
          font-variation-settings: "opsz" 24, "SOFT" 80, "WONK" 1;
        }
        .approach-unifier-top::before {
          content: '';
          display: block;
          width: 32px;
          height: 1px;
          background: var(--color-moss);
          opacity: 0.55;
          margin: 0 0 0.75rem;
        }

        .approach-pillars-column {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          max-width: 38rem;
          min-width: 0;
          width: 100%;
        }
        @media (min-width: 1200px) {
          .approach-pillars-column { gap: 2rem; }
        }
        .approach-pillar {
          min-width: 0;
        }
        .approach-pillar-body {
          /* belt-and-braces: prevent very long words from extending the column */
          overflow-wrap: anywhere;
          word-break: normal;
        }

        .approach-venn {
          position: relative;
          align-self: center;
          justify-self: center;
          width: 100%;
          max-width: 560px;
          aspect-ratio: 1 / 1;
          display: grid;
          place-items: center;
        }
        .approach-venn-svg {
          width: 100%;
          height: 100%;
          display: block;
          overflow: visible;
        }
        .approach-ring {
          cursor: pointer;
          transition: opacity 450ms cubic-bezier(0.16, 1, 0.3, 1),
            stroke-width 250ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .approach-ring:hover,
        .approach-ring:focus-visible {
          stroke-width: 2.5;
          outline: none;
        }

        .approach-pillar {
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
          outline: none;
          padding: 1.1rem 1.25rem;
          cursor: pointer;
          transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1),
            opacity 400ms cubic-bezier(0.16, 1, 0.3, 1),
            background 400ms cubic-bezier(0.16, 1, 0.3, 1),
            border-color 400ms cubic-bezier(0.16, 1, 0.3, 1);
          background: transparent;
          border: 1px solid transparent;
          border-left: 1px solid var(--color-hairline);
          border-radius: 2px;
        }
        .approach-pillar:hover,
        .approach-pillar:focus-visible {
          transform: translateX(2px);
          background: color-mix(in srgb, var(--color-bone) 50%, transparent);
          border-left-color: var(--color-moss);
        }
        .approach-pillar[data-active] {
          transform: translateX(2px);
          background: color-mix(in srgb, var(--color-moss) 5%, transparent);
          border-left-color: var(--color-moss);
        }
        .approach-pillar-head {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-family: var(--font-mono);
          font-size: var(--text-micro);
          text-transform: uppercase;
          letter-spacing: 0.14em;
        }
        .approach-pillar-num {
          font-weight: 500;
        }
        .approach-pillar-rule {
          width: 22px;
          height: 1px;
          display: inline-block;
          transition: width 400ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .approach-pillar[data-active] .approach-pillar-rule,
        .approach-pillar:hover .approach-pillar-rule {
          width: 36px;
        }
        .approach-pillar-tag {
          color: var(--color-ink-mute);
          transition: color 320ms;
        }
        .approach-pillar[data-active] .approach-pillar-tag {
          color: var(--color-ink);
        }
        .approach-pillar-title {
          font-family: var(--font-display);
          font-size: clamp(1.25rem, 1.7vw, 1.5rem);
          line-height: 1.2;
          letter-spacing: -0.015em;
          font-weight: 400;
          color: var(--color-ink);
          margin: 0;
          max-width: 26ch;
          font-variation-settings: "opsz" 24, "SOFT" 50;
        }
        .approach-pillar-body {
          font-family: var(--font-ui);
          font-size: 0.9375rem;
          line-height: 1.6;
          color: var(--color-ink-soft);
          margin: 0;
          max-width: 52ch;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 320ms;
        }
        .approach-pillar[data-active] .approach-pillar-body {
          color: var(--color-ink);
        }
        @media (max-width: 900px) {
          .approach-pillar-body {
            -webkit-line-clamp: unset;
          }
        }

      `}</style>
    </section>
  )
}
