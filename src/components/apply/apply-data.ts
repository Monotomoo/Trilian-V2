// Content + types for the Application Ritual.
// HR uses EN text for now — flagged for Vedra to translate later.

import type { Lang } from '../../../content/strings'

// ————— Types —————

export type ApplyAnswers = {
  q1?: string
  q2?: string
  q3?: string
  q4?: string
  q5?: string
  q6?: string
  name?: string
  email?: string
}

export type ApplyQuestion = {
  index: string
  prompt: string
  placeholder: string
  required: boolean
  minChars: number
  maxChars: number
  letterLabel: string
}

export type ApplyContent = {
  meta: {
    eyebrow: string
    cohort: string
    headline: string
    sub: string
    note: string
    begin: string
    back: string
    next: string
    review: string
    continueWriting: string
    send: string
    sending: string
    sent: string
    sentNote: string
    optional: string
    nameLabel: string
    namePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    salutation: string
    signature: string
  }
  questions: ApplyQuestion[]
  reviewHeadline: string
  reviewSub: string
  signatureName: string
  signatureLocation: string
}

// ————— EN content —————

const en: ApplyContent = {
  meta: {
    eyebrow: 'Founding cohort · 12 seats · 2026',
    cohort: 'This is an application, not a booking.',
    headline: 'Write me a letter.',
    sub: 'Six questions. Take as long as you need. There is no wrong answer, and there are no characters I am counting against you.',
    note:
      'I read every application personally. Replies usually land inside 48 hours.',
    begin: 'Start letter',
    back: 'Back',
    next: 'Next',
    review: 'Read the letter',
    continueWriting: 'Keep writing',
    send: 'Send the letter',
    sending: 'Sending…',
    sent: 'Sent.',
    sentNote:
      'Thank you. Your mail client should now be open with the letter composed. I’ll come back to you personally.',
    optional: 'Optional',
    nameLabel: 'Your name',
    namePlaceholder: 'First and last',
    emailLabel: 'Where should I reply?',
    emailPlaceholder: 'name@domain.com',
    salutation: 'Dear Vedra,',
    signature: 'With respect,',
  },
  questions: [
    {
      index: '01',
      prompt: 'What are you trying to build, and by when?',
      placeholder: 'Start wherever you want to start.',
      required: true,
      minChars: 10,
      maxChars: 1200,
      letterLabel: 'What I’m trying to build',
    },
    {
      index: '02',
      prompt: 'What’s the leak you can’t patch?',
      placeholder: 'The one you already suspect. Name it here.',
      required: true,
      minChars: 10,
      maxChars: 1200,
      letterLabel: 'The leak I can’t patch',
    },
    {
      index: '03',
      prompt: 'What have you already tried?',
      placeholder: 'Courses, coaches, conversations, books — whatever counts.',
      required: true,
      minChars: 10,
      maxChars: 1200,
      letterLabel: 'What I’ve already tried',
    },
    {
      index: '04',
      prompt: 'What’s at stake if nothing moves?',
      placeholder: 'Not the worst case. The honest one.',
      required: true,
      minChars: 10,
      maxChars: 1200,
      letterLabel: 'What’s at stake',
    },
    {
      index: '05',
      prompt: 'What kind of operator are you — in two sentences?',
      placeholder: 'Nothing polished. Just how you actually operate.',
      required: true,
      minChars: 10,
      maxChars: 600,
      letterLabel: 'The kind of operator I am',
    },
    {
      index: '06',
      prompt: 'Anything else I should know before we talk.',
      placeholder: 'Optional. Say it if it matters. Skip if it doesn’t.',
      required: false,
      minChars: 0,
      maxChars: 1200,
      letterLabel: 'One more thing',
    },
  ],
  reviewHeadline: 'Read it back.',
  reviewSub:
    'This is what will reach me. Edit anything you want. Then add your name and your email so I can reply.',
  signatureName: 'Vedra',
  signatureLocation: 'Zagreb · 2026',
}

// ————— HR content (TODO: Vedra to translate/refine) —————

const hr: ApplyContent = en

// ————— Export by lang —————

export const apply: Record<Lang, ApplyContent> = { en, hr }

// ————— Helpers —————

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

export function questionComplete(q: ApplyQuestion, value: string | undefined): boolean {
  if (!q.required) return true
  return !!value && value.trim().length >= q.minChars
}

export function composeLetter(content: ApplyContent, answers: ApplyAnswers): string {
  const lines: string[] = [content.meta.salutation, '']
  for (const q of content.questions) {
    const v = (answers[(`q${Number(q.index)}`) as keyof ApplyAnswers] as string | undefined)?.trim()
    if (!v) continue
    lines.push(q.letterLabel + ':')
    lines.push(v)
    lines.push('')
  }
  lines.push(content.meta.signature)
  if (answers.name) lines.push(answers.name.trim())
  return lines.join('\n')
}
