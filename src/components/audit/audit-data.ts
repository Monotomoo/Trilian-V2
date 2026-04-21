// All content + types for the Leak Audit.
// Content is keyed by Lang. Croatian strings are placeholder English pending
// Vedra's review — flagged with "TODO hr".

import type { Lang } from '../../../content/strings'

// ————— Types —————

export type Principle =
  | 'leadership'
  | 'somatic'
  | 'career'
  | 'crisis'
  | 'practice'
  | 'diagnostic'

export type LeakSite =
  | 'calendar'
  | 'sleep'
  | 'relationships'
  | 'role'
  | 'nervous-system'
  | 'unnamed'

export type Service =
  | 'first-100-days'
  | 'audit'
  | 'career'
  | 'household'
  | 'crisis-support'

export type SomaticAnswer = 'morning' | 'week' | 'month' | 'longer' | 'dont-remember'

export type Answers = {
  q1?: Principle
  q2?: number
  q3?: LeakSite[]
  q4?: SomaticAnswer
  q5?: string
  q6?: Principle
  q7?: string
}

export type RequiredAnswers = Required<Answers> & { q3: LeakSite[] }

export type Diagnosis = {
  primaryPrinciple: Principle
  leakSite: LeakSite
  energy: number
  somaticFlag: boolean
  recommendedService: Service
  userQuote: string
  biggestLeak: string
  oneLever: string
  principleTitle: string
  principleBreaking: string
  serviceTitle: string
  serviceDescription: string
  userVision: string
}

// ————— Content —————

type RadioOption<T extends string> = { value: T; label: string }

type QuestionBase = { eyebrow: string; prompt: string }

export type AuditContent = {
  meta: {
    eyebrow: string
    headline: string
    sub: string
    begin: string
    back: string
    next: string
    optional: string
    generating: string
  }
  questions: {
    q1: QuestionBase & { options: RadioOption<Principle>[] }
    q2: QuestionBase & { minLabel: string; maxLabel: string }
    q3: QuestionBase & { help: string; options: RadioOption<LeakSite>[] }
    q4: QuestionBase & { options: RadioOption<SomaticAnswer>[] }
    q5: QuestionBase & { placeholder: string; maxChars: number }
    q6: QuestionBase & { options: RadioOption<Principle>[] }
    q7: QuestionBase & { placeholder: string; maxChars: number }
  }
  output: {
    eyebrow: string
    youSaid: string
    biggestLeak: string
    oneLever: string
    principleBreaking: string
    serviceFits: string
    signatureName: string
    signatureLocation: string
    bookCta: string
    sendCta: string
    sendPlaceholder: string
    sendSent: string
  }
  principles: Record<Principle, { title: string; breaking: string }>
  services: Record<Service, { title: string; description: string }>
  leakCopy: Record<LeakSite, { biggestLeak: string; oneLever: string; oneLeverLow: string }>
}

// ————— EN content —————

