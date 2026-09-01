import { Cta } from "./cta";
import { Reveal, SectionHeader } from "./primitives";
import { showcases } from "@/data/forum";
import { Sparkles } from "lucide-react";

export function ShowcasesSection() {
  const featuredShowcase = showcases.find((s) => s.featured) ?? showcases[0];
  const regularShowcases = showcases.filter((s) => s.id !== featuredShowcase?.id);

  return (
    <section className="border-b border-border py-20 md:py-28">
      <div className="container-forum">
        <SectionHeader
          eyebrow="Editorial Features"
          title="Forum Showcases"
          lede="Explore practical demonstrations, live experiments, open-source auditing tools, and research highlights presented at the Forum."
          action={
            <Cta to="/showcases" tone="outline">
              View All Showcases
            </Cta>
          }
        />

        {/* Magazine Editorial Hero Feature with Real Image */}
        {featuredShowcase ? (
          <Reveal className="mt-12">
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-lg lg:grid lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7 p-8 md:p-12">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Featured Showcase · {featuredShowcase.category}</span>
                </div>

                <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl leading-tight group-hover:text-primary transition-colors">
                  {featuredShowcase.title}
                </h3>

                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {featuredShowcase.description}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border/60 pt-4 text-xs font-semibold text-muted-foreground">
                  <span>Organization: <strong className="text-foreground">{featuredShowcase.organization}</strong></span>
                  <span>·</span>
                  <span>Demonstrators: <strong className="text-foreground">{featuredShowcase.demonstrator}</strong></span>
                </div>
              </div>

              {/* Real Showcase Media */}
              <div className="lg:col-span-5 aspect-video lg:aspect-auto lg:h-full overflow-hidden bg-slate-950">
                <img
                  src={featuredShowcase.imageUrl}
                  alt={featuredShowcase.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </Reveal>
        ) : null}

        {/* Supporting Magazine Grid with Real Images */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {regularShowcases.map((sc, idx) => (
            <Reveal key={sc.id} delay={idx * 80}>
              <div className="group flex h-full flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-md">
                <div>
                  <div className="relative aspect-video overflow-hidden rounded-lg bg-slate-950 border border-slate-800">
                    <img
                      src={sc.imageUrl}
                      alt={sc.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <span className="mt-4 inline-block rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-semibold text-secondary-foreground">
                    {sc.category}
                  </span>

                  <h4 className="mt-3 text-lg font-bold tracking-tight text-foreground group-hover:text-primary">
                    {sc.title}
                  </h4>

                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {sc.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-border/50 pt-3 text-[11px] text-muted-foreground">
                  <span>{sc.organization}</span> · <span className="font-medium text-foreground">{sc.demonstrator}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
