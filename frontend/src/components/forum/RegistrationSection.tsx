import { useState } from "react";
import { Cta } from "./cta";
import { Reveal, SectionHeader } from "./primitives";
import { forumMeta, participationCategories } from "@/data/forum";
import { API_BASE_URL } from "@/lib/api";
import { AlertCircle, ArrowRight, Calendar, CheckCircle2, Clock, Store } from "lucide-react";

export function RegistrationSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    organization: "",
    category: "Election Management Bodies (INEC & ECONEC)",
    country: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/register/participant`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to submit participant registration");
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred while registering. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="border-b border-border bg-parallax-light py-20 text-foreground md:py-28" id="register-section">
      <div className="container-forum">
        <SectionHeader
          eyebrow="Attend the Forum"
          title="Join the AI & Democracy Forum"
          tone="light"
          lede="Be part of shaping democratic futures in the AI era. Join electoral commissioners, civil society leaders, and tech pioneers from 7th – 9th October 2026 at Congress Hall, Transcorp Hilton, Abuja, Nigeria."
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
                    Deadline: 11th Sept 2026
                  </span>
                </div>
                <h3 className="mt-1 text-xl font-bold text-white">Are you a Technology, GovTech, or Civic Tech Exhibitor?</h3>
                <p className="mt-1 text-xs text-slate-300 max-w-2xl leading-relaxed">
                  Exhibitor booth applications require detailed technical specs, solution abstracts, and booth requirements. Please use our dedicated Exhibitor Application Portal before the 11th September deadline.
                </p>
              </div>
            </div>

            <Cta to="/exhibitor-register" tone="accent" className="shrink-0">
              Apply for Exhibitor Booth <ArrowRight className="h-4 w-4 ml-1" />
            </Cta>
          </div>
        </Reveal>

        {/* Distinct Participant Registration Panel */}
        <Reveal className="mt-10">
          <div className="relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-slate-950 p-6 shadow-2xl md:p-12">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              
              {/* Left Column: Info & Details */}
              <div className="lg:col-span-5">
                <span className="eyebrow text-cyan-400">Participant Delegate Accreditation</span>
                <h3 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Reserve Your Delegate Pass
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

              {/* Right Column: Participant Registration Form */}
              <div className="lg:col-span-7">
                <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-6 md:p-8">
                  {errorMsg && (
                    <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-500/40 bg-red-500/10 p-3.5 text-xs text-red-200">
                      <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {submitted ? (
                    <div className="text-center py-8">
                      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/40">
                        <CheckCircle2 className="h-8 w-8" />
                      </div>
                      <h4 className="mt-4 text-xl font-bold text-white">Participant Registration Confirmed!</h4>
                      <p className="mt-2 text-xs text-slate-300 max-w-md mx-auto">
                        Thank you, <strong className="text-white">{formData.fullName}</strong>. Your delegate registration has been registered by the AIDF 2026 server. A confirmation email and badge instructions have been sent to <strong className="text-cyan-300">{formData.email}</strong>.
                      </p>
                      <button
                        onClick={() => { setSubmitted(false); setFormData({ fullName: "", email: "", organization: "", category: "Election Management Bodies (INEC & ECONEC)", country: "" }); }}
                        className="mt-6 inline-flex items-center text-xs font-semibold text-cyan-400 hover:text-cyan-300 underline"
                      >
                        Submit another participant registration
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <h4 className="text-base font-bold text-white">Participant Delegate Pass</h4>
                        <span className="text-[11px] font-semibold text-cyan-400">Open Registration</span>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="Dr. Jane Doe"
                          className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-base text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300">Work Email *</label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="jane@organization.org"
                            className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-base text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300">Country *</label>
                          <input
                            type="text"
                            required
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            placeholder="Nigeria, South Africa, Kenya, etc."
                            className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-base text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300">Organization / Institution *</label>
                        <input
                          type="text"
                          required
                          value={formData.organization}
                          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                          placeholder="INEC, Civil Society Org, University, Tech Platform"
                          className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-base text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300">Participation Category *</label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-base text-white focus:border-cyan-400 focus:outline-none"
                        >
                          {participationCategories.map((c, i) => (
                            <option key={i} value={c.title}>{c.title}</option>
                          ))}
                        </select>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-2 w-full rounded-lg bg-cyan-400 py-3.5 text-base font-bold text-slate-950 hover:bg-cyan-300 transition-colors disabled:opacity-50 shadow-md active:scale-[0.99]"
                      >
                        {isSubmitting ? "Submitting Registration..." : "Submit Delegate Registration"}
                      </button>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}


