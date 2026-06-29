import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/constants/site";
import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "header" | "footer";
  className?: string;
  priority?: boolean;
};

const sizeClasses = {
  header: "h-10 w-auto md:h-12",
  footer: "h-14 w-auto md:h-16",
};

export function Logo({ variant = "header", className, priority }: LogoProps) {
  const shouldPrioritize = priority ?? variant === "header";

  return (
    <Link href="/" className={cn("inline-flex shrink-0", className)}>
      <Image
        src={SITE.logo}
        alt={SITE.name}
        width={280}
        height={80}
        priority={shouldPrioritize}
        className={cn("object-contain object-left", sizeClasses[variant])}
      />
    </Link>
  );
}
