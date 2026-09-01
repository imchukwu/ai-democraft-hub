import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/forum/Navbar";
import { ProgramSchedule } from "@/components/forum/ProgramSchedule";
import { Footer } from "@/components/forum/Footer";

export const Route = createFileRoute("/program")({
  component: ProgramPage,
});

function ProgramPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="border-b border-border bg-slate-950 py-16 text-slate-100 md:py-20 text-center">
        <div className="container-forum">
          <span className="eyebrow text-cyan-400">Convening Schedule</span>
          <h1 className="mt-2 text-4xl font-extrabold text-white">Full 5-Day Program</h1>
          <p className="mt-2 text-sm text-slate-300">7–11 October 2026 · Abuja, Nigeria</p>
        </div>
      </div>
      <ProgramSchedule />
      <Footer />
    </div>
  );
}
