import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/forum/Navbar";
import { EventCountdownBar } from "@/components/forum/EventCountdownBar";
import { Hero } from "@/components/forum/Hero";
import { WhyAiDemocracy } from "@/components/forum/WhyAiDemocracy";
import { ProgramSchedule } from "@/components/forum/ProgramSchedule";
import { SpeakersGrid } from "@/components/forum/SpeakersGrid";
import { PartnersGrid } from "@/components/forum/PartnersGrid";
import { InnovationHub } from "@/components/forum/InnovationHub";
import { RegistrationSection } from "@/components/forum/RegistrationSection";
import { FaqSection } from "@/components/forum/FaqSection";
import { NewsletterSection } from "@/components/forum/NewsletterSection";
import { Footer } from "@/components/forum/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-cyan-500 selection:text-slate-950">
      <Navbar />
      <EventCountdownBar />
      <Hero />
      <WhyAiDemocracy />
      <ProgramSchedule />
      <SpeakersGrid />
      <PartnersGrid />
      <InnovationHub />
      <RegistrationSection />
      <FaqSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}
