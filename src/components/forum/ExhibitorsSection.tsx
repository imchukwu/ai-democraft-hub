import { useState } from "react";
import { Reveal, SectionHeader } from "./primitives";
import { exhibitors } from "@/data/forum";
import { Building, ExternalLink, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const sectors = ["All", "GovTech", "Civil Society", "Research Institute", "AI Startup", "Media Tech"] as const;

export function ExhibitorsSection() {
  const [activeSector, setActiveSector] = useState<string>("All");

  const filteredExhibitors = exhibitors.filter(
    (e) => activeSector === "All" || e.sector === activeSector,
  );

  return (
    <section className="border-b border-border py-20 md:py-28">
      <div className="container-forum">
        <SectionHeader
          eyebrow="Exhibition Floor"
          title="Exhibitors"
          lede="Discover international organizations, research labs, and civic tech startups demonstrating groundbreaking solutions, audit tools, and governance models."
        />

        {/* Sector Filter Buttons */}
        <Reveal className="mt-12 flex flex-wrap gap-2">
          {sectors.map((sec) => (
            <button
              key={sec}
              type="button"
              onClick={() => setActiveSector(sec)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-medium transition-all",
                activeSector === sec
                  ? "bg-primary text-primary-foreground font-bold"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
              )}
            >
              {sec}
            </button>
          ))}
        </Reveal>

        {/* Exhibitor Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredExhibitors.map((ex, idx) => (
            <Reveal key={ex.id} delay={idx * 60}>
              <div className="group flex h-full flex-col justify-between rounded-xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg">
                <div>
                  <div className="flex items-center justify-between">
                    {/* Logo Placeholder */}
                    <div className="grid h-12 w-28 place-items-center rounded-lg bg-slate-900 font-mono text-[10px] font-bold text-cyan-300 border border-slate-800">
                      <Building className="h-4 w-4 mb-0.5" />
                      <span>{ex.logoPlaceholder}</span>
                    </div>
                    <span className="rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      {ex.booth}
                    </span>
                  </div>

                  <h3 className="mt-5 text-xl font-bold tracking-tight text-foreground group-hover:text-primary">
                    {ex.name}
                  </h3>

                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    <span>{ex.country}</span>
                    <span>·</span>
                    <span className="font-medium text-foreground">{ex.sector}</span>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {ex.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-4 text-xs font-medium">
                  <span className="text-primary">{ex.booth}</span>
                  <a
                    href={ex.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
                  >
                    <span>Visit Website</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
