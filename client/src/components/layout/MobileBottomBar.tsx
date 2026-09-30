import { Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

export function MobileBottomBar({ onBookTour }: { onBookTour: () => void }) {
  return (
    <div className="fixed inset-x-3 bottom-3 z-20 grid grid-cols-2 gap-2 rounded-2xl border border-plum/10 bg-white/92 p-2 shadow-2xl backdrop-blur-md sm:hidden">
      <a
        href={site.phoneHref}
        className="flex items-center justify-center gap-2 rounded-xl bg-cream-warm py-3 text-xs font-bold text-plum"
      >
        <Phone size={15} aria-hidden="true" />
        Call now
      </a>
      <Button variant="plum" className="rounded-xl py-3 text-xs font-bold" onClick={onBookTour}>
        Book tour
      </Button>
    </div>
  );
}
