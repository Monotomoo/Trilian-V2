import type { CSSProperties } from 'react'

// All variants are minimal-based (thin ink outlines). Each tweaks a single
// dimension so you can compare apples to apples.
export type VennLogoVariant =
  | 'minimal' // 1.5px ink outlines, nothing else
  | 'minimal-pin-ochre' // minimal + tiny ochre dot at center
  | 'minimal-pin-ink' // minimal + ink dot at center (matches stroke)
  | 'minimal-hairline' // thinner 0.9px strokes
  | 'minimal-bold' // thicker 2.2px strokes
  | 'minimal-dashed-inner' // minimal + a small dashed ring inside each circle
  | 'minimal-tint' // minimal + very soft moss wash in circles
  | 'minimal-gradient' // strokes fade from dark top to soft bottom
  | 'minimal-segmented' // dashed rings — ethereal, drawn
  | 'minimal-double' // double concentric stroke per ring
  | 'minimal-tick' // tick marks at compass points on each ring
  | 'minimal-dots-only' // no rings — just 4 small filled dots at circle centers

type Props = {
  variant?: VennLogoVariant
  /** 3 = classic triangle Venn (current site logo), 4 = quatrefoil. */
  circles?: 3 | 4
  size?: number
  className?: string
  style?: CSSProperties
  title?: string
}

// Quatrefoil (4-circle) geometry — d=16, r=30 → 4-way overlap radius 14.
const CIRCLES_4 = [
  { cx: 50, cy: 34 }, // N
  { cx: 66, cy: 50 }, // E
  { cx: 50, cy: 66 }, // S
  { cx: 34, cy: 50 }, // W
] as const

// Three-circle classic Venn — triangle pointing up, d=16, r=30.
// Distance between adjacent centers ≈ 27.7, overlap ≈ 32.3, 3-way overlap
// radius = r-d = 14 (same as quatrefoil, so the wordmark fits identically).
const CIRCLES_3 = [
  { cx: 50, cy: 34 }, // top
  { cx: 64, cy: 58 }, // bottom-right
  { cx: 36, cy: 58 }, // bottom-left
] as const
const R = 30

