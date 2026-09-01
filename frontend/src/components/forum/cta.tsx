import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const base =
  "group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-medium tracking-tight transition-all duration-200";

const styles = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lift",
  accent: "bg-accent text-accent-foreground hover:brightness-105 hover:shadow-lift",
  outline: "border border-foreground/25 text-foreground hover:border-foreground hover:bg-foreground/5",
  ghostDark:
    "border border-navy-border text-navy-foreground hover:border-cyan/60 hover:bg-navy-foreground/5",
  solidLight: "bg-navy-foreground text-navy hover:bg-navy-foreground/90",
} as const;

export type CtaTone = keyof typeof styles;

export function Cta({
  children,
  to,
  href,
  tone = "primary",
  arrow = true,
  className,
  onClick,
  type,
}: {
  children: ReactNode;
  to?: string;
  href?: string;
  tone?: CtaTone;
  arrow?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  const content = (
    <>
      {children}
      {arrow ? (
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
      ) : null}
    </>
  );
  const cls = cn(base, styles[tone], className);

  if (to) {
    return (
      <Link to={to as any} className={cls}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls}>
        {content}
      </a>
    );
  }
  return (
    <button type={type ?? "button"} onClick={onClick} className={cls}>
      {content}
    </button>
  );
}
