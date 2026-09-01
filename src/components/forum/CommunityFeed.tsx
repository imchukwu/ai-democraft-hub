import { Reveal, SectionHeader } from "./primitives";
import { MessageSquare, Share2, Sparkles, User } from "lucide-react";

type SocialPost = {
  id: string;
  author: string;
  handle: string;
  role: string;
  time: string;
  content: string;
  tags: string[];
};

const posts: SocialPost[] = [
  {
    id: "p1",
    author: "African Union Tech Taskforce",
    handle: "@AUTechPolicy",
    role: "Strategic Partner",
    time: "2 hours ago",
    content:
      "Honored to co-convene the AI & Democracy Forum in Abuja from 7–11 October 2026. Algorithmic governance must be rooted in sovereign African institutional capacity and human rights protection. #AIDemocracy2026 #GovTech",
    tags: ["#AIDemocracy2026", "#GovTech", "#AbujaConvening"],
  },
  {
    id: "p2",
    author: "Dr. Amara Nwosu",
    handle: "@AmaraNwosu_Gov",
    role: "Keynote Speaker",
    time: "5 hours ago",
    content:
      "Public sector procurement of AI systems requires rigorous pre-deployment audits. Excited to share our Centre's open algorithmic audit framework at the Policy Lab on Day 4. #ResponsibleAI",
    tags: ["#ResponsibleAI", "#AlgorithmicAudit"],
  },
  {
    id: "p3",
    author: "OpenGov Africa Lab",
    handle: "@OpenGovAfrica",
    role: "Sandbox Innovator",
    time: "1 day ago",
    content:
      "Our Sauti AI local language voice bot has been selected for The Sandbox cohort! Come test conversational Swahili and Yoruba parliamentary record tools in Abuja. #CivicTech #LocalLanguages",
    tags: ["#CivicTech", "#LocalLanguages", "#Sandbox2026"],
  },
];

export function CommunityFeed() {
  return (
    <section className="border-b border-border bg-slate-950 py-20 text-slate-100 md:py-24">
      <div className="container-forum">
        <SectionHeader
          eyebrow="Community Buzz & Discussion"
          title="#AIDemocracy2026"
          tone="dark"
          lede="See what delegates, speakers, research institutes, and civic tech labs are sharing ahead of the October convening in Abuja."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((post, idx) => (
            <Reveal key={post.id} delay={idx * 80}>
              <div className="flex h-full flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-sm transition-all hover:border-cyan-400">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{post.author}</h4>
                        <span className="text-[11px] text-slate-400">{post.handle} · {post.role}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400">{post.time}</span>
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-slate-200">
                    {post.content}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-1.5 border-t border-slate-800 pt-3">
                  {post.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[10px] text-cyan-400">
                      {tag}
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
