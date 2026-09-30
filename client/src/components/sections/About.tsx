import { Leaf, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const highlights = [
  ["Redefining senior living", "Modern, customisable 1 BHK apartments."],
  ["Bridging generations", "Keeping families intimately connected."],
  ["Continuous care", "From self-sufficient living to 24/7 rehab."],
] as const;

export function About() {
  return (
    <section id="story" className="bg-cream px-6 py-16 sm:px-10 sm:py-24 lg:px-14 lg:py-36">
      <div className="mx-auto grid max-w-[1240px] items-center gap-10 sm:gap-16 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
        <Reveal className="relative mx-auto w-full max-w-[520px]">
          <div className="absolute -left-7 top-[12%] h-32 w-32 rounded-full bg-lime/50 blur-2xl" />
          <div className="relative overflow-hidden rounded-[46%_46%_5%_5%/30%_30%_5%_5%] border-[8px] border-white shadow-[0_20px_60px_rgba(42,16,32,.12)]">
            <img
              src="/images/family.jpg"
              alt="Grandparents spending time reading with a child"
              width={800}
              height={952}
              className="aspect-[.84] w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-7 -right-2 flex rotate-[-7deg] items-center gap-2 rounded-full border-2 border-plum bg-coral px-4 py-3 font-display text-sm text-white shadow-xl transition-transform duration-300 hover:rotate-0 sm:-right-10">
            <Leaf size={16} aria-hidden="true" /> Founded with love · 2019
          </div>
        </Reveal>
        <Reveal delay={120}>
          <SectionHeading eyebrow="About Aarra">
            Aarra was born from a deeply personal realization — our elders deserve{" "}
            <em className="font-normal text-coral">so much more</em> than just care.
          </SectionHeading>
          <div className="mt-8 max-w-xl space-y-5 text-base leading-7 text-muted">
            <p>
              They deserve comfort, dignity, and a true sense of belonging. Like many families in
              India, we noticed how challenging it is to find the right support — not just clinical
              care, but a genuine community where elders feel safe, valued, and celebrated.
            </p>
            <p>
              We built Aarra to make aging feel like a vibrant new chapter to embrace, not a
              challenge to endure.
            </p>
          </div>
          <div className="mt-9 grid gap-4 border-t border-plum/10 pt-7 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {highlights.map(([title, text], index) => (
              <Reveal key={title} delay={index * 90} className="flex gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-plum text-lime">
                  <Check size={12} strokeWidth={3} aria-hidden="true" />
                </span>
                <div>
                  <b className="block text-sm text-plum">{title}</b>
                  <span className="mt-1 block text-[13px] leading-5 text-muted">{text}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
