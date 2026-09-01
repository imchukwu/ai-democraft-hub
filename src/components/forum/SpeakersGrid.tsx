import { useState } from "react";
import { Cta } from "./cta";
import { Reveal, SectionHeader } from "./primitives";
import { speakers, type Speaker } from "@/data/forum";
import { ExternalLink, MapPin, X } from "lucide-react";

export function SpeakersGrid() {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  return (
    <section className="border-b border-slate-800 bg-parallax-dark py-20 text-slate-100 md:py-28">
      <div className="container-forum">
        <SectionHeader
          eyebrow="Global Leaders & Experts"
          title="Speakers"
          tone="dark"
          lede="Distinguished electoral commissioners, policy leaders, AI researchers, civil society directors, and open-source pioneers shaping democratic innovation."
          action={
            <Cta to="/speakers" tone="accent">
              View All Speakers
            </Cta>
          }
        />

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {speakers.map((sp, idx) => (
            <Reveal key={sp.id} delay={idx * 60}>
              <div
                onClick={() => setSelectedSpeaker(sp)}
                className="group cursor-pointer flex flex-col justify-between overflow-hidden rounded-xl border border-slate-800 bg-slate-900 p-6 transition-all hover:border-cyan-400 hover:shadow-2xl"
              >
                <div>
                  {/* Speaker Real Portrait */}
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-slate-950 border border-slate-800">
                    <img
                      src={sp.imageUrl}
                      alt={sp.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <h3 className="mt-5 text-xl font-bold tracking-tight text-white group-hover:text-cyan-300">
                    {sp.name}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-cyan-400">{sp.position}</p>
                  <p className="mt-1 text-xs text-slate-400">{sp.organization}</p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-4 text-xs text-slate-400">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-cyan-400" />
                    <span>{sp.country}</span>
                  </div>
                  <span className="font-medium text-cyan-300 group-hover:underline">
                    View Profile →
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Speaker Profile Modal */}
      {selectedSpeaker ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 p-8 text-slate-100 shadow-2xl animate-in fade-in zoom-in duration-200">
            <button
              type="button"
              onClick={() => setSelectedSpeaker(null)}
              className="absolute top-6 right-6 grid h-10 w-10 place-items-center rounded-full border border-slate-800 bg-slate-900 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-cyan-400/30 shadow-md">
                <img
                  src={selectedSpeaker.imageUrl}
                  alt={selectedSpeaker.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <span className="eyebrow text-cyan-400">{selectedSpeaker.country}</span>
                <h3 className="mt-1 text-2xl font-bold text-white">{selectedSpeaker.name}</h3>
                <p className="text-sm font-semibold text-cyan-300">{selectedSpeaker.position}</p>
                <p className="text-xs text-slate-400">{selectedSpeaker.organization}</p>

                <div className="mt-4 rounded-lg border border-slate-800 bg-slate-900 p-3 text-xs">
                  <span className="font-semibold text-slate-300">Session Participation:</span>{" "}
                  <span className="text-cyan-400 font-medium">{selectedSpeaker.session}</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-bold text-white">Biography</h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {selectedSpeaker.bio}
              </p>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-bold text-white">Areas of Expertise</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedSpeaker.expertise.map((exp, i) => (
                  <span key={i} className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300 border border-cyan-400/20">
                    {exp}
                  </span>
                ))}
              </div>
            </div>

            {selectedSpeaker.links.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-800 pt-4 text-xs font-medium">
                {selectedSpeaker.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-slate-800 bg-slate-900 px-3 py-1.5 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}
