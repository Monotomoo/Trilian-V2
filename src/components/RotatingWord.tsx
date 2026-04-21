import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

type Props = {
  words: readonly string[]
  interval?: number
  startDelay?: number
  className?: string
}

export default function RotatingWord({ words, interval = 2800, startDelay = 0, className }: Props) {
  const [i, setI] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const kick = window.setTimeout(() => setStarted(true), startDelay * 1000)
    return () => window.clearTimeout(kick)
  }, [startDelay])

  useEffect(() => {
    if (!started) return
    const t = window.setInterval(() => setI((x) => (x + 1) % words.length), interval)
    return () => window.clearInterval(t)
  }, [started, words.length, interval])

  // Compute the widest word for min-width stability (avoids layout jitter)
  const widest = words.reduce((a, b) => (b.length > a.length ? b : a), '')

  return (
    <span className={className} style={{ position: 'relative', display: 'inline-block', verticalAlign: 'baseline' }}>
      {/* Invisible sizer — reserves max width so rotating words don't jitter layout */}
      <span
        aria-hidden
        style={{
          visibility: 'hidden',
          display: 'inline-block',
          fontStyle: 'italic',
        }}
      >
        {widest}
      </span>

      <span
        style={{
          position: 'absolute',
          inset: 0,
          display: 'inline-flex',
          alignItems: 'baseline',
          justifyContent: 'flex-start',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={words[i]}
            initial={{ opacity: 0, y: '0.35em' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-0.35em' }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'inline-block',
              position: 'relative',
              fontStyle: 'italic',
              color: 'var(--color-moss-deep)',
              fontVariationSettings: '"opsz" 96, "SOFT" 80, "WONK" 1',
            }}
          >
            {words[i]}
            <motion.span
              aria-hidden
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1, originX: 0 }}
              exit={{ scaleX: 0, originX: 1 }}
              transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: '0.08em',
                height: '0.08em',
                background: 'var(--color-ochre)',
                borderRadius: '1px',
              }}
            />
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  )
}
