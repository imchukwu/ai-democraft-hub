import { useState } from "react";
import { Reveal, SectionHeader } from "./primitives";
import { forumMeta } from "@/data/forum";
import { API_BASE_URL } from "@/lib/api";
import { AlertCircle, Calendar, CheckCircle2, Clock, Info, ShieldAlert, Store } from "lucide-react";

export function ExhibitorRegistrationSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    organization: "",
    orgType: "GovTech / Tech Platform",
    country: "Nigeria",
    website: "",
    contactName: "",
    jobTitle: "",
    email: "",
    phone: "",
    category: "Civic Tech & AI Innovation",
    productTitle: "",
    description: "",
    boothType: "Standard 3x3m Booth",
    techRequirements: [] as string[],
    representativesCount: "2",
  });

  const handleRequirementToggle = (req: string) => {
    setFormData((prev) => {
      const exists = prev.techRequirements.includes(req);
      if (exists) {
        return { ...prev, techRequirements: prev.techRequirements.filter((r) => r !== req) };
      } else {
        return { ...prev, techRequirements: [...prev.techRequirements, req] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/register/exhibitor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          organization: formData.organization,
          contactName: formData.contactName,
          email: formData.email,
          phone: formData.phone,
          category: formData.category,
          website: formData.website,
          description: `[Product: ${formData.productTitle || "N/A"}] [OrgType: ${formData.orgType}] [Booth: ${formData.boothType}] [Reps: ${formData.representativesCount}] [Tech: ${formData.techRequirements.join(", ")}] — ${formData.description}`,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit exhibitor application");
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred while submitting application.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 text-foreground md:py-24 bg-background">
      <div className="container-forum max-w-5xl">
        <SectionHeader
          eyebrow="Exhibition Floor Application"
          title="Technology & Civic Exhibitor Application"
          lede="Participate in Africa's premier AI & Democracy Exhibition floor at Congress Hall, Transcorp Hilton, Abuja. Showcase your verifiable tools to electoral leaders, civil society, and international delegates."
        />

        {/* Deadline Alert Banner */}
        <Reveal className="mt-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-amber-500/40 bg-amber-500/10 p-6 text-amber-200">
            <div className="flex items-start gap-3">
              <Clock className="h-6 w-6 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-base font-bold text-white">Application Deadline: 11th September 2026</h4>
                <p className="text-xs text-amber-200/90 mt-1">
                  Exhibitor booth allocations at Congress Hall are reviewed on a rolling basis. All applications must be received before 23:59 WAT on September 11, 2026.
                </p>
              </div>
            </div>
            <div className="shrink-0 rounded-lg bg-amber-400 px-3.5 py-1.5 text-xs font-extrabold text-slate-950">
              Closing 11 Sept
            </div>
          </div>
        </Reveal>

        {/* Application Form */}
        <Reveal className="mt-10">
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 md:p-10 shadow-2xl text-white">
            {submitted ? (
              <div className="text-center py-12">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/50">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h3 className="mt-6 text-2xl font-extrabold text-white sm:text-3xl">Application Successfully Received!</h3>
                <p className="mt-3 text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{formData.contactName}</strong>. Your detailed exhibitor application for <strong className="text-amber-300">{formData.organization}</strong> has been registered in the AIDF 2026 Go server database.
                </p>

                <div className="mt-6 inline-block text-left rounded-xl border border-slate-800 bg-slate-900/90 p-5 text-xs text-slate-300 space-y-2 max-w-lg mx-auto">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Organization:</span>
                    <span className="font-semibold text-white">{formData.organization}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Contact Email:</span>
                    <span className="font-semibold text-amber-300">{formData.email}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">Exhibition Category:</span>
                    <span className="font-semibold text-white">{formData.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Venue & Dates:</span>
                    <span className="font-semibold text-white">{forumMeta.venue} ({forumMeta.dateShort})</span>
                  </div>
                </div>

                <div className="mt-8 flex justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="rounded-lg bg-slate-800 px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-700 transition-colors"
                  >
                    Submit Another Application
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {errorMsg && (
                  <div className="flex items-center gap-3 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-xs text-red-200">
                    <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* SECTION 1: Organization Information */}
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                    <Store className="h-5 w-5 text-amber-400" />
                    <span>1. Organization & Company Profile</span>
                  </h3>
                  <div className="mt-4 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300">Company / Organization Legal Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="e.g. OpenDemocracy AI Labs, Microsoft, Meta, Civic Tech Ltd"
                        className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300">Organization Type *</label>
                      <select
                        value={formData.orgType}
                        onChange={(e) => setFormData({ ...formData, orgType: e.target.value })}
                        className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                      >
                        <option value="GovTech / Tech Platform">GovTech / Commercial Tech Platform</option>
                        <option value="Civic Tech & NGO Lab">Civic Tech / Non-Profit Lab</option>
                        <option value="Election Management Body">Election Management Body / State Agency</option>
                        <option value="Academic / Research Institute">Academic / Research Institute</option>
                        <option value="Media & Fact-Checking Org">Media & Fact-Checking Organization</option>
                        <option value="International Development Partner">International Development Partner</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300">Country of Registration / Headquarter *</label>
                      <input
                        type="text"
                        required
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        placeholder="Nigeria, Ghana, Kenya, South Africa, UK, USA, etc."
                        className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300">Official Website / Product Portal</label>
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        placeholder="https://yourorganization.com"
                        className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 2: Primary Contact Person */}
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                    <Info className="h-5 w-5 text-amber-400" />
                    <span>2. Primary Exhibition Lead / Contact Person</span>
                  </h3>
                  <div className="mt-4 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300">Contact Person Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        placeholder="Dr. Samuel Okonkwo"
                        className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300">Job Title / Designation *</label>
                      <input
                        type="text"
                        required
                        value={formData.jobTitle}
                        onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                        placeholder="Head of Innovation / Director of Partnerships"
                        className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300">Official Work Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="samuel@organization.com"
                        className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300">Direct Phone / WhatsApp Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+234 800 000 0000"
                        className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 3: Exhibition Solution & Category */}
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                    <ShieldAlert className="h-5 w-5 text-amber-400" />
                    <span>3. Solution Abstract & Innovation Track</span>
                  </h3>
                  <div className="mt-4 space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300">Exhibition Track / Category *</label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                        >
                          <option value="Civic Tech & AI Innovation">Civic Tech & AI Innovation</option>
                          <option value="Platform Safety & Content Integrity">Platform Safety & Content Integrity</option>
                          <option value="Election Security & Verification Tools">Election Security & Verification Tools</option>
                          <option value="Media Provenance & Fact-Checking Tech">Media Provenance & Fact-Checking Tech</option>
                          <option value="Academic & International Development">Academic & International Development</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300">Product / Technology Title *</label>
                        <input
                          type="text"
                          required
                          value={formData.productTitle}
                          onChange={(e) => setFormData({ ...formData, productTitle: e.target.value })}
                          placeholder="e.g. DeepfakeShield Africa v2.0"
                          className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300">Detailed Solution Abstract & Demonstration Description *</label>
                      <textarea
                        rows={4}
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Provide a detailed overview of the AI system, tool, or methodology your organization will display at Congress Hall, Transcorp Hilton. Include details on how it addresses election administration, disinformation, or democratic resilience..."
                        className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 4: Booth & Technical Requirements */}
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
                    <Calendar className="h-5 w-5 text-amber-400" />
                    <span>4. Exhibition Booth & On-Site Requirements</span>
                  </h3>

                  <div className="mt-4 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300">Preferred Booth Setup *</label>
                      <select
                        value={formData.boothType}
                        onChange={(e) => setFormData({ ...formData, boothType: e.target.value })}
                        className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                      >
                        <option value="Standard 3x3m Booth">Standard Shell Scheme Booth (3m x 3m)</option>
                        <option value="Custom Pavilion Space">Custom Pavilion Space (6m x 3m)</option>
                        <option value="Digital Kiosk Demo Station">Digital Kiosk Demo Station</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300">On-Site Exhibitor Badges Required *</label>
                      <select
                        value={formData.representativesCount}
                        onChange={(e) => setFormData({ ...formData, representativesCount: e.target.value })}
                        className="mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                      >
                        <option value="1">1 Delegate Badge Pass</option>
                        <option value="2">2 Delegate Badge Passes</option>
                        <option value="3">3 Delegate Badge Passes</option>
                        <option value="4">4 Delegate Badge Passes</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Technical & Infrastructure Requirements (Select all that apply)</label>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {[
                        "High-Speed Dedicated Fiber Ethernet",
                        "High-Density Public WiFi Access",
                        "220V Uninterruptible Power Supply (UPS)",
                        "55-inch HD Display Monitor / Stand",
                        "Live Pitch Slot on Sandbox Stage",
                      ].map((item) => (
                        <label key={item} className="flex items-center gap-2.5 rounded-lg border border-slate-800 bg-slate-900/60 px-3.5 py-2 text-xs text-slate-300 cursor-pointer hover:border-amber-400/50">
                          <input
                            type="checkbox"
                            checked={formData.techRequirements.includes(item)}
                            onChange={() => handleRequirementToggle(item)}
                            className="rounded border-slate-700 text-amber-400 focus:ring-amber-400 bg-slate-950"
                          />
                          <span>{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-amber-400 py-4 text-base font-bold text-slate-950 hover:bg-amber-300 transition-colors shadow-lg disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting Application to Server..." : "Submit Exhibitor Application (Deadline 11th Sept 2026)"}
                  </button>
                  <p className="mt-2 text-center text-[11px] text-slate-400">
                    By submitting, you agree to the AIDF 2026 Exhibition Guidelines & Privacy Policy.
                  </p>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
