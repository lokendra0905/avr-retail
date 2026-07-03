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
    "bg-gold-500 text-white hover:bg-gold-600 shadow-lg shadow-gold-500/25",
  secondary: "bg-navy-900 text-ink hover:bg-navy-700 border border-navy-700",
  outline:
    "border border-gold-500 text-gold-500 hover:bg-gold-500/10 hover:border-gold-600",
  ghost: "text-ink-muted hover:text-ink hover:bg-navy-900",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
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
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300",
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
