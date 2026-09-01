import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/forum/Navbar";
import { ShowcasesSection } from "@/components/forum/ShowcasesSection";
import { Footer } from "@/components/forum/Footer";

export const Route = createFileRoute("/showcases")({
  component: ShowcasesPage,
});

function ShowcasesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="border-b border-border bg-slate-950 py-16 text-slate-100 md:py-20 text-center">
        <div className="container-forum">
          <span className="eyebrow text-cyan-400">Editorial Features</span>
          <h1 className="mt-2 text-4xl font-extrabold text-white">Forum Showcases</h1>
          <p className="mt-2 text-sm text-slate-300">Explore magazine feature stories detailing practical AI & democracy demonstrations.</p>
        </div>
      </div>
      <ShowcasesSection />
      <Footer />
    </div>
  );
}
