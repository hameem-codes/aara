import { ArrowRight, Play, Sparkles, ShieldCheck, Clock3, CircleCheck, Heart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { TourModal } from "@/components/TourModal";
import { scrollToId } from "@/lib/site";

export function Hero() {
  const [tourOpen, setTourOpen] = useState(false);

  return (
    <section className="relative isolate overflow-hidden bg-[#1d1a1e] text-white" id="top">
      <div className="kenburns absolute inset-0 -z-20 bg-[url('/images/hero-bg.jpg')] bg-cover bg-[center_58%]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/80 via-black/48 to-black/15" />
      <div className="absolute inset-0 -z-10 bg-black/10" />
      <div className="floaty absolute right-[-7%] top-[20%] h-72 w-72 rounded-full border border-white/10 sm:h-[420px] sm:w-[420px]" />

      <div className="relative mx-auto grid max-w-[1380px] items-center gap-9 px-6 pb-20 pt-32 sm:gap-14 sm:px-10 sm:pb-28 sm:pt-40 lg:grid-cols-[1.03fr_.97fr] lg:gap-16 lg:px-14 lg:pb-36 lg:pt-48">
        <div className="max-w-2xl animate-rise">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/80 backdrop-blur-sm">
            <Sparkles size={13} className="text-lime" aria-hidden="true" />
            #1 senior living facility in Bengaluru
          </div>
          <h1 className="max-w-[760px] font-display text-[clamp(3.8rem,8vw,7.75rem)] leading-[0.95] tracking-[-0.055em] text-white">
            Comfort for life&apos;s{" "}
            <span
              className="mx-1 inline-flex h-[0.56em] w-[0.56em] translate-y-[-0.03em] items-center justify-center rounded-full bg-coral align-middle font-sans text-[0.42em] font-bold tracking-normal text-white sm:mx-3"
              aria-hidden="true"
            >
              +
            </span>{" "}
            <em className="font-normal text-lime">best sequel</em>
          </h1>
          <p className="mt-8 max-w-xl text-[17px] leading-7 text-white/75 sm:text-lg">
            Seniors are at the heart of everything we do. Luxury senior living apartments,
            assisted care, and 24/7 geriatric nursing nestled in peaceful Chikka Tirupathi,
            Whitefield.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button variant="primary" size="lg" onClick={() => scrollToId("services")} className="gap-2">
              Explore care options
              <ArrowRight className="inline" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => setTourOpen(true)}
              className="gap-3 text-white/85 hover:text-white"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-lime text-plum transition group-hover:scale-105">
                <Play size={17} fill="currentColor" aria-hidden="true" />
              </span>
              Watch campus tour
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/15 pt-5 text-[13px] text-white/70 sm:mt-14">
            <span className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-lime" aria-hidden="true" /> 1,800+ certified staff
            </span>
            <span className="flex items-center gap-2">
              <Clock3 size={16} className="text-lime" aria-hidden="true" /> 24/7 registered nurses
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[270px] animate-rise [animation-delay:120ms] sm:max-w-[620px] lg:ml-auto">
          <div className="floaty absolute -left-4 top-[15%] z-10 hidden items-center gap-3 rounded-2xl border border-white/15 bg-[#472239]/90 px-4 py-3 text-xs shadow-xl backdrop-blur-md sm:flex sm:-left-10">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lime text-plum">
              <CircleCheck size={17} aria-hidden="true" />
            </span>
            <span>
              <b className="block text-white">Verified care</b>
              <small className="text-white/70">1,800+ certified staff</small>
            </span>
          </div>
          <div className="floaty absolute -right-3 bottom-[10%] z-10 max-w-[185px] rounded-2xl border border-white/15 bg-[#472239]/90 px-4 py-3 text-xs shadow-xl backdrop-blur-md [animation-delay:1.2s] sm:-right-8">
            <span className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-coral text-white">
              <Heart size={16} fill="currentColor" aria-hidden="true" />
            </span>
            <b className="block text-white">Peace of mind</b>
            <small className="text-white/70">A home that holds you</small>
          </div>
          <div className="image-arch relative overflow-hidden rounded-[44%_44%_18%_18%/31%_31%_14%_14%] border-[10px] border-white/10 bg-white/5 p-2 shadow-2xl shadow-black/25">
            <img
              src="/images/hero.jpg"
              alt="A happy older couple enjoying time together"
              width={800}
              height={941}
              className="aspect-[.85] w-full rounded-[42%_42%_16%_16%/29%_29%_12%_12%] object-cover"
              fetchPriority="high"
            />
          </div>
          <div className="absolute -bottom-10 left-[17%] h-24 w-24 rounded-full border border-lime/30 bg-lime/10 blur-[1px]" />
          <p className="absolute -bottom-8 right-[18%] rotate-[-7deg] font-display text-xl italic text-lime">
            a gentler way to age
          </p>
        </div>
      </div>
      <div className="torn-bottom bg-cream" />

      <TourModal isOpen={tourOpen} onClose={() => setTourOpen(false)} onBookTour={() => scrollToId("visit")} />
    </section>
  );
}
