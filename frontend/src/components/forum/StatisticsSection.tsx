import { Reveal } from "./primitives";
import { statistics } from "@/data/forum";

export function StatisticsSection() {
  return (
    <section className="border-b border-border bg-slate-950 py-20 text-slate-100 md:py-28">
      <div className="container-forum">
        <Reveal className="text-center">
          <span className="eyebrow text-cyan-400">Convening Scale & Impact</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Bringing Together the Global Democracy & AI Ecosystem
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {statistics.map((stat, idx) => (
            <Reveal key={idx} delay={idx * 80}>
              <div className="flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 p-8 text-center backdrop-blur-sm transition-all hover:border-cyan-500/40">
                <span className="text-5xl font-extrabold tracking-tight text-cyan-400 sm:text-6xl">
                  {stat.value}
                </span>
                <span className="mt-3 text-base font-semibold text-white">{stat.label}</span>
                <span className="mt-1 text-xs text-slate-400">{stat.description}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
