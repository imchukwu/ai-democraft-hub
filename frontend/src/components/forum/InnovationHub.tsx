import { useState } from "react";
import { Cta } from "./cta";
import { Reveal, SectionHeader } from "./primitives";
import { sandboxTracks, exhibitionFocusAreas } from "@/data/forum";
import { ArrowRight, CheckCircle2, Cpu, ShieldCheck, Sparkles, Store, Award } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function InnovationHub() {
  const [activeTab, setActiveTab] = useState<"exhibition" | "challenge">("exhibition");

  return (
    <section className="border-b border-border bg-parallax-dark py-20 text-slate-100 md:py-28">
      <div className="container-forum">
        <SectionHeader
          eyebrow="Exhibition & Pitch Grant Competition"
          title="AI & Democracy Innovation & Exhibition"
          tone="dark"
          lede="Showcasing curated AI-powered tools advancing democracy alongside home-grown solutions competing for the AI for Elections Implementation Grant."
        />

        {/* Executive Overview Banner */}
        <Reveal className="mt-12 grid gap-8 rounded-2xl border border-[#FEA105]/30 bg-slate-900/90 p-8 shadow-2xl lg:grid-cols-12">
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FEA105]">
              <ShieldCheck className="h-4 w-4" />
              <span>The AI & Democracy Exhibition</span>
            </div>
            <h3 className="text-2xl font-bold text-white leading-snug">
              Curated Showcase of State-of-the-Art Civic Tech
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              A signature feature of AIDF 2026 offering technology companies, innovators, and civil society a platform to demonstrate practical solutions to decision-makers. Expected exhibitors include leading technology platforms such as <strong>Microsoft, Meta, Instagram, WhatsApp, and TikTok</strong> alongside civic-tech organizations, research institutions, and start-ups.
            </p>
          </div>

          <div className="lg:col-span-6 space-y-4 border-t border-slate-800 pt-6 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FEA105]">
              <Award className="h-4 w-4" />
              <span>The AI for Elections Innovation Challenge</span>
            </div>
            <h3 className="text-2xl font-bold text-white leading-snug">
              Home-Grown Innovation Implementation Grant
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              At the heart of AIDF 2026's commitment to home-grown solutions, inviting innovators, start-ups, developers, and civic technologists to pitch ideas that harness AI for 2027 polls. Winning idea(s) will receive an implementation grant to support deployment ahead of the 2027 elections.
            </p>
          </div>
        </Reveal>

        {/* Tab Toggle */}
        <div className="mt-12 flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveTab("exhibition")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === "exhibition"
                  ? "bg-cyan-400 text-slate-950 shadow-lg"
                  : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              <Store className="h-4 w-4" />
              <span>Exhibition Focus Areas & Platforms</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("challenge")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === "challenge"
                  ? "bg-cyan-400 text-slate-950 shadow-lg"
                  : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              <Sparkles className="h-4 w-4" />
              <span>Challenge Tracks & Grant Criteria</span>
            </button>
          </div>

          <Link
            to="/exhibitor-register"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#FEA105] hover:underline"
          >
            <span>Apply for Booth Space or Pitch Slot (Deadline 11 Sept)</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Tab Content Display */}
        {activeTab === "exhibition" ? (
          <div className="mt-8 space-y-8">
            <div className="rounded-xl border border-cyan-500/20 bg-slate-900/60 p-6">
              <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider">Expected Exhibitors</span>
              <p className="mt-2 text-sm text-slate-200">
                Leading technology platforms including <strong>Microsoft, Meta, Instagram, WhatsApp, and TikTok</strong> alongside civic-tech organizations, research institutions, and start-ups.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded bg-slate-800 px-3 py-1 text-xs font-semibold text-cyan-300">Microsoft</span>
                <span className="rounded bg-slate-800 px-3 py-1 text-xs font-semibold text-cyan-300">Meta</span>
                <span className="rounded bg-slate-800 px-3 py-1 text-xs font-semibold text-cyan-300">Instagram</span>
                <span className="rounded bg-slate-800 px-3 py-1 text-xs font-semibold text-cyan-300">WhatsApp</span>
                <span className="rounded bg-slate-800 px-3 py-1 text-xs font-semibold text-cyan-300">TikTok</span>
                <span className="rounded bg-slate-800 px-3 py-1 text-xs font-semibold text-cyan-300">Civic-Tech Start-ups</span>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {exhibitionFocusAreas.map((area, idx) => (
                <Reveal key={area.id} delay={idx * 50}>
                  <div className="group flex h-full flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/80 p-6 transition-all hover:border-cyan-400">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Focus Area 0{idx + 1}</span>
                      </div>
                      <h4 className="mt-3 text-lg font-bold text-white group-hover:text-cyan-300">{area.title}</h4>
                      <p className="mt-2 text-xs leading-relaxed text-slate-300">{area.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="rounded-xl border border-amber-500/30 bg-slate-900/90 p-6 text-center">
              <p className="text-xs text-amber-300 font-semibold">
                * Note: Exhibitor applications are currently open until 11th September 2026. The official lineup of submitted solution products will be published following committee review.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-8 space-y-8">
            <div className="grid gap-6 sm:grid-cols-2">
              {sandboxTracks.map((tr, idx) => (
                <Reveal key={tr.id} delay={idx * 60}>
                  <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-6">
                    <span className="font-mono text-xs font-bold text-cyan-400">Challenge Track 0{idx + 1}</span>
                    <h4 className="mt-2 text-lg font-bold text-white">{tr.title}</h4>
                    <p className="mt-2 text-xs leading-relaxed text-slate-300">
                      <strong>What we are looking for:</strong> {tr.lookingFor}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="rounded-xl border border-amber-500/30 bg-slate-900/90 p-6 text-center">
              <p className="text-xs text-amber-300 font-semibold">
                * Note: Innovation Challenge pitch entries are open. Shortlisted innovators competing for the implementation grant will be announced following application evaluation.
              </p>
            </div>
          </div>
        )}

        {/* Section Action Footer */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 border-t border-slate-800 pt-8">
          <Link
            to="/exhibitor-register"
            className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#FEA105] px-6 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg shadow-amber-500/20 transition-all hover:bg-amber-400 hover:shadow-xl"
          >
            <span>Apply as an Exhibitor (Deadline 11 Sept)</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            to="/sandbox"
            className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-cyan-400 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg transition-all hover:bg-cyan-300 hover:shadow-xl"
          >
            <span>View Exhibition & Pitch Details</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
