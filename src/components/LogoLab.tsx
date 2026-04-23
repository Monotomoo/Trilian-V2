import RevealOnScroll from './RevealOnScroll'
import SectionLabel from './SectionLabel'
import VennLogo, { VennLockup, type VennLogoVariant } from './VennLogo'

type Variant = {
  id: VennLogoVariant
  name: string
  description: string
}

// Eight flavors of the minimal mark — same ink-outline quatrefoil, each
// tweaking one dimension so you can compare fairly.
const VARIANTS: Variant[] = [
  {
    id: 'minimal',
    name: '01 · Minimal',
    description: 'The baseline. 1.5 px ink outlines, nothing else.',
  },
  {
    id: 'minimal-hairline',
    name: '02 · Hairline',
    description: 'Same mark at 0.9 px — quieter, more refined at small sizes.',
  },
  {
    id: 'minimal-bold',
    name: '03 · Bold',
    description: '2.2 px strokes — reads louder at thumbnail size, works as a favicon.',
  },
  {
    id: 'minimal-pin-ochre',
    name: '04 · Ochre pin',
    description: 'Minimal outlines with a single ochre dot at the true center.',
  },
  {
    id: 'minimal-pin-ink',
    name: '05 · Ink pin',
    description: 'Same as minimal but with a matching ink dot — quieter accent.',
  },
  {
    id: 'minimal-dashed-inner',
    name: '06 · Dashed inner',
    description: 'Minimal + a tiny dashed ring inside each circle. Adds detail.',
  },
  {
    id: 'minimal-tint',
    name: '07 · Moss tint',
    description: 'Minimal outlines with a whisper of moss wash inside each circle.',
  },
  {
    id: 'minimal-gradient',
    name: '08 · Gradient stroke',
    description: 'Strokes fade from dark top to softer bottom. Hand-drawn feel.',
  },
  {
    id: 'minimal-segmented',
    name: '09 · Segmented',
    description: 'Dashed rings — ethereal, slightly hand-drawn.',
  },
  {
    id: 'minimal-double',
    name: '10 · Double stroke',
    description: 'A second thin ring concentric inside each — more architectural.',
  },
  {
    id: 'minimal-tick',
    name: '11 · Compass ticks',
    description: 'Minimal + tick marks at the four cardinal points of each circle.',
  },
  {
    id: 'minimal-dots-only',
    name: '12 · Dot cluster',
    description: 'No rings — just four filled dots with an ochre center pin. Most abstract.',
  },
]

