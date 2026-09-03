import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { forumMeta, navLinks } from "@/data/forum";

export function Navbar() {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        compact
          ? "border-border bg-background/85 backdrop-blur-xl"
          : "border-transparent bg-background",
      )}
    >
      <div
        className={cn(
          "container-forum flex items-center justify-between transition-all duration-300",
          compact ? "h-16" : "h-16 md:h-20",
        )}
      >
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img src="/logo.svg" alt="AIDF 2026 Logo" className="h-8 md:h-9 w-auto shrink-0 object-contain" />
          <span className="leading-tight">
            <span className="block text-[0.9rem] sm:text-[0.95rem] font-bold tracking-tight">
              AI &amp; Democracy Forum
            </span>
            <span className="eyebrow hidden text-muted-foreground md:block">
              {forumMeta.dateShort} · {forumMeta.location}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to as any}
              className="px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-primary font-bold" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to={"/register" as any}
            className="ml-4 inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 shadow-sm"
          >
            Register
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-accent lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-border bg-background/98 backdrop-blur-xl lg:hidden">
          <nav className="container-forum flex flex-col py-6">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to as any}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-4 text-xl font-bold tracking-tight text-foreground transition-colors active:text-primary"
                activeProps={{ className: "text-primary font-extrabold" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to={"/register" as any}
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-md transition-all active:scale-[0.98]"
            >
              Register for the Forum
            </Link>
            <div className="mt-8 rounded-xl border border-border bg-card p-4 text-xs font-medium text-muted-foreground">
              <p className="font-bold text-foreground">{forumMeta.fullName}</p>
              <p className="mt-1">{forumMeta.date} · {forumMeta.venue}</p>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
