import { Phone, Mail, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { site, scrollToId } from "@/lib/site";

const footerLinks = [
  { id: "services", label: "Services" },
  { id: "pricing", label: "Pricing" },
  { id: "reviews", label: "Reviews" },
  { id: "faq", label: "FAQ" },
  { id: "visit", label: "Contact" },
] as const;

export function Footer() {
  return (
    <footer className="bg-plum px-6 pb-28 pt-14 text-white sm:px-10 sm:pb-14 lg:px-14">
      <div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-10 border-b border-white/10 pb-10 md:flex-row md:items-end">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-6 text-white/70">
            A more considered way to live, care, and grow older together.
          </p>
          <div className="mt-6 space-y-2 text-sm">
            <a
              href={site.phoneHref}
              className="flex items-center gap-2 text-white/70 transition hover:text-lime"
            >
              <Phone size={15} aria-hidden="true" />
              {site.phoneDisplay}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-2 text-white/70 transition hover:text-lime"
            >
              <Mail size={15} aria-hidden="true" />
              {site.email}
            </a>
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-white/70 transition hover:text-lime"
            >
              <MessageCircle size={15} aria-hidden="true" />
              WhatsApp our care team
            </a>
          </div>
        </div>
        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-x-10 gap-y-3 text-xs font-semibold uppercase tracking-[.1em] text-white/70 sm:flex sm:gap-7"
        >
          {footerLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToId(link.id)}
              className="text-left transition hover:text-lime"
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-3 pt-7 text-[11px] uppercase tracking-[.12em] text-white/50 sm:flex-row">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>Made with care in Bengaluru</span>
      </div>
    </footer>
  );
}
