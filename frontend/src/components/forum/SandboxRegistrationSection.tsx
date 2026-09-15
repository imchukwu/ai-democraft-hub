import { useState } from "react";
import { Reveal, SectionHeader } from "./primitives";
import { forumMeta } from "@/data/forum";
import { API_BASE_URL } from "@/lib/api";
import {
  AlertCircle,
  Award,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  Code2,
  Info,
  Lightbulb,
  Monitor,
  Search,
  ShieldCheck,
  Trophy,
  Users,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

const FOCUS_AREAS = [
  {
    id: "disinformation",
    label: "Countering Disinformation Tools",
    icon: Search,
    color: "text-red-400",
    border: "border-red-500/30",
    bg: "bg-red-500/10",
    description:
      "Technology to detect, catch, flag, or debunk deepfakes, synthetic media, and coordinated manipulation in real time.",
  },
  {
    id: "voter-education",
    label: "Voter Education & Inclusion",
    icon: Users,
    color: "text-blue-400",
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
    description:
      "Accessible, multilingual civic information and turnout tools, including solutions designed for underserved groups.",
  },
  {
    id: "election-observation",
    label: "Election Observation & Data",
    icon: Monitor,
    color: "text-green-400",
    border: "border-green-500/30",
    bg: "bg-green-500/10",
    description:
      "Innovations that strengthen citizen or institutional oversight, results analysis, and verification.",
  },
  {
    id: "transparency",
    label: "Transparency & Trust Tech",
    icon: ShieldCheck,
    color: "text-amber-400",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    description:
      "Solutions that make electoral processes and information more visible, verifiable, and trustworthy.",
  },
] as const;

const ORG_TYPES = [
  "Startup / Commercial Venture",
  "Civic Tech / Non-Profit Organization",
  "Academic / Research Institution",
  "Independent Builder / Solo Innovator",
  "Government / Public Sector Agency",
  "International Development Partner",
];

const KEY_DATES = [
  { milestone: "Call Opens", date: "16 September 2026" },
  { milestone: "Application Deadline", date: "24 September 2026" },
  { milestone: "Shortlist Announced", date: "2 October 2026" },
  { milestone: "Live Pitch", date: "16 October 2026" },
  { milestone: "Winner Announced", date: "16 October 2026" },
];

// ── Main Component ────────────────────────────────────────────────────────────

export function SandboxRegistrationSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string>("");

  const [formData, setFormData] = useState({
    projectName: "",
    teamName: "",
    orgType: "Startup / Commercial Venture",
    country: "Nigeria",
    website: "",
    repoOrDemo: "",
    contactName: "",
    jobTitle: "",
    email: "",
    phone: "",
    focusArea: "",
    problemStatement: "",
    solutionDescription: "",
    demoType: "Live clickable prototype",
    demoLink: "",
    teamSize: "1",
    hasWorkingPrototype: false,
    agreeToTerms: false,
  });

  const wordCount = formData.solutionDescription
    ? formData.solutionDescription.trim().split(/\s+/).filter(Boolean).length
    : 0;

  const handleSolutionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    const words = text.trim().split(/\s+/).filter(Boolean);
    if (words.length > 300 && text.length > formData.solutionDescription.length) return;
    setFormData((prev) => ({ ...prev, solutionDescription: text.slice(0, 2000) }));
  };

  const handleReset = () => {
    setFormData({
      projectName: "",
      teamName: "",
      orgType: "Startup / Commercial Venture",
      country: "Nigeria",
      website: "",
      repoOrDemo: "",
      contactName: "",
      jobTitle: "",
      email: "",
      phone: "",
      focusArea: "",
      problemStatement: "",
      solutionDescription: "",
      demoType: "Live clickable prototype",
      demoLink: "",
      teamSize: "1",
      hasWorkingPrototype: false,
      agreeToTerms: false,
    });
    setSelectedArea("");
    setSubmitted(false);
    setErrorMsg(null);
  };

  const handleFocusAreaSelect = (id: string, label: string) => {
    setSelectedArea(id);
    setFormData((prev) => ({ ...prev, focusArea: label }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.hasWorkingPrototype) {
      setErrorMsg(
        "You must confirm that you have a working proof of concept. Concepts, mockups, or slide decks alone are not eligible.",
      );
      return;
    }
    if (!formData.agreeToTerms) {
      setErrorMsg("Please agree to the terms and conditions before submitting.");
      return;
    }
    if (!formData.focusArea) {
      setErrorMsg("Please select a Focus Area for your application.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/register/sandbox`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamName: formData.teamName || formData.projectName,
          projectName: formData.projectName,
          contactName: formData.contactName,
          email: formData.email,
          phone: formData.phone,
          focusArea: formData.focusArea,
          orgType: formData.orgType,
          country: formData.country,
          website: formData.website,
          repoOrDemo: formData.repoOrDemo,
          demoLink: formData.demoLink,
          demoType: formData.demoType,
          teamSize: formData.teamSize,
          description: `[Problem: ${formData.problemStatement}] [Solution: ${formData.solutionDescription}]`,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit sandbox application");
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred while submitting your application.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Input class helper ──────────────────────────────────────────────────────
  const inputCls =
    "mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-base text-white placeholder-slate-500 focus:border-[#15B708] focus:outline-none transition-colors";
  const selectCls =
    "mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-base text-white focus:border-[#15B708] focus:outline-none transition-colors appearance-none";
  const labelCls = "block text-xs font-semibold text-slate-300";
  const sectionHeadCls =
    "text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3 mb-5";

  return (
    <section className="py-16 md:py-24 bg-background text-foreground">
      <div className="container-forum max-w-5xl">
        <SectionHeader
          eyebrow="Call for Innovators"
          title="Apply to The Sandbox"
          lede="Are you building technology that helps protect elections, inform voters, or restore public trust in democratic processes? Submit your working prototype and pitch live in front of a jury of experts for grant funding and a global platform."
        />

        {/* ── Why Apply Cards ── */}
        <Reveal className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: Trophy,
              title: "Live Pitch Finale",
              desc: "Pitch in front of delegates, press, and a jury of policy, tech, and civil-society leaders.",
              color: "text-amber-400",
              bg: "bg-slate-900/90",
              border: "border-amber-500/40",
            },
            {
              icon: Award,
              title: "Grant Funding",
              desc: "Grant funding shared across the four focus-area winners, weighted by final placement.",
              color: "text-[#15B708]",
              bg: "bg-slate-900/90",
              border: "border-[#15B708]/40",
            },
            {
              icon: Lightbulb,
              title: "Visibility & Connections",
              desc: "Direct exposure to funders, policymakers, and potential partners in AI and democracy.",
              color: "text-purple-400",
              bg: "bg-slate-900/90",
              border: "border-purple-500/40",
            },
          ].map((card) => (
            <div
              key={card.title}
              className={`rounded-xl border ${card.border} ${card.bg} p-5 flex flex-col gap-2.5 shadow-xl transition-all`}
            >
              <card.icon className={`h-6 w-6 ${card.color} shrink-0`} />
              <h4 className="font-bold text-white text-sm sm:text-base">{card.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </Reveal>

        {/* ── Key Dates ── */}
        <Reveal className="mt-8">
          <div className="rounded-xl border border-[#15B708]/30 bg-slate-950 p-6 shadow-xl">
            <h3 className="flex items-center gap-2 text-sm font-bold text-[#15B708] mb-4">
              <Calendar className="h-4 w-4" />
              Key Dates
            </h3>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {KEY_DATES.map((d, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2.5 rounded-lg px-3 py-2.5 ${
                    d.milestone === "Application Deadline"
                      ? "border border-amber-500/40 bg-amber-500/10"
                      : "border border-slate-800 bg-slate-900/60"
                  }`}
                >
                  <Clock
                    className={`h-4 w-4 mt-0.5 shrink-0 ${
                      d.milestone === "Application Deadline" ? "text-amber-400" : "text-slate-500"
                    }`}
                  />
                  <div>
                    <p
                      className={`text-[11px] font-semibold uppercase tracking-wide ${
                        d.milestone === "Application Deadline" ? "text-amber-300" : "text-slate-400"
                      }`}
                    >
                      {d.milestone}
                    </p>
                    <p className="text-sm font-bold text-white mt-0.5">{d.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ── Application Form ── */}
        <Reveal className="mt-8">
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 md:p-10 shadow-2xl text-white">
            {submitted ? (
              // ── Success State ────────────────────────────────────────────────
              <div className="text-center py-12">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#15B708]/20 text-[#15B708] border border-[#15B708]/50">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="mt-6 text-2xl font-extrabold text-white sm:text-3xl">
                  Application Successfully Received!
                </h3>
                <p className="mt-3 text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{formData.contactName}</strong>. Your Sandbox application
                  for <strong className="text-[#15B708]">{formData.projectName}</strong> has been registered. A
                  confirmation email has been dispatched to{" "}
                  <strong className="text-[#15B708]">{formData.email}</strong> from{" "}
                  <strong className="text-white">info@aianddemocracyforum.org</strong>.
                </p>

                <div className="mt-6 inline-block text-left rounded-xl border border-slate-800 bg-slate-900/90 p-5 text-xs text-slate-300 space-y-2 max-w-lg mx-auto w-full">
                  {[
                    { label: "Project Name", value: formData.projectName },
                    { label: "Focus Area", value: formData.focusArea, highlight: true },
                    { label: "Contact Email", value: formData.email, highlight: true },
                    { label: "Forum Dates", value: `${forumMeta.venue} (${forumMeta.dateShort})` },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between gap-4 border-b border-slate-800 pb-2 last:border-0 last:pb-0">
                      <span className="text-slate-400 shrink-0">{row.label}:</span>
                      <span className={`font-semibold text-right ${row.highlight ? "text-[#15B708]" : "text-white"}`}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-center gap-4 flex-wrap">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="rounded-lg bg-slate-800 px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-700 transition-colors"
                  >
                    Submit Another Application
                  </button>
                </div>
              </div>
            ) : (
              // ── Form ────────────────────────────────────────────────────────
              <form onSubmit={handleSubmit} className="space-y-10">
                {errorMsg && (
                  <div className="flex items-start gap-3 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-xs text-red-200">
                    <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* SECTION 1: Focus Area Selection */}
                <div>
                  <h3 className={sectionHeadCls}>
                    <Lightbulb className="h-5 w-5 text-[#15B708]" />
                    1. Select Your Focus Area
                  </h3>
                  <p className="text-xs text-slate-400 mb-4">
                    Applicants must address one of the four focus areas below. One winner will be selected per area.
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {FOCUS_AREAS.map((area) => {
                      const Icon = area.icon;
                      const active = selectedArea === area.id;
                      return (
                        <button
                          type="button"
                          key={area.id}
                          onClick={() => handleFocusAreaSelect(area.id, area.label)}
                          className={`text-left rounded-xl border p-4 transition-all ${
                            active
                              ? `${area.border} ${area.bg} ring-1 ring-inset ring-current/30`
                              : "border-slate-800 bg-slate-900/50 hover:border-slate-700"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${active ? area.color : "text-slate-500"}`} />
                            <div>
                              <p className={`text-sm font-bold ${active ? "text-white" : "text-slate-300"}`}>
                                {area.label}
                              </p>
                              <p className="mt-1 text-xs text-slate-400 leading-relaxed">{area.description}</p>
                            </div>
                            {active && (
                              <CheckCircle2 className={`h-5 w-5 shrink-0 ml-auto ${area.color}`} />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* SECTION 2: Project Information */}
                <div>
                  <h3 className={sectionHeadCls}>
                    <Code2 className="h-5 w-5 text-[#15B708]" />
                    2. Project &amp; Team Information
                  </h3>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className={labelCls}>Project / Solution Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.projectName}
                        onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                        placeholder="e.g. DeepfakeShield Africa, VoteAware Nigeria"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Team / Organization Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.teamName}
                        onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                        placeholder="e.g. Civic AI Labs, Solo Innovator"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Organization Type *</label>
                      <div className="relative">
                        <select
                          value={formData.orgType}
                          onChange={(e) => setFormData({ ...formData, orgType: e.target.value })}
                          className={selectCls}
                        >
                          {ORG_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Country of Registration *</label>
                      <input
                        type="text"
                        required
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        placeholder="Nigeria, Kenya, Ghana, UK, USA, etc."
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Team Size</label>
                      <div className="relative">
                        <select
                          value={formData.teamSize}
                          onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                          className={selectCls}
                        >
                          {["1 (Solo)", "2–3", "4–6", "7–10", "10+"].map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Website / Product URL</label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        placeholder="https://yourproject.com"
                        className={inputCls}
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 3: Primary Contact */}
                <div>
                  <h3 className={sectionHeadCls}>
                    <Info className="h-5 w-5 text-[#15B708]" />
                    3. Primary Contact Person
                  </h3>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className={labelCls}>Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        placeholder="Dr. Amara Nwosu"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Job Title / Designation</label>
                      <input
                        type="text"
                        value={formData.jobTitle}
                        onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                        placeholder="Lead Developer / Founder"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@yourteam.com"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Phone / WhatsApp</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+234 800 000 0000"
                        className={inputCls}
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 4: Solution & Demo */}
                <div>
                  <h3 className={sectionHeadCls}>
                    <Monitor className="h-5 w-5 text-[#15B708]" />
                    4. Solution Abstract &amp; Demo
                  </h3>
                  <div className="space-y-5">
                    <div>
                      <label className={labelCls}>Problem Statement *</label>
                      <textarea
                        rows={3}
                        required
                        value={formData.problemStatement}
                        onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value.slice(0, 600) })}
                        placeholder="What specific problem does your solution address? Who does it affect and how? (max 600 characters)"
                        className={inputCls}
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label className={labelCls}>How Your Solution Addresses It *</label>
                        <span className={`text-[11px] font-mono font-medium ${wordCount >= 300 ? "text-amber-400 font-bold" : "text-slate-400"}`}>
                          {wordCount} / 300 words
                        </span>
                      </div>
                      <textarea
                        rows={6}
                        required
                        value={formData.solutionDescription}
                        onChange={handleSolutionChange}
                        placeholder="Describe your AI-powered solution in detail: how it works, the technology stack, what makes it innovative, and how it specifically strengthens democratic processes or electoral integrity. (max 300 words)"
                        className={inputCls}
                      />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className={labelCls}>Demo Type *</label>
                        <div className="relative">
                          <select
                            value={formData.demoType}
                            onChange={(e) => setFormData({ ...formData, demoType: e.target.value })}
                            className={selectCls}
                          >
                            <option>Live clickable prototype</option>
                            <option>Screen-recorded walkthrough (2–4 min)</option>
                            <option>Both (live prototype + recording)</option>
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        </div>
                      </div>
                      <div>
                        <label className={labelCls}>Demo / Prototype Link *</label>
                        <input
                          type="url"
                          required
                          value={formData.demoLink}
                          onChange={(e) => setFormData({ ...formData, demoLink: e.target.value })}
                          placeholder="https://demo.yourproject.com or Loom/YouTube link"
                          className={inputCls}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelCls}>
                        Public Repo / Research / Supporting Materials (optional)
                      </label>
                      <input
                        type="url"
                        value={formData.repoOrDemo}
                        onChange={(e) => setFormData({ ...formData, repoOrDemo: e.target.value })}
                        placeholder="https://github.com/yourteam/project or link to paper"
                        className={inputCls}
                      />
                    </div>

                    {/* Eligibility notice */}
                    <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-200">
                      <AlertCircle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-amber-300 mb-1">Working Proof of Concept Required</p>
                        <p className="leading-relaxed">
                          A demo that only shows a UI mockup or a concept video without a functioning system behind
                          it will not pass eligibility screening. You must have a working end-to-end demo.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 5: Declarations */}
                <div>
                  <h3 className={sectionHeadCls}>
                    <ShieldCheck className="h-5 w-5 text-[#15B708]" />
                    5. Declarations
                  </h3>
                  <div className="space-y-4">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={formData.hasWorkingPrototype}
                        onChange={(e) => setFormData({ ...formData, hasWorkingPrototype: e.target.checked })}
                        className="mt-1 h-4 w-4 accent-[#15B708] shrink-0 cursor-pointer"
                      />
                      <span className="text-sm text-slate-300 leading-relaxed group-hover:text-white transition-colors">
                        <strong className="text-white">I confirm</strong> that my team has a working proof of
                        concept. We understand that concepts, mockups, or slide decks alone are not eligible and
                        will not pass eligibility screening.
                      </span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={formData.agreeToTerms}
                        onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                        className="mt-1 h-4 w-4 accent-[#15B708] shrink-0 cursor-pointer"
                      />
                      <span className="text-sm text-slate-300 leading-relaxed group-hover:text-white transition-colors">
                        I agree to the AIDF 2026 Sandbox Terms &amp; Conditions. I understand the AI and Democracy Forum
                        reserves the right to adjust dates, prize allocations, or focus-area criteria as needed.
                      </span>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4 border-t border-slate-800">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-gradient-to-r from-[#15B708] to-[#1979E1] py-4 text-base font-bold text-slate-950 hover:opacity-95 transition-all shadow-lg disabled:opacity-50 active:scale-[0.99]"
                  >
                    {isSubmitting
                      ? "Submitting Application…"
                      : "Submit Sandbox Application (Deadline: 24th September 2026)"}
                  </button>
                  <p className="mt-2 text-center text-[11px] text-slate-400">
                    By submitting, you agree to the AIDF 2026 Sandbox Guidelines &amp; Privacy Policy. Confirmation
                    email will be sent to your address from info@aianddemocracyforum.org.
                  </p>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
