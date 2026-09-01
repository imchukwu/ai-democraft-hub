import { Cta } from "./cta";
import { Reveal, SectionHeader } from "./primitives";
import { Archive, FileCheck, Layers, Video } from "lucide-react";

export function PostEventSection() {
  return (
    <section className="border-b border-border bg-slate-950 py-20 text-slate-100 md:py-28">
      <div className="container-forum">
        <SectionHeader
          eyebrow="Post-Convening Knowledge Hub"
          title="The Forum Continues"
          tone="dark"
          lede="The website serves as an open, persistent knowledge repository and archive following the convening, ensuring all session recordings, policy papers, and recommendations remain accessible worldwide."
          action={
            <Cta to="/resources" tone="accent">
              Explore the Forum Archive
            </Cta>
          }
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal delay={0}>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
              <Video className="h-8 w-8 text-cyan-400 mb-3" />
              <h4 className="text-base font-bold text-white">Event Recordings</h4>
              <p className="mt-2 text-xs text-slate-400">
                Full high-definition video archives and transcripts for all plenary keynotes and panels.
              </p>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
              <FileCheck className="h-8 w-8 text-cyan-400 mb-3" />
              <h4 className="text-base font-bold text-white">Key Recommendations</h4>
              <p className="mt-2 text-xs text-slate-400">
                The official Abuja Communiqué on AI & Democracy for governments, electoral commissions, and tech platforms.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
              <Layers className="h-8 w-8 text-cyan-400 mb-3" />
              <h4 className="text-base font-bold text-white">Showcase Projects</h4>
              <p className="mt-2 text-xs text-slate-400">
                Repository of open-source tools, algorithmic audit software, and Sandbox prototypes.
              </p>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
              <Archive className="h-8 w-8 text-cyan-400 mb-3" />
              <h4 className="text-base font-bold text-white">Research & Publications</h4>
              <p className="mt-2 text-xs text-slate-400">
                Peer-reviewed policy papers, empirical bias reports, and post-forum proceedings.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
