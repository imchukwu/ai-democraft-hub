import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Calendar,
  MapPin,
  Sparkles,
  Users,
  ShieldCheck,
  ChevronRight,
  Maximize2,
  X,
  ExternalLink,
} from "lucide-react";
import { forumMeta } from "@/data/forum";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

export function LandingPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    // Target date: October 14, 2026 09:00:00 UTC
    const targetDate = new Date("2026-10-14T09:00:00Z").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#050B18] text-white flex flex-col justify-between selection:bg-[#15B708] selection:text-slate-950 overflow-x-hidden">
      {/* Dynamic Background Glows & Ambience */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-[#1979E1]/20 blur-[130px]" />
        <div className="absolute top-[20%] right-[-5%] h-[600px] w-[600px] rounded-full bg-[#15B708]/15 blur-[150px]" />
        <div className="absolute bottom-[10%] left-[25%] h-[400px] w-[400px] rounded-full bg-[#FEA105]/10 blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Top Header Bar */}
      <header className="relative z-10 w-full border-b border-white/10 bg-[#050B18]/75 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/logo.svg"
              alt="AI and Democracy Forum Logo"
              className="h-10 w-10 sm:h-12 sm:w-12 shrink-0 object-contain drop-shadow-[0_0_15px_rgba(25,121,225,0.4)]"
            />
            <div className="leading-none">
              <span className="block text-lg sm:text-xl font-extrabold tracking-tight text-white">
                AI and Democracy
              </span>
              <span className="block font-mono text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-[#FEA105] uppercase mt-0.5">
                FORUM
              </span>
            </div>
          </div>

          {/* Right Header Badges / Fast Links */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-mono text-xs font-medium text-slate-300 shadow-inner backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-[#15B708] animate-pulse" />
              <span>#AIforDemocracyForum</span>
            </div>

            <Link
              to="/home"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-xs sm:text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-[#15B708] hover:bg-[#15B708]/20 active:scale-95"
            >
              <span>Enter Site</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* Left Column: Headline, Subtitle, Date, Timer, CTAs */}
          <div className="flex flex-col lg:col-span-7">
            {/* Event Announcement Pill */}
            <div className="inline-flex max-w-fit items-center gap-2 rounded-full border border-[#FEA105]/30 bg-[#FEA105]/10 px-4 py-1.5 text-xs font-semibold text-[#FEA105] shadow-[0_0_20px_rgba(254,161,5,0.15)] mb-6">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              <span className="tracking-wide uppercase font-mono text-[11px]">
                Official Convening · 14th – 16th October 2026
              </span>
            </div>

            {/* Massive Headline from the Flyer */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
              Will <br />
              <span className="text-[#15B708] drop-shadow-[0_0_35px_rgba(21,183,8,0.5)]">
                Algorithms
              </span>{" "}
              <br />
              determine the <br />
              <span className="text-[#15B708] drop-shadow-[0_0_35px_rgba(21,183,8,0.5)]">
                2027 vote?
              </span>
            </h1>

            {/* Subtitle from the Flyer */}
            <p className="mt-5 text-base sm:text-lg md:text-xl font-normal text-slate-300 max-w-xl leading-relaxed">
              Safeguarding Nigeria&apos;s 2027 General Election in the Age of Artificial Intelligence
            </p>

            {/* Key Event Details Badges */}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-xl">
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3.5 backdrop-blur-md">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#FEA105]/15 text-[#FEA105]">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase text-slate-400 font-semibold tracking-wider">
                    Convening Date
                  </p>
                  <p className="text-sm font-bold text-white">14th – 16th October 2026</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3.5 backdrop-blur-md">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#1979E1]/15 text-[#1979E1]">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase text-slate-400 font-semibold tracking-wider">
                    Venue
                  </p>
                  <p className="text-sm font-bold text-white">Congress Hall, Abuja</p>
                </div>
              </div>
            </div>

            {/* Live Countdown Clock */}
            <div className="mt-6 max-w-xl rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 backdrop-blur-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-[#FEA105] font-semibold flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#FEA105] animate-ping" />
                  Convening Countdown
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  14 Oct 2026 · 09:00 WAT
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center font-mono">
                <div className="rounded-xl border border-white/10 bg-black/40 px-2 py-2 sm:py-3">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-white">
                    {timeLeft.days}
                  </span>
                  <span className="text-[10px] uppercase text-slate-400 font-medium tracking-wider">
                    Days
                  </span>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 px-2 py-2 sm:py-3">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-white">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] uppercase text-slate-400 font-medium tracking-wider">
                    Hours
                  </span>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 px-2 py-2 sm:py-3">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-white">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] uppercase text-slate-400 font-medium tracking-wider">
                    Mins
                  </span>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 px-2 py-2 sm:py-3">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-[#15B708]">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] uppercase text-slate-400 font-medium tracking-wider">
                    Secs
                  </span>
                </div>
              </div>
            </div>

            {/* The Main CTA Requested: "Click here to enter the site" */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 max-w-xl">
              <Link
                to="/home"
                className="group relative inline-flex items-center justify-center gap-3.5 rounded-xl bg-gradient-to-r from-[#15B708] via-[#10b981] to-[#1979E1] px-8 py-4 text-base sm:text-lg font-extrabold text-slate-950 shadow-[0_0_35px_rgba(21,183,8,0.4)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_55px_rgba(21,183,8,0.65)] active:scale-[0.98]"
              >
                <span>Click here to enter the site</span>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>

              <Link
                to="/exhibitor"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#FEA105]/50 bg-[#FEA105]/10 px-6 py-4 text-sm font-bold text-[#FEA105] backdrop-blur-sm transition-all duration-300 hover:bg-[#FEA105]/20 hover:border-[#FEA105]"
              >
                <span>Exhibitor Portal</span>
              </Link>
            </div>

            {/* Quick Explore Links */}
            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-slate-500">Quick explore:</span>
              <Link
                to="/program"
                className="rounded-md px-2.5 py-1 transition-colors hover:bg-white/10 hover:text-white"
              >
                Program Schedule
              </Link>
              <span className="text-slate-600">·</span>
              <Link
                to="/speakers"
                className="rounded-md px-2.5 py-1 transition-colors hover:bg-white/10 hover:text-white"
              >
                Speakers
              </Link>
              <span className="text-slate-600">·</span>
              <Link
                to="/sandbox"
                className="rounded-md px-2.5 py-1 transition-colors hover:bg-white/10 hover:text-white"
              >
                Innovation Hub
              </Link>
              <span className="text-slate-600">·</span>
              <Link
                to="/about"
                className="rounded-md px-2.5 py-1 transition-colors hover:bg-white/10 hover:text-white"
              >
                About AIDF
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Poster Card */}
          <div className="flex flex-col items-center justify-center lg:col-span-5">
            <div className="group relative w-full max-w-md lg:max-w-none">
              {/* Outer Glow behind the card */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#15B708]/30 via-[#1979E1]/30 to-[#FEA105]/30 opacity-75 blur-2xl transition duration-500 group-hover:opacity-100" />

              {/* Poster Card Container */}
              <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-slate-950/80 shadow-2xl backdrop-blur-xl">
                {/* Image Showcase */}
                <div className="relative aspect-[1/1] w-full overflow-hidden bg-[#060D1E]">
                  <img
                    src="/images/flyer-landing.png"
                    alt="AI and Democracy Forum 2026 - Will Algorithms determine the 2027 vote?"
                    className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.02]"
                  />

                  {/* Gradient Overlay for bottom text clarity */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />

                  {/* Fullscreen Expand Button */}
                  <button
                    type="button"
                    onClick={() => setLightboxOpen(true)}
                    className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-lg border border-white/20 bg-black/60 text-white backdrop-blur-md transition hover:bg-black/80 hover:border-white/40"
                    title="View Full Flyer"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>

                  {/* Floating Badges */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/70 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#15B708]" />
                      <span>Electoral Integrity 2027</span>
                    </div>

                    <Link
                      to="/home"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#FEA105] hover:underline"
                    >
                      <span>Explore Portal</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                </div>

                {/* Card Footer Details */}
                <div className="p-4 bg-slate-900/90 border-t border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-white">AI &amp; Democracy Forum</p>
                    <p className="text-slate-400 text-[11px]">Convening in Abuja · 14–16 October 2026</p>
                  </div>
                  <Link
                    to="/home"
                    className="rounded-lg bg-white/10 px-3 py-1.5 font-semibold text-white hover:bg-white/20 transition"
                  >
                    Enter Site →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Partners Section — Matching the Flyer's White Bar */}
      <section className="relative z-10 w-full mt-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-t-3xl border-t border-x border-slate-200/80 bg-white p-6 sm:p-8 shadow-[0_-15px_40px_rgba(0,0,0,0.3)]">
            {/* Header: IN PARTNERSHIP WITH */}
            <div className="relative flex items-center justify-center mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative bg-white px-4">
                <span className="font-mono text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em] text-slate-700">
                  IN PARTNERSHIP WITH
                </span>
              </div>
            </div>

            {/* Partners Graphic Banner from Flyer for 100% Authentic Reproduction */}
            <div className="w-full overflow-hidden rounded-xl bg-white p-2">
              <img
                src="/images/flyer-partners-bar.png"
                alt="AI and Democracy Forum Partners: Yiaga Africa, CJID, Dataphyte, Microsoft, MacArthur Foundation, Luminate, GIZ, CFI/FIAP, IFES"
                className="w-full h-auto object-contain mx-auto max-h-[90px] sm:max-h-[110px]"
              />
            </div>

            {/* Text Partner Indicators for SEO & Accessibility */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              <span>Yiaga Africa</span>
              <span>·</span>
              <span>CJID</span>
              <span>·</span>
              <span>Dataphyte</span>
              <span>·</span>
              <span>Microsoft</span>
              <span>·</span>
              <span>MacArthur Foundation</span>
              <span>·</span>
              <span>Luminate</span>
              <span>·</span>
              <span>GIZ</span>
              <span>·</span>
              <span>CFI / FIAP</span>
              <span>·</span>
              <span>IFES</span>
            </div>
          </div>
        </div>

        {/* Deep Bottom Bar */}
        <div className="bg-[#03060F] border-t border-white/5 py-4 text-center text-xs text-slate-400">
          <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>
              © 2026 {forumMeta.fullName} (AIDF 2026). Hosted by Yiaga Africa and partners. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/home" className="text-cyan-400 hover:underline">
                Click here to enter the site →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal for Full Resolution Poster */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-2xl border border-white/20 bg-slate-950 p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/70 text-white hover:bg-black"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src="/images/flyer-landing.png"
              alt="AI and Democracy Forum 2026"
              className="max-h-[85vh] w-auto rounded-xl object-contain mx-auto"
            />
            <div className="p-4 text-center">
              <Link
                to="/home"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#15B708] to-[#1979E1] px-6 py-3 font-bold text-slate-950 hover:opacity-95"
              >
                <span>Click here to enter the site</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
