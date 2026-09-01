import { useState } from "react";
import { Cta } from "./cta";
import { Reveal, SectionHeader } from "./primitives";
import { sandboxProjects, type SandboxProject } from "@/data/forum";
import { Compass, Cpu, Sparkles, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  "All",
  "Elections",
  "Civic Participation",
  "Information Integrity",
  "Public Services",
  "Accessibility",
  "Governance",
  "Research",
] as const;

export function SandboxSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredProjects = sandboxProjects.filter(
    (p) => activeCategory === "All" || p.category === activeCategory,
  );

  return (
    <section className="border-b border-border bg-slate-950 py-20 text-slate-100 md:py-28">
      <div className="container-forum">
        <SectionHeader
          eyebrow="Experimental Innovation Hub"
          title="The Sandbox"
          tone="dark"
          lede="An experimental space where innovators, researchers, civic technologists, startups, and civil society demonstrate live practical applications of AI for democracy."
          action={
            <Cta to="/sandbox" tone="accent">
              Explore the Sandbox
            </Cta>
          }
        />

        {/* Four Sandbox Pillars */}
        <Reveal className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <Compass className="h-6 w-6 text-cyan-400" />
            <span className="font-semibold text-white">Explore Ideas</span>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <Cpu className="h-6 w-6 text-cyan-400" />
            <span className="font-semibold text-white">Test Solutions</span>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <UserCheck className="h-6 w-6 text-cyan-400" />
            <span className="font-semibold text-white">Meet Innovators</span>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
            <Sparkles className="h-6 w-6 text-cyan-400" />
            <span className="font-semibold text-white">Experience Demos</span>
          </div>
        </Reveal>

        {/* Category Filter Pills */}
        <Reveal className="mt-12 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-medium transition-all",
                activeCategory === cat
                  ? "bg-cyan-400 text-slate-950 font-bold"
                  : "bg-slate-900 text-slate-300 hover:bg-slate-800",
              )}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        {/* Sandbox Project Cards Grid */}
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, idx) => (
            <Reveal key={project.id} delay={idx * 70}>
              <div className="group flex h-full flex-col justify-between overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80 p-6 transition-all hover:border-cyan-400 hover:shadow-xl">
                <div>
                  {/* Real Project Screenshot/Image */}
                  <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-slate-950 border border-slate-800">
                    <img
                      src={project.imageUrl}
                      alt={project.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300 border border-cyan-400/20">
                      {project.category}
                    </span>
                    <span className="rounded-md bg-amber-400/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-amber-300 border border-amber-400/20">
                      {project.demoStatus}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold tracking-tight text-white group-hover:text-cyan-300">
                    {project.name}
                  </h3>

                  <p className="mt-1 text-xs font-medium text-slate-400">{project.organization} · {project.country}</p>

                  <p className="mt-3 text-xs leading-relaxed text-slate-300">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-slate-800 pt-4 text-xs font-semibold text-cyan-400 group-hover:underline">
                  View Demo Details →
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
