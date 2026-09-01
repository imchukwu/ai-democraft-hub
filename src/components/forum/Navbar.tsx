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
          compact ? "h-16" : "h-20 md:h-24",
        )}
      >
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src="/logo.svg" alt="AIDF 2026 Logo" className="h-9 w-auto shrink-0 object-contain" />
          <span className="leading-tight">
            <span className="block text-[0.95rem] font-semibold tracking-tight">
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
              className="px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground font-medium" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to={"/register" as any}
            className="ml-4 inline-flex items-center bg-foreground px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-primary"
          >
            Register
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="grid h-11 w-11 place-items-center border border-border lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-border bg-background lg:hidden">
          <nav className="container-forum flex flex-col py-4">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to as any}
                onClick={() => setOpen(false)}
                className="border-b border-border py-5 text-2xl font-semibold tracking-tight"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to={"/register" as any}
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex items-center justify-center bg-foreground px-6 py-4 text-base font-medium text-background"
            >
              Register for the Forum
            </Link>
            <p className="eyebrow py-8 text-muted-foreground">
              {forumMeta.date} · {forumMeta.location}
            </p>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
