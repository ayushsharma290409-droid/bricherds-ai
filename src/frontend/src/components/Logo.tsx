import { cn } from "@/lib/utils";

interface LogoProps {
  collapsed?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { img: "w-7 h-7", text: "text-base" },
  md: { img: "w-9 h-9", text: "text-xl" },
  lg: { img: "w-12 h-12", text: "text-2xl" },
};

export function Logo({ collapsed = false, className, size = "md" }: LogoProps) {
  const s = sizes[size];

  return (
    <div className={cn("flex items-center gap-2.5 select-none", className)}>
      <div
        className={cn(
          "relative flex-shrink-0 rounded-xl overflow-hidden",
          s.img,
        )}
      >
        <img
          src="/assets/generated/bricherds-logo-transparent.dim_120x120.png"
          alt="Bricherds logo"
          className="w-full h-full object-cover"
        />
      </div>
      {!collapsed && (
        <span
          className={cn(
            "font-display font-bold tracking-tight text-foreground",
            s.text,
          )}
        >
          <span className="text-primary">Bri</span>
          <span>cherds</span>
          <span className="text-accent text-xs font-semibold align-super ml-0.5">
            .ai
          </span>
        </span>
      )}
    </div>
  );
}