const en: AuditContent = {
  meta: {
    eyebrow: '00 / The 15-Minute Audit',
    headline: 'Seven questions. One written diagnosis.',
    sub: 'Free. No pitch. Takes about three minutes. Your answers stay in your browser until you send them.',
    begin: 'Begin',
    back: 'Back',
    next: 'Next',
    optional: 'Optional',
    generating: 'Reading the signal.',
  },
  questions: {
    q1: {
      eyebrow: '01 / 07',
      prompt: 'Which one feels most true right now?',
      options: [
        { value: 'somatic', label: 'My calendar is lying to me.' },
        { value: 'leadership', label: 'I’m arguing for my authority instead of having it.' },
        { value: 'career', label: 'I’ve outgrown my role, but can’t see the next one.' },
        { value: 'crisis', label: 'Everything is on fire and nothing is getting done.' },
        { value: 'practice', label: 'I’m a specialist, but I need more than my specialty.' },
        { value: 'diagnostic', label: 'The loudest complaint isn’t the actual problem.' },
      ],
    },
    q2: {
      eyebrow: '02 / 07',
      prompt: 'Your week, right now.',
      minLabel: 'Nothing moves',
      maxLabel: 'Crisp execution',
    },
    q3: {
      eyebrow: '03 / 07',
      prompt: 'Where is the energy actually leaking?',
      help: 'Pick up to two.',
      options: [
        { value: 'calendar', label: 'Calendar' },
        { value: 'sleep', label: 'Sleep' },
        { value: 'relationships', label: 'Relationships' },
        { value: 'role', label: 'The role itself' },
        { value: 'nervous-system', label: 'Nervous system' },
        { value: 'unnamed', label: 'The thing I can’t name' },
      ],
    },
    q4: {
      eyebrow: '04 / 07',
      prompt: 'Last time you did something only for your body?',
      options: [
        { value: 'morning', label: 'This morning' },
        { value: 'week', label: 'This week' },
        { value: 'month', label: 'This month' },
        { value: 'longer', label: 'Longer than that' },
        { value: 'dont-remember', label: 'Don’t remember' },
      ],
    },
    q5: {
      eyebrow: '05 / 07',
      prompt: 'One line — the leak you already suspect.',
      placeholder: 'Write it in one sentence. No jargon.',
      maxChars: 140,
    },
    q6: {
      eyebrow: '06 / 07',
      prompt: 'If one thing moved in the next 14 days, what would matter most?',
      options: [
        { value: 'leadership', label: 'More authority in this role.' },
        { value: 'career', label: 'A clear next move in my career.' },
        { value: 'practice', label: 'Operations at home that actually work.' },
        { value: 'crisis', label: 'A way through this crisis.' },
        { value: 'diagnostic', label: 'Diagnose what’s actually breaking.' },
        { value: 'somatic', label: 'My body back.' },
      ],
    },
    q7: {
      eyebrow: '07 / 07',
      prompt: 'How do you want to show up in 90 days?',
      placeholder: 'One sentence. No jargon.',
      maxChars: 200,
    },
  },
  output: {
    eyebrow: '01 / Diagnosis',
    youSaid: 'You said',
    biggestLeak: 'Your biggest leak this week',
    oneLever: 'One lever · name it, date it, move by Friday',
    principleBreaking: 'The principle that’s breaking',
    serviceFits: 'The service that fits',
    signatureName: 'Vedra',
    signatureLocation: 'Zagreb · 2026',
    bookCta: 'Book the real 15-min audit',
    sendCta: 'Send this to myself',
    sendPlaceholder: 'name@domain.com',
    sendSent: 'Sent.',
  },
  principles: {
    leadership: {
      title: 'Authority precedes permission.',
      breaking: 'You’re still asking for the authority you’re supposed to establish.',
    },
    somatic: {
      title: 'The body keeps your schedule.',
      breaking: 'Your calendar is winning a fight your body will eventually end.',
    },
    career: {
      title: 'A career is a system, not a ladder.',
      breaking: 'You’re treating a system like a ladder. No wonder it feels stuck.',
    },
    crisis: {
      title: 'Crisis runs on structure.',
      breaking: 'You’re trying to think your way through a moment that needs cadence, not clever.',
    },
    practice: {
      title: 'Generalists with discipline beat specialists without.',
      breaking: 'You’re running on one toolkit in a situation that needs two.',
    },
    diagnostic: {
      title: 'The loudest complaint is never the leak.',
      breaking: 'The loudest complaint has been getting all the attention. It isn’t the leak.',
    },
  },
  services: {
    'first-100-days': {
      title: 'First 100 Days · Authority Accelerator',
      description:
        'Day-one authority protocol. 90-day execution plan. Stakeholder map before your first 1:1.',
    },
    audit: {
      title: 'High-Performance Audit',
      description: 'Fifteen minutes. Free. One lever named and dated. Usually bookable this week.',
    },
    career: {
      title: 'Individual Career Counseling',
      description:
        'Positioning, inventory, next move — with the numbers to back it. Monthly 1:1s through the transition.',
    },
    household: {
      title: 'Strategic Household Operations',
      description:
        'RACI your family. Kanban the logistics. For homes running on wishful thinking.',
    },
    'crisis-support': {
      title: 'Crisis Support',
      description:
        'Business continuity for the things business doesn’t name. Bespoke. Direct phone access.',
    },
  },
  leakCopy: {
    calendar: {
      biggestLeak: 'A calendar dressed up as “priorities.”',
      oneLever: 'Cancel one recurring meeting this week. Not delegate. Cancel.',
      oneLeverLow:
        'Pick the one recurring meeting that drained you most last week. Cancel it. Nothing else this week.',
    },
    sleep: {
      biggestLeak: 'Sleep you already traded away months ago.',
      oneLever: 'Move one thing off tomorrow’s morning. Sleep the extra 45 minutes.',
      oneLeverLow:
        'One night this week: phone in another room, lights down by nine. One night. Just to prove it’s possible.',
    },
    relationships: {
      biggestLeak: 'A relationship running on last year’s contract.',
      oneLever: 'One hard conversation. Date it by Friday. Five sentences, written first.',
      oneLeverLow:
        'One message, not a meeting. Five sentences. The one thing that needs to be named — named.',
    },
    role: {
      biggestLeak: 'A role that outgrew you, or you outgrew it — and nobody wrote the update.',
      oneLever:
        'Name one thing you will stop doing in this role. In writing. Before Friday. Tell one person.',
      oneLeverLow:
        'Write down what this role actually asks of you today. Not the job description — reality. One page.',
    },
    'nervous-system': {
      biggestLeak: 'A nervous system sending signals your calendar refuses to read.',
      oneLever:
        'Three minutes of slow exhale breathing, twice a day, for five days. Then we talk again.',
      oneLeverLow:
        'Two minutes. Once a day. Exhale longer than you inhale. That is the whole lever this week.',
    },
    unnamed: {
      biggestLeak: 'The thing you haven’t named yet. That is always the leak.',
      oneLever:
        'Write the thing in one line. Send that line to yourself. You now have a document.',
      oneLeverLow:
        'Write the thing in one line. You do not have to solve it. You have to name it. That is the lever.',
    },
  },
}

// ————— HR content (TODO: Vedra to translate/refine) —————
// For now the HR route reuses EN content — keeps structure intact for a later pass.

const hr: AuditContent = en

// ————— Export by lang —————

export const audit: Record<Lang, AuditContent> = { en, hr }

// ————— Principle → Service mapping —————

export const principleToService: Record<Principle, Service> = {
  leadership: 'first-100-days',
  somatic: 'audit',
  career: 'career',
  crisis: 'crisis-support',
  practice: 'household',
  diagnostic: 'audit',
}
