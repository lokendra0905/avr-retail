import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
  external?: boolean;
};

const variants = {
  primary:
    "btn-shine bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-lg shadow-gold-500/30 hover:shadow-xl hover:shadow-gold-500/40 hover:brightness-110",
  secondary:
    "bg-navy-900 text-ink border border-navy-700 hover:bg-navy-700 hover:border-gold-500/20",
  outline:
    "border-2 border-gold-500/80 text-gold-500 hover:bg-gold-500/8 hover:border-gold-500 backdrop-blur-sm",
  ghost: "text-ink-muted hover:text-ink hover:bg-navy-900/80",
};

const sizes = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3 text-sm",
  lg: "px-9 py-4 text-base",
};

export function Button({
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  children,
  external,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-accent font-semibold",
    "transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
