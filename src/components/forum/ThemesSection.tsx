import { Cta } from "./cta";
import { Reveal, SectionHeader } from "./primitives";
import { themes } from "@/data/forum";
import { ShieldCheck } from "lucide-react";

export function ThemesSection() {
  return (
    <section className="border-b border-border py-20 md:py-28">
      <div className="container-forum">
        <SectionHeader
          eyebrow="Thematic Pillars"
          title="Forum Themes"
          lede="Seven priority themes structuring sessions, sandbox demonstrations, policy workshops, and working groups across the 5 days."
          action={
            <Cta to="/program" tone="outline">
              View Full Program
            </Cta>
          }
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {themes.map((theme, i) => (
            <Reveal key={theme.id} delay={i * 70}>
              <div className="group flex h-full flex-col justify-between border border-border bg-card p-8 transition-all hover:border-foreground hover:shadow-lg">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-semibold text-primary">
                      {theme.index}
                    </span>
                    <ShieldCheck className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                  </div>
                  <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground group-hover:text-primary">
                    {theme.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {theme.description}
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-border/50">
                  {theme.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