export default function VennLogo({
  variant = 'minimal',
  circles = 3,
  size = 120,
  className = '',
  style,
  title = 'Trillian',
}: Props) {
  const CIRCLES = circles === 3 ? CIRCLES_3 : CIRCLES_4
  // Stroke width varies by variant.
  const strokeWidth =
    variant === 'minimal-hairline'
      ? 0.9
      : variant === 'minimal-bold'
      ? 2.2
      : 1.5

  const showPinOchre = variant === 'minimal-pin-ochre'
  const showPinInk = variant === 'minimal-pin-ink'
  const showDashedInner = variant === 'minimal-dashed-inner'
  const showTint = variant === 'minimal-tint'
  const useGradient = variant === 'minimal-gradient'
  const isSegmented = variant === 'minimal-segmented'
  const isDouble = variant === 'minimal-double'
  const showTicks = variant === 'minimal-tick'
  const isDotsOnly = variant === 'minimal-dots-only'

  const gradId = `venn-mark-grad-${variant}`
  const tintId = `venn-mark-tint-${variant}`

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role="img"
      aria-label={title}
      className={className}
      style={{ display: 'block', overflow: 'visible', ...style }}
    >
      {useGradient && (
        <defs>
          <linearGradient id={gradId} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'var(--color-ink)', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'var(--color-ink)', stopOpacity: 0.38 }} />
          </linearGradient>
        </defs>
      )}

      {showTint && (
        <defs>
          <radialGradient id={tintId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: 'var(--color-moss)', stopOpacity: 0.14 }} />
            <stop offset="100%" style={{ stopColor: 'var(--color-moss)', stopOpacity: 0 }} />
          </radialGradient>
        </defs>
      )}

      {showTint && (
        <g style={{ mixBlendMode: 'multiply' }}>
          {CIRCLES.map((c, i) => (
            <circle key={`tint-${i}`} cx={c.cx} cy={c.cy} r={R} fill={`url(#${tintId})`} />
          ))}
        </g>
      )}

      {!isDotsOnly && (
        <g fill="none">
          {CIRCLES.map((c, i) => (
            <circle
              key={`stroke-${i}`}
              cx={c.cx}
              cy={c.cy}
              r={R}
              stroke={useGradient ? `url(#${gradId})` : 'var(--color-ink)'}
              strokeWidth={strokeWidth}
              strokeDasharray={isSegmented ? '3 2.5' : undefined}
              opacity={0.9}
            />
          ))}
          {isDouble &&
            CIRCLES.map((c, i) => (
              <circle
                key={`stroke-inner-${i}`}
                cx={c.cx}
                cy={c.cy}
                r={R - 2.2}
                stroke="var(--color-ink)"
                strokeWidth="0.7"
                opacity={0.55}
              />
            ))}
        </g>
      )}

      {showTicks && (
        <g stroke="var(--color-ink)" strokeWidth="1.1" strokeLinecap="round" opacity={0.85}>
          {CIRCLES.map((c, i) => (
            <g key={`tick-${i}`}>
              <line x1={c.cx} y1={c.cy - R - 2} x2={c.cx} y2={c.cy - R + 2} />
              <line x1={c.cx} y1={c.cy + R - 2} x2={c.cx} y2={c.cy + R + 2} />
              <line x1={c.cx - R - 2} y1={c.cy} x2={c.cx - R + 2} y2={c.cy} />
              <line x1={c.cx + R - 2} y1={c.cy} x2={c.cx + R + 2} y2={c.cy} />
            </g>
          ))}
        </g>
      )}

      {isDotsOnly && (
        <g>
          {CIRCLES.map((c, i) => (
            <circle key={`dot-${i}`} cx={c.cx} cy={c.cy} r={6} fill="var(--color-ink)" />
          ))}
          <circle cx={50} cy={50} r={2.4} fill="var(--color-ochre)" />
        </g>
      )}

      {showDashedInner && (
        <g fill="none">
          {CIRCLES.map((c, i) => (
            <circle
              key={`inner-${i}`}
              cx={c.cx}
              cy={c.cy}
              r={6}
              stroke="var(--color-ink)"
              strokeWidth="0.7"
              strokeDasharray="1.2 2"
              opacity={0.55}
            />
          ))}
        </g>
      )}

      {showPinOchre && <circle cx={50} cy={50} r={2.2} fill="var(--color-ochre)" />}
      {showPinInk && <circle cx={50} cy={50} r={1.8} fill="var(--color-ink)" />}
    </svg>
  )
}

// Horizontal lockup: mark + "Trillian" wordmark. Uses display font with
// italic ochre period to match the rest of the site.
export function VennLockup({
  variant = 'minimal',
  circles = 3,
  markSize = 42,
  wordSize = '1.875rem',
  gap = '0.85rem',
  className = '',
  style,
}: {
  variant?: VennLogoVariant
  circles?: 3 | 4
  markSize?: number
  wordSize?: string | number
  gap?: string
  className?: string
  style?: CSSProperties
}) {
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap,
        ...style,
      }}
    >
      <VennLogo variant={variant} circles={circles} size={markSize} />
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: wordSize,
          fontWeight: 400,
          color: 'var(--color-ink)',
          letterSpacing: '-0.025em',
          lineHeight: 1,
          fontVariationSettings: '"opsz" 32, "SOFT" 50, "WONK" 1',
          display: 'inline-flex',
          alignItems: 'baseline',
        }}
      >
        Trillian
        <span
          aria-hidden
          style={{
            color: 'var(--color-ochre)',
            fontStyle: 'italic',
            marginLeft: '0.04em',
            fontVariationSettings: '"opsz" 32, "SOFT" 80, "WONK" 1',
          }}
        >
          .
        </span>
      </span>
    </span>
  )
}
