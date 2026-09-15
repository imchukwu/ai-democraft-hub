import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/forum/Navbar";
import { Footer } from "@/components/forum/Footer";
import { SandboxRegistrationSection } from "@/components/forum/SandboxRegistrationSection";

export const Route = createFileRoute("/sandbox-apply")({
  component: SandboxApplyPage,
});

function SandboxApplyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Header */}
      <div className="border-b border-border bg-slate-950 py-16 text-slate-100 md:py-20 text-center">
        <div className="container-forum max-w-3xl">
          <span className="eyebrow text-[#15B708]">Call for Innovators</span>
          <h1 className="mt-2 text-4xl font-extrabold text-white sm:text-5xl">
            Apply to The Sandbox
          </h1>
          <p className="mt-3 text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            The Sandbox is the innovation showcase of the AI &amp; Democracy Forum — 14–16 October
            2026 at Congress Hall, Transcorp Hilton, Abuja. Submit your working prototype and pitch
            live in front of a jury of experts for grant funding, a pavilion booth, and a global
            platform.
          </p>

          {/* Key Info Pills */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#15B708]/40 bg-[#15B708]/10 px-4 py-1.5 text-xs font-bold text-[#15B708]">
              <span>Deadline: 24–25 September 2026</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-4 py-1.5 text-xs font-semibold text-slate-300">
              <span>Open Internationally</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-300">
              <span>4 Focus Areas · Grant Funding Available</span>
            </div>
          </div>
        </div>
      </div>

      <SandboxRegistrationSection />
      <Footer />
    </div>
  );
}
