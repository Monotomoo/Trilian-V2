import { useEffect, useReducer } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { audit, type Answers, type Diagnosis } from '../components/audit/audit-data'
import { answersComplete, score } from '../components/audit/audit-scoring'
import AuditIntro from '../components/audit/AuditIntro'
import AuditStep from '../components/audit/AuditStep'
import AuditOutput from '../components/audit/AuditOutput'
import LangToggle from '../components/LangToggle'
import type { Lang } from '../../content/strings'

type State =
  | { phase: 'intro'; answers: Answers }
  | { phase: 'asking'; step: number; answers: Answers }
  | { phase: 'generating'; answers: Answers; diagnosis: Diagnosis }
  | { phase: 'output'; answers: Answers; diagnosis: Diagnosis }

type Action =
  | { type: 'begin' }
  | { type: 'answer'; q: keyof Answers; value: Answers[keyof Answers] }
  | { type: 'next' }
  | { type: 'back' }
  | { type: 'generate'; diagnosis: Diagnosis }
  | { type: 'reveal' }
  | { type: 'restart' }

const TOTAL_STEPS = 7

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'begin':
      // Seed q2 (slider) with a sensible default so scoring has a value even
      // if the user never touches the slider.
      return {
        phase: 'asking',
        step: 0,
        answers: { q2: 5, ...state.answers },
      }
    case 'answer': {
      if (state.phase !== 'asking') return state
      return { ...state, answers: { ...state.answers, [action.q]: action.value } }
    }
    case 'next': {
      if (state.phase !== 'asking') return state
      if (state.step < TOTAL_STEPS - 1) {
        return { ...state, step: state.step + 1 }
      }
      return state
    }
    case 'back': {
      if (state.phase === 'asking' && state.step === 0) {
        return { phase: 'intro', answers: state.answers }
      }
      if (state.phase === 'asking') {
        return { ...state, step: state.step - 1 }
      }
      return state
    }
    case 'generate':
      return { phase: 'generating', answers: state.answers, diagnosis: action.diagnosis }
    case 'reveal':
      if (state.phase !== 'generating') return state
      return { phase: 'output', answers: state.answers, diagnosis: state.diagnosis }
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

export default function AuditPage() {
  const lang = useLangFromPath()
  const content = audit[lang]

  const [state, dispatch] = useReducer(reducer, { phase: 'intro', answers: {} })

  // After reaching 'generating', wait a beat then reveal the diagnosis.
  useEffect(() => {
    if (state.phase !== 'generating') return
    const t = window.setTimeout(() => dispatch({ type: 'reveal' }), 1400)
    return () => window.clearTimeout(t)
  }, [state.phase])

  // Scroll to top on phase change for predictable layout.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [state.phase, state.phase === 'asking' ? state.step : null])

  const handleSubmit = () => {
    if (state.phase !== 'asking') return
    if (state.step < TOTAL_STEPS - 1) {
      dispatch({ type: 'next' })
      return
    }
    if (!answersComplete(state.answers)) return
    const diagnosis = score(state.answers, content)
    dispatch({ type: 'generate', diagnosis })
  }

  return (
    <main
      className="relative min-h-[100dvh] overflow-x-hidden"
      style={{ background: 'var(--color-bone)' }}
    >
      {/* Ambient drift */}
      <div aria-hidden className="hero-ambient-a" />
      <div aria-hidden className="hero-ambient-b" />

      {/* Grain */}
      <div aria-hidden className="absolute inset-0 pointer-events-none grain-overlay" />

      {/* Top bar — minimal */}
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
            Trillian
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
            / Audit
          </span>
        </Link>

        <LangToggle />
      </div>

      {/* Phase content */}
      <div className="relative z-10">
        <AnimatePresence mode="wait" initial={false}>
          {state.phase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <AuditIntro
                content={content}
                onBegin={() => dispatch({ type: 'begin' })}
              />
            </motion.div>
          )}

          {state.phase === 'asking' && (
            <motion.div
              key={`step-${state.step}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <AuditStep
                content={content}
                step={state.step}
                total={TOTAL_STEPS}
                answers={state.answers}
                onAnswer={(q, value) => dispatch({ type: 'answer', q, value })}
                onNext={handleSubmit}
                onBack={() => dispatch({ type: 'back' })}
                onBeginFromIntro={() => dispatch({ type: 'begin' })}
              />
            </motion.div>
          )}

          {state.phase === 'generating' && (
            <motion.div
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="mx-auto max-w-[1440px] px-6 md:px-12 min-h-[80vh] flex flex-col items-center justify-center"
            >
              <GeneratingPanel label={content.meta.generating} />
            </motion.div>
          )}

          {state.phase === 'output' && (
            <motion.div
              key="output"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <AuditOutput
                content={content}
                diagnosis={state.diagnosis}
                onRestart={() => dispatch({ type: 'restart' })}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}

function GeneratingPanel({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-10">
      <motion.svg width="180" height="180" viewBox="0 0 180 180" aria-hidden>
        <motion.circle
          cx={90}
          cy={90}
          r={72}
          fill="none"
          stroke="var(--color-moss)"
          strokeWidth="0.6"
          animate={{ r: [72, 82, 72], opacity: [0.35, 0.15, 0.35] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle
          cx={90}
          cy={90}
          r={48}
          fill="none"
          stroke="var(--color-moss)"
          strokeWidth="0.7"
          animate={{ r: [48, 55, 48], opacity: [0.55, 0.3, 0.55] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.25 }}
        />
        <motion.circle
          cx={90}
          cy={90}
          r={26}
          fill="none"
          stroke="var(--color-moss)"
          strokeWidth="0.9"
          animate={{ r: [26, 30, 26], opacity: [0.75, 0.5, 0.75] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
        <motion.circle
          cx={90}
          cy={90}
          r={4}
          fill="var(--color-ochre)"
          animate={{ r: [4, 5.5, 4], opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.svg>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-micro)',
          color: 'var(--color-ink-mute)',
          textTransform: 'uppercase',
          letterSpacing: '0.16em',
        }}
      >
        {label}
      </div>
    </div>
  )
}
