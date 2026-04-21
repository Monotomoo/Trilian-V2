type Props = {
  alt: string
  src?: string
}

export default function FounderPortrait({ alt, src }: Props) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ aspectRatio: '3 / 4' }}
      />
    )
  }

  // Placeholder: warm color field with botanical illustration + monogram
  return (
    <div
      role="img"
      aria-label={alt}
      className="relative w-full overflow-hidden"
      style={{
        aspectRatio: '3 / 4',
        background:
          'linear-gradient(145deg, color-mix(in srgb, var(--color-moss) 18%, var(--color-bone-warm)) 0%, color-mix(in srgb, var(--color-ochre) 22%, var(--color-bone)) 100%)',
        borderRadius: '2px',
      }}
    >
      {/* Botanical line-art — simple leaf sprig */}
      <svg
        viewBox="0 0 300 400"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <g
          fill="none"
          stroke="color-mix(in srgb, var(--color-moss) 40%, transparent)"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          {/* Central stem */}
          <path d="M 150 340 Q 148 220 145 110" />
          {/* Left leaves */}
          <path d="M 145 260 Q 110 245 95 220 Q 120 235 145 250" />
          <path d="M 146 210 Q 105 195 88 170 Q 115 185 145 200" />
          <path d="M 147 160 Q 112 145 98 120 Q 122 135 146 150" />
          {/* Right leaves */}
          <path d="M 147 280 Q 182 265 196 240 Q 170 255 148 270" />
          <path d="M 146 230 Q 184 215 200 190 Q 172 205 146 220" />
          <path d="M 146 180 Q 180 165 194 140 Q 170 155 146 170" />
          {/* Top bud */}
          <path d="M 145 110 Q 140 95 135 90" />
          <path d="M 145 110 Q 150 95 155 90" />
        </g>
      </svg>

      {/* Monogram bottom-left */}
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
        VR
      </div>

      {/* Caption bottom-right */}
      <div
        className="absolute bottom-6 right-6 text-right"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.625rem',
          color: 'var(--color-moss-deep)',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          opacity: 0.7,
        }}
      >
        Portrait <br /> forthcoming
      </div>
    </div>
  )
}
