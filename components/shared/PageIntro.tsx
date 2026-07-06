import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { cn } from "@/lib/utils";

type PageIntroProps = {
  items: { name: string; path: string }[];
  children?: React.ReactNode;
  className?: string;
};

export function PageIntro({ items, children, className }: PageIntroProps) {
  return (
    <div className={cn("border-b border-navy-700/80 bg-white/50 py-6 backdrop-blur-sm", className)}>
      <div className="mx-auto max-w-[1400px] px-6">
        <Breadcrumbs items={items} />
        {children && <div className="mt-6">{children}</div>}
      </div>
    </div>
  );
}
