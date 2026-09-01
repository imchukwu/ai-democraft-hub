import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/forum/Navbar";
import { InnovationHub } from "@/components/forum/InnovationHub";
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
          <span className="eyebrow text-[#FEA105]">Exhibition & Grant Competition</span>
          <h1 className="mt-2 text-4xl font-extrabold text-white">Innovation & Exhibition Hub</h1>
          <p className="mt-2 text-sm text-slate-300">Curated tech showcases, platform safety measures, and home-grown AI pitch grant competition.</p>
        </div>
      </div>
      <InnovationHub />
      <Footer />
    </div>
  );
}
