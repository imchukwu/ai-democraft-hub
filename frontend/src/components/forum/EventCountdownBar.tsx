import { useState, useEffect } from "react";
import { Clock, MapPin, Sparkles } from "lucide-react";
import { forumMeta } from "@/data/forum";

export function EventCountdownBar() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Target date: October 7, 2026 09:00:00 UTC
    const targetDate = new Date("2026-10-07T09:00:00Z").getTime();

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
    <div className="border-y border-[#FEA105]/20 bg-slate-950 py-5 text-slate-100 shadow-inner">
      <div className="container-forum flex flex-col items-center justify-between gap-6 lg:flex-row">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#FEA105]/10 text-[#FEA105] border border-[#FEA105]/30">
            <Clock className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#FEA105] font-semibold uppercase tracking-wider">
              <Sparkles className="h-3 w-3" />
              <span>Event Countdown</span>
            </div>
            <p className="text-sm font-semibold text-white">
              Convening opens Wednesday, 7 October 2026 in Abuja, Nigeria
            </p>
          </div>
        </div>

        {/* Live Countdown Display */}
        <div className="flex items-center gap-4 font-mono">
          <div className="flex flex-col items-center rounded-lg border border-slate-800 bg-slate-900/80 px-3.5 py-2 min-w-[65px]">
            <span className="text-2xl font-bold text-[#FEA105]">{timeLeft.days}</span>
            <span className="text-[10px] text-slate-400 uppercase">Days</span>
          </div>
          <span className="text-xl font-bold text-slate-600">:</span>
          <div className="flex flex-col items-center rounded-lg border border-slate-800 bg-slate-900/80 px-3.5 py-2 min-w-[65px]">
            <span className="text-2xl font-bold text-[#FEA105]">{String(timeLeft.hours).padStart(2, "0")}</span>
            <span className="text-[10px] text-slate-400 uppercase">Hours</span>
          </div>
          <span className="text-xl font-bold text-slate-600">:</span>
          <div className="flex flex-col items-center rounded-lg border border-slate-800 bg-slate-900/80 px-3.5 py-2 min-w-[65px]">
            <span className="text-2xl font-bold text-[#FEA105]">{String(timeLeft.minutes).padStart(2, "0")}</span>
            <span className="text-[10px] text-slate-400 uppercase">Mins</span>
          </div>
          <span className="text-xl font-bold text-slate-600">:</span>
          <div className="flex flex-col items-center rounded-lg border border-slate-800 bg-slate-900/80 px-3.5 py-2 min-w-[65px]">
            <span className="text-2xl font-bold text-[#FEA105]">{String(timeLeft.seconds).padStart(2, "0")}</span>
            <span className="text-[10px] text-slate-400 uppercase">Secs</span>
          </div>
        </div>

        <div className="hidden xl:flex items-center gap-2 text-xs text-slate-400 font-medium border-l border-slate-800 pl-6">
          <MapPin className="h-4 w-4 text-[#FEA105]" />
          <span>{forumMeta.venue}</span>
        </div>
      </div>
    </div>
  );
}
