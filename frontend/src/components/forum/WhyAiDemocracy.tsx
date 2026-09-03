import { Reveal, SectionHeader } from "./primitives";
import { ShieldCheck } from "lucide-react";

export function WhyAiDemocracy() {
  return (
    <section className="border-b border-slate-800 bg-parallax-dark py-20 text-slate-100 md:py-28">
      <div className="container-forum">
        <SectionHeader
          eyebrow="Event Overview"
          title="About the AI and Democracy Forum"
          tone="dark"
          lede="A national multi-stakeholder platform hosted by Yiaga Africa and partners to safeguard Nigeria's 2027 general elections."
        />

        {/* User Requested About Text Block */}
        <Reveal className="mt-12">
          <div className="rounded-2xl border border-[#FEA105]/30 bg-slate-900/90 p-8 md:p-12 shadow-2xl space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FEA105]">
              <ShieldCheck className="h-4 w-4" />
              <span>National Multi-Stakeholder Dialogue</span>
            </div>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
              The AI and Democracy Forum is hosted by Yiaga Africa and partners as a national platform to examine, ahead of 2027, how Nigeria can govern and harness AI to strengthen rather than undermine the credibility of the elections and the resilience of Nigeria's democracy. This national multi-stakeholder dialogue will explore the risks and opportunities of artificial intelligence for democracy and elections in Nigeria ahead of 2027. It aims to establish a platform for civil society, electoral commissions, political parties, technology companies and media partners to build a shared understanding of AI-enabled threats to electoral integrity and the necessary safeguards required to counter them.
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal pt-4 border-t border-slate-800">
              The AIDF will feature a high-level opening plenary, “Will Algorithms Decide the 2027 Vote?”, bringing together electoral, government, civil society, media, and technology leaders to reflect on the implications of AI for Nigeria's 2027 elections. This will be followed by thematic sessions and panels organized around the six core themes, combining expert insights, evidence, and cross-sector debate. The programme will also include an AI & Democracy Exhibition, where technology companies and innovators will showcase AI tools designed to support democracy and credible elections, as well as an AI for Elections Innovation Sandbox, featuring live pitches from innovators competing for an implementation grant to implement AI-powered ideas for the 2027 elections. In addition, masterclasses and skills sessions will provide practical training for election observers, journalists, party agents, and civil society actors on how to detect and respond to AI-enabled electoral threats.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
