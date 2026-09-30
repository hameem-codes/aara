import { ArrowUpRight, Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const amenities = [
  ["Nutritious homestyle vegetarian cuisine", "Doctor-approved recipes balanced for senior vitality."],
  ["Seamless medication administration", "In-house nurses oversee dosages, schedules, and refills."],
  ["Emergency call buttons in every unit", "Immediate response linked directly to the central nurse station."],
  ["Senior-retrofit architecture", "Anti-skid floors, grab bars, wide doorways, and stretcher lifts."],
] as const;

export function Amenities() {
  return (
    <section id="living" className="bg-cream px-6 py-16 sm:px-10 sm:py-24 lg:px-14 lg:py-36">
      <div className="mx-auto grid max-w-[1240px] items-center gap-10 sm:gap-16 lg:grid-cols-[1.08fr_.92fr] lg:gap-20">
        <Reveal>
          <SectionHeading eyebrow="Our promise" className="max-w-xl">
            Unlock everyday{" "}
            <span className="inline-block translate-y-[-.08em] rounded-full bg-sky px-4 py-2 font-sans text-[.32em] font-semibold tracking-normal text-plum">
              🌿 wellness
            </span>{" "}
            peace of mind.
          </SectionHeading>
          <div className="mt-10 divide-y divide-plum/10 border-y border-plum/10">
            {amenities.map(([title, text]) => (
              <div key={title} className="group flex w-full items-center justify-between gap-4 py-5 text-left">
                <span>
                  <b className="block font-display text-[1.35rem] tracking-[-.025em] text-plum sm:text-[1.55rem]">
                    {title}
                  </b>
                  <small className="mt-1 block text-[13px] leading-5 text-muted">{text}</small>
                </span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-plum/15 text-plum transition group-hover:bg-plum group-hover:text-lime">
                  <ArrowUpRight size={17} aria-hidden="true" />
                </span>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={120} className="relative mx-auto w-full max-w-[500px]">
          <div className="absolute -right-5 top-6 h-28 w-28 rounded-full bg-coral/25 blur-2xl" />
          <div className="relative overflow-hidden rounded-[42%_42%_7%_7%/24%_24%_4%_4%] border-[8px] border-white shadow-[0_22px_70px_rgba(42,16,32,.15)]">
            <img
              src="/images/nurse.jpg"
              alt="A nurse gently supporting a resident"
              width={800}
              height={1026}
              className="aspect-[.78] w-full object-cover transition duration-500 hover:scale-[1.03]"
              loading="lazy"
            />
          </div>
          <div className="floaty absolute -bottom-8 -left-5 max-w-[245px] rounded-[20px] bg-plum p-5 text-white shadow-xl sm:-left-10">
            <div className="flex items-center gap-2 text-lime">
              <Star size={12} fill="currentColor" aria-hidden="true" />
              <span className="text-[11px] font-bold uppercase tracking-[.14em]">Aarra promise</span>
            </div>
            <p className="mt-2 font-display text-[1.35rem] leading-[1.05]">
              Support that feels like <em className="font-normal text-coral">care.</em>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
