import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/forum/Navbar";
import { Footer } from "@/components/forum/Footer";

export const Route = createFileRoute("/exhibitors")({
  component: ExhibitorsPage,
});

function ExhibitorsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="border-b border-border bg-slate-950 py-16 text-slate-100 md:py-20 text-center">
        <div className="container-forum">
          <span className="eyebrow text-amber-400">Exhibition Floor</span>
          <h1 className="mt-2 text-4xl font-extrabold text-white">Exhibitors Directory</h1>
          <p className="mt-2 text-sm text-slate-300">7th – 9th October 2026 · Congress Hall, Transcorp Hilton, Abuja</p>
        </div>
      </div>
      <div className="py-24 text-center container-forum max-w-2xl">
        <div className="rounded-2xl border border-amber-500/30 bg-slate-900/90 p-10 shadow-xl">
          <span className="eyebrow text-amber-400">Applications Open</span>
          <h2 className="mt-3 text-2xl font-bold text-white">Exhibitor Applications Under Review</h2>
          <p className="mt-3 text-sm text-slate-300 leading-relaxed">
            The official AIDF 2026 Exhibitors Directory will be published after the application deadline on 11th September 2026. Tech platforms, GovTech labs, and civic innovators can apply now for dedicated booth space.
          </p>
          <div className="mt-6">
            <Link
              to="/exhibitor-register"
              className="inline-flex items-center rounded-lg bg-amber-400 px-6 py-3 text-sm font-bold text-slate-950 hover:bg-amber-300 transition-colors"
            >
              Apply for Exhibitor Booth (Deadline 11 Sept)
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
