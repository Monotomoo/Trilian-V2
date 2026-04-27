import { motion } from 'framer-motion'
import SectionLabel from './SectionLabel'
import RevealHeading from './RevealHeading'
import { useContent } from '../hooks/useContent'

function NervousSystemDiagram() {
  // Spine — a continuous wavy vertical path through the diagram
  const spinePath =
    'M 240 30 C 270 100, 315 160, 295 230 C 275 310, 240 290, 230 370 C 220 450, 170 450, 180 540 C 190 620, 275 610, 260 680'

  // Nodes along the spine (positions match the pulse waypoints)
  const nodes: { x: number; y: number; r: number; accent?: boolean }[] = [
    { x: 240, y: 30, r: 2.4 },
    { x: 285, y: 120, r: 3.2 },
    { x: 305, y: 205, r: 3 },
    { x: 265, y: 290, r: 3.4 },
    { x: 215, y: 370, r: 3.2 },
    { x: 180, y: 455, r: 5.6, accent: true },
    { x: 230, y: 540, r: 3.4 },
    { x: 275, y: 615, r: 3 },
    { x: 255, y: 685, r: 2.6 },
  ]

  // Nerve branches radiating from nodes
  const branches = [
    // Top region — right side
    { from: { x: 285, y: 120 }, ctrl: { x: 355, y: 92 }, to: { x: 400, y: 75 }, len: 1 },
    { from: { x: 285, y: 120 }, ctrl: { x: 330, y: 148 }, to: { x: 380, y: 155 }, len: 0.75 },

    // Upper right peak
    { from: { x: 305, y: 205 }, ctrl: { x: 380, y: 190 }, to: { x: 450, y: 178 }, len: 1 },
    { from: { x: 305, y: 205 }, ctrl: { x: 350, y: 225 }, to: { x: 395, y: 232 }, len: 0.7 },

    // Mid-right coming in
    { from: { x: 265, y: 290 }, ctrl: { x: 330, y: 278 }, to: { x: 385, y: 268 }, len: 0.8 },
    { from: { x: 265, y: 290 }, ctrl: { x: 200, y: 285 }, to: { x: 135, y: 270 }, len: 0.9 },

    // Mid center
    { from: { x: 215, y: 370 }, ctrl: { x: 155, y: 358 }, to: { x: 85, y: 345 }, len: 1 },
    { from: { x: 215, y: 370 }, ctrl: { x: 280, y: 388 }, to: { x: 340, y: 400 }, len: 0.85 },

    // Accent node (180, 455) — the hub of the organism, many branches
    { from: { x: 180, y: 455 }, ctrl: { x: 110, y: 430 }, to: { x: 50, y: 415 }, len: 1 },
    { from: { x: 180, y: 455 }, ctrl: { x: 95, y: 460 }, to: { x: 20, y: 465 }, len: 1.1 },
    { from: { x: 180, y: 455 }, ctrl: { x: 115, y: 495 }, to: { x: 55, y: 515 }, len: 0.95 },
    { from: { x: 180, y: 455 }, ctrl: { x: 250, y: 430 }, to: { x: 310, y: 415 }, len: 0.85 },
    { from: { x: 180, y: 455 }, ctrl: { x: 255, y: 485 }, to: { x: 325, y: 500 }, len: 0.9 },
    { from: { x: 180, y: 455 }, ctrl: { x: 200, y: 430 }, to: { x: 230, y: 400 }, len: 0.55 },

    // Lower mid
    { from: { x: 230, y: 540 }, ctrl: { x: 300, y: 555 }, to: { x: 365, y: 565 }, len: 0.9 },

    // Bottom spread
    { from: { x: 275, y: 615 }, ctrl: { x: 355, y: 628 }, to: { x: 425, y: 638 }, len: 1 },
    { from: { x: 275, y: 615 }, ctrl: { x: 200, y: 605 }, to: { x: 125, y: 600 }, len: 0.9 },
    { from: { x: 255, y: 685 }, ctrl: { x: 190, y: 692 }, to: { x: 130, y: 695 }, len: 0.75 },
  ]

  // Waypoints for the traveling pulse (matches node positions)
  const pulseCx = nodes.map((n) => n.x)
  const pulseCy = nodes.map((n) => n.y)
  const pulseTimes = nodes.map((_, i) => i / (nodes.length - 1))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      style={{
        height: 'clamp(520px, 74vh, 740px)',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <motion.svg
        viewBox="0 0 480 720"
        aria-hidden
        preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block', height: '100%', width: 'auto', overflow: 'visible' }}
        animate={{ scale: [1, 1.022, 1] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Ambient moss glow behind the accent node */}
        <motion.circle
          cx={180}
          cy={455}
          r={120}
          fill="var(--color-moss)"
          opacity={0.04}
          animate={{ r: [120, 145, 120], opacity: [0.04, 0.09, 0.04] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Faint spine — draws in on scroll-in */}
        <motion.path
          d={spinePath}
          fill="none"
          stroke="var(--color-moss)"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity={0.3}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Spine subtle breath-opacity overlay */}
        <motion.path
          d={spinePath}
          fill="none"
          stroke="var(--color-moss)"
          strokeWidth="1.2"
          strokeLinecap="round"
          animate={{ opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Nerve branches */}
        {branches.map((b, i) => (
          <motion.path
            key={`br-${i}`}
            d={`M ${b.from.x} ${b.from.y} Q ${b.ctrl.x} ${b.ctrl.y} ${b.to.x} ${b.to.y}`}
            fill="none"
            stroke="var(--color-moss)"
            strokeWidth={0.8 * (b.len ?? 1)}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            animate={{ opacity: [0.1, 0.32, 0.1] }}
            transition={{
              pathLength: { duration: 1.5, delay: 0.8 + i * 0.08, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 5 + (i % 3) * 0.5, repeat: Infinity, delay: i * 0.25, ease: 'easeInOut' },
            }}
          />
        ))}

        {/* Branch terminal dots — firing dendrites */}
        {branches.map((b, i) => (
          <g key={`bt-${i}`}>
            <motion.circle
              cx={b.to.x}
              cy={b.to.y}
              r={1.6}
              fill="var(--color-moss)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.7, 0], scale: [1, 1.3, 1] }}
              style={{ transformOrigin: `${b.to.x}px ${b.to.y}px` }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.4 + 1,
                ease: 'easeInOut',
              }}
            />
            {/* Occasional firing flash */}
            <motion.circle
              cx={b.to.x}
              cy={b.to.y}
              r={3}
              fill="none"
              stroke="var(--color-moss)"
              strokeWidth="0.4"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.6, 0], r: [3, 10, 3] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 5 + (i % 5) * 1.5,
                delay: i * 0.9,
                ease: 'easeOut',
              }}
            />
          </g>
        ))}

        {/* Spine nodes */}
        {nodes.map((n, i) => (
          <motion.circle
            key={`n-${i}`}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill={n.accent ? 'var(--color-ochre)' : 'var(--color-moss)'}
            animate={{
              opacity: n.accent ? [0.75, 1, 0.75] : [0.5, 0.95, 0.5],
              scale: [1, 1.2, 1],
            }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            transition={{
              duration: n.accent ? 3.2 : 4,
              repeat: Infinity,
              delay: i * 0.22,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Accent node — two expanding halo rings on offset timing */}
        <motion.circle
          cx={180}
          cy={455}
          r={12}
          fill="none"
          stroke="var(--color-ochre)"
          strokeWidth="0.8"
          animate={{ r: [12, 26, 12], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeOut' }}
        />
        <motion.circle
          cx={180}
          cy={455}
          r={12}
          fill="none"
          stroke="var(--color-ochre)"
          strokeWidth="0.5"
          animate={{ r: [12, 38, 12], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeOut', delay: 1.2 }}
        />

        {/* Primary traveling pulse */}
        <motion.circle
          r={4.5}
          fill="var(--color-moss)"
          animate={{
            cx: pulseCx,
            cy: pulseCy,
            opacity: [0, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0.95, 0],
          }}
          transition={{
            duration: 7.5,
            repeat: Infinity,
            repeatDelay: 0.4,
            ease: 'linear',
            times: pulseTimes,
          }}
        />

        {/* Primary pulse halo */}
        <motion.circle
          r={12}
          fill="none"
          stroke="var(--color-moss)"
          strokeWidth="0.7"
          animate={{
            cx: pulseCx,
            cy: pulseCy,
            opacity: [0, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0],
            r: [12, 12, 12, 12, 12, 12, 12, 12, 18],
          }}
          transition={{
            duration: 7.5,
            repeat: Infinity,
            repeatDelay: 0.4,
            ease: 'linear',
            times: pulseTimes,
          }}
        />

        {/* Echo pulse — smaller, delayed */}
        <motion.circle
          r={2.8}
          fill="var(--color-ochre)"
          animate={{
            cx: pulseCx,
            cy: pulseCy,
            opacity: [0, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0],
          }}
          transition={{
            duration: 7.5,
            repeat: Infinity,
            repeatDelay: 0.4,
            delay: 3.2,
            ease: 'linear',
            times: pulseTimes,
          }}
        />
      </motion.svg>
    </motion.div>
  )
}

export default function Manifesto() {
  const t = useContent()

  return (
    <section
      id="manifesto"
      className="relative pt-10 md:pt-14 pb-24 md:pb-36 border-t"
      style={{
        background: 'var(--color-bone)',
        borderColor: 'var(--color-hairline)',
      }}
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 items-center">
          {/* Left — copy */}
          <div className="md:col-span-7 lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15% 0px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginBottom: '2.5rem' }}
            >
              <SectionLabel>{t.manifesto.eyebrow}</SectionLabel>
            </motion.div>

            <RevealHeading
              delay={0.1}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-headline)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                fontWeight: 400,
                color: 'var(--color-ink)',
                margin: '0 0 3rem 0',
                maxWidth: '18ch',
                fontVariationSettings: '"opsz" 48, "SOFT" 50, "WONK" 0',
              }}
            >
              {t.manifesto.headline}
            </RevealHeading>

            <div className="space-y-6">
              {t.manifesto.lines.map((line, i) => {
                const isEmphasis = line === t.manifesto.emphasis
                return (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10% 0px' }}
                    transition={{
                      duration: 0.7,
                      delay: 0.2 + i * 0.12,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                      fontFamily: isEmphasis ? 'var(--font-display)' : 'var(--font-ui)',
                      fontSize: isEmphasis
                        ? 'clamp(1.375rem, 2.2vw, 1.75rem)'
                        : 'clamp(1.0625rem, 1.3vw, 1.1875rem)',
                      lineHeight: isEmphasis ? 1.25 : 1.6,
                      color: isEmphasis ? 'var(--color-moss)' : 'var(--color-ink-soft)',
                      fontStyle: isEmphasis ? 'italic' : 'normal',
                      fontWeight: 400,
                      margin: 0,
                      maxWidth: '52ch',
                      fontVariationSettings: isEmphasis ? '"opsz" 24, "SOFT" 80' : undefined,
                    }}
                  >
                    {line}
                  </motion.p>
                )
              })}
            </div>
          </div>

          {/* Right — nervous-system diagram (desktop only — too tall to read on phones) */}
          <div className="hidden md:flex md:col-span-5 lg:col-span-6 justify-center md:justify-end">
            <NervousSystemDiagram />
          </div>
        </div>
      </div>
    </section>
  )
}
