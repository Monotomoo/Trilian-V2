import type { Illustration, PlaceholderTheme } from '../../content/strings'

type Variant = 'portrait' | 'landscape' | 'square'

type Props = {
  variant?: Variant
  theme?: PlaceholderTheme
  illustration?: Illustration
  label?: string
  caption?: string
  alt?: string
  src?: string
  monogram?: string
  className?: string
}

const aspectRatios: Record<Variant, string> = {
  portrait: '3 / 4',
  landscape: '4 / 3',
  square: '1 / 1',
}

const themeBg: Record<PlaceholderTheme, string> = {
  'moss-ochre':
    'linear-gradient(160deg, color-mix(in srgb, var(--color-moss) 22%, var(--color-bone-warm)) 0%, color-mix(in srgb, var(--color-ochre) 26%, var(--color-bone)) 100%)',
  moss:
    'linear-gradient(160deg, color-mix(in srgb, var(--color-moss) 26%, var(--color-bone-warm)) 0%, color-mix(in srgb, var(--color-moss) 10%, var(--color-bone)) 100%)',
  ochre:
    'linear-gradient(160deg, color-mix(in srgb, var(--color-ochre) 32%, var(--color-bone-warm)) 0%, color-mix(in srgb, var(--color-bone-warm) 90%, var(--color-bone)) 100%)',
  neutral:
    'linear-gradient(160deg, var(--color-bone-warm) 0%, var(--color-bone) 100%)',
}

