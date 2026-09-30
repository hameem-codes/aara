import { Heart } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";

const stats = [
  { value: 150, suffix: "+", label: "lives touched" },
  { value: 100, suffix: "+", label: "bedded campus" },
  { value: 1800, suffix: "+", label: "care providers", format: true },
  { value: 4.8, decimals: 1, suffix: " ★", label: "Google rating" },
] as const;

export function Wellness() {
  return (
    <section className="relative overflow-hidden bg-plum px-6 pb-24 text-white sm:px-10 lg:px-14 lg:pb-32">
      <div className="torn-top bg-cream-warm" />
      <div className="mx-auto grid max-w-[1240px] gap-10 pt-20 sm:gap-14 sm:pt-24 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:pt-32">
        <Reveal>
          <SectionHeading eyebrow="Life in motion" eyebrowLight className="max-w-lg">
            Helping you achieve full <em className="font-normal text-lime">comfort & vitality.</em>
          </SectionHeading>
          <p className="mt-7 max-w-md text-sm leading-6 text-white/75">
            At the heart of our community is a belief that personalised therapy begins with empathy
            and clinical precision.
          </p>
          <div className="mt-10 grid max-w-lg grid-cols-2 gap-x-8 gap-y-7 border-t border-white/10 pt-7 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <b className="font-display text-3xl tracking-[-.05em] text-lime">
                  <CountUp
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={"decimals" in stat ? stat.decimals : 0}
                    format={"format" in stat ? stat.format : false}
                  />
                </b>
                <span className="mt-1 block text-[11px] uppercase tracking-[.12em] text-white/60">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="overflow-hidden rounded-[30px] border border-white/10 p-2">
              <img
                src="/images/wellness.jpg"
                alt="Senior resident practicing gentle stretching with an instructor"
                width={1000}
                height={909}
                className="aspect-[1.1] w-full rounded-[23px] object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-7 -left-4 flex items-center gap-3 rounded-2xl bg-lime px-5 py-4 text-plum shadow-xl sm:-left-9">
              <Heart size={20} fill="currentColor" aria-hidden="true" />
              <span className="text-xs font-bold">Specialised stroke & memory care</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
