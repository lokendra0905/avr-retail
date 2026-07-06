import { cn } from "@/lib/utils";

type PageSectionProps = {
  children: React.ReactNode;
  variant?: "default" | "dark" | "alt";
  className?: string;
  id?: string;
  containerClassName?: string;
};

const variants = {
  default: "bg-navy-950",
  dark: "bg-[#0a0a0a]",
  alt: "section-alt",
};

export function PageSection({
  children,
  variant = "default",
  className,
  id,
  containerClassName,
}: PageSectionProps) {
  return (
    <section id={id} className={cn("py-20 lg:py-28", variants[variant], className)}>
      <div className={cn("mx-auto max-w-[1400px] px-6", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
