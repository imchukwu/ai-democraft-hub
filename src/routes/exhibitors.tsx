import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/forum/Navbar";
import { ExhibitorsSection } from "@/components/forum/ExhibitorsSection";
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
          <span className="eyebrow text-cyan-400">Exhibition Floor</span>
          <h1 className="mt-2 text-4xl font-extrabold text-white">Exhibitors Directory</h1>
          <p className="mt-2 text-sm text-slate-300">Browse international organizations, GovTech labs, and research institutes exhibiting at the Forum.</p>
        </div>
      </div>
      <ExhibitorsSection />
      <Footer />
    </div>
  );
}
