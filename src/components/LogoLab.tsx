import RevealOnScroll from './RevealOnScroll'
import SectionLabel from './SectionLabel'
import VennLogo, { VennLockup, type VennLogoVariant } from './VennLogo'

type Variant = {
  id: VennLogoVariant
  name: string
  description: string
}

// FIVE three-circle variants — the new direction. Classic Venn triangle
// pointing up, ink outlines, minimal palette.
const THREE_VARIANTS: Variant[] = [
  {
    id: 'minimal',
    name: '01 · Minimal',
    description: 'Three thin ink rings in a triangle. The cleanest read.',
  },
  {
    id: 'minimal-hairline',
    name: '02 · Hairline',
    description: 'Same triangle at 0.9 px — refined, almost editorial.',
  },
  {
    id: 'minimal-bold',
    name: '03 · Bold',
    description: '2.2 px strokes — louder at favicon size, more iconic.',
  },
  {
    id: 'minimal-pin-ochre',
    name: '04 · Ochre pin',
    description: 'Triangle outlines with a single ochre dot at the 3-way center.',
  },
  {
    id: 'minimal-tick',
    name: '05 · Compass ticks',
    description: 'Tick marks at the cardinal points of each circle. More structural.',
  },
]

function VariantCard({ v, circles }: { v: Variant; circles: 3 | 4 }) {
  return (
    <article className="logo-lab-card">
      <div className="logo-lab-name-row">
        <h3 className="logo-lab-name">{v.name}</h3>
      </div>

      <div className="logo-lab-preview">
        <VennLogo
          variant={v.id}
          circles={circles}
          size={180}
          title={`Trillian — ${v.name}`}
        />
      </div>

      <p className="logo-lab-desc">{v.description}</p>

      <div className="logo-lab-lockup-block">
        <span className="logo-lab-sub-label">Lockup</span>
        <div className="logo-lab-lockup">
          <VennLockup variant={v.id} circles={circles} markSize={44} wordSize="1.875rem" />
        </div>
        <div className="logo-lab-lockup logo-lab-lockup-small">
          <VennLockup
            variant={v.id}
            circles={circles}
            markSize={28}
            wordSize="1.25rem"
            gap="0.55rem"
          />
        </div>
      </div>

      <div className="logo-lab-sizes">
        <span className="logo-lab-sub-label">At size</span>
        <span className="logo-lab-size">
          <VennLogo variant={v.id} circles={circles} size={44} />
        </span>
        <span className="logo-lab-size">
          <VennLogo variant={v.id} circles={circles} size={28} />
        </span>
        <span className="logo-lab-size">
          <VennLogo variant={v.id} circles={circles} size={18} />
        </span>
      </div>
    </article>
  )
}

function GroupHeader({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string
  title: string
  body: string
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-8 md:gap-16 items-end mb-10 md:mb-16">
      <RevealOnScroll>
        <div>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-micro)',
              color: 'var(--color-moss)',
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              display: 'inline-block',
              marginBottom: '1rem',
            }}
          >
            {eyebrow}
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3vw, 2.625rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              fontWeight: 400,
              color: 'var(--color-ink)',
              margin: 0,
              maxWidth: '22ch',
              fontVariationSettings: '"opsz" 48, "SOFT" 50, "WONK" 1',
            }}
          >
            {title}
          </h2>
        </div>
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
          {body}
        </p>
      </RevealOnScroll>
    </div>
  )
}

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
          <SectionLabel>Logo lab</SectionLabel>
        </RevealOnScroll>

        {/* THREE CIRCLES — featured group, the new direction */}
        <div className="mt-10">
          <GroupHeader
            eyebrow="— Three circles · the new direction"
            title="Five three-circle variations to lock in."
            body="Classic Venn triangle pointing up. Each card shows the mark on its own, the mark beside the Trillian wordmark as a horizontal lockup, and small thumbnails at favicon sizes. Tell me which number to promote and I'll deploy it across Nav, Footer, Blog hero, and favicon in one pass."
          />

          <div className="logo-lab-grid">
            {THREE_VARIANTS.map((v) => (
              <RevealOnScroll key={`three-${v.id}`} delay={0.08}>
                <VariantCard v={v} circles={3} />
              </RevealOnScroll>
            ))}
          </div>
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