function IllustrationArt({ kind }: { kind: Illustration }) {
  const stroke = 'color-mix(in srgb, var(--color-moss-deep) 55%, transparent)'
  const strokeSoft = 'color-mix(in srgb, var(--color-moss-deep) 30%, transparent)'
  const strokeFaint = 'color-mix(in srgb, var(--color-moss-deep) 18%, transparent)'
  const ochre = 'color-mix(in srgb, var(--color-ochre) 65%, transparent)'

  if (kind === 'none') return null

  // SUNRISE — radiating tick marks + concentric arcs + central glow
  if (kind === 'sunrise') {
    const ticks = Array.from({ length: 28 }).map((_, i) => {
      const angle = (i / 28) * Math.PI - Math.PI
      const x1 = 150 + Math.cos(angle) * 118
      const y1 = 260 + Math.sin(angle) * 118
      const x2 = 150 + Math.cos(angle) * 132
      const y2 = 260 + Math.sin(angle) * 132
      const key = `t-${i}`
      return (
        <line key={key} x1={x1} y1={y1} x2={x2} y2={y2} stroke={strokeSoft} strokeWidth="1" strokeLinecap="round" />
      )
    })
    return (
      <svg viewBox="0 0 300 400" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <radialGradient id="sun-glow" cx="50%" cy="65%" r="30%">
            <stop offset="0%" stopColor={ochre} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="300" height="400" fill="url(#sun-glow)" opacity="0.9" />
        {/* horizon line */}
        <line x1="0" y1="262" x2="300" y2="262" stroke={strokeFaint} strokeWidth="1" />
        {/* sun */}
        <circle cx="150" cy="260" r="42" fill="none" stroke={stroke} strokeWidth="1.4" />
        <circle cx="150" cy="260" r="70" fill="none" stroke={strokeSoft} strokeWidth="1" />
        <circle cx="150" cy="260" r="96" fill="none" stroke={strokeFaint} strokeWidth="1" />
        {/* central dot */}
        <circle cx="150" cy="260" r="4" fill={stroke} />
        {/* tick marks around */}
        {ticks}
        {/* lower waves */}
        <path d="M 0 330 Q 75 316 150 330 T 300 330" fill="none" stroke={strokeFaint} strokeWidth="1" strokeLinecap="round" />
        <path d="M 0 360 Q 75 346 150 360 T 300 360" fill="none" stroke={strokeFaint} strokeWidth="1" strokeLinecap="round" />
      </svg>
    )
  }

  // BOTANICAL — apothecary composition with multiple plants
  if (kind === 'botanical') {
    return (
      <svg viewBox="0 0 300 400" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <g fill="none" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          {/* Left plant — tall grass */}
          <path d="M 65 360 Q 62 300 60 240 Q 59 200 62 170" />
          <path d="M 65 360 Q 70 310 74 270 Q 77 240 78 220" strokeWidth="1.1" stroke={strokeSoft} />
          <path d="M 55 360 Q 52 320 50 280 Q 49 250 52 230" strokeWidth="1.1" stroke={strokeSoft} />

          {/* Center — leaf stem */}
          <path d="M 150 360 Q 148 260 145 140" strokeWidth="1.5" />
          <path d="M 145 280 Q 115 266 100 240 Q 124 254 145 270" />
          <path d="M 146 230 Q 110 216 94 190 Q 120 206 146 220" />
          <path d="M 147 180 Q 115 164 100 140 Q 124 154 147 170" />
          <path d="M 147 300 Q 182 286 196 260 Q 170 274 148 290" />
          <path d="M 146 250 Q 182 236 196 210 Q 170 224 146 240" />
          <path d="M 146 200 Q 180 184 194 160 Q 170 174 146 190" />
          <path d="M 145 140 Q 140 125 135 120" />
          <path d="M 145 140 Q 150 125 155 120" />
          <circle cx="145" cy="115" r="3" fill={stroke} stroke="none" />

          {/* Right plant — chamomile */}
          <path d="M 235 360 Q 232 310 230 260 Q 228 215 230 180" strokeWidth="1.3" />
          {/* flower petals */}
          <g transform="translate(230 170)">
            <ellipse cx="0" cy="-12" rx="5" ry="10" stroke={stroke} strokeWidth="1.2" />
            <ellipse cx="12" cy="-4" rx="10" ry="5" stroke={stroke} strokeWidth="1.2" />
            <ellipse cx="0" cy="8" rx="5" ry="10" stroke={strokeSoft} strokeWidth="1.2" />
            <ellipse cx="-12" cy="-4" rx="10" ry="5" stroke={strokeSoft} strokeWidth="1.2" />
            <ellipse cx="8" cy="-10" rx="5" ry="9" transform="rotate(30)" stroke={strokeSoft} strokeWidth="1.1" />
            <ellipse cx="-8" cy="-10" rx="5" ry="9" transform="rotate(-30)" stroke={strokeSoft} strokeWidth="1.1" />
            <circle cx="0" cy="0" r="3" fill={ochre} stroke="none" />
          </g>
        </g>
      </svg>
    )
  }

  // HORIZON — Zagreb-suggestive skyline + hills + moon
  if (kind === 'horizon') {
    return (
      <svg viewBox="0 0 300 400" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <radialGradient id="moon-glow" cx="80%" cy="30%" r="18%">
            <stop offset="0%" stopColor={ochre} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="300" height="400" fill="url(#moon-glow)" opacity="0.8" />
        <g fill="none" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          {/* Moon */}
          <circle cx="230" cy="115" r="24" stroke={stroke} strokeWidth="1.3" />
          {/* Back hills */}
          <path d="M 0 260 Q 60 200 120 240 Q 180 270 240 220 Q 280 195 300 210 L 300 400 L 0 400 Z" fill="color-mix(in srgb, var(--color-moss-deep) 12%, transparent)" stroke="none" />
          <path d="M 0 260 Q 60 200 120 240 Q 180 270 240 220 Q 280 195 300 210" stroke={strokeSoft} />
          {/* Mid skyline */}
          <path d="M 0 280 L 40 280 L 40 255 L 60 255 L 60 280 L 90 280 L 90 245 L 100 245 L 100 230 L 110 230 L 110 245 L 120 245 L 120 280 L 150 280 L 150 240 L 155 240 L 155 200 L 160 200 L 160 240 L 165 240 L 165 280 L 200 280 L 200 250 L 220 250 L 220 280 L 260 280 L 260 260 L 300 260 L 300 400 L 0 400 Z" fill="color-mix(in srgb, var(--color-moss-deep) 22%, transparent)" stroke="none" />
          <path d="M 0 280 L 40 280 L 40 255 L 60 255 L 60 280 L 90 280 L 90 245 L 100 245 L 100 230 L 110 230 L 110 245 L 120 245 L 120 280 L 150 280 L 150 240 L 155 240 L 155 200 L 160 200 L 160 240 L 165 240 L 165 280 L 200 280 L 200 250 L 220 250 L 220 280 L 260 280 L 260 260 L 300 260" stroke={stroke} />
          {/* Horizon line */}
          <line x1="0" y1="280" x2="300" y2="280" stroke={strokeFaint} />
          {/* Waves below */}
          <path d="M 0 340 Q 75 326 150 340 T 300 340" stroke={strokeFaint} />
          <path d="M 0 365 Q 75 351 150 365 T 300 365" stroke={strokeFaint} />
        </g>
      </svg>
    )
  }

  // LEAF (retained)
  if (kind === 'leaf') {
    return (
      <svg viewBox="0 0 300 400" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <g fill="none" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 150 340 Q 148 220 145 110" />
          <path d="M 145 260 Q 110 245 95 220 Q 120 235 145 250" />
          <path d="M 146 210 Q 105 195 88 170 Q 115 185 145 200" />
          <path d="M 147 160 Q 112 145 98 120 Q 122 135 146 150" />
          <path d="M 147 280 Q 182 265 196 240 Q 170 255 148 270" />
          <path d="M 146 230 Q 184 215 200 190 Q 172 205 146 220" />
          <path d="M 146 180 Q 180 165 194 140 Q 170 155 146 170" />
          <path d="M 145 110 Q 140 95 135 90" />
          <path d="M 145 110 Q 150 95 155 90" />
        </g>
      </svg>
    )
  }

  // RIPPLE (retained, slightly richer)
  if (kind === 'ripple') {
    return (
      <svg viewBox="0 0 300 400" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <g fill="none" stroke={stroke} strokeWidth="1.2" strokeLinecap="round">
          {[40, 64, 88, 116, 148, 184, 222].map((r, i) => (
            <circle key={i} cx="150" cy="200" r={r} opacity={1 - i * 0.12} />
          ))}
          <circle cx="150" cy="200" r="6" fill={stroke} stroke="none" />
          <circle cx="150" cy="200" r="12" fill="none" stroke={stroke} strokeWidth="1" opacity="0.4" />
        </g>
      </svg>
    )
  }

  if (kind === 'wave') {
    return (
      <svg viewBox="0 0 300 400" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <g fill="none" stroke={stroke} strokeWidth="1.3" strokeLinecap="round">
          {[130, 160, 190, 220, 250, 280].map((y, i) => (
            <path key={i} d={`M -10 ${y} Q 75 ${y - 22} 150 ${y} T 310 ${y}`} opacity={1 - i * 0.13} />
          ))}
        </g>
      </svg>
    )
  }

  if (kind === 'grid') {
    const dots = []
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 6; c++) {
        dots.push(<circle key={`${r}-${c}`} cx={40 + c * 44} cy={50 + r * 44} r="2" fill={stroke} stroke="none" />)
      }
    }
    return (
      <svg viewBox="0 0 300 400" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        {dots}
      </svg>
    )
  }

  if (kind === 'curve') {
    return (
      <svg viewBox="0 0 300 400" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <g fill="none" stroke={stroke} strokeWidth="1.3" strokeLinecap="round">
          <path d="M 40 340 C 40 260 80 220 150 220 C 220 220 260 180 260 90" />
          <path d="M 60 360 C 60 280 100 240 170 240 C 240 240 280 200 280 110" opacity="0.5" />
        </g>
      </svg>
    )
  }

  return null
}

