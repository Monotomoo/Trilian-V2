import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import type {
  Answers,
  AuditContent,
  LeakSite,
  Principle,
  SomaticAnswer,
} from './audit-data'

type Props = {
  content: AuditContent
  step: number
  total: number
  answers: Answers
  onAnswer: (q: keyof Answers, value: Answers[keyof Answers]) => void
  onNext: () => void
  onBack: () => void
  onBeginFromIntro?: () => void
}

const STEP_KEYS: (keyof Answers)[] = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7']

function canAdvance(step: number, answers: Answers): boolean {
  const key = STEP_KEYS[step]
  const v = answers[key]
  if (v === undefined) return step === 1 // q2 (slider) has a sensible default
  if (Array.isArray(v)) return v.length > 0
  if (typeof v === 'string') return v.trim().length > 0
  return true
}

export default function AuditStep({
  content,
  step,
  total,
  answers,
  onAnswer,
  onNext,
  onBack,
}: Props) {
  const { questions } = content

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Enter advances (Shift+Enter allowed for textareas so we check target tag)
    if (e.key === 'Enter' && !e.shiftKey) {
      const tag = (e.target as HTMLElement).tagName
      if (tag !== 'TEXTAREA' && canAdvance(step, answers)) {
        e.preventDefault()
        onNext()
      }
    }
  }

  let input: React.ReactNode = null
  let eyebrow = ''
  let prompt = ''

  if (step === 0) {
    eyebrow = questions.q1.eyebrow
    prompt = questions.q1.prompt
    input = (
      <RadioGrid
        options={questions.q1.options}
        value={answers.q1}
        onChange={(v) => onAnswer('q1', v)}
      />
    )
  } else if (step === 1) {
    eyebrow = questions.q2.eyebrow
    prompt = questions.q2.prompt
    input = (
      <Slider
        value={answers.q2 ?? 5}
        minLabel={questions.q2.minLabel}
        maxLabel={questions.q2.maxLabel}
        onChange={(v) => onAnswer('q2', v)}
      />
    )
  } else if (step === 2) {
    eyebrow = questions.q3.eyebrow
    prompt = questions.q3.prompt
    input = (
      <MultiGrid
        options={questions.q3.options}
        help={questions.q3.help}
        value={answers.q3 ?? []}
        maxSelect={2}
        onChange={(v) => onAnswer('q3', v)}
      />
    )
  } else if (step === 3) {
    eyebrow = questions.q4.eyebrow
    prompt = questions.q4.prompt
    input = (
      <RadioRow
        options={questions.q4.options}
        value={answers.q4}
        onChange={(v) => onAnswer('q4', v)}
      />
    )
  } else if (step === 4) {
    eyebrow = questions.q5.eyebrow
    prompt = questions.q5.prompt
    input = (
      <TextField
        value={answers.q5 ?? ''}
        placeholder={questions.q5.placeholder}
        maxChars={questions.q5.maxChars}
        onChange={(v) => onAnswer('q5', v)}
      />
    )
  } else if (step === 5) {
    eyebrow = questions.q6.eyebrow
    prompt = questions.q6.prompt
    input = (
      <RadioGrid
        options={questions.q6.options}
        value={answers.q6}
        onChange={(v) => onAnswer('q6', v)}
      />
    )
  } else if (step === 6) {
    eyebrow = questions.q7.eyebrow
    prompt = questions.q7.prompt
    input = (
      <TextField
        value={answers.q7 ?? ''}
        placeholder={questions.q7.placeholder}
        maxChars={questions.q7.maxChars}
        onChange={(v) => onAnswer('q7', v)}
      />
    )
  }

  const advanceEnabled = canAdvance(step, answers)
  const isLast = step === total - 1

  return (
    <section
      className="mx-auto max-w-[1440px] px-6 md:px-12 min-h-[82vh] flex flex-col justify-center py-20"
      onKeyDown={handleKeyDown}
    >
      <div className="mx-auto w-full max-w-[820px]">
        <Progress step={step} total={total} />

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-micro)',
            color: 'var(--color-ink-mute)',
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
            marginTop: '2.5rem',
            marginBottom: '1.25rem',
          }}
        >
          {eyebrow}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4.5vw, 3.75rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            fontWeight: 400,
            color: 'var(--color-ink)',
            margin: '0 0 3rem 0',
            fontVariationSettings: '"opsz" 64, "SOFT" 50, "WONK" 0',
            maxWidth: '22ch',
          }}
        >
          {prompt}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {input}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 pt-6 border-t flex items-center justify-between"
          style={{ borderColor: 'var(--color-hairline)' }}
        >
          <button
            type="button"
            onClick={onBack}
            className="audit-step-btn-secondary"
          >
            <span aria-hidden>←</span>
            {content.meta.back}
          </button>

          <button
            type="button"
            onClick={onNext}
            disabled={!advanceEnabled}
            className="audit-step-btn-primary"
          >
            <span>{isLast ? 'Diagnose' : content.meta.next}</span>
            <span aria-hidden>→</span>
          </button>
        </motion.div>
      </div>

      <style>{`
        .audit-step-btn-secondary {
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
        .audit-step-btn-secondary:hover,
        .audit-step-btn-secondary:focus-visible {
          color: var(--color-ink);
        }

        .audit-step-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--color-ink);
          color: var(--color-bone);
          padding: 0.85rem 1.75rem;
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
          transition: opacity 300ms;
        }
        .audit-step-btn-primary:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }
        .audit-step-btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--color-moss);
          transform: translateY(101%);
          transition: transform 380ms cubic-bezier(0.16, 1, 0.3, 1);
          z-index: -1;
        }
        .audit-step-btn-primary:hover:not(:disabled)::before,
        .audit-step-btn-primary:focus-visible:not(:disabled)::before {
          transform: translateY(0);
        }
      `}</style>
    </section>
  )
}

