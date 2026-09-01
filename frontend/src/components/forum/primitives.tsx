import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Fade/rise on scroll into view. Respects prefers-reduced-motion via CSS. */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "header";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Comp = Tag as "div";
  return (
    <Comp
      ref={ref}
      className={cn("reveal", shown && "reveal-in", className)}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Comp>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lede,
  align = "left",
  tone = "light",
  action,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  action?: ReactNode;
}) {
  return (
    <Reveal
      as="header"
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center md:text-center",
      )}
    >
      <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
        <div
          className={cn(
            "eyebrow flex items-center gap-3",
            tone === "dark" ? "text-cyan" : "text-primary",
            align === "center" && "justify-center",
          )}
        >
          <span className="inline-block h-px w-8 bg-current opacity-60" />
          {eyebrow}
        </div>
        <h2
          className={cn(
            "mt-5 text-balance text-4xl leading-[1.05] font-semibold md:text-5xl lg:text-[3.4rem]",
            tone === "dark" ? "text-navy-foreground" : "text-foreground",
          )}
        >
          {title}
        </h2>
        {lede ? (
          <p
            className={cn(
              "mt-5 max-w-2xl text-lg leading-relaxed",
              tone === "dark" ? "text-navy-muted" : "text-muted-foreground",
              align === "center" && "mx-auto",
            )}
          >
            {lede}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </Reveal>
  );
}

/** Intentional, replaceable media placeholder. */
export function MediaPlaceholder({
  label,
  ratio = "4 / 3",
  tone = "light",
  className,
  note,
}: {
  label: string;
  ratio?: string;
  tone?: "light" | "dark";
  className?: string;
  note?: string;
}) {
  return (
    <div
      style={{ aspectRatio: ratio }}
      className={cn(
        "relative w-full overflow-hidden",
        tone === "dark" ? "placeholder-surface-dark" : "placeholder-surface",
        className,
      )}
    >
      <div className="absolute inset-3 border border-dashed border-current/15" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center">
        <span
          className={cn(
            "eyebrow",
            tone === "dark" ? "text-navy-muted" : "text-muted-foreground",
          )}
        >
          {label}
        </span>
        {note ? (
          <span
            className={cn(
              "font-mono text-[10px] tracking-wide",
              tone === "dark" ? "text-navy-muted/70" : "text-muted-foreground/70",
            )}
          >
            {note}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export function LogoPlaceholder({ name, tone = "light" }: { name: string; tone?: "light" | "dark" }) {
  const initials = name
    .split(" ")
    .filter((w) => /[A-Za-z]/.test(w[0] ?? ""))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  return (
    <div
      className={cn(
        "group flex h-24 items-center justify-center gap-3 px-4 transition-colors",
        tone === "dark"
          ? "placeholder-surface-dark hover:border-cyan/40"
          : "placeholder-surface hover:border-primary/40",
      )}
      title={name}
    >
      <span
        className={cn(
          "grid h-9 w-9 place-items-center border font-mono text-xs",
          tone === "dark"
            ? "border-navy-border text-navy-foreground"
            : "border-border text-foreground",
        )}
      >
        {initials}
      </span>
      <span className="min-w-0">
        <span
          className={cn(
            "block truncate text-sm font-medium",
            tone === "dark" ? "text-navy-foreground" : "text-foreground",
          )}
        >
          {name}
        </span>
        <span
          className={cn(
            "eyebrow block pt-1",
            tone === "dark" ? "text-navy-muted/70" : "text-muted-foreground/70",
          )}
        >
          Organization logo
        </span>
      </span>
    </div>
  );
}

export function FilterBar({
  options,
  value,
  onChange,
  tone = "light",
}: {
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  tone?: "light" | "dark";
}) {
  return (
    <div className="-mx-5 overflow-x-auto px-5 pb-1 md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex w-max items-center gap-2 md:w-auto md:flex-wrap">
        {options.map((opt) => {
          const active = opt === value;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              aria-pressed={active}
              className={cn(
                "eyebrow shrink-0 border px-4 py-3 transition-colors",
                tone === "dark"
                  ? active
                    ? "border-cyan bg-cyan/15 text-navy-foreground"
                    : "border-navy-border text-navy-muted hover:border-cyan/50 hover:text-navy-foreground"
                  : active
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(to);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1400;
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setN(Math.round(to * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}
