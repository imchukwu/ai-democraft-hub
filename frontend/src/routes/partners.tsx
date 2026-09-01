import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/forum/Navbar";
import { PartnersGrid } from "@/components/forum/PartnersGrid";
import { Footer } from "@/components/forum/Footer";

export const Route = createFileRoute("/partners")({
  component: PartnersPage,
});

function PartnersPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="border-b border-border bg-slate-950 py-16 text-slate-100 md:py-20 text-center">
        <div className="container-forum">
          <span className="eyebrow text-cyan-400">Convening Ecosystem</span>
          <h1 className="mt-2 text-4xl font-extrabold text-white">Partners & Supporting Organizations</h1>
          <p className="mt-2 text-sm text-slate-300">Collaborating with organizers, strategic partners, technology labs, and media partners.</p>
        </div>
      </div>
      <PartnersGrid />
      <Footer />
    </div>
  );
}
