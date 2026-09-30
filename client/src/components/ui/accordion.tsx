import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export interface AccordionItem {
  id: string;
  question: string;
  answer: React.ReactNode;
  initiallyOpen?: boolean;
}

export function Accordion({ items, allowMultiple = false, className }: AccordionProps) {
  return (
    <div className={cn("divide-y divide-plum/10 border-y border-plum/10", className)}>
      {items.map((item) => (
        <AccordionItemComponent
          key={item.id}
          item={item}
          allowMultiple={allowMultiple}
        />
      ))}
    </div>
  );
}

interface AccordionItemComponentProps {
  item: AccordionItem;
  allowMultiple: boolean;
}

function AccordionItemComponent({ item, allowMultiple }: AccordionItemComponentProps) {
  const [isOpen, setIsOpen] = useState(item.initiallyOpen || false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <button
        id={`${item.id}-trigger`}
        onClick={toggle}
        className="flex w-full items-center justify-between gap-5 py-5 text-left"
        aria-expanded={isOpen}
        aria-controls={`${item.id}-content`}
      >
        <span className="font-display text-[1.35rem] leading-[1.1] tracking-[-.025em] text-plum sm:text-[1.55rem]">
          {item.question}
        </span>
        <span
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-plum/15 text-plum transition",
            isOpen && "rotate-180 bg-plum text-lime"
          )}
        >
          <ChevronDown size={16} aria-hidden="true" />
        </span>
      </button>
      <div
        id={`${item.id}-content`}
        role="region"
        aria-labelledby={`${item.id}-trigger`}
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="pb-5 pr-12 text-sm leading-6 text-muted">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}