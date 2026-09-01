import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/forum/Navbar";
import { Footer } from "@/components/forum/Footer";
import { ExhibitorRegistrationSection } from "@/components/forum/ExhibitorRegistrationSection";

export const Route = createFileRoute("/exhibitor-register")({
  component: ExhibitorRegisterPage,
});

function ExhibitorRegisterPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="border-b border-border bg-slate-950 py-16 text-slate-100 md:py-20 text-center">
        <div className="container-forum">
          <span className="eyebrow text-amber-400">Exhibitor Accreditation & Tech Booths</span>
          <h1 className="mt-2 text-4xl font-extrabold text-white sm:text-5xl">Exhibitor Registration Application</h1>
          <p className="mt-3 text-sm text-slate-300 max-w-2xl mx-auto">
            Apply for dedicated exhibition space, technology demonstration slots, and directory listing at Congress Hall, Transcorp Hilton, Abuja (7th – 9th October 2026).
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-300">
            <span>Deadline: 11th September 2026 (23:59 WAT)</span>
          </div>
        </div>
      </div>

      <ExhibitorRegistrationSection />
      <Footer />
    </div>
  );
}
