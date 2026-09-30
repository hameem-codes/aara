import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/data/content";

function Stars() {
  return (
    <span className="text-sm tracking-[.15em] text-plum" role="img" aria-label="Rated 5 out of 5 stars">
      ★★★★★
    </span>
  );
}

const AUTO_MS = 5000;

/**
 * Coverflow spotlight carousel: the active review sits front and centre while
 * a slice of the previous and next reviews peek in from the sides. Navigating
 * glides the strip so the incoming card scales up to the front. Paint-safe by
 * design: plain overflow clipping + gradient overlays (no masks/blur).
 */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const count = testimonials.length;

  const goTo = (i: number) => setIndex(((i % count) + count) % count);
  const next = () => setIndex((i) => (i + 1) % count);
  const prev = () => setIndex((i) => (i - 1 + count) % count);

  // Auto-advance unless hovered/touched or reduced-motion.
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), AUTO_MS);
    return () => clearInterval(timer);
  }, [paused, count]);

  // Swipe support.
  const onTouchStart = (e: React.TouchEvent) => {
    setPaused(true);
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 48) (diff > 0 ? next : prev)();
    touchStartX.current = null;
  };

  return (
    <section id="reviews" className="overflow-hidden bg-cream py-24 lg:py-36">
      <div className="px-6 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-[1240px]">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <SectionHeading eyebrow="Where families find peace of mind" className="max-w-xl">
                What families say <em className="font-normal text-coral">about us.</em>
              </SectionHeading>
              <a
                href="https://www.google.com/search?q=Aarra+Springs+senior+living+reviews"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.12em] text-plum hover:text-coral"
              >
                See all Google reviews <span aria-hidden="true">↗</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Screen-reader accessible static list (the animated strip is aria-hidden) */}
      <div className="sr-only">
        {testimonials.map((review) => (
          <blockquote key={review.author}>
            <p>“{review.quote}”</p>
            <footer>
              {review.author} · {review.place} — {review.tag}
            </footer>
          </blockquote>
        ))}
      </div>

      <div
        className="relative mt-14"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Slides hidden from AT; the pager below stays accessible. */}
        <div aria-hidden="true" className="relative overflow-hidden">
          {/* Narrow fades hug the very edges so the active card stays vivid */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-6 bg-gradient-to-r from-cream to-transparent sm:w-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-6 bg-gradient-to-l from-cream to-transparent sm:w-10" />

          <div
            className="review-track flex items-stretch"
            style={{ transform: `translateX(calc(${index} * (var(--review-card-w) + var(--review-gap)) * -1))` }}
          >
            {testimonials.map((review, i) => {
              const isActive = i === index;
              return (
                <article
                  key={review.author}
                  className={cn(
                    `pastel-${review.tone} review-card relative flex flex-col rounded-[26px] p-7 sm:p-10`,
                    isActive
                      ? "z-30 scale-100 opacity-100 shadow-[0_28px_70px_rgba(42,16,32,.22)]"
                      : "z-0 scale-[.9] opacity-55"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-white/70 px-3 py-1 text-[11px] font-bold uppercase tracking-[.14em] text-plum">
                      {review.tag}
                    </span>
                    <Stars />
                  </div>
                  <p className="mt-8 font-display text-[1.5rem] leading-[1.12] tracking-[-.03em] text-plum sm:mt-10 sm:text-[1.85rem]">
                    “{review.quote}”
                  </p>
                  <div className="mt-auto border-t border-plum/15 pt-5 text-[13px] text-plum/75">
                    <b className="text-plum">{review.author}</b> · {review.place}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Pager */}
        <div className="mt-9 flex items-center justify-center gap-4">
          <button
            onClick={prev}
            aria-label="Previous review"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-plum/20 text-plum transition hover:bg-plum hover:text-lime active:scale-95"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex items-center gap-2">
            {testimonials.map((review, i) => (
              <button
                key={review.author}
                onClick={() => goTo(i)}
                aria-label={`Go to review ${i + 1}`}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === index ? "w-7 bg-plum" : "w-2 bg-plum/25 hover:bg-plum/45"
                )}
              />
            ))}
          </div>
          <button
            onClick={next}
            aria-label="Next review"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-plum/20 text-plum transition hover:bg-plum hover:text-lime active:scale-95"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
