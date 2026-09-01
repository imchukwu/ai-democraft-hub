import { useState } from "react";
import { Cta } from "./cta";
import { Reveal, SectionHeader } from "./primitives";
import { resources } from "@/data/forum";
import { Download, FileText, Video } from "lucide-react";
import { cn } from "@/lib/utils";

const resourceFilters = ["All", "Reports", "Briefs", "Research", "Videos", "Presentations"] as const;

export function ResourcesSection() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filteredResources = resources.filter(
    (r) => activeFilter === "All" || r.type === activeFilter,
  );

  return (
    <section className="border-b border-border py-20 md:py-28">
      <div className="container-forum">
        <SectionHeader
          eyebrow="Knowledge Repository"
          title="Resources"
          lede="Access research reports, policy briefs, algorithmic audit frameworks, video recordings, and presentation slide decks produced for the Forum."
          action={
            <Cta to="/resources" tone="outline">
              View Full Repository
            </Cta>
          }
        />

        {/* Filter Pills */}
        <Reveal className="mt-12 flex flex-wrap gap-2">
          {resourceFilters.map((flt) => (
            <button
              key={flt}
              type="button"
              onClick={() => setActiveFilter(flt)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-medium transition-all",
                activeFilter === flt
                  ? "bg-primary text-primary-foreground font-bold"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
              )}
            >
              {flt}
            </button>
          ))}
        </Reveal>

        {/* Resource Cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map((res, idx) => (
            <Reveal key={res.id} delay={idx * 60}>
              <div className="group flex h-full flex-col justify-between rounded-xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                      {res.type}
                    </span>
                    <span className="text-xs text-muted-foreground">{res.date}</span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold tracking-tight text-foreground group-hover:text-primary">
                    {res.title}
                  </h3>

                  <p className="mt-1 text-xs font-semibold text-primary">{res.author}</p>

                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {res.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-border/50 pt-4">
                  <a
                    href={res.downloadUrl}
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Downloading resource: ${res.title}`);
                    }}
                    className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    {res.type === "Videos" ? (
                      <Video className="h-3.5 w-3.5" />
                    ) : (
                      <Download className="h-3.5 w-3.5" />
                    )}
                    <span>{res.type === "Videos" ? "Watch Video" : "Download PDF"}</span>
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
