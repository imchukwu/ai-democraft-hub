import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/forum/Navbar";
import { RegistrationSection } from "@/components/forum/RegistrationSection";
import { Footer } from "@/components/forum/Footer";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="border-b border-border bg-slate-950 py-16 text-slate-100 md:py-20 text-center">
        <div className="container-forum">
          <span className="eyebrow text-cyan-400">Convening Registration</span>
          <h1 className="mt-2 text-4xl font-extrabold text-white">Register for the Forum</h1>
          <p className="mt-2 text-sm text-slate-300">7–9 October 2026 · Congress Hall, Transcorp Hilton, Abuja, Nigeria</p>
        </div>
      </div>
      <RegistrationSection />
      <Footer />
    </div>
  );
}
