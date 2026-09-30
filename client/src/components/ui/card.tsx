import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: "blush" | "sand" | "sky" | "lime";
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, tone, hover = false, padding = "md", children, ...props }, ref) => {
    const tones = {
      blush: "pastel-blush",
      sand: "pastel-sand",
      sky: "pastel-sky",
      lime: "pastel-lime",
    };

    const paddings = {
      sm: "p-5",
      md: "p-7",
      lg: "p-9",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[26px] flex flex-col",
          tones[tone || "blush"],
          paddings[padding],
          hover && "group transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(42,16,32,.1)]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";