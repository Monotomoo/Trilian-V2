// Content lives in JSON files so it can be edited via Decap CMS.
// This wrapper re-exports them so consumers keep the same import surface.
import en from './strings.en.json'
import hr from './strings.hr.json'

export type Lang = 'en' | 'hr'

// Decorative-asset enums kept here for consumers (e.g. legacy GalleryStrip).
// JSON values for these fields are plain strings; cast at the call site if
// strict-typing is needed.
export type Illustration =
  | 'leaf'
  | 'ripple'
  | 'wave'
  | 'grid'
  | 'curve'
  | 'botanical'
  | 'sunrise'
  | 'horizon'
  | 'none'
export type PlaceholderTheme = 'moss-ochre' | 'moss' | 'ochre' | 'neutral'

// Type derived from the EN JSON shape — Decap enforces matching shape on HR
// via its schema, so the two are kept in lockstep.
export type Strings = typeof en

export const strings: Record<Lang, Strings> = { en, hr } as const
