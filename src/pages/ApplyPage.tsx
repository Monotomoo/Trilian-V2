import { useEffect, useReducer, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  apply,
  type ApplyAnswers,
  type ApplyContent,
  type ApplyQuestion,
  composeLetter,
  isValidEmail,
  questionComplete,
} from '../components/apply/apply-data'
import LangToggle from '../components/LangToggle'
import type { Lang } from '../../content/strings'

const VEDRA_EMAIL = 'vedra.re.ondrusek@gmail.com'
const TOTAL_STEPS = 6

type State =
  | { phase: 'intro'; answers: ApplyAnswers }
  | { phase: 'writing'; step: number; answers: ApplyAnswers }
  | { phase: 'review'; answers: ApplyAnswers }
  | { phase: 'sent'; answers: ApplyAnswers }

type Action =
  | { type: 'begin' }
  | { type: 'answer'; q: keyof ApplyAnswers; value: string }
  | { type: 'next' }
  | { type: 'back' }
  | { type: 'jumpTo'; step: number }
  | { type: 'review' }
  | { type: 'edit' }
  | { type: 'sent' }
  | { type: 'restart' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'begin':
      return { phase: 'writing', step: 0, answers: state.answers }
    case 'answer': {
      const answers = { ...state.answers, [action.q]: action.value }
      if (state.phase === 'writing') return { ...state, answers }
      if (state.phase === 'review') return { ...state, answers }
      return state
    }
    case 'next': {
      if (state.phase !== 'writing') return state
      if (state.step < TOTAL_STEPS - 1) return { ...state, step: state.step + 1 }
      return { phase: 'review', answers: state.answers }
    }
    case 'back': {
      if (state.phase === 'writing' && state.step === 0) {
        return { phase: 'intro', answers: state.answers }
      }
      if (state.phase === 'writing') return { ...state, step: state.step - 1 }
      if (state.phase === 'review') {
        return { phase: 'writing', step: TOTAL_STEPS - 1, answers: state.answers }
      }
      return state
    }
    case 'jumpTo':
      return { phase: 'writing', step: action.step, answers: state.answers }
    case 'review':
      return { phase: 'review', answers: state.answers }
    case 'edit':
      if (state.phase !== 'review') return state
      return { phase: 'writing', step: 0, answers: state.answers }
    case 'sent':
      return { phase: 'sent', answers: state.answers }
    case 'restart':
      return { phase: 'intro', answers: {} }
    default:
      return state
  }
}

function useLangFromPath(): Lang {
  const { pathname } = useLocation()
  return pathname.startsWith('/hr') ? 'hr' : 'en'
}

