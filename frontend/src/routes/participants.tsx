import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/forum/Navbar";
import { EventCountdownBar } from "@/components/forum/EventCountdownBar";
import { Footer } from "@/components/forum/Footer";
import { Cta } from "@/components/forum/cta";
import { Reveal, SectionHeader } from "@/components/forum/primitives";
import { FaqSection } from "@/components/forum/FaqSection";
import { forumMeta } from "@/data/forum";
import {
  Building2,
  Bus,
  FileCheck2,
  Hotel,
  Plane,
  ShieldCheck,
  Users,
  Award,
} from "lucide-react";

export const Route = createFileRoute("/participants")({
  component: ParticipantsPage,
});

const stakeholders = [
  {
    title: "Election Management Bodies (INEC & ECONEC)",
    description: "Electoral commissioners, IT directors, results management teams, and regional EMB leads from across West Africa.",
  },
  {
    title: "Political Parties & Candidates",
    description: "Party leadership, campaign managers, and digital strategy leads signing commitments under the Abuja Accord.",
  },
  {
    title: "Technology Platforms (Meta, Microsoft, TikTok, X)",
    description: "Policy leads, content safety directors, and AI threat intelligence engineers establishing election integrity measures.",
  },
  {
    title: "Civil Society & Media Watchdogs",
    description: "Democracy advocates, election observation organizations, investigative journalists, and fact-checking networks.",
  },
  {
    title: "Government & Regulators",
    description: "Ministers, parliamentary committees, data protection commissioners, and national AI taskforces.",
  },
  {
    title: "Academics & AI Ethicists",
    description: "Computer scientists, policy scholars, legal experts, and researchers mapping AI across African democratic systems.",
  },
  {
    title: "Youth Leaders & Civic Innovators",
    description: "Grassroots organizers, start-up founders, developers, and civic tech creators pitching in the Innovation Sandbox.",
  },
  {
    title: "Development Partners & Donors",
    description: "Multilateral agencies, philanthropic foundations, and diplomatic missions supporting democratic resilience.",
  },
];

function ParticipantsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-cyan-500 selection:text-slate-950">
      <Navbar />
      <EventCountdownBar />

      {/* Hero Header */}
      <section className="border-b border-border bg-slate-950 py-16 text-slate-100 md:py-24">
        <div className="container-forum max-w-4xl text-center">
          <Reveal>
            <span className="eyebrow text-cyan-400">Multi-Stakeholder Delegations</span>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              Forum Participants
            </h1>
            <p className="mt-4 text-base text-slate-300 leading-relaxed md:text-lg">
              AIDF 2026 is deliberately multi-stakeholder, convening key actors whose collaboration is essential to protecting Nigeria's 2027 general elections in the AI era.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Cta to="/register" tone="accent">
                Register as a Delegate
              </Cta>
              <Cta to="/program" tone="outline" arrow={false}>
                View 2-Day Program
              </Cta>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stakeholders Grid */}
      <section className="border-b border-border py-20 md:py-28">
        <div className="container-forum">
          <SectionHeader
            eyebrow="Target Constituencies"
            title="Who Should Attend AIDF 2026"
            lede="Bringing together decision-makers, practitioners, and innovators from across Nigeria and the international community."
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stakeholders.map((cat, idx) => (
              <Reveal key={idx} delay={idx * 50}>
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm hover:border-primary hover:shadow-md transition-all">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary mb-4">
                    <Users className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">{cat.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{cat.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditation & Process */}
      <section className="border-b border-border bg-slate-900 py-20 text-slate-100 md:py-24">
        <div className="container-forum">
          <SectionHeader
            eyebrow="Step-by-Step Accreditation"
            title="Delegate Accreditation Process"
            tone="dark"
            lede="Follow these steps to secure official delegate credentials for the Abuja convening."
          />

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <Reveal delay={60}>
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-6">
                <span className="font-mono text-3xl font-extrabold text-cyan-400">01</span>
                <h4 className="mt-3 text-lg font-bold text-white">Submit Registration</h4>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  Complete the online accreditation form selecting your delegation category and institutional affiliation.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-6">
                <span className="font-mono text-3xl font-extrabold text-cyan-400">02</span>
                <h4 className="mt-3 text-lg font-bold text-white">Receive Protocol Confirmation</h4>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  Receive your official Yiaga Africa delegate approval letter for visa facilitation and diplomatic clearance.
                </p>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-6">
                <span className="font-mono text-3xl font-extrabold text-cyan-400">03</span>
                <h4 className="mt-3 text-lg font-bold text-white">Collect Badge at ICC Abuja</h4>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                  Collect your RFID delegate badge and welcome pack at the ICC Abuja Exhibition Atrium starting Wednesday, 7 October.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Travel & Host City */}
      <section className="border-b border-border py-20 md:py-28">
        <div className="container-forum">
          <SectionHeader
            eyebrow="Travel & Host City"
            title="Abuja Logistics & Accommodations"
            lede="Essential logistics information for delegates arriving in Abuja, Nigeria."
          />

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-border bg-card p-6">
              <Building2 className="h-6 w-6 text-primary mb-3" />
              <h4 className="text-base font-bold text-foreground">Venue Location</h4>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                {forumMeta.venue}, Herbert Macaulay Way, CBD, Abuja, Nigeria.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <Plane className="h-6 w-6 text-primary mb-3" />
              <h4 className="text-base font-bold text-foreground">Flight Arrivals</h4>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Direct international arrivals via Nnamdi Azikiwe International Airport (ABV).
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <Hotel className="h-6 w-6 text-primary mb-3" />
              <h4 className="text-base font-bold text-foreground">Partner Hotel Rates</h4>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Discount room blocks at Transcorp Hilton Abuja, Continental Hotel, and Fraser Suites.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <Bus className="h-6 w-6 text-primary mb-3" />
              <h4 className="text-base font-bold text-foreground">Airport Shuttles</h4>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Complimentary security shuttles running between partner hotels, ABV airport, and ICC.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Delegate FAQs */}
      <FaqSection />

      {/* CTA Footer */}
      <section className="bg-slate-950 py-16 text-slate-100 text-center border-t border-slate-800">
        <div className="container-forum max-w-2xl">
          <h2 className="text-3xl font-extrabold text-white">Join Us in Abuja, Nigeria</h2>
          <p className="mt-3 text-sm text-slate-300">
            Be part of the national convening establishing safeguards for Nigeria's 2027 general elections.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Cta to="/register" tone="accent">
              Complete Delegate Registration
            </Cta>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
