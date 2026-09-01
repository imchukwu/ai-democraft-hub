import { useState } from "react";
import { Cta } from "./cta";
import { Reveal, SectionHeader } from "./primitives";
import { sandboxProjects, exhibitors, sandboxTracks } from "@/data/forum";
import { ArrowRight, CheckCircle2, Cpu, ShieldCheck, Sparkles, Store, Award } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function InnovationHub() {
  const [activeTab, setActiveTab] = useState<"sandbox" | "exhibitors" | "tracks">("sandbox");

  const previewSandbox = sandboxProjects.slice(0, 3);
  const previewExhibitors = exhibitors.slice(0, 4);

  return (
    <section className="border-b border-border bg-parallax-dark py-20 text-slate-100 md:py-28">
      <div className="container-forum">
        <SectionHeader
          eyebrow="Exhibition & Pitch Grant Competition"
          title="AI & Democracy Innovation Hub"
          tone="dark"
          lede="Showcasing cutting-edge technology platforms (Microsoft, Meta, TikTok) alongside home-grown AI innovations competing for the AI for Elections Implementation Grant."
        />

        {/* Core Objective & Grant Callout Banner */}
        <Reveal className="mt-12 grid gap-8 rounded-2xl border border-[#FEA105]/30 bg-slate-900/90 p-8 shadow-2xl lg:grid-cols-12">
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FEA105]">
              <Award className="h-4 w-4" />
              <span>The AI for Elections Innovation Sandbox</span>
            </div>
            <h3 className="text-2xl font-bold text-white leading-snug">
              Funding Home-Grown AI Solutions for Nigeria's 2027 Polls
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              At the heart of AIDF 2026 is a live pitch competition inviting developers, civic technologists, and start-ups to pitch AI ideas that advance election integrity, voter education, and results transparency. The winning idea(s) will receive an implementation grant to support deployment ahead of 2027.
            </p>
          </div>

          <div className="lg:col-span-6 space-y-3 border-t border-slate-800 pt-6 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FEA105]">
              <ShieldCheck className="h-4 w-4" />
              <span>The AI & Democracy Exhibition</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Featuring leading technology platforms such as Microsoft, Meta (Facebook, Instagram, WhatsApp), and TikTok alongside civic tech institutions presenting real-time synthetic media detection, content provenance, and election observation tools.
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              <span className="rounded bg-slate-800 px-2.5 py-1 font-mono text-[10px] text-cyan-300">Microsoft</span>
              <span className="rounded bg-slate-800 px-2.5 py-1 font-mono text-[10px] text-cyan-300">Meta</span>
              <span className="rounded bg-slate-800 px-2.5 py-1 font-mono text-[10px] text-cyan-300">TikTok</span>
              <span className="rounded bg-slate-800 px-2.5 py-1 font-mono text-[10px] text-cyan-300">Yiaga Africa</span>
            </div>
          </div>
        </Reveal>

        {/* Tab Toggle */}
        <div className="mt-12 flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveTab("sandbox")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === "sandbox"
                  ? "bg-cyan-400 text-slate-950 shadow-lg"
                  : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              <Cpu className="h-4 w-4" />
              <span>Sandbox Grant Candidates</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("tracks")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === "tracks"
                  ? "bg-cyan-400 text-slate-950 shadow-lg"
                  : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              <Sparkles className="h-4 w-4" />
              <span>4 Innovation Tracks</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("exhibitors")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === "exhibitors"
                  ? "bg-cyan-400 text-slate-950 shadow-lg"
                  : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              <Store className="h-4 w-4" />
              <span>Tech & Platform Exhibitors</span>
            </button>
          </div>

          <Link
            to="/sandbox"
            className="inline-flex items-center gap-2 text-xs font-bold text-cyan-300 hover:text-cyan-200"
          >
            <span>View Full Innovation & Exhibition Guide</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Tab Content Display */}
        {activeTab === "sandbox" ? (
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {previewSandbox.map((project, idx) => (
              <Reveal key={project.id} delay={idx * 60}>
                <div className="group flex h-full flex-col justify-between overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80 p-6 transition-all hover:border-cyan-400">
                  <div>
                    <div className="relative aspect-video overflow-hidden rounded-lg bg-slate-950 border border-slate-800">
                      <img src={project.imageUrl} alt={project.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="rounded-full bg-cyan-400/10 px-2.5 py-0.5 text-[11px] font-semibold text-cyan-300 border border-cyan-400/20">
                        {project.category}
                      </span>
                      <span className="font-mono text-[10px] text-amber-300">{project.demoStatus}</span>
                    </div>
                    <h4 className="mt-3 text-lg font-bold text-white group-hover:text-cyan-300">{project.name}</h4>
                    <p className="mt-1 text-xs text-slate-400">{project.organization} · {project.country}</p>
                    <p className="mt-3 text-xs leading-relaxed text-slate-300">{project.description}</p>
                  </div>
                  <div className="mt-4 border-t border-slate-800 pt-3 text-xs font-semibold text-cyan-400">
                    Pitch Details & Grant Roadmap →
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        ) : activeTab === "tracks" ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {sandboxTracks.map((tr, idx) => (
              <Reveal key={tr.id} delay={idx * 60}>
                <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6">
                  <span className="font-mono text-xs font-bold text-cyan-400">Track 0{idx + 1}</span>
                  <h4 className="mt-2 text-lg font-bold text-white">{tr.title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">{tr.lookingFor}</p>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {previewExhibitors.map((ex, idx) => (
              <Reveal key={ex.id} delay={idx * 60}>
                <div className="group flex h-full flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/80 p-6 transition-all hover:border-cyan-400">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-md bg-cyan-400/10 px-2.5 py-0.5 text-[11px] font-semibold text-cyan-300 border border-cyan-400/20">
                        {ex.sector}
                      </span>
                      <span className="font-mono text-xs font-bold text-cyan-400">{ex.booth}</span>
                    </div>
                    <h4 className="mt-3 text-lg font-bold text-white group-hover:text-cyan-300">{ex.name}</h4>
                    <p className="mt-1 text-xs text-slate-400">{ex.country}</p>
                    <p className="mt-3 text-xs leading-relaxed text-slate-300">{ex.description}</p>
                  </div>
                  <div className="mt-4 border-t border-slate-800 pt-3 text-xs font-semibold text-cyan-400">
                    Visit Booth Details →
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {/* Section Action Footer */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 border-t border-slate-800 pt-8">
          <Cta to="/sandbox" tone="accent">
            Explore Innovation Sandbox & Exhibition
          </Cta>
          <Cta to="/register" tone="outline" arrow={false}>
            Apply for Innovation Pitch Grant
          </Cta>
        </div>
      </div>
    </section>
  );
}
