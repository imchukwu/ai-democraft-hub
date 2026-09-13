import { Link } from "@tanstack/react-router";
import { Cta } from "./cta";
import { Reveal, SectionHeader } from "./primitives";
import { forumMeta } from "@/data/forum";
import { ArrowRight, CheckCircle2, Clock, Lock, Store } from "lucide-react";

export function RegistrationSection() {
  return (
    <section className="border-b border-border bg-parallax-light py-20 text-foreground md:py-28" id="register-section">
      <div className="container-forum">
        <SectionHeader
          eyebrow="Attend the Forum"
          title="AI & Democracy Forum Accreditation"
          tone="light"
          lede="Be part of shaping democratic futures in the AI era. Bringing together electoral commissioners, civil society leaders, and tech pioneers from 7th – 9th October 2026 at Congress Hall, Transcorp Hilton, Abuja, Nigeria."
        />

        {/* Prominent Exhibitor Portal Card */}
        <Reveal className="mt-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 p-6 md:p-8 shadow-xl text-white">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-amber-400/20 text-amber-400 border border-amber-500/40">
                <Store className="h-6 w-6" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="eyebrow text-amber-400">Exhibitor Registration</span>
                  <span className="inline-flex items-center gap-1 rounded bg-amber-400/20 px-2 py-0.5 text-[10px] font-extrabold text-amber-300 border border-amber-400/30">
                    <Clock className="h-3 w-3" />
                    Deadline: 18th Sept 2026
                  </span>
                </div>
                <h3 className="mt-1 text-xl font-bold text-white">Are you a Technology, GovTech, or Civic Tech Exhibitor?</h3>
                <p className="mt-1 text-xs text-slate-300 max-w-2xl leading-relaxed">
                  Exhibitor booth applications require detailed technical specs, solution abstracts, and booth requirements. Please use our dedicated Exhibitor Application Portal before the 18th September deadline.
                </p>
              </div>
            </div>

            <Cta to="/exhibitor" tone="accent" className="shrink-0">
              Apply for Exhibitor Booth <ArrowRight className="h-4 w-4 ml-1" />
            </Cta>
          </div>
        </Reveal>

        {/* Invitation Only Delegate Accreditation Panel */}
        <Reveal className="mt-10">
          <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 p-6 shadow-2xl md:p-12">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              
              {/* Left Column: Info & Details */}
              <div className="lg:col-span-5">
                <span className="eyebrow text-amber-400">Participant Delegate Accreditation</span>
                <h3 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Delegate Accreditation
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  Delegate passes grant full access to plenary keynotes, thematic panel discussions, sandbox live demonstrations, policy lab drafting sessions, exhibition floor, and networking events ({forumMeta.dateShort}).
                </p>

                <div className="mt-6 space-y-2.5 text-xs text-slate-300 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-400" />
                    <span>In-person venue: {forumMeta.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-400" />
                    <span>Digital access to proceedings, research repository & recordings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-400" />
                    <span>Invitation to high-level networking receptions</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Cta to="/about" tone="ghostDark" arrow={false}>
                    View Forum Overview
                  </Cta>
                </div>
              </div>

              {/* Right Column: Invitation-Only Notice */}
              <div className="lg:col-span-7">
                <div className="rounded-xl border border-amber-500/40 bg-slate-900/90 p-6 md:p-8">
                  <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40">
                      <Lock className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">Delegate Pass Status</h4>
                      <span className="text-xs font-semibold text-amber-400">Strictly By Official Invitation Only</span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4 text-sm text-slate-300 leading-relaxed">
                    <p>
                      Public delegate registration for the <strong className="text-white">AI & Democracy Forum (AIDF 2026)</strong> is currently closed. Attendance is strictly reserved for accredited government officials, election management body delegates, civil society representatives, and nominated special guests.
                    </p>
                    <p className="text-xs text-slate-400">
                      If you have received an official invitation letter or nomination link, please follow the personalized accreditation instructions provided in your invitation pack.
                    </p>
                  </div>

                  <div className="mt-8 rounded-lg border border-slate-800 bg-slate-950 p-4">
                    <div className="flex items-start gap-3">
                      <Store className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-xs font-bold text-white">Exhibitor Booth Applications</h5>
                        <p className="mt-1 text-[11px] text-slate-400">
                          Technology platforms, GovTech labs, and civic innovators can apply for dedicated exhibition booth space until <strong>18th September 2026</strong>.
                        </p>
                        <div className="mt-3">
                          <Link
                            to="/exhibitor"
                            className="inline-flex items-center gap-1.5 rounded-lg bg-amber-400 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-amber-300 transition-colors"
                          >
                            Apply for Exhibitor Booth <ArrowRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}


