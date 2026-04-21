import { motion } from 'framer-motion'
import type { CSSProperties } from 'react'

type Tone = 'moss' | 'moss-deep' | 'ochre' | 'natural'
type Fit = 'cover' | 'contain'

type Props = {
  src: string
  alt: string
  tone?: Tone
  fit?: Fit
  breathing?: boolean
  objectPosition?: string
  className?: string
  style?: CSSProperties
  aspectRatio?: string
  priority?: boolean
}

/**
 * Portrait renders an image with an optional moss/ochre duotone treatment:
 *   base color behind → grayscale image with multiply → color tint overlay → grain
 * Tone "natural" renders the image as-is.
 */
export default function Portrait({
  src,
  alt,
  tone = 'moss',
  fit = 'cover',
  breathing = false,
  objectPosition = '50% 35%',
  className = '',
  style,
  aspectRatio,
  priority = false,
}: Props) {
  const base =
    tone === 'moss' || tone === 'moss-deep'
      ? 'var(--color-ochre)'
      : tone === 'ochre'
      ? 'var(--color-moss)'
      : 'transparent'

  const tint =
    tone === 'moss'
      ? 'var(--color-moss)'
      : tone === 'moss-deep'
      ? 'var(--color-moss-deep)'
      : tone === 'ochre'
      ? 'var(--color-ochre)'
      : 'transparent'

  const isNatural = tone === 'natural'

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: base,
        aspectRatio,
        ...style,
      }}
    >
      <motion.div
        className="absolute inset-0"
        initial={breathing ? { scale: 1.03 } : undefined}
        animate={breathing ? { scale: [1.03, 1.0, 1.03] } : undefined}
        transition={
          breathing
            ? { duration: 16, repeat: Infinity, ease: 'easeInOut' }
            : undefined
        }
      >
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          style={{
            width: '100%',
            height: '100%',
            objectFit: fit,
            objectPosition,
            mixBlendMode: isNatural ? 'normal' : 'multiply',
            filter: isNatural
              ? 'none'
              : 'grayscale(100%) contrast(1.15) brightness(0.98)',
          }}
        />
      </motion.div>

      {/* Moss color tint */}
      {!isNatural && (
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: tint,
            mixBlendMode: 'color',
            opacity: tone === 'moss-deep' ? 0.75 : 0.6,
          }}
        />
      )}

      {/* Subtle inner vignette — draws eye to center */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 45%, transparent 40%, color-mix(in srgb, var(--color-ink) 18%, transparent) 100%)',
        }}
      />

      {/* Grain */}
      <div aria-hidden className="absolute inset-0 pointer-events-none grain-overlay" />
    </div>
  )
}