export default function ApplyPage() {
  const lang = useLangFromPath()
  const content = apply[lang]

  const [state, dispatch] = useReducer(reducer, { phase: 'intro', answers: {} })

  // Scroll to top on phase / step change.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [state.phase, state.phase === 'writing' ? state.step : null])

  return (
    <main
      className="relative min-h-[100dvh] overflow-x-hidden"
      style={{ background: 'var(--color-bone-warm)' }}
    >
      <div aria-hidden className="hero-ambient-a" />
      <div aria-hidden className="hero-ambient-b" />
      <div aria-hidden className="absolute inset-0 pointer-events-none grain-overlay" />

      {/* Top bar */}
      <div className="relative z-20 mx-auto max-w-[1440px] px-6 md:px-12 pt-6 md:pt-8 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-baseline gap-2.5 group"
          style={{ textDecoration: 'none', color: 'var(--color-ink)' }}
        >
          <span
            aria-hidden
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'var(--color-moss)',
              display: 'inline-block',
              alignSelf: 'center',
              transform: 'translateY(1px)',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.0625rem',
              fontWeight: 500,
              letterSpacing: '-0.01em',
              fontVariationSettings: '"opsz" 14, "SOFT" 30',
            }}
          >
            Trillian HR
          </span>
          <span
            className="hidden sm:inline"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-micro)',
              color: 'var(--color-ink-mute)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            / Apply
          </span>
        </Link>

        <LangToggle />
      </div>

      {/* Vertical progress spine — only during writing phase */}
      {state.phase === 'writing' && (
        <ProgressSpine
          step={state.step}
          total={TOTAL_STEPS}
          onJumpTo={(s) => dispatch({ type: 'jumpTo', step: s })}
          answers={state.answers}
          questions={content.questions}
        />
      )}

      {/* Phase content — plain conditional render for now */}
      <div className="relative z-10">
        {state.phase === 'intro' && (
          <Intro content={content} onBegin={() => dispatch({ type: 'begin' })} />
        )}
        {state.phase === 'writing' && (
          <StepView
            key={`step-${state.step}`}
            content={content}
            question={content.questions[state.step]}
            step={state.step}
            total={TOTAL_STEPS}
            value={
              state.answers[
                (`q${Number(content.questions[state.step].index)}`) as keyof ApplyAnswers
              ] as string | undefined
            }
            onChange={(v) =>
              dispatch({
                type: 'answer',
                q: (`q${Number(content.questions[state.step].index)}`) as keyof ApplyAnswers,
                value: v,
              })
            }
            onNext={() => dispatch({ type: 'next' })}
            onBack={() => dispatch({ type: 'back' })}
          />
        )}
        {state.phase === 'review' && (
          <ReviewView
            content={content}
            answers={state.answers}
            onAnswer={(q, v) => dispatch({ type: 'answer', q, value: v })}
            onBackToEdit={() => dispatch({ type: 'back' })}
            onJumpTo={(s) => dispatch({ type: 'jumpTo', step: s })}
            onSent={() => dispatch({ type: 'sent' })}
          />
        )}
        {state.phase === 'sent' && (
          <SentView content={content} onRestart={() => dispatch({ type: 'restart' })} />
        )}
      </div>

      <ApplyStyles />
    </main>
  )
}

// ————— Intro —————

function Intro({
  content,
  onBegin,
}: {
  content: ApplyContent
  onBegin: () => void
}) {
  return (
    <section className="mx-auto max-w-[1440px] px-6 md:px-12 min-h-[82vh] flex flex-col justify-center py-20">
      <div className="mx-auto w-full max-w-[760px] text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-3 mb-8 flex-wrap"
        >
          <span
            aria-hidden
            style={{ width: 28, height: 1, background: 'var(--color-moss)', opacity: 0.5 }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-micro)',
              color: 'var(--color-ink-mute)',
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
            }}
          >
            {content.meta.eyebrow}
          </span>
          <span
            aria-hidden
            style={{ width: 28, height: 1, background: 'var(--color-moss)', opacity: 0.5 }}
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.75rem, 7.5vw, 6.5rem)',
            lineHeight: 1,
            letterSpacing: '-0.03em',
            fontWeight: 400,
            color: 'var(--color-ink)',
            margin: 0,
            fontStyle: 'italic',
            fontVariationSettings: '"opsz" 96, "SOFT" 80, "WONK" 1',
          }}
        >
          {content.meta.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 'clamp(1.0625rem, 1.35vw, 1.1875rem)',
            lineHeight: 1.6,
            color: 'var(--color-ink-soft)',
            margin: '1.75rem auto 0',
            maxWidth: '56ch',
          }}
        >
          {content.meta.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-micro)',
            color: 'var(--color-ink-mute)',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
          }}
        >
          {content.meta.cohort}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex items-center justify-center"
        >
          <button type="button" onClick={onBegin} className="apply-begin-btn">
            <span>{content.meta.begin}</span>
            <span aria-hidden className="apply-begin-arrow">→</span>
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-10"
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.9375rem',
            color: 'var(--color-ink-mute)',
            fontStyle: 'italic',
          }}
        >
          {content.meta.note}
        </motion.p>
      </div>
    </section>
  )
}

// ————— Progress spine (vertical left-margin dots) —————

