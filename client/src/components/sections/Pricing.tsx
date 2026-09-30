import { useState } from "react";
import { ArrowDownRight, Plus, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { carePlans } from "@/data/content";
import { scrollToId } from "@/lib/site";

const trustChips = ["100% verified care", "Doctor supervised", "Memory safe"];

interface PricingProps {
  selectedCare: number;
  onSelectCare: (index: number) => void;
}

export function Pricing({ selectedCare, onSelectCare }: PricingProps) {
  return (
    <section id="pricing" className="bg-cream-warm px-6 py-16 sm:px-10 sm:py-24 lg:px-14 lg:py-32">
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-col justify-between gap-7 border-b border-plum/10 pb-9 md:flex-row md:items-end">
          <div>
            <div className="mb-3 flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-[.12em] text-plum/70">
              {trustChips.map((chip) => (
                <span key={chip} className="rounded-full border border-plum/20 px-3 py-1">
                  {chip}
                </span>
              ))}
            </div>
            <SectionHeading className="max-w-2xl">
              Find your <em className="font-normal text-coral">sanctuary.</em>
            </SectionHeading>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => scrollToId("visit")}
            className="gap-2 self-start md:self-end"
          >
            Request full brochure
            <ArrowDownRight size={15} />
          </Button>
        </div>

        <div
          role="radiogroup"
          aria-label="Care plans"
          className="mt-8 grid gap-4 sm:mt-12 sm:gap-5 md:grid-cols-2 xl:grid-cols-4"
        >
          {carePlans.map((plan, index) => {
            const selected = selectedCare === index;
            return (
              <Reveal key={plan.title} delay={index * 90}>
              <Card
                key={plan.title}
                tone={plan.tone}
                role="radio"
                aria-checked={selected}
                tabIndex={selected ? 0 : -1}
                onClick={() => onSelectCare(index)}
                className={cn(
                  "relative cursor-pointer min-h-[340px] transition duration-300 sm:min-h-[390px]",
                  selected
                    ? "ring-2 ring-plum ring-offset-4 ring-offset-cream-warm"
                    : "hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(42,16,32,.1)]"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/70 px-3 py-1 text-[11px] font-bold uppercase tracking-[.14em] text-plum">
                    {plan.label}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-plum">
                    {plan.icon}
                  </span>
                </div>
                <h3 className="mt-10 font-display text-[2rem] leading-[1] tracking-[-.05em] text-plum">
                  {plan.title}
                </h3>
                <div className="mt-5 flex items-end gap-1 text-plum">
                  <span className="font-display text-4xl tracking-[-.05em]">
                    ₹{plan.price.toLocaleString("en-IN")}
                  </span>
                  <span className="pb-1 text-xs text-plum/70">{plan.suffix}</span>
                </div>
                <p className="mt-4 text-[13px] leading-5 text-plum/75">{plan.description}</p>
                <ul className="mt-5 space-y-2 border-t border-plum/15 pt-4 text-[13px] text-plum/80">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <Check size={13} className="mt-0.5 shrink-0" aria-hidden="true" /> {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={selected ? "primary" : "secondary"}
                  className="mt-auto w-full justify-between"
                  aria-pressed={selected}
                  onClick={(event) => {
                    event.stopPropagation();
                    onSelectCare(index);
                  }}
                >
                  <span>{selected ? "Selected — see estimate" : "Select this stay"}</span>
                  <Plus size={16} aria-hidden="true" />
                </Button>
              </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
