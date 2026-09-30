import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizes = {
    sm: { text: "text-[1.4rem]", icon: "h-5 w-5", leaf: 12 },
    md: { text: "text-[1.9rem]", icon: "h-7 w-7", leaf: 15 },
    lg: { text: "text-[2.4rem]", icon: "h-9 w-9", leaf: 18 },
  };

  const s = sizes[size];

  return (
    <a href="#top" className={cn("flex items-center gap-2", className)} aria-label="Aarra home">
      <span className={cn("font-display tracking-[-0.06em] text-white", s.text)}>Aarra.</span>
      <span
        className={cn(
          "relative flex items-center justify-center rounded-[10px] bg-coral text-plum transition-transform duration-300 hover:rotate-[8deg] hover:scale-110",
          s.icon
        )}
      >
        <Leaf size={s.leaf} fill="currentColor" strokeWidth={1.5} />
      </span>
    </a>
  );
}