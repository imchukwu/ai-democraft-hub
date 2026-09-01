import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Globe2 } from "lucide-react";

export type SlideItem = {
  id: string;
  imageUrl: string;
  badge: string;
  caption: string;
  subcaption: string;
};

const slides: SlideItem[] = [
  {
    id: "slide-1",
    imageUrl: "/images/attached-1.jpg",
    badge: "ELECTION INTEGRITY & MONITORING",
    caption: "Real-Time AI Command Center",
    subcaption: "Auditing electoral data streams, vote verification, and anomaly detection at scale",
  },
  {
    id: "slide-2",
    imageUrl: "/images/attached-2.jpg",
    badge: "AI & HUMAN GOVERNANCE",
    caption: "Verifiable Democratic Partnership",
    subcaption: "Co-building ethical artificial intelligence to safeguard human rights and civic trust",
  },
  {
    id: "slide-3",
    imageUrl: "/images/attached-3.png",
    badge: "DIGITAL VOTING INFRASTRUCTURE",
    caption: "Transparent & Inclusive Ballot Audits",
    subcaption: "Verifiable, privacy-preserving open-source tools for democratic institutions",
  },
];

export function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const activeSlide = slides[currentIndex]!;

  return (
    <div className="relative aspect-[16/10] sm:aspect-[16/10] lg:aspect-[16/10] xl:aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border shadow-2xl group bg-slate-950">
      {/* Slide Image Backgrounds */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.imageUrl}
            alt={slide.caption}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
        </div>
      ))}

      {/* Caption Overlay */}
      <div className="absolute bottom-6 left-6 right-6 z-20 text-white md:bottom-8 md:left-8 md:right-8">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-[#FEA105]/20 px-3 py-1 font-mono text-xs font-semibold text-[#FEA105] backdrop-blur-md border border-[#FEA105]/40">
          <Globe2 className="h-4 w-4" />
          {activeSlide.badge}
        </span>
        <h3 className="mt-2 text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">
          {activeSlide.caption}
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl line-clamp-2">
          {activeSlide.subcaption}
        </p>
      </div>

      {/* Slide Controls (Prev / Next Arrows) */}
      <button
        type="button"
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 grid h-10 w-10 place-items-center rounded-full bg-slate-950/60 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#FEA105] hover:text-slate-950 border border-slate-700"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        type="button"
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 grid h-10 w-10 place-items-center rounded-full bg-slate-950/60 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#FEA105] hover:text-slate-950 border border-slate-700"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute top-4 right-4 z-30 flex items-center gap-2 rounded-full bg-slate-950/60 px-3 py-1.5 backdrop-blur-md border border-slate-800">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            className={`h-2.5 rounded-full transition-all ${
              idx === currentIndex ? "w-7 bg-[#FEA105]" : "w-2.5 bg-slate-600 hover:bg-slate-400"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
