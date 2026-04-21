import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef, type ReactNode, type CSSProperties, type MouseEvent } from 'react'

type Props = {
  children: ReactNode
  strength?: number
  className?: string
  style?: CSSProperties
  as?: 'a' | 'button'
  href?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
  ariaLabel?: string
}

export default function MagneticButton({
  children,
  strength = 0.22,
  className,
  style,
  as = 'a',
  href,
  type,
  disabled,
  onClick,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLElement | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.6 })

  const onMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  const sharedProps = {
    ref: ref as never,
    className,
    style: { ...style, x: sx, y: sy, display: 'inline-flex' } as unknown as CSSProperties,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    onClick,
    'aria-label': ariaLabel,
  }

  if (as === 'button') {
    return (
      <motion.button {...sharedProps} type={type ?? 'button'} disabled={disabled}>
        {children}
      </motion.button>
    )
  }

  return (
    <motion.a {...sharedProps} href={href}>
      {children}
    </motion.a>
  )
}
