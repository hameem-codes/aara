import { Stethoscope, Utensils, Flower2, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { scrollToId } from "@/lib/site";

const services = [
  {
    tone: "blush" as const,
    icon: <Stethoscope size={24} aria-hidden="true" />,
    title: "24/7 professional medical oversight",
    body: "Registered nurses on premises around the clock, routine vitals charting, scheduled doctor consultations, and priority hospital affiliations.",
    link: "Explore medical facilities",
  },
  {
    tone: "sand" as const,
    icon: <Utensils size={24} aria-hidden="true" />,
    title: "Chef-curated vegetarian nutrition",
    body: "Three fresh, balanced vegetarian meals prepared daily. Full dietary customization for diabetic, low-sodium, and soft-texture requirements.",
    link: "View dining philosophy",
  },
  {
    tone: "sky" as const,
    icon: <Flower2 size={24} aria-hidden="true" />,
    title: "Vibrant community & well-being",
    body: "Daily yoga, meditation, gardening in lush green courtyards, book clubs, and cultural festivals that cultivate lifelong friendships.",
    link: "See life at Aarra",
  },
];

export function Services() {
  return (
    <section id="services" className="bg-cream-warm px-6 py-16 sm:px-10 sm:py-24 lg:px-14 lg:py-32">
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Refined living experience" className="max-w-2xl">
            Care crafted around <em className="font-normal text-coral">everyday joy.</em>
          </SectionHeading>
          <p className="max-w-xs text-sm leading-6 text-muted">
            A considered approach to the details that make a day feel good — and a community feel
            like home.
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-5 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 100}>
            <Card tone={service.tone} hover padding="lg" className="min-h-[300px] sm:min-h-[340px]">
              <span className="mb-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/70 text-plum shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                {service.icon}
              </span>
              <h3 className="max-w-[260px] font-display text-[2rem] leading-[1.02] tracking-[-.045em] text-plum">
                {service.title}
              </h3>
              <p className="mt-4 max-w-sm text-sm leading-6 text-plum/75">{service.body}</p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-auto self-start px-0 hover:bg-transparent"
                onClick={() => scrollToId("living")}
              >
                <span className="group-[:hover]:-translate-y-0.5 flex items-center gap-2 text-xs font-bold uppercase tracking-[.13em] transition">
                  {service.link}
                  <ArrowUpRight size={15} className="transition group-hover:translate-x-1" />
                </span>
              </Button>
            </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