function ProgressSpine({
  step,
  total,
  onJumpTo,
  answers,
  questions,
}: {
  step: number
  total: number
  onJumpTo: (s: number) => void
  answers: ApplyAnswers
  questions: ApplyQuestion[]
}) {
  return (
    <div
      className="hidden md:block fixed left-6 lg:left-10 top-1/2 -translate-y-1/2 z-10"
      role="progressbar"
      aria-valuenow={step + 1}
      aria-valuemin={1}
      aria-valuemax={total}
    >
      <ol className="flex flex-col gap-5 list-none m-0 p-0">
        {Array.from({ length: total }).map((_, i) => {
          const q = questions[i]
          const v = answers[(`q${Number(q.index)}`) as keyof ApplyAnswers] as string | undefined
          const hasContent = !!v && v.trim().length > 0
          const isCurrent = i === step
          const isDone = hasContent || i < step

          return (
            <li key={i} className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onJumpTo(i)}
                aria-label={`Jump to question ${i + 1}`}
                className="apply-spine-btn"
                data-current={isCurrent ? 'true' : undefined}
                data-done={isDone && !isCurrent ? 'true' : undefined}
              >
                <motion.span
                  aria-hidden
                  className="apply-spine-dot"
                  animate={
                    isCurrent
                      ? { scale: [1, 1.45, 1], opacity: [0.9, 1, 0.9] }
                      : { scale: 1 }
                  }
                  transition={
                    isCurrent
                      ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
                      : undefined
                  }
                />
                <span className="apply-spine-num">{q.index}</span>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

// ————— Step view —————

function StepView({
  content,
  question,
  step,
  total,
  value,
  onChange,
  onNext,
  onBack,
}: {
  content: ApplyContent
  question: ApplyQuestion
  step: number
  total: number
  value: string | undefined
  onChange: (v: string) => void
  onNext: () => void
  onBack: () => void
}) {
  const ref = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    const t = window.setTimeout(() => ref.current?.focus(), 400)
    return () => window.clearTimeout(t)
  }, [step])

  const complete = questionComplete(question, value)
  const isLast = step === total - 1
  const showCount = (value ?? '').length > 0

  return (
    <section className="mx-auto max-w-[1440px] px-6 md:px-12 min-h-[82vh] flex flex-col justify-center py-20">
      <div className="mx-auto w-full max-w-[760px]">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-8"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-micro)',
            color: 'var(--color-ink-mute)',
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
          }}
        >
          <span>Application · {question.index} of {String(total).padStart(2, '0')}</span>
          {!question.required && (
            <>
              <span aria-hidden style={{ opacity: 0.5 }}>·</span>
              <span style={{ color: 'var(--color-moss)' }}>{content.meta.optional}</span>
            </>
          )}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            lineHeight: 1.02,
            letterSpacing: '-0.028em',
            fontWeight: 400,
            color: 'var(--color-ink)',
            margin: '0 0 2.5rem 0',
            fontStyle: 'italic',
            fontVariationSettings: '"opsz" 64, "SOFT" 70, "WONK" 1',
          }}
        >
          {question.prompt}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <textarea
            ref={ref}
            value={value ?? ''}
            onChange={(e) => onChange(e.currentTarget.value.slice(0, question.maxChars))}
            placeholder={question.placeholder}
            rows={7}
            className="w-full resize-none apply-textarea"
          />
          <div className="mt-2 flex justify-end">
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-micro)',
                color: 'var(--color-ink-mute)',
                letterSpacing: '0.08em',
                opacity: showCount ? 1 : 0,
                transition: 'opacity 300ms',
              }}
            >
              {(value ?? '').length} / {question.maxChars}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 pt-6 border-t flex items-center justify-between"
          style={{ borderColor: 'var(--color-hairline)' }}
        >
          <button type="button" onClick={onBack} className="apply-btn-secondary">
            <span aria-hidden>←</span>
            {content.meta.back}
          </button>

          <button
            type="button"
            onClick={onNext}
            disabled={!complete}
            className="apply-btn-primary"
          >
            <span>{isLast ? content.meta.review : content.meta.next}</span>
            <span aria-hidden>→</span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}

// ————— Review view —————

