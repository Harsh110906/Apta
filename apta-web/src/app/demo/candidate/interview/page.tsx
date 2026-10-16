"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Sparkles,
  Bot,
  Briefcase,
  Clock,
  Building2,
  DollarSign,
  UserCheck,
  Video,
  Mic,
  ArrowRight,
  ShieldAlert,
  Info,
  CheckCircle2,
  History,
} from "lucide-react";
import { useInterviewStore } from "@/features/interview/useInterviewStore";
import {
  ExperienceLevel,
  InterviewType,
  InterviewDuration,
  InterviewerPersona,
  InteractionMode,
} from "@/types/interview";
import { CURRENT_USER } from "@/data/candidates";

const STANDARD_ROLES = [
  "Frontend Engineer",
  "Backend Engineer",
  "Full-Stack Engineer",
  "Custom role",
];

const EXPERIENCE_LEVELS: ExperienceLevel[] = [
  "Student / Fresher",
  "1–3 years",
  "3–5 years",
  "5+ years",
];

const INTERVIEW_TYPES: InterviewType[] = [
  "Technical",
  "HR / Behavioral",
  "Mixed",
];

const DURATIONS: { label: string; value: InterviewDuration }[] = [
  { label: "10 Minutes (3 Questions)", value: 10 },
  { label: "20 Minutes (4 Questions)", value: 20 },
  { label: "30 Minutes (5 Questions)", value: 30 },
];

const PERSONAS: { id: InterviewerPersona; title: string; desc: string }[] = [
  { id: "Supportive", title: "Supportive Coach", desc: "Warm tone with optional hints when stuck" },
  { id: "Neutral", title: "Standard Panelist", desc: "Balanced, objective corporate interview style" },
  { id: "Challenging", title: "Bar Raiser", desc: "Rigorous follow-up probing, strict trade-off scrutiny" },
];

