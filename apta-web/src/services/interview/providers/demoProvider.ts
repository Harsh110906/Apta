import type {
  InterviewConfig,
  InterviewQuestion,
  InterviewSession,
  InterviewReport,
  AnswerEvaluation,
  CompetencyScore,
  PerQuestionReportFeedback,
} from "../../../types/interview.ts";
import type {
  IQuestionGenerationProvider,
  IAnswerEvaluationProvider,
  IReportGenerationProvider,
} from "./types.ts";
import {
  getQuestionsForConfig,
  generateFollowUpQuestion,
  COMPETENCY_MAP,
} from "../../../data/interviewQuestionBank.ts";

export class DemoQuestionProvider implements IQuestionGenerationProvider {
  async generatePlan(config: InterviewConfig): Promise<InterviewQuestion[]> {
    return getQuestionsForConfig(
      config.jobRole,
      config.interviewType,
      config.durationMinutes
    );
  }

  async generateFollowUp(
    parentQuestion: InterviewQuestion,
    candidateAnswer: string,
    followUpIndex: number,
    remainingSeconds: number
  ): Promise<InterviewQuestion | null> {
    // Restrict to max 2 follow-ups and ensure sufficient time (> 60s remaining)
    if (followUpIndex > 2 || remainingSeconds < 60) {
      return null;
    }

    // Require at least a non-trivial response to formulate a meaningful follow-up
    const words = candidateAnswer.trim().split(/\s+/).filter(Boolean);
    if (words.length < 8) {
      return null;
    }

    return generateFollowUpQuestion(parentQuestion, candidateAnswer, followUpIndex);
  }
}

export class DemoEvaluationProvider implements IAnswerEvaluationProvider {
  async evaluateAnswer(
    question: InterviewQuestion,
    candidateAnswer: string,
    deliverySeconds: number
  ): Promise<AnswerEvaluation> {
    const text = candidateAnswer.trim();
    const words = text.split(/\s+/).filter(Boolean);
    const wordCount = words.length;

    // Check rubric coverage
    const matchedCriteria: string[] = [];
    const missingCriteria: string[] = [];

    const lower = text.toLowerCase();
    for (const criterion of question.rubricCriteria) {
      const keywords = criterion.toLowerCase().split(/\s+/).filter((w) => w.length > 4);
      const hasMatch = keywords.some((k) => lower.includes(k));
      if (hasMatch) {
        matchedCriteria.push(criterion);
      } else {
        missingCriteria.push(criterion);
      }
    }

    // Check structure indicators
    const hasStarIndicators =
      lower.includes("situation") ||
      lower.includes("task") ||
      lower.includes("action") ||
      lower.includes("result") ||
      lower.includes("firstly") ||
      lower.includes("ultimately");

    const hasTradeOffAnalysis =
      lower.includes("trade-off") ||
      lower.includes("alternative") ||
      lower.includes("versus") ||
      lower.includes("pros and cons") ||
      lower.includes("bottleneck");

    const hasPersonalOwnership =
      lower.includes("i decided") ||
      lower.includes("i built") ||
      lower.includes("i optimized") ||
      lower.includes("my responsibility") ||
      lower.includes("i measured");

    // Baseline scoring calculation
    let rawScore = 50; // Neutral baseline

    // Length and depth factors
    if (wordCount >= 100) rawScore += 15;
    else if (wordCount >= 50) rawScore += 10;
    else if (wordCount < 20) rawScore -= 20;

    // Rubric criteria matches
    const rubricRatio = question.rubricCriteria.length > 0
      ? matchedCriteria.length / question.rubricCriteria.length
      : 0.5;
    rawScore += Math.round(rubricRatio * 20);

    if (hasTradeOffAnalysis || hasStarIndicators) rawScore += 8;
    if (hasPersonalOwnership) rawScore += 7;

    const finalScore = Math.min(95, Math.max(30, rawScore));

    // Construct evidence snippet (first 120 chars of relevant answer)
    const evidenceSnippet =
      text.length > 120 ? `"${text.substring(0, 117)}..."` : `"${text}"`;

    // Strengths formulation
    const strengths: string[] = [];
    if (hasPersonalOwnership) {
      strengths.push("Clear personal ownership and technical agency highlighted");
    }
    if (hasTradeOffAnalysis) {
      strengths.push("Conscious trade-off analysis between architectural alternatives");
    }
    if (matchedCriteria.length > 0) {
      strengths.push(`Directly addressed core requirements: ${matchedCriteria[0]}`);
    }
    if (strengths.length === 0) {
      strengths.push("Prompt response that addressed the main premise of the question");
    }

    // Improvement areas formulation
    const improvementAreas: string[] = [];
    if (missingCriteria.length > 0) {
      improvementAreas.push(`Deepen discussion on: ${missingCriteria[0]}`);
    }
    if (!hasTradeOffAnalysis && !hasStarIndicators) {
      improvementAreas.push("Frame your response with a clear methodology (e.g., STAR framework or trade-off evaluation)");
    }
    if (wordCount < 40) {
      improvementAreas.push("Provide more detailed context, specific metrics, and real-world system impacts");
    }
    if (improvementAreas.length === 0) {
      improvementAreas.push("Include concrete metrics (e.g. latency reduced by X%, users served) to substantiate claims");
    }

    const suggestedFramework =
      question.competency.includes("Conflict") || question.competency.includes("Ownership")
        ? "STAR Framework: Situation (Context) -> Task (Goal) -> Action (Your specific actions) -> Result (Measurable outcome)"
        : "Architecture Pattern: Requirements -> High-level System Flow -> Bottlenecks & Trade-offs -> Verification / Metrics";

    // Feedback message
    let feedback = "";
    if (finalScore >= 80) {
      feedback = `Strong answer demonstrating sound domain grasp for ${question.competency}. You addressed key architectural nuances with clarity.`;
    } else if (finalScore >= 65) {
      feedback = `Good foundational response. You covered the main concept, but could elevate the answer by providing deeper technical trade-offs and concrete metrics.`;
    } else {
      feedback = `Developing response. Make sure to structure your answer systematically and address the core evaluation criteria directly.`;
    }

    return {
      turnId: "",
      competency: question.competency,
      score: finalScore,
      feedback,
      strengths: strengths.slice(0, 2),
      improvementAreas: improvementAreas.slice(0, 2),
      suggestedFramework,
      evidenceSnippet,
      deliveryAdvisory:
        deliverySeconds > 0
          ? `Response duration: ${deliverySeconds}s (~${Math.round((wordCount / (deliverySeconds / 60)) || 0)} WPM)`
          : undefined,
    };
  }
}

