import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/forum/Navbar";
import { EventCountdownBar } from "@/components/forum/EventCountdownBar";
import { Footer } from "@/components/forum/Footer";
import { Cta } from "@/components/forum/cta";
import { Reveal, SectionHeader } from "@/components/forum/primitives";
import { forumMeta, abujaAccordPledges } from "@/data/forum";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Cpu,
  FileCheck2,
  Gavel,
  Globe2,
  Layers,
  Scale,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-cyan-500 selection:text-slate-950">
      <Navbar />
      <EventCountdownBar />

      {/* Hero Header */}
      <section className="border-b border-border bg-slate-950 py-16 text-slate-100 md:py-24">
        <div className="container-forum max-w-4xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-slate-900 px-4 py-1 text-xs font-semibold text-cyan-400 mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Yiaga Africa & Partners · AIDF 2026</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              About the Forum
            </h1>
            <p className="mt-4 font-mono text-sm text-cyan-300 font-bold uppercase tracking-wider">
              "{forumMeta.themeHeadline}"
            </p>
            <p className="mt-3 text-base text-slate-300 leading-relaxed md:text-lg">
              {forumMeta.themeSubtitle}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Cta to="/register" tone="accent">
                Register as a Delegate
              </Cta>
              <Cta to="/program" tone="outline" arrow={false}>
                Explore 2-Day Program
              </Cta>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="border-b border-border py-20 md:py-28">
        <div className="container-forum max-w-5xl">
          <SectionHeader
            eyebrow="Executive Summary"
            title="A National Platform for Nigeria's 2027 Election Safeguards"
            lede="Hosted by Yiaga Africa and partners as a national platform to examine, ahead of 2027, how Nigeria can govern and harness AI to strengthen rather than undermine the credibility of elections."
          />

          <Reveal className="mt-12 space-y-6 text-base text-muted-foreground leading-relaxed">
            <p>
              The AI and Democracy Forum is hosted by Yiaga Africa and partners as a national platform to examine, ahead of 2027, how Nigeria can govern and harness AI to strengthen rather than undermine the credibility of the elections and the resilience of Nigeria's democracy. This national multi-stakeholder dialogue will explore the risks and opportunities of artificial intelligence for democracy and elections in Nigeria ahead of 2027. It aims to establish a platform for civil society, electoral commissions, political parties, technology companies and media partners to build a shared understanding of AI-enabled threats to electoral integrity and the necessary safeguards required to counter them.
            </p>
            <p>
              The AIDF will feature a high-level opening plenary, “Will Algorithms Decide the 2027 Vote?”, bringing together electoral, government, civil society, media, and technology leaders to reflect on the implications of AI for Nigeria's 2027 elections. This will be followed by thematic sessions and panels organized around the six core themes, combining expert insights, evidence, and cross-sector debate. The programme will also include an AI & Democracy Exhibition, where technology companies and innovators will showcase AI tools designed to support democracy and credible elections, as well as an AI for Elections Innovation Sandbox, featuring live pitches from innovators competing for an implementation grant to implement AI-powered ideas for the 2027 elections. In addition, masterclasses and skills sessions will provide practical training for election observers, journalists, party agents, and civil society actors on how to detect and respond to AI-enabled electoral threats.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Background & Context */}
      <section className="border-b border-border bg-slate-900 py-20 text-slate-100 md:py-28">
        <div className="container-forum max-w-5xl">
          <SectionHeader
            eyebrow="Background & Context"
            title="The 2023 Baseline & 2027 AI Frontier"
            tone="dark"
            lede="Nigeria stands at the intersection of two defining forces: deepening democratic practice and rapid, disruptive advances in artificial intelligence."
          />

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <Reveal delay={60}>
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8 space-y-4">
                <span className="font-mono text-xs font-bold text-cyan-400 uppercase">2023 Lessons</span>
                <h3 className="text-xl font-bold text-white">BVAS, IReV & Information Perils</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The 2023 general elections demonstrated both the promise and peril of technology. The deployment of BVAS and IReV advanced transparency, while the same cycle exposed vulnerabilities to coordinated disinformation, online manipulation, and data privacy breaches.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8 space-y-4">
                <span className="font-mono text-xs font-bold text-cyan-400 uppercase">2027 Threat Vectors</span>
                <h3 className="text-xl font-bold text-white">Generative AI & Synthetic Media</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Generative AI lowers the cost and raises the sophistication of synthetic content — from deepfake audio of candidates to automated narratives suppressing turnout. INEC's adoption of AI in voter registration and cybersecurity requires robust safeguards.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Yiaga Africa Workstream */}
          <Reveal className="mt-12 rounded-2xl border border-cyan-500/30 bg-slate-950 p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Award className="h-6 w-6 text-cyan-400" />
              <h3 className="text-xl font-bold text-white">Yiaga Africa's AI & Electoral Integrity Track Record</h3>
            </div>
            <div className="grid gap-4 text-xs text-slate-300 sm:grid-cols-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Flagship EMB Study:</strong> Mapping AI usage across election management bodies in Africa to build a continental evidence base.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>EMB Responsible AI Guidelines:</strong> Guidelines for election administrators on deploying AI tools safely.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>AI in Elections Academy:</strong> Practical capacity building for administrators across Nigeria and ECONEC.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>AEJN Judicial Toolkit:</strong> Partnered with Africa Electoral Justice Network on judicial oversight of AI in elections.</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Objectives */}
      <section className="border-b border-border py-20 md:py-28">
        <div className="container-forum">
          <SectionHeader
            eyebrow="Convening Mandate"
            title="Forum Objectives"
            lede="AIDF 2026 seeks to achieve five core multi-stakeholder outcomes ahead of Nigeria's 2027 general elections."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Reveal delay={50}>
              <div className="rounded-xl border border-border bg-card p-6">
                <span className="font-mono text-xs font-bold text-primary">Objective 01</span>
                <h4 className="mt-2 text-base font-bold text-foreground">Multi-Stakeholder Dialogue</h4>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Convene a national platform on AI risks and opportunities for democracy ahead of 2027.
                </p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="rounded-xl border border-border bg-card p-6">
                <span className="font-mono text-xs font-bold text-primary">Objective 02</span>
                <h4 className="mt-2 text-base font-bold text-foreground">Shared Understanding of Threats</h4>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Build consensus across civil society, INEC, political parties, media, and tech companies on safeguards.
                </p>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="rounded-xl border border-border bg-card p-6">
                <span className="font-mono text-xs font-bold text-primary">Objective 03</span>
                <h4 className="mt-2 text-base font-bold text-foreground">Surface & Showcase Innovations</h4>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Showcase practical AI tools advancing credible elections, information integrity, and civic participation.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="rounded-xl border border-border bg-card p-6">
                <span className="font-mono text-xs font-bold text-primary">Objective 04</span>
                <h4 className="mt-2 text-base font-bold text-foreground">AI Governance Framework</h4>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Advance a Nigerian framework for electoral AI governance, platform transparency, and institutional readiness.
                </p>
              </div>
            </Reveal>

            <Reveal delay={250} className="md:col-span-2">
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
                <span className="font-mono text-xs font-bold text-primary">Objective 05 · Key Deliverable</span>
                <h4 className="mt-2 text-base font-bold text-foreground">Adopt the Abuja Accord on AI and Democracy</h4>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Secure multi-stakeholder commitments to safe, secure, and ethical AI in the 2027 general elections alongside a practical roadmap guiding action through the electoral cycle.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The Abuja Accord on AI and Democracy */}
      <section className="border-b border-border bg-slate-950 py-20 text-slate-100 md:py-28">
        <div className="container-forum">
          <SectionHeader
            eyebrow="Landmark Deliverable"
            title="The Abuja Accord on AI and Democracy"
            tone="dark"
            lede="A landmark statement translating shared concern into concrete, accountable pledges from every electoral constituency."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {abujaAccordPledges.map((accord, idx) => (
              <Reveal key={idx} delay={idx * 60}>
                <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
                    <FileCheck2 className="h-4 w-4" />
                    <span>{accord.stakeholder}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{accord.commitment}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-background py-16 text-center border-t border-border">
        <div className="container-forum max-w-2xl">
          <h2 className="text-3xl font-extrabold text-foreground">Partner with AIDF 2026</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Yiaga Africa invites tech companies, development partners, and foundations to join as sponsors, exhibitors, and sandbox grant supporters.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Cta to="/register" tone="primary">
              Register as a Delegate
            </Cta>
            <Link
              to="/sandbox"
              className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-cyan-400 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg transition-all hover:bg-cyan-300 hover:shadow-xl"
            >
              <span>View Innovation & Exhibition Hub</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
