import { Play, ArrowRight } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface TourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookTour: () => void;
}

/** Shared campus-tour preview modal (was previously duplicated in Hero, Home, and MobileBottomBar). */
export function TourModal({ isOpen, onClose, onBookTour }: TourModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Campus tour"
      description="Come see the everyday magic"
      size="lg"
    >
      <div className="grid lg:grid-cols-[1.1fr_.9fr]">
        <div className="relative min-h-[280px]">
          <img
            src="/images/garden.jpg"
            alt="Aarra Springs campus garden preview"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-plum/25">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-lime text-plum shadow-2xl">
              <Play size={25} fill="currentColor" aria-hidden="true" />
            </div>
          </div>
          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/45 px-3 py-1 text-[11px] font-semibold text-white/90 backdrop-blur-sm">
            Walkthrough video coming soon
          </span>
        </div>
        <div className="p-7 text-white sm:p-9">
          <span className="eyebrow eyebrow-light">Campus tour</span>
          <h3 className="mt-5 font-display text-4xl leading-[1] tracking-[-.05em]">
            Come see the everyday magic.
          </h3>
          <p className="mt-5 text-sm leading-6 text-white/70">
            Take a quiet walk through our gardens, studios, dining spaces, and places to pause.
            The best way to understand Aarra is to experience how it feels.
          </p>
          <Button
            variant="lime"
            className="mt-8 w-full sm:w-auto"
            onClick={() => {
              onClose();
              onBookTour();
            }}
          >
            Book an in-person tour
            <ArrowRight className="ml-2 inline" size={15} />
          </Button>
        </div>
      </div>
    </Modal>
  );
}