export class DemoReportProvider implements IReportGenerationProvider {
  async generateReport(session: InterviewSession): Promise<InterviewReport> {
    const turns = session.turns || [];
    const answeredCount = turns.length;
    const config = session.config;

    // Check if sufficient evidence exists
    const hasSufficientEvidence = answeredCount >= 2;

    // Gather unique competencies
    const competencyScoresMap = new Map<string, { totalScore: number; count: number; evidence: string }>();

    for (const turn of turns) {
      if (!turn.evaluation) continue;
      const comp = turn.question.competency;
      const existing = competencyScoresMap.get(comp) || { totalScore: 0, count: 0, evidence: "" };
      existing.totalScore += turn.evaluation.score;
      existing.count += 1;
      if (!existing.evidence) {
        existing.evidence = turn.evaluation.evidenceSnippet;
      }
      competencyScoresMap.set(comp, existing);
    }

    const roleDefs = COMPETENCY_MAP[config.jobRole] || COMPETENCY_MAP["Full-Stack Engineer"] || [];
    const competencyScores: CompetencyScore[] = [];
    const unassessedCompetencies: string[] = [];

    let weightedSum = 0;
    let assessedWeightSum = 0;

    for (const def of roleDefs) {
      const assessed = competencyScoresMap.get(def.name);
      if (assessed && assessed.count > 0) {
        const avg = Math.round(assessed.totalScore / assessed.count);
        competencyScores.push({
          competency: def.name,
          score: avg,
          weight: def.weight,
          assessed: true,
          evidence: assessed.evidence,
        });
        weightedSum += avg * def.weight;
        assessedWeightSum += def.weight;
      } else {
        competencyScores.push({
          competency: def.name,
          score: 0,
          weight: def.weight,
          assessed: false,
          evidence: "Not enough questions presented to reliably assess this competency.",
          limitations: "Unassessed in this session duration.",
        });
        unassessedCompetencies.push(def.name);
      }
    }

    // Add any evaluated competencies not in the default definition list
    competencyScoresMap.forEach((val, compName) => {
      if (!roleDefs.some((d) => d.name === compName)) {
        const avg = Math.round(val.totalScore / val.count);
        competencyScores.push({
          competency: compName,
          score: avg,
          weight: 0.2,
          assessed: true,
          evidence: val.evidence,
        });
        weightedSum += avg * 0.2;
        assessedWeightSum += 0.2;
      }
    });

    const overallScore =
      hasSufficientEvidence && assessedWeightSum > 0
        ? Math.round(weightedSum / assessedWeightSum)
        : null;

    // Aggregate strengths & improvements
    const allStrengths = new Set<string>();
    const allImprovements = new Set<string>();

    for (const turn of turns) {
      if (turn.evaluation) {
        turn.evaluation.strengths.forEach((s) => allStrengths.add(s));
        turn.evaluation.improvementAreas.forEach((i) => allImprovements.add(i));
      }
    }

    const strengths = Array.from(allStrengths).slice(0, 3);
    if (strengths.length < 3) {
      strengths.push("Active engagement with technical follow-up questions");
      strengths.push("Clear communication of problem constraints and intentions");
    }

    const improvementAreas = Array.from(allImprovements).slice(0, 3);
    if (improvementAreas.length < 3) {
      improvementAreas.push("Substantiate claims with concrete benchmark metrics or business impact");
      improvementAreas.push("Structure complex answers using explicit architectural frameworks");
    }

    // Per question feedback items
    const perQuestionFeedback: PerQuestionReportFeedback[] = turns.map((t) => ({
      turnId: t.id,
      questionText: t.question.text,
      answerTranscript: t.answerTranscript,
      competency: t.question.competency,
      score: t.evaluation?.score ?? 60,
      feedback: t.evaluation?.feedback ?? "Answer recorded and evaluated against role competencies.",
      evidenceSnippet: t.evaluation?.evidenceSnippet ?? "",
      suggestedFramework: t.evaluation?.suggestedFramework ?? "STAR Framework",
      deliveryNotes: t.evaluation?.deliveryAdvisory,
    }));

    // Next actions
    const nextActions = [
      `Practice targeted drills on "${unassessedCompetencies[0] || competencyScores[0]?.competency || 'System Design'}"`,
      "Review the suggested architectural frameworks in your question-by-question breakdown",
      "Retake the interview with a Challenging persona to simulate high-pressure rounds",
    ];

    const recommendedNextSession = {
      role: config.jobRole,
      focusSkill: unassessedCompetencies[0] || config.focusSkills[0] || "Advanced Problem Solving",
      difficulty: "Harder Simulation",
      reason: unassessedCompetencies.length > 0
        ? `Cover ${unassessedCompetencies[0]} to achieve comprehensive role readiness.`
        : "Strengthen depth under time-constrained follow-up probing.",
    };

    const limitations: string[] = [
      "This report is a coaching evaluation, not an official hiring endorsement or verified assessment.",
      "Coaching scores are strictly private to your practice space and do not affect your public Apta leaderboard rank.",
    ];

    if (!hasSufficientEvidence) {
      limitations.push(
        "Only 1 question was completed; overall score is omitted due to insufficient data coverage."
      );
    }

    return {
      id: `report-${session.id}`,
      sessionId: session.id,
      generatedAt: new Date().toISOString(),
      completionStatus: session.status,
      role: config.jobRole,
      targetCompany: config.targetCompany,
      interviewType: config.interviewType,
      durationMinutes: config.durationMinutes,
      activeElapsedSeconds: session.activeElapsedSeconds,
      totalQuestionsAnswered: answeredCount,
      overallScore,
      competencyScores,
      unassessedCompetencies,
      strengths: strengths.slice(0, 3),
      improvementAreas: improvementAreas.slice(0, 3),
      perQuestionFeedback,
      nextActions,
      recommendedNextSession,
      limitations,
      isDemo: true,
      providerNotice:
        "Generated via Apta Arena Heuristic Coaching Engine (Demo Mode). Uncorrelated with proprietary interview banks.",
    };
  }
}