export default function ImagePlaceholder({
  variant = 'portrait',
  theme = 'moss-ochre',
  illustration = 'leaf',
  label,
  caption,
  alt,
  src,
  monogram,
  className = '',
}: Props) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt ?? ''}
        className={`w-full h-full object-cover ${className}`}
        style={{ aspectRatio: aspectRatios[variant] }}
      />
    )
  }

  return (
    <div
      role="img"
      aria-label={alt ?? caption ?? 'Image placeholder'}
      className={`relative w-full overflow-hidden group ${className}`}
      style={{
        aspectRatio: aspectRatios[variant],
        background: themeBg[theme],
        borderRadius: '2px',
      }}
    >
      <IllustrationArt kind={illustration} />

      {/* Inner vignette */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 85% 65% at 50% 45%, transparent 35%, color-mix(in srgb, var(--color-ink) 14%, transparent) 100%)',
        }}
      />

      {/* Grain */}
      <div aria-hidden className="absolute inset-0 pointer-events-none grain-overlay" />

      {label && (
        <div
          className="absolute top-4 left-4"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            color: 'var(--color-moss-deep)',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            opacity: 0.85,
          }}
        >
          {label}
        </div>
      )}

      {monogram && (
        <div
          className="absolute bottom-6 left-6"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.75rem',
            fontWeight: 400,
            color: 'var(--color-moss-deep)',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            fontVariationSettings: '"opsz" 48, "SOFT" 80, "WONK" 1',
          }}
        >
          {monogram}
        </div>
      )}

      {caption && (
        <div
          className="absolute bottom-6 right-6 text-right max-w-[55%]"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.625rem',
            color: 'var(--color-moss-deep)',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            opacity: 0.85,
            lineHeight: 1.4,
          }}
        >
          {caption}
        </div>
      )}
    </div>
  )
}