export default function LogoLab() {
  return (
    <section
      id="logo-lab"
      className="relative py-28 md:py-36 border-t border-b overflow-hidden"
      style={{
        background: 'var(--color-bone)',
        borderColor: 'var(--color-hairline)',
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 55% at 50% 30%, color-mix(in srgb, var(--color-moss) 6%, transparent) 0%, transparent 65%)',
        }}
      />
      <div aria-hidden className="absolute inset-0 pointer-events-none grain-overlay" />

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-12">
        <RevealOnScroll>
          <SectionLabel>Logo lab · minimal</SectionLabel>
        </RevealOnScroll>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-8 md:gap-16 items-end">
          <RevealOnScroll delay={0.1}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 3.6vw, 3.25rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
                fontWeight: 400,
                color: 'var(--color-ink)',
                margin: 0,
                maxWidth: '22ch',
                fontVariationSettings: '"opsz" 48, "SOFT" 50, "WONK" 1',
              }}
            >
              Eight flavors of the minimal mark — with the Trillian lockup.
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.18}>
            <p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '1rem',
                lineHeight: 1.65,
                color: 'var(--color-ink-soft)',
                margin: 0,
                maxWidth: '52ch',
              }}
            >
              All variants keep the ink-outline quatrefoil. Only one dimension
              changes per flavor (stroke weight, a center pin, an inner dash, a
              hint of tint). Each card shows the mark alone, the mark beside
              <em> Trillian</em> as a horizontal lockup, and small thumbnails at
              favicon sizes.
            </p>
          </RevealOnScroll>
        </div>

        <div className="logo-lab-grid mt-16 md:mt-24">
          {VARIANTS.map((v) => (
            <RevealOnScroll key={v.id} delay={0.08}>
              <article className="logo-lab-card">
                {/* Name row */}
                <div className="logo-lab-name-row">
                  <h3 className="logo-lab-name">{v.name}</h3>
                </div>

                {/* Big mark */}
                <div className="logo-lab-preview">
                  <VennLogo variant={v.id} size={180} title={`Trillian — ${v.name}`} />
                </div>

                {/* Description */}
                <p className="logo-lab-desc">{v.description}</p>

                {/* Lockup — mark + Trillian wordmark */}
                <div className="logo-lab-lockup-block">
                  <span className="logo-lab-sub-label">Lockup</span>
                  <div className="logo-lab-lockup">
                    <VennLockup variant={v.id} markSize={44} wordSize="1.875rem" />
                  </div>
                  <div className="logo-lab-lockup logo-lab-lockup-small">
                    <VennLockup variant={v.id} markSize={28} wordSize="1.25rem" gap="0.55rem" />
                  </div>
                </div>

                {/* Favicon sizes */}
                <div className="logo-lab-sizes">
                  <span className="logo-lab-sub-label">At size</span>
                  <span className="logo-lab-size">
                    <VennLogo variant={v.id} size={44} />
                  </span>
                  <span className="logo-lab-size">
                    <VennLogo variant={v.id} size={28} />
                  </span>
                  <span className="logo-lab-size">
                    <VennLogo variant={v.id} size={18} />
                  </span>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>

      <style>{`
        .logo-lab-grid {
          display: grid;
          gap: 1px;
          background: var(--color-hairline);
          border: 1px solid var(--color-hairline);
          grid-template-columns: 1fr;
        }
        @media (min-width: 720px) {
          .logo-lab-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 1200px) {
          .logo-lab-grid { grid-template-columns: 1fr 1fr; }
        }
        .logo-lab-card {
          background: var(--color-bone-warm);
          display: grid;
          gap: 1.25rem;
          padding: clamp(1.75rem, 3vw, 2.5rem);
          transition: background 360ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .logo-lab-card:hover {
          background: color-mix(in srgb, var(--color-moss) 5%, var(--color-bone-warm));
        }

        .logo-lab-name-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 1rem;
        }
        .logo-lab-name {
          font-family: var(--font-mono);
          font-size: var(--text-micro);
          color: var(--color-ink);
          text-transform: uppercase;
          letter-spacing: 0.14em;
          margin: 0;
          font-weight: 500;
        }

        .logo-lab-preview {
          display: grid;
          place-items: center;
          height: 220px;
          background: var(--color-bone);
          border: 1px solid var(--color-hairline);
          border-radius: 2px;
        }

        .logo-lab-desc {
          font-family: var(--font-ui);
          font-size: 0.9375rem;
          line-height: 1.55;
          color: var(--color-ink-soft);
          margin: 0;
          max-width: 50ch;
        }

        .logo-lab-lockup-block {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1.5rem 1.25rem;
          background: var(--color-bone);
          border: 1px solid var(--color-hairline);
          border-radius: 2px;
        }
        .logo-lab-lockup {
          display: flex;
          align-items: center;
        }
        .logo-lab-lockup-small {
          opacity: 0.92;
        }

        .logo-lab-sub-label {
          font-family: var(--font-mono);
          font-size: 0.625rem;
          color: var(--color-ink-mute);
          text-transform: uppercase;
          letter-spacing: 0.14em;
        }

        .logo-lab-sizes {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--color-hairline);
        }
        .logo-lab-sizes .logo-lab-sub-label {
          margin-right: 0.25rem;
        }
        .logo-lab-size {
          display: inline-grid;
          place-items: center;
          padding: 0.4rem;
          background: var(--color-bone);
          border: 1px solid var(--color-hairline);
          border-radius: 2px;
        }
      `}</style>
    </section>
  )
}