function ReviewView({
  content,
  answers,
  onAnswer,
  onBackToEdit,
  onJumpTo,
  onSent,
}: {
  content: ApplyContent
  answers: ApplyAnswers
  onAnswer: (q: keyof ApplyAnswers, v: string) => void
  onBackToEdit: () => void
  onJumpTo: (s: number) => void
  onSent: () => void
}) {
  const [attempted, setAttempted] = useState(false)
  const nameOk = !!answers.name && answers.name.trim().length > 0
  const emailOk = !!answers.email && isValidEmail(answers.email)
  const canSend = nameOk && emailOk

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    setAttempted(true)
    if (!canSend) return
    const letter = composeLetter(content, answers)
    const replyLine = `\n\n—\nReply to: ${answers.email!.trim()}`
    const body = encodeURIComponent(letter + replyLine)
    const subject = encodeURIComponent(
      `Founding cohort application — ${answers.name!.trim()}`
    )
    window.location.href = `mailto:${VEDRA_EMAIL}?subject=${subject}&body=${body}`
    onSent()
  }

  return (
    <section className="mx-auto max-w-[1440px] px-6 md:px-12 py-20 md:py-28">
      <div className="mx-auto w-full max-w-[760px]">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-micro)',
            color: 'var(--color-ink-mute)',
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
          }}
        >
          <span
            aria-hidden
            style={{ width: 24, height: 1, background: 'var(--color-moss)', opacity: 0.6 }}
          />
          Application · Draft
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4.2vw, 3.25rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            fontWeight: 400,
            color: 'var(--color-ink)',
            margin: '1.25rem 0 1rem 0',
            fontVariationSettings: '"opsz" 48, "SOFT" 50',
          }}
        >
          {content.reviewHeadline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '1.0625rem',
            lineHeight: 1.6,
            color: 'var(--color-ink-soft)',
            margin: 0,
            maxWidth: '54ch',
          }}
        >
          {content.reviewSub}
        </motion.p>

        {/* The letter */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 pt-10 border-t"
          style={{ borderColor: 'var(--color-hairline)' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.25rem, 1.8vw, 1.5rem)',
              fontStyle: 'italic',
              color: 'var(--color-moss-deep)',
              margin: 0,
              fontVariationSettings: '"opsz" 24, "SOFT" 80, "WONK" 1',
            }}
          >
            {content.meta.salutation}
          </p>

          <div className="mt-10 space-y-8">
            {content.questions.map((q, i) => {
              const key = (`q${Number(q.index)}`) as keyof ApplyAnswers
              const v = (answers[key] as string | undefined)?.trim()
              if (!v) return null
              return (
                <div key={q.index}>
                  <button
                    type="button"
                    onClick={() => onJumpTo(i)}
                    className="apply-review-edit"
                    aria-label={`Edit ${q.letterLabel}`}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-micro)',
                        color: 'var(--color-ink-mute)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.14em',
                      }}
                    >
                      {q.letterLabel}
                    </span>
                    <span className="apply-review-edit-mark" aria-hidden>
                      Edit
                    </span>
                  </button>
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '1.0625rem',
                      lineHeight: 1.65,
                      color: 'var(--color-ink)',
                      margin: '0.5rem 0 0 0',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {v}
                  </p>
                </div>
              )
            })}
          </div>

          <div
            className="mt-12"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.125rem, 1.5vw, 1.3125rem)',
              fontStyle: 'italic',
              color: 'var(--color-ink-soft)',
              fontVariationSettings: '"opsz" 24, "SOFT" 80, "WONK" 1',
            }}
          >
            {content.meta.signature}
          </div>

          {/* Name + email */}
          <form onSubmit={handleSend} className="mt-8 pt-8 border-t space-y-8" style={{ borderColor: 'var(--color-hairline)' }}>
            <div>
              <label
                htmlFor="applicant-name"
                className="apply-input-label"
              >
                {content.meta.nameLabel}
              </label>
              <input
                id="applicant-name"
                type="text"
                value={answers.name ?? ''}
                onChange={(e) => onAnswer('name', e.currentTarget.value)}
                placeholder={content.meta.namePlaceholder}
                required
                className="apply-input"
                data-error={attempted && !nameOk ? 'true' : undefined}
              />
            </div>

            <div>
              <label
                htmlFor="applicant-email"
                className="apply-input-label"
              >
                {content.meta.emailLabel}
              </label>
              <input
                id="applicant-email"
                type="email"
                value={answers.email ?? ''}
                onChange={(e) => onAnswer('email', e.currentTarget.value)}
                placeholder={content.meta.emailPlaceholder}
                required
                className="apply-input"
                data-error={attempted && !emailOk ? 'true' : undefined}
              />
            </div>

            <div className="pt-4 flex items-center justify-between gap-6 flex-wrap">
              <button
                type="button"
                onClick={onBackToEdit}
                className="apply-btn-secondary"
              >
                <span aria-hidden>←</span>
                {content.meta.continueWriting}
              </button>

              <button type="submit" className="apply-btn-primary" disabled={!canSend}>
                <span>{content.meta.send}</span>
                <span aria-hidden>↗</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

