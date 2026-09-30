import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const photos = [
  { src: "/images/garden.jpg", alt: "Landscaped gardens and walking paths at Aarra Springs", caption: "Gardens & walking paths", aspect: "aspect-[.8]" },
  { src: "/images/dining.jpg", alt: "Fresh vegetarian meals served in the community dining hall", caption: "Chef-curated vegetarian dining", aspect: "aspect-[1.25]" },
  { src: "/images/room.jpg", alt: "A bright, furnished 1 BHK living space", caption: "1 BHK living spaces", aspect: "aspect-[.9]" },
  { src: "/images/wellness.jpg", alt: "A resident enjoying a gentle wellness session", caption: "Wellness & therapy", aspect: "aspect-[1.15]" },
  { src: "/images/family.jpg", alt: "Family visiting time on campus", caption: "Family time, always welcome", aspect: "aspect-[.85]" },
  { src: "/images/nurse.jpg", alt: "A nurse checking in on a resident", caption: "24/7 nursing care", aspect: "aspect-[.8]" },
];

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Body scroll lock + keyboard controls while the lightbox is open.
  useEffect(() => {
    if (open === null) return;

    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
      if (event.key === "ArrowRight") setOpen((i) => (i === null ? null : (i + 1) % photos.length));
      if (event.key === "ArrowLeft") setOpen((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <section id="gallery" className="bg-cream-warm px-6 py-16 sm:px-10 sm:py-24 lg:px-14 lg:py-32">
      <Reveal className="mx-auto max-w-[1240px]">
        <SectionHeading eyebrow="Life at Aarra" className="max-w-xl">
          A peek at <em className="font-normal text-coral">everyday life.</em>
        </SectionHeading>
        <p className="mt-6 max-w-md text-sm leading-6 text-muted">
          Gardens, dining rooms, studios, and the small moments in between. Tap any photo to take a
          closer look.
        </p>

        <div className="mt-10 columns-2 gap-3 sm:mt-14 sm:gap-4 md:columns-3">
          {photos.map((photo, index) => (
            <Reveal key={photo.src} delay={(index % 3) * 90} className="mb-3 sm:mb-4">
              <button
                onClick={() => setOpen(index)}
                aria-label={`Open photo: ${photo.caption}`}
                className="group block w-full cursor-zoom-in overflow-hidden rounded-[20px] border-[6px] border-white shadow-[0_12px_36px_rgba(42,16,32,.1)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(42,16,32,.16)]"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={800}
                  height={800}
                  loading="lazy"
                  className={`${photo.aspect} w-full object-cover transition duration-500 group-hover:scale-[1.04]`}
                />
              </button>
            </Reveal>
          ))}
        </div>
      </Reveal>

      {/* Lightbox */}
      {open !== null && (
        <div
          className="animate-overlay-in fixed inset-0 z-50 flex items-center justify-center bg-plum/95 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={() => setOpen(null)}
        >
          <button
            ref={closeRef}
            onClick={() => setOpen(null)}
            aria-label="Close photo viewer"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X size={20} />
          </button>

          <figure className="animate-fade-zoom relative" onClick={(event) => event.stopPropagation()}>
            <img
              src={photos[open].src}
              alt={photos[open].alt}
              className="max-h-[76vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
            />
            <figcaption className="mt-3 text-center text-sm text-white/80">
              {photos[open].caption} · {open + 1} / {photos.length}
            </figcaption>
          </figure>

          <button
            onClick={(event) => {
              event.stopPropagation();
              setOpen((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
            }}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-6"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={(event) => {
              event.stopPropagation();
              setOpen((i) => (i === null ? null : (i + 1) % photos.length));
            }}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </section>
  );
}
