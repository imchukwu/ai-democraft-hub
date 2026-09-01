import { useState } from "react";
import { Cta } from "./cta";
import { Reveal, SectionHeader } from "./primitives";
import { forumMeta, participationCategories } from "@/data/forum";
import { CheckCircle2 } from "lucide-react";

export function RegistrationSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    organization: "",
    category: "Election Management Bodies (INEC & ECONEC)",
    country: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="border-b border-border bg-parallax-light py-20 text-foreground md:py-28" id="register-section">
      <div className="container-forum">
        <SectionHeader
          eyebrow="Attend the Forum"
          title="Join the AI & Democracy Forum"
          tone="light"
          lede="Be part of shaping democratic futures in the AI era. Join electoral commissioners, civil society leaders, and tech pioneers from 7th – 9th October 2026 in Abuja, Nigeria."
        />

        {/* Distinct Registration Panel */}
        <Reveal className="mt-12">
          <div className="relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-slate-950 p-8 shadow-2xl md:p-12">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-6">
                <span className="eyebrow text-cyan-400">Convening Registration</span>
                <h3 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Reserve Your Delegate Pass
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  Delegate passes grant full access to plenary keynotes, thematic panel discussions, sandbox live demonstrations, policy lab drafting sessions, exhibition floor, and networking events ({forumMeta.date}).
                </p>

                <div className="mt-6 space-y-2 text-xs text-slate-300 font-medium">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                    <span>In-person access at International Conference Centre, Abuja</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                    <span>Digital access to proceedings, research repository & recordings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                    <span>Invitation to evening networking receptions</span>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Cta to="/register" tone="accent">
                    Register Now
                  </Cta>
                  <Cta to="/about" tone="ghostDark" arrow={false}>
                    View Forum Details
                  </Cta>
                </div>
              </div>

              {/* Interactive Quick Registration Form */}
              <div className="lg:col-span-6">
                <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-6 md:p-8">
                  {submitted ? (
                    <div className="text-center py-8">
                      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/40">
                        <CheckCircle2 className="h-8 w-8" />
                      </div>
                      <h4 className="mt-4 text-xl font-bold text-white">Registration Received!</h4>
                      <p className="mt-2 text-xs text-slate-300">
                        Thank you, {formData.fullName}. A confirmation email and delegate badge instructions have been dispatched to {formData.email}.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <h4 className="text-base font-bold text-white">Quick Delegate Registration</h4>
                      
                      <div>
                        <label className="block text-xs font-semibold text-slate-300">Full Name</label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="Dr. Jane Doe"
                          className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300">Work Email</label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="jane@organization.org"
                            className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-300">Country</label>
                          <input
                            type="text"
                            required
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            placeholder="Nigeria, Ghana, etc."
                            className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300">Organization</label>
                        <input
                          type="text"
                          required
                          value={formData.organization}
                          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                          placeholder="Ministry, Electoral Commission, NGO, Tech Lab"
                          className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300">Category</label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3.5 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                        >
                          {participationCategories.map((c, i) => (
                            <option key={i} value={c.title}>{c.title}</option>
                          ))}
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="mt-2 w-full rounded-md bg-cyan-400 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-300 transition-colors"
                      >
                        Submit Registration
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
