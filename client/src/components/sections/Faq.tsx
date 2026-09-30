import { Phone } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { faqs } from "@/data/content";
import { site } from "@/lib/site";

export function Faq() {
  const items = faqs.map((faq, index) => ({
    id: `faq-${index}`,
    question: faq.q,
    answer: faq.a,
    initiallyOpen: index === 0,
  }));

  return (
    <section id="faq" className="bg-cream-warm px-6 py-16 sm:px-10 sm:py-24 lg:px-14 lg:py-32">
      <div className="mx-auto grid max-w-[1100px] gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
        <div>
          <SectionHeading eyebrow="A little clarity">
            Questions, <em className="font-normal text-coral">answered.</em>
          </SectionHeading>
          <p className="mt-6 max-w-xs text-sm leading-6 text-muted">
            We know choosing care can feel like a lot. Start here, then call us for a conversation
            shaped around your family.
          </p>
          <Button variant="primary" onClick={() => (window.location.href = site.phoneHref)} className="mt-8 gap-2">
            <Phone size={14} aria-hidden="true" /> Speak with our team
          </Button>
        </div>
        <Accordion items={items} />
      </div>
    </section>
  );
}
