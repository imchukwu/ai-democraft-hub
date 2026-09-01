import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/forum/Navbar";
import { SpeakersGrid } from "@/components/forum/SpeakersGrid";
import { Footer } from "@/components/forum/Footer";

export const Route = createFileRoute("/speakers")({
  component: SpeakersPage,
});

function SpeakersPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="border-b border-border bg-slate-950 py-16 text-slate-100 md:py-20 text-center">
        <div className="container-forum">
          <span className="eyebrow text-cyan-400">Speaker Directory</span>
          <h1 className="mt-2 text-4xl font-extrabold text-white">Global Leaders & Faculty</h1>
          <p className="mt-2 text-sm text-slate-300">Click any speaker to inspect full biography, expertise tags, and session contributions.</p>
        </div>
      </div>
      <SpeakersGrid />
      <Footer />
    </div>
  );
}