// ————— Progress —————

function Progress({ step, total }: { step: number; total: number }) {
  return (
    <div
      className="flex items-center gap-2"
      role="progressbar"
      aria-valuenow={step + 1}
      aria-valuemin={1}
      aria-valuemax={total}
    >
      {Array.from({ length: total }).map((_, i) => {
        const state = i < step ? 'done' : i === step ? 'current' : 'upcoming'
        return (
          <motion.span
            key={i}
            animate={
              state === 'current'
                ? { scale: [1, 1.4, 1], opacity: [0.9, 1, 0.9] }
                : { scale: 1 }
            }
            transition={
              state === 'current'
                ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
                : undefined
            }
            aria-hidden
            style={{
              width: state === 'current' ? 8 : 6,
              height: state === 'current' ? 8 : 6,
              borderRadius: '50%',
              background:
                state === 'current'
                  ? 'var(--color-ochre)'
                  : state === 'done'
                  ? 'var(--color-moss)'
                  : 'transparent',
              border:
                state === 'upcoming'
                  ? '1px solid color-mix(in srgb, var(--color-moss) 40%, transparent)'
                  : 'none',
              transition: 'width 300ms, height 300ms',
            }}
          />
        )
      })}
    </div>
  )
}

// ————— Radio grid (2 columns, cards) —————

function RadioGrid<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly { value: T; label: string }[]
  value: T | undefined
  onChange: (v: T) => void
}) {
  return (
    <div
      role="radiogroup"
      className="grid grid-cols-1 md:grid-cols-2 gap-3"
    >
      {options.map((opt) => {
        const selected = value === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(opt.value)}
            className="audit-option-btn"
            data-selected={selected ? 'true' : undefined}
          >
            <span className="audit-option-mark" aria-hidden />
            <span className="audit-option-label">{opt.label}</span>
          </button>
        )
      })}
      <OptionStyles />
    </div>
  )
}

// ————— Radio row (horizontal chips for somatic baseline) —————

function RadioRow<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly { value: T; label: string }[]
  value: T | undefined
  onChange: (v: T) => void
}) {
  return (
    <div role="radiogroup" className="flex flex-wrap gap-3">
      {options.map((opt) => {
        const selected = value === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(opt.value)}
            className="audit-chip"
            data-selected={selected ? 'true' : undefined}
          >
            {opt.label}
          </button>
        )
      })}
      <OptionStyles />
    </div>
  )
}

// ————— Multi-select grid (up to N) —————

function MultiGrid({
  options,
  help,
  value,
  maxSelect,
  onChange,
}: {
  options: readonly { value: LeakSite; label: string }[]
  help: string
  value: LeakSite[]
  maxSelect: number
  onChange: (v: LeakSite[]) => void
}) {
  const toggle = (v: LeakSite) => {
    const already = value.includes(v)
    if (already) {
      onChange(value.filter((x) => x !== v))
    } else if (value.length < maxSelect) {
      onChange([...value, v])
    } else {
      // Replace the earliest selection (FIFO) when at cap
      onChange([...value.slice(1), v])
    }
  }

  return (
    <div>
      <div
        className="mb-4"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-micro)',
          color: 'var(--color-ink-mute)',
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
        }}
      >
        {help}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {options.map((opt) => {
          const selected = value.includes(opt.value)
          return (
            <button
              key={opt.value}
              type="button"
              role="checkbox"
              aria-checked={selected}
              onClick={() => toggle(opt.value)}
              className="audit-option-btn"
              data-selected={selected ? 'true' : undefined}
            >
              <span className="audit-option-mark" aria-hidden />
              <span className="audit-option-label">{opt.label}</span>
            </button>
          )
        })}
      </div>
      <OptionStyles />
    </div>
  )
}

// ————— Slider 1-10 —————

