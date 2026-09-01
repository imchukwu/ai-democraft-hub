import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/forum/Navbar";
import { ResourcesSection } from "@/components/forum/ResourcesSection";
import { Footer } from "@/components/forum/Footer";

export const Route = createFileRoute("/resources")({
  component: ResourcesPage,
});

function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="border-b border-border bg-slate-950 py-16 text-slate-100 md:py-20 text-center">
        <div className="container-forum">
          <span className="eyebrow text-cyan-400">Knowledge Repository</span>
          <h1 className="mt-2 text-4xl font-extrabold text-white">Publications, Reports & Recordings</h1>
          <p className="mt-2 text-sm text-slate-300">Filter research papers, policy briefs, session recordings, and presentation slide decks.</p>
        </div>
      </div>
      <ResourcesSection />
      <Footer />
    </div>
  );
}
