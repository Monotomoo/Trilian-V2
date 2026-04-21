import {
  type Answers,
  type AuditContent,
  type Diagnosis,
  type LeakSite,
  type Principle,
  type RequiredAnswers,
  type Service,
  principleToService,
} from './audit-data'

export function answersComplete(a: Answers): a is RequiredAnswers {
  return (
    a.q1 !== undefined &&
    a.q2 !== undefined &&
    Array.isArray(a.q3) && a.q3.length > 0 &&
    a.q4 !== undefined &&
    typeof a.q5 === 'string' && a.q5.trim().length > 0 &&
    a.q6 !== undefined &&
    typeof a.q7 === 'string' && a.q7.trim().length > 0
  )
}

function pickService(primary: Principle, confirmer: Principle): Service {
  // If Q1 and Q6 agree, use it. If they diverge, Q6 (what you'd move) wins —
  // it tells us what service she'd book, not which principle is breaking.
  return primary === confirmer ? principleToService[primary] : principleToService[confirmer]
}

export function score(answers: RequiredAnswers, content: AuditContent): Diagnosis {
  const primaryPrinciple = answers.q1
  const leakSite: LeakSite = answers.q3[0]
  const energy = answers.q2
  const somaticFlag = answers.q4 === 'longer' || answers.q4 === 'dont-remember'
  const recommendedService = pickService(primaryPrinciple, answers.q6)

  const leakCopy = content.leakCopy[leakSite]
  const oneLever = energy <= 4 ? leakCopy.oneLeverLow : leakCopy.oneLever

  const principle = content.principles[primaryPrinciple]
  const service = content.services[recommendedService]

  // If they flagged a long gap since caring for the body, add a body-first tag
  // onto the principle breaking copy — soft, not repeated verbatim.
  const principleBreaking = somaticFlag
    ? `${principle.breaking} And the body hasn’t had a say in a while.`
    : principle.breaking

  return {
    primaryPrinciple,
    leakSite,
    energy,
    somaticFlag,
    recommendedService,
    userQuote: answers.q5.trim(),
    biggestLeak: leakCopy.biggestLeak,
    oneLever,
    principleTitle: principle.title,
    principleBreaking,
    serviceTitle: service.title,
    serviceDescription: service.description,
    userVision: answers.q7.trim(),
  }
}

// Compose a plain-text version of the diagnosis for the mailto body.
export function diagnosisToText(d: Diagnosis, vedra = 'Vedra'): string {
  return [
    `You said:`,
    `"${d.userQuote}"`,
    ``,
    `Your biggest leak this week:`,
    d.biggestLeak,
    ``,
    `One lever — name it, date it, move by Friday:`,
    d.oneLever,
    ``,
    `The principle that’s breaking:`,
    `${d.principleTitle} — ${d.principleBreaking}`,
    ``,
    `The service that fits:`,
    `${d.serviceTitle}. ${d.serviceDescription}`,
    ``,
    `How I want to show up in 90 days:`,
    d.userVision,
    ``,
    `— ${vedra}`,
  ].join('\n')
}
