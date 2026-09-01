import { useState } from "react";
import { Reveal, SectionHeader } from "./primitives";
import { ArrowRight, CheckCircle2, Compass, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";

type RoleTrack = {
  id: string;
  role: string;
  subtitle: string;
  recommendedTheme: string;
  keySessions: string[];
  keySandboxTool: string;
  recommendedResource: string;
};

const tracks: RoleTrack[] = [
  {
    id: "policymaker",
    role: "Policymakers & Regulators",
    subtitle: "Ministers, MPs, legal advisors & agency heads",
    recommendedTheme: "Democracy & Digital Governance",
    keySessions: [
      "AI and the Future of Sovereign Democracy",
      "Governing Algorithmic Power: Regulatory Frameworks for Africa",
      "Policy Lab: Drafting the Abuja Declaration on AI & Democracy",
    ],
    keySandboxTool: "Algorithmic Impact Scorecard for Public Bodies",
    recommendedResource: "State of AI & Democracy in Africa Report 2026",
  },
  {
    id: "electoral",
    role: "Electoral Commissioners & Auditors",
    subtitle: "Electoral management bodies, IT directors & observers",
    recommendedTheme: "AI & Elections",
    keySessions: [
      "AI, Elections & Electoral Integrity",
      "Synthetic Media, Deepfakes & Rebuilding Information Trust",
      "Auditing Electoral Disinformation at Scale",
    ],
    keySandboxTool: "VeriVote Monitor Multimodal Verification Pipeline",
    recommendedResource: "Policy Brief: Safeguarding Elections against Deepfakes",
  },
  {
    id: "developer",
    role: "Civic Tech Developers & AI Engineers",
    subtitle: "Founders, open-source contributors & data scientists",
    recommendedTheme: "Civic Technology & Open Source",
    keySessions: [
      "Designing Inclusive AI for Local Civic Engagement",
      "The Sandbox Showcase: Live Prototype Demonstrations",
      "Civic Tech Hackathon & Live Pitch Session",
    ],
    keySandboxTool: "Sauti AI Local Language Parliamentary Bot",
    recommendedResource: "Multilingual Open AI Models Technical Presentation",
  },
  {
    id: "researcher",
    role: "Researchers & Academics",
    subtitle: "Policy scholars, computer scientists & ethicists",
    recommendedTheme: "Responsible AI & Human Rights",
    keySessions: [
      "AI in Public Service Delivery & Citizen Redress",
      "Fireside Chat: AI Ethics, Human Rights & Sovereign Tech Policy",
      "Evaluating Algorithmic Bias in Automated Public Housing",
    ],
    keySandboxTool: "PublicBudget AI Auditor Anomaly Detector",
    recommendedResource: "Algorithmic Audit Framework for Public Procurement",
  },
  {
    id: "media",
    role: "Journalists & Fact-Checkers",
    subtitle: "Investigative reporters, editors & fact-checking leads",
    recommendedTheme: "AI, Information & Trust",
    keySessions: [
      "Synthetic Media, Deepfakes & Rebuilding Information Trust",
      "Deepfake Provenance & Watermarking in Local Newsrooms",
      "Information Commons & Verification Workflows",
    ],
    keySandboxTool: "DeepTrace Misinfo Observatory Toolkit",
    recommendedResource: "Media Provenance Cryptographic Standards Whitepaper",
  },
];

export function TrackFinderQuiz() {
  const [selectedRoleId, setSelectedRoleId] = useState<string>("policymaker");

  const currentTrack: RoleTrack = tracks.find((t) => t.id === selectedRoleId) ?? tracks[0]!;

  return (
    <section className="border-b border-border bg-slate-900 py-20 text-slate-100 md:py-28">
      <div className="container-forum">
        <SectionHeader
          eyebrow="Interactive Experience Guide"
          title="Find Your Forum Track"
          tone="dark"
          lede="Select your professional background to receive customized recommendations for sessions, live sandbox demos, policy labs, and research publications."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          {/* Role Selection Buttons */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">
              <Compass className="h-4 w-4" />
              <span>Select Your Role</span>
            </div>

            {tracks.map((track) => (
              <button
                key={track.id}
                type="button"
                onClick={() => setSelectedRoleId(track.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                  selectedRoleId === track.id
                    ? "border-cyan-400 bg-slate-950 shadow-lg"
                    : "border-slate-800 bg-slate-950/50 hover:border-slate-700 hover:bg-slate-950/80"
                }`}
              >
                <div>
                  <h4 className={`text-base font-bold ${selectedRoleId === track.id ? "text-cyan-300" : "text-white"}`}>
                    {track.role}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">{track.subtitle}</p>
                </div>
                <div className={`h-3 w-3 rounded-full ${selectedRoleId === track.id ? "bg-cyan-400" : "bg-slate-700"}`} />
              </button>
            ))}
          </div>

          {/* Tailored Recommendation Card */}
          <div className="lg:col-span-7">
            <Reveal key={currentTrack.id}>
              <div className="rounded-2xl border border-cyan-500/30 bg-slate-950 p-8 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <span className="eyebrow text-cyan-400">Tailored Pathway</span>
                    <h3 className="text-2xl font-bold text-white mt-1">{currentTrack.role}</h3>
                  </div>
                  <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300 border border-cyan-400/20">
                    Primary Theme: {currentTrack.recommendedTheme}
                  </span>
                </div>

                <div className="mt-6 space-y-6">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Must-Attend Sessions & Workshops
                    </h4>
                    <div className="space-y-2.5">
                      {currentTrack.keySessions.map((session, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-sm text-slate-200">
                          <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{session}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 pt-4 border-t border-slate-800">
                    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                      <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider block">
                        Featured Sandbox Prototype
                      </span>
                      <p className="mt-1 text-xs font-bold text-white">
                        {currentTrack.keySandboxTool}
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                      <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider block">
                        Recommended Knowledge Brief
                      </span>
                      <p className="mt-1 text-xs font-bold text-white">
                        {currentTrack.recommendedResource}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <Link
                      to={"/program" as any}
                      className="inline-flex items-center gap-2 text-xs font-bold text-cyan-300 hover:text-cyan-200 transition-colors"
                    >
                      <span>Explore Program Schedule for {currentTrack.role}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