// ————— Sent view —————

function SentView({
  content,
  onRestart,
}: {
  content: ApplyContent
  onRestart: () => void
}) {
  return (
    <section className="mx-auto max-w-[1440px] px-6 md:px-12 min-h-[82vh] flex flex-col justify-center py-20">
      <div className="mx-auto w-full max-w-[620px] text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center mb-10"
        >
          <motion.svg width="96" height="96" viewBox="0 0 96 96" aria-hidden>
            <motion.circle
              cx={48}
              cy={48}
              r={36}
              fill="none"
              stroke="var(--color-moss)"
              strokeWidth="0.8"
              animate={{ r: [36, 44, 36], opacity: [0.6, 0.2, 0.6] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.circle
              cx={48}
              cy={48}
              r={22}
              fill="none"
              stroke="var(--color-moss)"
              strokeWidth="1"
              animate={{ r: [22, 26, 22], opacity: [0.8, 0.5, 0.8] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
            />
            <motion.circle
              cx={48}
              cy={48}
              r={5}
              fill="var(--color-ochre)"
              animate={{ r: [5, 6.5, 5], opacity: [0.9, 1, 0.9] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.svg>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            fontWeight: 400,
            color: 'var(--color-ink)',
            margin: 0,
            fontStyle: 'italic',
            fontVariationSettings: '"opsz" 48, "SOFT" 80, "WONK" 1',
          }}
        >
          {content.meta.sent}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '1.0625rem',
            lineHeight: 1.6,
            color: 'var(--color-ink-soft)',
            margin: '1.5rem auto 0',
            maxWidth: '48ch',
          }}
        >
          {content.meta.sentNote}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-12 flex items-center justify-center gap-6 flex-wrap"
        >
          <Link to="/" className="apply-btn-secondary" style={{ textDecoration: 'none' }}>
            ← Back to home
          </Link>
          <button type="button" onClick={onRestart} className="apply-btn-secondary">
            Write another
          </button>
        </motion.div>
      </div>
    </section>
  )
}

// ————— Styles —————

function ApplyStyles() {
  return (
    <style>{`
      .apply-begin-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.8rem;
        background: var(--color-ink);
        color: var(--color-bone);
        padding: 1rem 2.25rem;
        font-size: 0.9375rem;
        font-weight: 500;
        border: none;
        border-radius: 2px;
        cursor: pointer;
        font-family: var(--font-ui);
        letter-spacing: 0.02em;
        position: relative;
        overflow: hidden;
        isolation: isolate;
      }
      .apply-begin-btn::before {
        content: '';
        position: absolute;
        inset: 0;
        background: var(--color-moss);
        transform: translateY(101%);
        transition: transform 420ms cubic-bezier(0.16, 1, 0.3, 1);
        z-index: -1;
      }
      .apply-begin-btn:hover::before,
      .apply-begin-btn:focus-visible::before {
        transform: translateY(0);
      }
      .apply-begin-arrow {
        transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1);
        display: inline-block;
      }
      .apply-begin-btn:hover .apply-begin-arrow,
      .apply-begin-btn:focus-visible .apply-begin-arrow {
        transform: translateX(5px);
      }

      .apply-btn-primary {
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        background: var(--color-ink);
        color: var(--color-bone);
        padding: 0.95rem 1.9rem;
        font-size: 0.9375rem;
        font-weight: 500;
        border: none;
        border-radius: 2px;
        cursor: pointer;
        font-family: var(--font-ui);
        letter-spacing: 0.01em;
        position: relative;
        overflow: hidden;
        isolation: isolate;
      }
      .apply-btn-primary:disabled {
        opacity: 0.35;
        cursor: not-allowed;
      }
      .apply-btn-primary::before {
        content: '';
        position: absolute;
        inset: 0;
        background: var(--color-moss);
        transform: translateY(101%);
        transition: transform 380ms cubic-bezier(0.16, 1, 0.3, 1);
        z-index: -1;
      }
      .apply-btn-primary:hover:not(:disabled)::before,
      .apply-btn-primary:focus-visible:not(:disabled)::before {
        transform: translateY(0);
      }

      .apply-btn-secondary {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: transparent;
        border: none;
        padding: 0.5rem 0;
        font-family: var(--font-mono);
        font-size: var(--text-micro);
        color: var(--color-ink-mute);
        letter-spacing: 0.12em;
        text-transform: uppercase;
        cursor: pointer;
        transition: color 260ms;
      }
      .apply-btn-secondary:hover,
      .apply-btn-secondary:focus-visible {
        color: var(--color-ink);
      }

      .apply-textarea {
        background: transparent;
        border: none;
        border-bottom: 1px solid var(--color-hairline);
        padding: 0.85rem 0;
        font-size: clamp(1.125rem, 1.5vw, 1.3125rem);
        font-family: var(--font-ui);
        color: var(--color-ink);
        outline: none;
        line-height: 1.5;
        transition: border-color 240ms;
      }
      .apply-textarea:focus {
        border-bottom-color: var(--color-ink);
      }
      .apply-textarea::placeholder {
        color: var(--color-ink-mute);
        font-style: italic;
        opacity: 0.75;
      }

      .apply-input-label {
        display: block;
        font-family: var(--font-mono);
        font-size: var(--text-micro);
        color: var(--color-ink-mute);
        text-transform: uppercase;
        letter-spacing: 0.12em;
        margin-bottom: 0.75rem;
      }
      .apply-input {
        width: 100%;
        background: transparent;
        border: none;
        border-bottom: 1px solid var(--color-hairline);
        padding: 0.75rem 0;
        font-size: 1.0625rem;
        font-family: var(--font-ui);
        color: var(--color-ink);
        outline: none;
        transition: border-color 240ms;
        border-radius: 0;
      }
      .apply-input:focus {
        border-bottom-color: var(--color-ink);
      }
      .apply-input[data-error] {
        border-bottom-color: var(--color-ochre);
      }

      .apply-spine-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.8rem;
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0.3rem 0;
        color: var(--color-ink-mute);
        font-family: var(--font-mono);
        font-size: var(--text-micro);
        letter-spacing: 0.16em;
        text-transform: uppercase;
        transition: color 300ms;
      }
      .apply-spine-dot {
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: transparent;
        border: 1px solid color-mix(in srgb, var(--color-moss) 40%, transparent);
        transition: background 300ms, border-color 300ms, width 300ms, height 300ms;
      }
      .apply-spine-btn[data-done] .apply-spine-dot {
        background: var(--color-moss);
        border-color: var(--color-moss);
      }
      .apply-spine-btn[data-current] .apply-spine-dot {
        background: var(--color-ochre);
        border-color: var(--color-ochre);
        width: 10px;
        height: 10px;
      }
      .apply-spine-btn[data-current] {
        color: var(--color-ink);
      }
      .apply-spine-num {
        opacity: 0.5;
        transition: opacity 260ms;
      }
      .apply-spine-btn:hover .apply-spine-num,
      .apply-spine-btn[data-current] .apply-spine-num {
        opacity: 1;
      }

      .apply-review-edit {
        display: inline-flex;
        align-items: center;
        gap: 0.85rem;
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 0;
        position: relative;
      }
      .apply-review-edit-mark {
        font-family: var(--font-mono);
        font-size: var(--text-micro);
        color: var(--color-moss);
        text-transform: uppercase;
        letter-spacing: 0.14em;
        opacity: 0;
        transform: translateX(-6px);
        transition: opacity 260ms, transform 260ms;
      }
      .apply-review-edit:hover .apply-review-edit-mark,
      .apply-review-edit:focus-visible .apply-review-edit-mark {
        opacity: 1;
        transform: translateX(0);
      }

      @media (prefers-reduced-motion: reduce) {
        .apply-begin-btn::before,
        .apply-btn-primary::before,
        .apply-begin-arrow,
        .apply-spine-dot,
        .apply-review-edit-mark {
          transition: none !important;
        }
      }
    `}</style>
  )
}
