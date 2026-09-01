import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/forum/Navbar";
import { SandboxSection } from "@/components/forum/SandboxSection";
import { Footer } from "@/components/forum/Footer";

export const Route = createFileRoute("/sandbox")({
  component: SandboxPage,
});

function SandboxPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="border-b border-border bg-slate-950 py-16 text-slate-100 md:py-20 text-center">
        <div className="container-forum">
          <span className="eyebrow text-cyan-400">Experimental Hub</span>
          <h1 className="mt-2 text-4xl font-extrabold text-white">The Sandbox</h1>
          <p className="mt-2 text-sm text-slate-300">Live prototypes, open-source auditing tools, and AI civic tech demonstrations.</p>
        </div>
      </div>
      <SandboxSection />
      <Footer />
    </div>
  );
}
