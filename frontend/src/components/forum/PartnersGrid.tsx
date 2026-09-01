import { Reveal, SectionHeader } from "./primitives";
import { partners, type PartnerCategory } from "@/data/forum";
import { Building } from "lucide-react";

const categories: PartnerCategory[] = [
  "Organizers",
  "Strategic Partners",
  "Supporting Partners",
  "Technology Partners",
  "Knowledge Partners",
  "Media Partners",
];

export function PartnersGrid() {
  return (
    <section className="border-b border-border bg-parallax-light py-20 md:py-28">
      <div className="container-forum">
        <SectionHeader
          eyebrow="Ecosystem & Sponsors"
          title="Partners & Supporting Organizations"
          lede="The AI & Democracy Forum is convened in partnership with leading international foundations, electoral bodies, technology labs, and media organizations."
        />

        <div className="mt-16 space-y-12">
          {categories.map((cat, idx) => {
            const categoryPartners = partners.filter((p) => p.category === cat);
            if (categoryPartners.length === 0) return null;

            return (
              <Reveal key={cat} delay={idx * 60}>
                <div>
                  <h3 className="text-sm font-bold tracking-wider text-primary uppercase border-b border-border pb-2">
                    {cat}
                  </h3>
                  <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {categoryPartners.map((p) => (
                      <div
                        key={p.id}
                        className="group flex items-center justify-between rounded-xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-md"
                      >
                        <div>
                          <span className="font-semibold text-foreground group-hover:text-primary">
                            {p.name}
                          </span>
                          <span className="mt-1 block text-xs text-muted-foreground">
                            {p.category}
                          </span>
                        </div>

                        {/* Logo Placeholder */}
                        <div className="grid h-12 w-28 shrink-0 place-items-center rounded-lg bg-slate-900 font-mono text-[10px] font-bold text-cyan-300 border border-slate-800">
                          <Building className="h-4 w-4 mb-0.5" />
                          <span>{p.logoPlaceholder}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