function Slider({
  value,
  minLabel,
  maxLabel,
  onChange,
}: {
  value: number
  minLabel: string
  maxLabel: string
  onChange: (v: number) => void
}) {
  // Commit the current slider value immediately — even if untouched, so Next
  // advances with a sensible default and scoring can rely on q2 being set.
  useEffect(() => {
    onChange(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      <input
        type="range"
        min={1}
        max={10}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.currentTarget.value))}
        aria-label="Energy level"
        className="audit-slider"
      />
      <div className="mt-4 flex items-center justify-between">
        <span className="audit-slider-label">{minLabel}</span>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 3vw, 2.75rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            color: 'var(--color-moss)',
            lineHeight: 1,
            fontVariationSettings: '"opsz" 48, "SOFT" 80, "WONK" 1',
          }}
        >
          {value}
        </span>
        <span className="audit-slider-label">{maxLabel}</span>
      </div>
      <style>{`
        .audit-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 2px;
          background: color-mix(in srgb, var(--color-moss) 22%, transparent);
          border-radius: 2px;
          outline: none;
          cursor: pointer;
        }
        .audit-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--color-ochre);
          border: 2px solid var(--color-bone);
          box-shadow: 0 0 0 1px color-mix(in srgb, var(--color-moss) 40%, transparent);
          cursor: pointer;
          transition: transform 240ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .audit-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        .audit-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--color-ochre);
          border: 2px solid var(--color-bone);
          cursor: pointer;
        }
        .audit-slider-label {
          font-family: var(--font-mono);
          font-size: var(--text-micro);
          color: var(--color-ink-mute);
          text-transform: uppercase;
          letter-spacing: 0.14em;
          max-width: 12ch;
        }
      `}</style>
    </div>
  )
}

// ————— Textarea —————

function TextField({
  value,
  placeholder,
  maxChars,
  onChange,
}: {
  value: string
  placeholder: string
  maxChars: number
  onChange: (v: string) => void
}) {
  const ref = useRef<HTMLTextAreaElement | null>(null)

  // Autofocus when mounted
  useEffect(() => {
    const t = window.setTimeout(() => ref.current?.focus(), 300)
    return () => window.clearTimeout(t)
  }, [])

  const remaining = maxChars - value.length

  return (
    <div>
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => {
          const next = e.currentTarget.value.slice(0, maxChars)
          onChange(next)
        }}
        placeholder={placeholder}
        rows={3}
        className="w-full resize-none"
        style={{
          background: 'transparent',
          border: 'none',
          borderBottom: '1px solid var(--color-hairline)',
          padding: '0.75rem 0',
          fontSize: 'clamp(1.125rem, 1.6vw, 1.375rem)',
          fontFamily: 'var(--font-ui)',
          color: 'var(--color-ink)',
          outline: 'none',
          lineHeight: 1.5,
        }}
      />
      <div
        className="mt-2 text-right"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-micro)',
          color: 'var(--color-ink-mute)',
          letterSpacing: '0.08em',
        }}
      >
        {remaining} left
      </div>
    </div>
  )
}

// ————— Shared option styles (card + chip) —————

function OptionStyles() {
  return (
    <style>{`
      .audit-option-btn {
        display: flex;
        align-items: flex-start;
        gap: 0.85rem;
        text-align: left;
        background: transparent;
        border: 1px solid var(--color-hairline);
        padding: 1.1rem 1.2rem;
        border-radius: 3px;
        cursor: pointer;
        font-family: var(--font-ui);
        color: var(--color-ink);
        transition: border-color 260ms, background 260ms, transform 260ms;
      }
      .audit-option-btn:hover,
      .audit-option-btn:focus-visible {
        border-color: color-mix(in srgb, var(--color-moss) 55%, transparent);
        background: color-mix(in srgb, var(--color-moss) 3%, transparent);
        outline: none;
      }
      .audit-option-btn[data-selected] {
        border-color: var(--color-moss);
        background: color-mix(in srgb, var(--color-moss) 6%, transparent);
      }
      .audit-option-mark {
        flex-shrink: 0;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 1px solid color-mix(in srgb, var(--color-moss) 50%, transparent);
        margin-top: 0.32rem;
        position: relative;
        transition: background 260ms, border-color 260ms;
      }
      .audit-option-btn[data-selected] .audit-option-mark {
        border-color: var(--color-moss);
      }
      .audit-option-btn[data-selected] .audit-option-mark::after {
        content: '';
        position: absolute;
        inset: 3px;
        border-radius: 50%;
        background: var(--color-ochre);
      }
      .audit-option-label {
        font-size: 1rem;
        line-height: 1.45;
      }

      .audit-chip {
        background: transparent;
        border: 1px solid var(--color-hairline);
        padding: 0.7rem 1.1rem;
        border-radius: 999px;
        cursor: pointer;
        font-family: var(--font-ui);
        font-size: 0.9375rem;
        color: var(--color-ink);
        transition: border-color 240ms, background 240ms;
      }
      .audit-chip:hover,
      .audit-chip:focus-visible {
        border-color: color-mix(in srgb, var(--color-moss) 55%, transparent);
        outline: none;
      }
      .audit-chip[data-selected] {
        border-color: var(--color-moss);
        background: var(--color-moss);
        color: var(--color-bone);
      }
    `}</style>
  )
}
