import { Cta } from "./cta";
import { Reveal } from "./primitives";
import { forumMeta } from "@/data/forum";
import { HeroSlider } from "./HeroSlider";
import { Calendar, MapPin, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-parallax-light pt-10 pb-16 md:pt-14 md:pb-20">
      <div className="container-forum relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
        {/* Left Side: Text & Actions (Yiaga Africa AIDF 2026 Theme) */}
        <div className="lg:col-span-5">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{forumMeta.convener} · AIDF 2026</span>
            </div>

            <h1 className="mt-3.5 text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
              {forumMeta.themeHeadline}
            </h1>

            <p className="mt-3.5 text-base font-semibold tracking-tight text-foreground/90 sm:text-lg leading-snug">
              {forumMeta.themeSubtitle}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-semibold text-foreground/80">
              <div className="flex items-center gap-2 rounded-lg border border-border/80 bg-card px-3 py-1.5 shadow-sm">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{forumMeta.date}</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-border/80 bg-card px-3 py-1.5 shadow-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{forumMeta.venue}</span>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Cta to="/register" tone="primary">
                Register for the Forum
              </Cta>
              <Cta to="/program" tone="outline" arrow={false}>
                View Program
              </Cta>
              <Cta to="/participants" tone="outline" arrow={false}>
                Delegate Info
              </Cta>
            </div>
          </Reveal>
        </div>

        {/* Right Side: Hero Image Slider with attached images */}
        <div className="lg:col-span-7">
          <Reveal delay={100} className="w-full">
            <HeroSlider />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
