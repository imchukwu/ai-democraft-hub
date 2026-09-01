import { Link } from "@tanstack/react-router";
import { forumMeta, navLinks } from "@/data/forum";

export function Footer() {
  return (
    <footer className="border-t border-border bg-slate-950 py-16 text-sm text-slate-400">
      <div className="container-forum">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.svg" alt="AIDF 2026 Logo" className="h-9 w-auto shrink-0 object-contain" />
              <span className="block text-xl font-bold tracking-tight text-white">
                {forumMeta.fullName}
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-xs leading-relaxed text-slate-300">
              Hosted by {forumMeta.convener}. A national platform to examine how Nigeria can govern and harness AI to strengthen the credibility of the 2027 elections.
            </p>

            <p className="mt-4 text-xs font-semibold text-cyan-400">
              {forumMeta.date} · {forumMeta.venue}
            </p>
          </div>

          {/* Quick Sitemap Links */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Sitemap</h4>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to as any}
                  className="hover:text-cyan-300 transition-colors py-1 text-slate-300"
                >
                  {l.label}
                </Link>
              ))}
              <a href={`mailto:${forumMeta.contactEmail}`} className="hover:text-cyan-300 transition-colors py-1 text-slate-300">
                Contact AIDF
              </a>
            </div>
          </div>

          {/* Social & Legal */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Connect & Legal</h4>
            <div className="mt-4 flex flex-col gap-2 text-xs text-slate-300">
              <a href="https://yiaga.org" target="_blank" rel="noreferrer" className="hover:text-cyan-300 transition-colors">
                Yiaga Africa Official Website
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-cyan-300 transition-colors">
                LinkedIn
              </a>
              <a href="https://x.com/yiaga" target="_blank" rel="noreferrer" className="hover:text-cyan-300 transition-colors">
                X (@Yiaga)
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-800 pt-4 text-[11px] text-slate-400">
              <a href="#privacy" className="hover:text-white">Privacy Policy</a>
              <span>·</span>
              <a href="#terms" className="hover:text-white">Terms</a>
              <span>·</span>
              <a href="#accessibility" className="hover:text-white">Accessibility</a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-xs text-slate-400 sm:flex-row">
          <p>© 2026 {forumMeta.fullName} (AIDF 2026). Hosted by Yiaga Africa and partners. All rights reserved.</p>
          <p className="font-mono text-[11px] text-cyan-400">7th – 9th October 2026 · Abuja, Nigeria</p>
        </div>
      </div>
    </footer>
  );
}
