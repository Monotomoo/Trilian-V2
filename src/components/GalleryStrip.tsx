import RevealOnScroll from './RevealOnScroll'
import RevealHeading from './RevealHeading'
import SectionLabel from './SectionLabel'
import ImagePlaceholder from './ImagePlaceholder'
import { useContent } from '../hooks/useContent'

export default function GalleryStrip() {
  const t = useContent()

  return (
    <section
      id="gallery"
      className="relative py-28 md:py-40 border-t"
      style={{
        background: 'var(--color-bone)',
        borderColor: 'var(--color-hairline)',
      }}
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="flex items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <RevealOnScroll>
              <SectionLabel>{t.gallery.eyebrow}</SectionLabel>
            </RevealOnScroll>
            <RevealHeading
              delay={0.1}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                fontWeight: 400,
                color: 'var(--color-ink)',
                margin: '1.5rem 0 0 0',
                fontVariationSettings: '"opsz" 48, "SOFT" 50',
              }}
            >
              {t.gallery.headline}
            </RevealHeading>
          </div>
          <RevealOnScroll delay={0.15}>
            <p
              className="hidden md:block max-w-[30ch] text-right"
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.875rem',
                lineHeight: 1.55,
                color: 'var(--color-ink-mute)',
              }}
            >
              {t.gallery.caption}
            </p>
          </RevealOnScroll>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          {t.gallery.items.map((item, i) => (
            <RevealOnScroll key={i} delay={0.1 + i * 0.08}>
              <div className="group">
                <div
                  style={{
                    transition: 'transform 500ms var(--ease-out-expo)',
                  }}
                  className="group-hover:-translate-y-1"
                >
                  <ImagePlaceholder
                    variant="portrait"
                    theme={item.theme}
                    illustration={item.illustration}
                    label={item.label}
                    alt={item.title}
                  />
                </div>
                <div className="mt-5">
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.25rem',
                      lineHeight: 1.25,
                      letterSpacing: '-0.01em',
                      fontWeight: 400,
                      color: 'var(--color-ink)',
                      margin: 0,
                      fontVariationSettings: '"opsz" 24, "SOFT" 50',
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.9375rem',
                      lineHeight: 1.55,
                      color: 'var(--color-ink-soft)',
                      margin: '0.5rem 0 0 0',
                    }}
                  >
                    {item.body}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