export default function InterviewSetupPage() {
  const router = useRouter();
  const { config, setConfig } = useInterviewStore();

  const [selectedRole, setSelectedRole] = useState<string>(
    STANDARD_ROLES.includes(config.jobRole) ? config.jobRole : "Custom role"
  );
  const [customRoleText, setCustomRoleText] = useState<string>(
    STANDARD_ROLES.includes(config.jobRole) ? "" : config.jobRole
  );
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>(config.experienceLevel);
  const [interviewType, setInterviewType] = useState<InterviewType>(config.interviewType);
  const [duration, setDuration] = useState<InterviewDuration>(config.durationMinutes);
  const [targetCompany, setTargetCompany] = useState<string>(config.targetCompany || "");
  const [compensationAmount, setCompensationAmount] = useState<string>(
    config.expectedCompensation?.amount || "18"
  );
  const [compensationCurrency, setCompensationCurrency] = useState<"INR" | "USD">("INR");
  const [jobDescription, setJobDescription] = useState<string>(config.jobDescription || "");
  const [skills, setSkills] = useState<string[]>(config.focusSkills || ["React", "TypeScript"]);
  const [skillInput, setSkillInput] = useState("");
  const [persona, setPersona] = useState<InterviewerPersona>(config.interviewerPersona);
  const [interactionMode, setInteractionMode] = useState<InteractionMode>(config.interactionMode);
  const [enableCamera, setEnableCamera] = useState<boolean>(config.enableCamera);
  const [resumeContext, setResumeContext] = useState<string>(config.resumeContext || "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleImportProfile = () => {
    setResumeContext(
      `Candidate: ${CURRENT_USER.name}\nHeadline: ${CURRENT_USER.headline}\nDomain: ${CURRENT_USER.domain}\nVerified Skills: ${CURRENT_USER.skills.join(", ")}`
    );
    setSkills(Array.from(new Set([...skills, ...CURRENT_USER.skills])));
  };

  const validateAndProceed = () => {
    const newErrors: Record<string, string> = {};

    const resolvedRole = selectedRole === "Custom role" ? customRoleText.trim() : selectedRole;
    if (!resolvedRole) {
      newErrors.jobRole = "Please select or type your target job role.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Save configured state in store
    setConfig({
      jobRole: resolvedRole,
      customRoleName: selectedRole === "Custom role" ? customRoleText.trim() : undefined,
      experienceLevel,
      interviewType,
      durationMinutes: duration,
      targetCompany: targetCompany.trim() || undefined,
      expectedCompensation: {
        currency: compensationCurrency,
        amount: compensationAmount,
        period: "annual",
        label:
          compensationCurrency === "INR"
            ? `${compensationAmount} LPA (INR Annual)`
            : `$${compensationAmount} USD Annual`,
      },
      jobDescription: jobDescription.trim() || undefined,
      focusSkills: skills,
      resumeContext: resumeContext.trim() || undefined,
      interviewerPersona: persona,
      interactionMode,
      enableCamera,
      mode: "demo",
    });

    router.push("/demo/candidate/interview/device-check");
  };

  return (
    <div className="flex-1 py-10 px-4 md:px-8 max-w-5xl mx-auto w-full">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border dark:border-midnight-700 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-500 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Apta Interview Arena
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Configure Your Interview</h1>
          <p className="text-text-secondary text-sm md:text-base mt-1">
            Simulate realistic technical and behavioral rounds tailored to your target role and goals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/demo/candidate/interview/history"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-bg-secondary dark:bg-midnight-800 border border-border dark:border-midnight-600 text-xs font-semibold hover:border-orange-500/50 transition-colors shadow-sm"
          >
            <History className="w-4 h-4 text-orange-500" /> Past Reports
          </Link>
          <Link
            href="/demo/candidate/ai-tools"
            className="px-4 py-2 rounded-xl bg-bg-secondary dark:bg-midnight-800 border border-border dark:border-midnight-600 text-xs font-semibold text-text-muted hover:text-foreground transition-colors"
          >
            Exit to AI Tools
          </Link>
        </div>
      </div>

      {/* Main Setup Form Card */}
      <div className="space-y-8 bg-bg-secondary dark:bg-midnight-800/80 rounded-3xl p-6 md:p-10 border border-border dark:border-midnight-600 shadow-xl backdrop-blur-md">
        {/* Section 1: Core Target Role & Seniority */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2 text-foreground dark:text-white">
            <Briefcase className="w-5 h-5 text-orange-500" /> Target Role & Experience
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Job Role Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">
                Job Role <span className="text-orange-500">*</span>
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full bg-bg-primary dark:bg-midnight-900 border border-border dark:border-midnight-600 rounded-xl px-4 py-3 text-sm font-semibold text-foreground dark:text-white focus:outline-none focus:border-orange-500"
              >
                {STANDARD_ROLES.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>

              {selectedRole === "Custom role" && (
                <div className="mt-3">
                  <input
                    type="text"
                    value={customRoleText}
                    onChange={(e) => setCustomRoleText(e.target.value)}
                    placeholder="E.g., DevOps Engineer, Data Platform Architect..."
                    className="w-full bg-bg-primary dark:bg-midnight-900 border border-border dark:border-midnight-600 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-orange-500"
                  />
                  {errors.jobRole && (
                    <p className="text-xs font-semibold text-rose mt-1">{errors.jobRole}</p>
                  )}
                </div>
              )}
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">
                Experience Level <span className="text-orange-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {EXPERIENCE_LEVELS.map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setExperienceLevel(lvl)}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                      experienceLevel === lvl
                        ? "bg-orange-500 text-white border-orange-500 shadow-glow"
                        : "bg-bg-primary dark:bg-midnight-900 border-border dark:border-midnight-700 text-text-secondary hover:text-foreground"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Format & Duration */}
        <div className="space-y-4 pt-6 border-t border-border dark:border-midnight-700">
          <h2 className="text-lg font-bold flex items-center gap-2 text-foreground dark:text-white">
            <Clock className="w-5 h-5 text-orange-500" /> Format & Time Budget
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Interview Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">
                Interview Domain <span className="text-orange-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {INTERVIEW_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setInterviewType(type)}
                    className={`py-3 px-2 rounded-xl border text-xs font-bold text-center transition-all ${
                      interviewType === type
                        ? "bg-orange-500 text-white border-orange-500 shadow-glow"
                        : "bg-bg-primary dark:bg-midnight-900 border-border dark:border-midnight-700 text-text-secondary hover:text-foreground"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">
                Duration <span className="text-orange-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {DURATIONS.map((dur) => (
                  <button
                    key={dur.value}
                    type="button"
                    onClick={() => setDuration(dur.value)}
                    className={`py-3 px-2 rounded-xl border text-xs font-bold text-center transition-all ${
                      duration === dur.value
                        ? "bg-orange-500 text-white border-orange-500 shadow-glow"
                        : "bg-bg-primary dark:bg-midnight-900 border-border dark:border-midnight-700 text-text-secondary hover:text-foreground"
                    }`}
                  >
                    {dur.value} Mins
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Company & Compensation Context (Optional) */}
        <div className="space-y-4 pt-6 border-t border-border dark:border-midnight-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold flex items-center gap-2 text-foreground dark:text-white">
              <Building2 className="w-5 h-5 text-orange-500" /> Target Company & Compensation
            </h2>
            <span className="text-xs font-semibold text-text-muted">Optional Context</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Target Company */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">
                Target Company Name
              </label>
              <input
                type="text"
                value={targetCompany}
                onChange={(e) => setTargetCompany(e.target.value)}
                placeholder="E.g., Stripe, Google, Razorpay, Swiggy..."
                className="w-full bg-bg-primary dark:bg-midnight-900 border border-border dark:border-midnight-600 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-orange-500"
              />
              <p className="text-[11px] text-text-muted mt-1.5 flex items-center gap-1">
                <Info className="w-3 h-3 shrink-0 text-text-muted" />
                Independent practice simulation. Not an official company question bank.
              </p>
            </div>

            {/* Expected Compensation */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">
                Expected Annual Compensation
              </label>
              <div className="flex gap-2">
                <select
                  value={compensationCurrency}
                  onChange={(e) => setCompensationCurrency(e.target.value as "INR" | "USD")}
                  className="bg-bg-primary dark:bg-midnight-900 border border-border dark:border-midnight-600 rounded-xl px-3 py-2.5 text-xs font-bold"
                >
                  <option value="INR">INR (LPA)</option>
                  <option value="USD">USD ($/yr)</option>
                </select>
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={compensationAmount}
                    onChange={(e) => setCompensationAmount(e.target.value)}
                    placeholder={compensationCurrency === "INR" ? "E.g., 18 LPA" : "E.g., 140,000"}
                    className="w-full bg-bg-primary dark:bg-midnight-900 border border-border dark:border-midnight-600 rounded-xl px-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
              <p className="text-[11px] text-text-muted mt-1.5">
                Compensation is used purely for career context; never used to infer seniority.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Skills, Persona & Interaction Mode */}
        <div className="space-y-4 pt-6 border-t border-border dark:border-midnight-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold flex items-center gap-2 text-foreground dark:text-white">
              <Bot className="w-5 h-5 text-orange-500" /> Persona & Interaction Mode
            </h2>
            <button
              type="button"
              onClick={handleImportProfile}
              className="text-xs font-bold text-orange-500 hover:text-orange-400 flex items-center gap-1 transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5" /> Auto-fill from Profile
            </button>
          </div>

          {/* Persona Cards */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">
              Interviewer Persona
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {PERSONAS.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setPersona(p.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    persona === p.id
                      ? "bg-orange-500/10 border-orange-500 shadow-md"
                      : "bg-bg-primary dark:bg-midnight-900 border-border dark:border-midnight-700 hover:border-neutral-500"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-foreground dark:text-white">{p.title}</span>
                    {persona === p.id && <CheckCircle2 className="w-4 h-4 text-orange-500" />}
                  </div>
                  <p className="text-xs text-text-secondary dark:text-neutral-400">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Interaction Mode & Camera */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">
                Primary Interaction Mode
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setInteractionMode("Voice interview")}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    interactionMode === "Voice interview"
                      ? "bg-emerald text-white border-emerald shadow-sm"
                      : "bg-bg-primary dark:bg-midnight-900 border-border dark:border-midnight-700 text-text-secondary"
                  }`}
                >
                  <Mic className="w-4 h-4" /> Spoken Voice
                </button>
                <button
                  type="button"
                  onClick={() => setInteractionMode("Text interview")}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    interactionMode === "Text interview"
                      ? "bg-sky text-white border-sky shadow-sm"
                      : "bg-bg-primary dark:bg-midnight-900 border-border dark:border-midnight-700 text-text-secondary"
                  }`}
                >
                  Text Mode Fallback
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-2">
                Camera Access (Optional)
              </label>
              <div
                onClick={() => setEnableCamera(!enableCamera)}
                className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-colors ${
                  enableCamera
                    ? "bg-sky/10 border-sky/30 text-sky-400"
                    : "bg-bg-primary dark:bg-midnight-900 border-border dark:border-midnight-700 text-text-secondary"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  <span className="text-xs font-bold">
                    {enableCamera ? "Camera Preview Enabled" : "Camera Off (Recommended default)"}
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={enableCamera}
                  onChange={(e) => setEnableCamera(e.target.checked)}
                  className="rounded text-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Focus Skills */}
          <div className="pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">
              Focus Skills (Tags)
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-500 dark:text-orange-400 text-xs font-bold"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-rose transition-colors text-sm leading-none"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                placeholder="Add skill (e.g. Next.js, Redux, PostgreSQL) & press Enter"
                className="flex-1 bg-bg-primary dark:bg-midnight-900 border border-border dark:border-midnight-600 rounded-xl px-4 py-2 text-xs font-medium focus:outline-none focus:border-orange-500"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 bg-midnight-700 hover:bg-midnight-600 rounded-xl text-xs font-bold border border-midnight-600"
              >
                Add Tag
              </button>
            </div>
          </div>
        </div>

        {/* Scoring Transparency Notice */}
        <div className="p-4 rounded-2xl bg-midnight-900/60 border border-midnight-700 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-neutral-300 space-y-1">
            <p className="font-bold text-white">Coaching Fairness & Transparency Guarantee</p>
            <p className="text-neutral-400 leading-relaxed">
              Arena scores evaluate technical accuracy, communication clarity, problem-solving structure, and follow-up depth. We strictly never assess accents, appearance, video, or perceived emotion. Practice scores are 100% private and do not influence your public Apta leaderboard rank.
            </p>
          </div>
        </div>

        {/* Primary CTA */}
        <div className="pt-4 flex items-center justify-end">
          <button
            type="button"
            onClick={validateAndProceed}
            className="w-full md:w-auto px-8 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-glow flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95"
          >
            Continue to Device Check <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
