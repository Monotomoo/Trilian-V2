import { motion } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'

type HeadingTag = 'h1' | 'h2' | 'h3'

type Props = {
  children: ReactNode
  as?: HeadingTag
  className?: string
  style?: CSSProperties
  delay?: number
  duration?: number
  // Letter-spacing the heading settles at. Read from style if not provided.
  targetLetterSpacing?: string
  // Optional trailing ochre rule that draws in after the text lands.
  flourish?: boolean
  flourishColor?: string
  flourishWidth?: string
  // Trigger before the heading is fully visible.
  viewportMargin?: string
}

export default function RevealHeading({
  children,
  as = 'h2',
  className,
  style,
  delay = 0,
  duration = 1.25,
  targetLetterSpacing,
  flourish = false,
  flourishColor = 'var(--color-ochre)',
  flourishWidth = '3.5rem',
  viewportMargin = '-15% 0px',
}: Props) {
  const finalLetterSpacing =
    targetLetterSpacing ?? (style?.letterSpacing as string | undefined) ?? '-0.02em'

  // Read the rest letterSpacing via animate (so inline style prop doesn't fight it)
  const finalStyle: CSSProperties = { ...style }
  // Remove letterSpacing from the passed style so our animation owns it cleanly.
  delete finalStyle.letterSpacing

  const commonProps = {
    className,
    style: finalStyle,
    initial: {
      opacity: 0,
      y: 32,
      letterSpacing: '-0.075em',
      filter: 'blur(12px)',
    },
    whileInView: {
      opacity: 1,
      y: 0,
      letterSpacing: finalLetterSpacing,
      filter: 'blur(0px)',
    },
    viewport: { once: true, margin: viewportMargin } as const,
    transition: {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }

  const HeadingEl =
    as === 'h1' ? (
      <motion.h1 {...commonProps}>{children}</motion.h1>
    ) : as === 'h3' ? (
      <motion.h3 {...commonProps}>{children}</motion.h3>
    ) : (
      <motion.h2 {...commonProps}>{children}</motion.h2>
    )

  if (!flourish) return HeadingEl

  return (
    <>
      {HeadingEl}
      <motion.span
        aria-hidden
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 0.75 }}
        viewport={{ once: true, margin: viewportMargin }}
        transition={{
          duration: 0.9,
          delay: delay + duration * 0.55,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          display: 'block',
          width: flourishWidth,
          height: '2px',
          background: flourishColor,
          transformOrigin: 'left',
          marginTop: '1rem',
          borderRadius: '1px',
        }}
      />
    </>
  )
}
