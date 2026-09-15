import { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Calendar,
  MapPin,
  Sparkles,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { forumMeta, partners } from "@/data/forum";

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
    <div className="relative min-h-screen w-full bg-[#050B18] text-white flex flex-col selection:bg-[#15B708] selection:text-slate-950 overflow-x-hidden">

      {/* ── Background Glows ── */}
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

      {/* ── Top Header ── */}
      <header className="relative z-10 w-full border-b border-white/10 bg-[#050B18]/75 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
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

          <div className="flex items-center gap-3">
            <div className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-mono text-xs font-medium text-slate-300 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-[#15B708] animate-pulse" />
              <span>#AIforDemocracyForum</span>
            </div>
            <Link
              to="/home"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-xs sm:text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-[#15B708] hover:bg-[#15B708]/20 active:scale-95"
            >
              Enter Site
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">

          {/* Left: Headline, details, countdown, CTA */}
          <div className="flex flex-col lg:col-span-7">

            {/* Pill */}
            <div className="inline-flex max-w-fit items-center gap-2 rounded-full border border-[#FEA105]/30 bg-[#FEA105]/10 px-4 py-1.5 text-xs font-semibold text-[#FEA105] shadow-[0_0_20px_rgba(254,161,5,0.15)] mb-6">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              <span className="tracking-wide uppercase font-mono text-[11px]">
                Official Convening · 14th – 16th October 2026
              </span>
            </div>

            {/* Headline */}
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

            <p className="mt-5 text-base sm:text-lg md:text-xl font-normal text-slate-300 max-w-xl leading-relaxed">
              Safeguarding Nigeria&apos;s 2027 General Election in the Age of Artificial Intelligence
            </p>

            {/* Detail badges */}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-xl">
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3.5 backdrop-blur-md">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#FEA105]/15 text-[#FEA105]">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Convening Date</p>
                  <p className="text-sm font-bold text-white">14th – 16th October 2026</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3.5 backdrop-blur-md">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#1979E1]/15 text-[#1979E1]">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase text-slate-400 font-semibold tracking-wider">Venue</p>
                  <p className="text-sm font-bold text-white">Congress Hall, Abuja</p>
                </div>
              </div>
            </div>

            {/* Countdown */}
            <div className="mt-6 max-w-xl rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 backdrop-blur-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-[#FEA105] font-semibold flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#FEA105] animate-ping" />
                  Convening Countdown
                </span>
                <span className="text-[11px] text-slate-400 font-mono">14 Oct 2026 · 09:00 WAT</span>
              </div>
              <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center font-mono">
                {[
                  { value: timeLeft.days, label: "Days", color: "text-white" },
                  { value: String(timeLeft.hours).padStart(2, "0"), label: "Hours", color: "text-white" },
                  { value: String(timeLeft.minutes).padStart(2, "0"), label: "Mins", color: "text-white" },
                  { value: String(timeLeft.seconds).padStart(2, "0"), label: "Secs", color: "text-[#15B708]" },
                ].map((unit) => (
                  <div key={unit.label} className="rounded-xl border border-white/10 bg-black/40 px-2 py-2 sm:py-3">
                    <span className={`block text-2xl sm:text-3xl font-extrabold ${unit.color}`}>{unit.value}</span>
                    <span className="text-[10px] uppercase text-slate-400 font-medium tracking-wider">{unit.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA — main enter site button only */}
            <div className="mt-8 max-w-xl">
              <Link
                to="/home"
                id="enter-site-cta"
                className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-3.5 rounded-xl bg-gradient-to-r from-[#15B708] via-[#10b981] to-[#1979E1] px-8 py-4 text-base sm:text-lg font-extrabold text-slate-950 shadow-[0_0_35px_rgba(21,183,8,0.4)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_55px_rgba(21,183,8,0.65)] active:scale-[0.98]"
              >
                Click here to enter the site
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </div>

            {/* Quick explore */}
            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-slate-500">Quick explore:</span>
              {[
                { label: "Program", to: "/program" },
                { label: "Speakers", to: "/speakers" },
                { label: "Innovation Hub", to: "/sandbox" },
                { label: "About AIDF", to: "/about" },
              ].map((link, i, arr) => (
                <span key={link.to} className="inline-flex items-center gap-2">
                  <Link to={link.to as any} className="rounded-md px-2 py-0.5 transition-colors hover:bg-white/10 hover:text-white">
                    {link.label}
                  </Link>
                  {i < arr.length - 1 && <span className="text-slate-600">·</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Ballot Box Illustration */}
          <div className="flex items-center justify-center lg:col-span-5">
            <div className="group relative w-full max-w-md lg:max-w-none">
              {/* Glow halo */}
              <div className="absolute -inset-4 rounded-full bg-[#1979E1]/20 blur-3xl opacity-60 transition duration-500 group-hover:opacity-90" />
              <div className="absolute -inset-2 rounded-full bg-[#15B708]/10 blur-2xl opacity-40" />

              {/* Floating badge — top */}
              <div className="relative z-10 mb-4 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#050B18]/80 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md shadow-xl">
                  <ShieldCheck className="h-4 w-4 text-[#15B708]" />
                  Electoral Integrity · Nigeria 2027
                </div>
              </div>

              {/* The Ballot Box Image */}
              <div className="relative z-10 flex items-center justify-center">
                <img
                  src="/images/ballot-box.png"
                  alt="Hand inserting a vote into a clear ballot box — AI and Democracy Forum 2026"
                  className="w-full max-w-[380px] lg:max-w-full object-contain drop-shadow-[0_30px_80px_rgba(25,121,225,0.35)] transition-transform duration-700 group-hover:scale-[1.03] group-hover:drop-shadow-[0_40px_100px_rgba(25,121,225,0.5)]"
                />
              </div>

              {/* Floating badge — bottom */}
              <div className="relative z-10 mt-4 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#FEA105]/30 bg-[#FEA105]/10 px-4 py-2 text-xs font-semibold text-[#FEA105] backdrop-blur-md shadow-xl">
                  <span className="h-2 w-2 rounded-full bg-[#FEA105] animate-pulse" />
                  Will Algorithms Determine the 2027 Vote?
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── Partners Section ── */}
      <section className="relative z-10 w-full mt-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-t-3xl border-t border-x border-slate-200/80 bg-white p-6 sm:p-8 shadow-[0_-15px_40px_rgba(0,0,0,0.3)]">

            {/* IN PARTNERSHIP WITH Divider */}
            <div className="relative flex items-center justify-center mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative bg-white px-4">
                <span className="font-mono text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em] text-slate-700">
                  IN PARTNERSHIP WITH
                </span>
              </div>
            </div>

            {/* Individual Partner Logos */}
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6">
              {partners.map((partner) => (
                <a
                  key={partner.id}
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={partner.name}
                  className="group flex flex-col items-center gap-2 transition-all duration-200 hover:opacity-100 opacity-80"
                >
                  {partner.logoUrl ? (
                    <div className="flex h-12 items-center justify-center">
                      <img
                        src={partner.logoUrl}
                        alt={partner.name}
                        className={`h-10 w-auto max-w-[120px] object-contain transition-all duration-200 group-hover:scale-105 ${
                          partner.logoUrl.endsWith(".svg") ? "" : ""
                        }`}
                      />
                    </div>
                  ) : (
                    <span className="font-mono text-xs font-bold text-slate-600 tracking-wider uppercase">
                      {partner.logoPlaceholder}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="bg-[#03060F] border-t border-white/5 py-4">
          <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
            <p>
              © 2026 {forumMeta.fullName} (AIDF 2026). Hosted by Yiaga Africa and partners. All rights reserved.
            </p>
            <Link to="/home" className="text-[#FEA105] hover:underline font-medium">
              Click here to enter the site →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
