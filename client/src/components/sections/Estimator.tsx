import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { carePlans } from "@/data/content";
import { scrollToId } from "@/lib/site";

const tierLabels = ["Studio S", "Studio L", "Assisted", "Memory"];

interface EstimatorProps {
  selectedCare: number;
  onSelectCare: (index: number) => void;
}

export function Estimator({ selectedCare, onSelectCare }: EstimatorProps) {
  const plan = carePlans[selectedCare];
  const estimatedAnnual = plan.price * 12;
  const fill = `${(selectedCare / (carePlans.length - 1)) * 100}%`;

  return (
    <section id="estimator" className="bg-plum px-6 py-16 text-white sm:px-10 sm:py-20 lg:px-14 lg:py-28">
      <div className="mx-auto grid max-w-[1240px] gap-10 sm:gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
        <div>
          <SectionHeading eyebrow="Monthly cost estimator" eyebrowLight className="max-w-md">
            A clearer way to plan the <em className="font-normal text-lime">next chapter.</em>
          </SectionHeading>
          <p className="mt-6 max-w-md text-sm leading-6 text-white/75">
            Use the selector to explore a starting estimate. Our team will tailor the final plan to
            your loved one’s needs — no hidden costs.
          </p>
          <Button variant="lime" onClick={() => scrollToId("visit")} className="mt-8 gap-2">
            Talk to a care advisor
            <ArrowRight className="inline" size={15} />
          </Button>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-white/7 p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-5 border-b border-white/10 pb-7 sm:flex-row sm:items-end">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[.15em] text-white/60">
                Selected option
              </span>
              <h3 className="animate-swap mt-2 font-display text-3xl tracking-[-.04em] text-white" key={plan.title}>{plan.title}</h3>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[11px] uppercase tracking-[.15em] text-white/60">Starting from</span>
              <p className="animate-swap mt-1 font-display text-4xl tracking-[-.05em] text-lime" key={plan.price}>
                ₹{plan.price.toLocaleString("en-IN")}
                <small className="ml-1 font-sans text-xs tracking-normal text-white/60">/ month</small>
              </p>
            </div>
          </div>

          <div className="mt-8">
            <div className="mb-4 flex justify-between text-[11px] font-bold uppercase tracking-[.13em] text-white/60">
              {tierLabels.map((label, index) => (
                <span key={label} className={selectedCare === index ? "text-lime" : undefined}>
                  {label}
                </span>
              ))}
            </div>
            <input
              aria-label="Choose a care tier"
              aria-valuetext={`${plan.title} — ₹${plan.price.toLocaleString("en-IN")} per month`}
              type="range"
              min={0}
              max={carePlans.length - 1}
              step={1}
              value={selectedCare}
              onChange={(event) => onSelectCare(Number(event.target.value))}
              className="care-range w-full"
              style={{ "--fill": fill } as React.CSSProperties}
            />
            <div className="mt-4 grid grid-cols-4 gap-2">
              {carePlans.map((option, index) => (
                <button
                  key={option.title}
                  type="button"
                  aria-pressed={selectedCare === index}
                  onClick={() => onSelectCare(index)}
                  className={`rounded-xl px-2 py-3 text-center text-[11px] font-bold transition ${
                    selectedCare === index
                      ? "bg-lime text-plum"
                      : "bg-white/7 text-white/70 hover:bg-white/12"
                  }`}
                >
                  <span className="block">₹{Math.round(option.price / 1000)}k</span>
                  <span className="mt-1 block truncate font-normal opacity-80">{tierLabels[index]}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/7 p-4">
              <span className="text-[11px] uppercase tracking-[.12em] text-white/55">Annual guide</span>
              <b className="mt-2 block text-lg text-white">
                ₹{estimatedAnnual.toLocaleString("en-IN")}
              </b>
            </div>
            <div className="rounded-2xl bg-white/7 p-4">
              <span className="text-[11px] uppercase tracking-[.12em] text-white/55">Meals included</span>
              <b className="mt-2 block text-lg text-white">3 + tea</b>
            </div>
            <div className="rounded-2xl bg-white/7 p-4">
              <span className="text-[11px] uppercase tracking-[.12em] text-white/55">Nurse access</span>
              <b className="mt-2 block text-lg text-white">24/7</b>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
