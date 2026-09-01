import { Reveal, SectionHeader } from "./primitives";
import { partners, type PartnerCategory } from "@/data/forum";
import { Building, ExternalLink } from "lucide-react";

const categories: PartnerCategory[] = [
  "Host & Convener",
  "Strategic Partners",
  "Organizers",
  "Technology Partners",
  "Knowledge Partners",
  "Media Partners",
  "Supporting Partners",
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
                      <a
                        key={p.id}
                        href={p.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-md"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                              {p.name}
                            </span>
                            <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                          </div>
                          <span className="mt-1 block text-xs text-muted-foreground">
                            {p.category}
                          </span>
                        </div>

                        {/* Logo Image or Fallback */}
                        {p.logoUrl ? (
                          <div className="flex h-14 w-32 shrink-0 items-center justify-center rounded-lg bg-slate-950 p-2 border border-slate-800 transition-transform group-hover:scale-105">
                            <img
                              src={p.logoUrl}
                              alt={`${p.name} logo`}
                              className="h-full w-full object-contain"
                            />
                          </div>
                        ) : (
                          <div className="grid h-12 w-28 shrink-0 place-items-center rounded-lg bg-slate-900 font-mono text-[10px] font-bold text-cyan-300 border border-slate-800">
                            <Building className="h-4 w-4 mb-0.5" />
                            <span>{p.logoPlaceholder}</span>
                          </div>
                        )}
                      </a>
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
