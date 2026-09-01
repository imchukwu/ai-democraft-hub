import { Reveal, SectionHeader } from "./primitives";
import { newsArticles } from "@/data/forum";

export function NewsSection() {
  const featuredNews = newsArticles.find((n) => n.featured) ?? newsArticles[0];
  const sideNews = newsArticles.filter((n) => n.id !== featuredNews?.id);

  return (
    <section className="border-b border-border py-20 md:py-28">
      <div className="container-forum">
        <SectionHeader
          eyebrow="Latest Announcements"
          title="Forum Updates"
          lede="Stay informed on keynote confirmations, Sandbox cohort selection, policy lab drafts, and partner announcements."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          {/* Featured Main Article with Real Image */}
          {featuredNews ? (
            <div className="lg:col-span-7">
              <Reveal>
                <div className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary hover:shadow-xl">
                  <div>
                    {/* Real News Image */}
                    <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-slate-950 border border-slate-800">
                      <img
                        src={featuredNews.imageUrl}
                        alt={featuredNews.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        {featuredNews.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{featuredNews.date}</span>
                    </div>

                    <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground group-hover:text-primary leading-tight">
                      {featuredNews.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {featuredNews.summary}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-border/50 pt-4 text-xs font-bold text-primary group-hover:underline">
                    Read Full Announcement →
                  </div>
                </div>
              </Reveal>
            </div>
          ) : null}

          {/* Supporting News List */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {sideNews.map((article, idx) => (
              <Reveal key={article.id} delay={idx * 80}>
                <div className="group flex flex-col justify-between rounded-xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-md">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-md bg-secondary px-2.5 py-0.5 text-[11px] font-semibold text-secondary-foreground">
                        {article.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{article.date}</span>
                    </div>

                    <h4 className="mt-3 text-lg font-bold tracking-tight text-foreground group-hover:text-primary leading-snug">
                      {article.title}
                    </h4>

                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {article.summary}
                    </p>
                  </div>

                  <div className="mt-4 text-xs font-semibold text-primary group-hover:underline">
                    Read Story →
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
