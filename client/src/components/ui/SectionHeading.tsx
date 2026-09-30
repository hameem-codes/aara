import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  eyebrowLight?: boolean;
  children: ReactNode;
  className?: string;
  as?: "h2" | "h3";
}

/** Serif display heading with the signature eyebrow label above it. */
export function SectionHeading({
  eyebrow,
  eyebrowLight = false,
  children,
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div className={className}>
      {eyebrow && (
        <span className={cn("eyebrow", eyebrowLight && "eyebrow-light")}>{eyebrow}</span>
      )}
      <Tag
        className={cn(
          "mt-5 font-display text-[clamp(2.4rem,5vw,4.7rem)] leading-[1] tracking-[-0.055em]",
          eyebrowLight ? "text-white" : "text-plum"
        )}
      >
        {children}
      </Tag>
    </div>
  );
}
