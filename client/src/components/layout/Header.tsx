import { Menu, X, Phone, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

export const navItems = [
  { id: "services", label: "Services" },
  { id: "story", label: "Why Aarra" },
  { id: "living", label: "Amenities" },
  { id: "gallery", label: "Gallery" },
  { id: "pricing", label: "Pricing" },
  { id: "reviews", label: "Reviews" },
  { id: "faq", label: "FAQ" },
] as const;

/** Watches which section is in view so the nav can highlight it. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // A slim horizontal band ~30% down the viewport decides the active section.
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(navItems.map((item) => item.id));

  // Compact the pill once the user scrolls past the hero's top edge.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close the mobile menu when the URL hash changes (deep links, back button).
  useEffect(() => {
    const onHashChange = () => setMenuOpen(false);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const goToSection = (id: string) => {
    setMenuOpen(false);
    // Update the hash so sections are deep-linkable, without a jump.
    history.replaceState(null, "", `#${id}`);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 px-4 transition-all duration-300 sm:px-6 lg:px-10",
        scrolled ? "py-2.5 lg:py-3" : "py-4 lg:py-6"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-[1380px] items-center justify-between rounded-full text-white transition-all duration-300",
          scrolled
            ? "border border-white/15 bg-[#241219]/85 px-4 py-2.5 shadow-[0_10px_36px_rgba(0,0,0,.28)] backdrop-blur-xl sm:px-6"
            : "border border-white/20 bg-black/20 px-5 py-3.5 shadow-[0_12px_40px_rgba(0,0,0,.16),inset_0_1px_0_rgba(255,255,255,.12)] backdrop-blur-xl sm:px-7"
        )}
      >
        <Logo className="shrink-0" />
        <nav
          aria-label="Primary"
          className="hidden items-center gap-1 text-xs font-semibold uppercase tracking-[0.08em] text-white/80 lg:flex"
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(event) => {
                event.preventDefault();
                goToSection(item.id);
              }}
              aria-current={active === item.id ? "true" : undefined}
              className={cn(
                "relative whitespace-nowrap rounded-full px-2.5 py-1.5 transition",
                active === item.id
                  ? "bg-white/12 text-white"
                  : "hover:bg-white/8 hover:text-white"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-3">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 whitespace-nowrap text-xs font-semibold text-white/80 transition hover:text-white 2xl:flex"
          >
            <Phone size={14} aria-hidden="true" />
            {site.phoneDisplay}
          </a>
          <Button variant="lime" size="sm" onClick={() => goToSection("visit")} className="hidden gap-1 sm:inline-flex">
            Book a tour
            <ArrowRight className="inline" size={14} />
          </Button>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "mx-auto mt-2 max-w-[1380px] overflow-hidden rounded-[24px] border border-white/20 bg-black/55 text-white shadow-2xl backdrop-blur-xl transition-all duration-300 lg:hidden",
          menuOpen ? "max-h-[480px] opacity-100" : "pointer-events-none max-h-0 border-0 opacity-0"
        )}
      >
        <div className="px-5 py-5">
          <nav aria-label="Mobile" className="grid gap-1 text-sm font-semibold">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  goToSection(item.id);
                }}
                className={cn(
                  "border-b border-white/10 py-3 text-white/85 last:border-0",
                  active === item.id && "text-lime"
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={site.phoneHref}
            className="mt-4 flex items-center justify-center gap-2 text-sm text-white/70"
          >
            <Phone size={15} aria-hidden="true" />
            {site.phoneDisplay}
          </a>
          <Button
            variant="lime"
            className="mt-4 w-full"
            onClick={() => goToSection("visit")}
          >
            Book a tour
            <ArrowRight className="ml-1 inline" size={15} />
          </Button>
        </div>
      </div>
    </header>
  );
}
