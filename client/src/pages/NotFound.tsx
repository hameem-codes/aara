import { ArrowRight, Leaf, Phone } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cream px-6 text-ink">
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-lime/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-coral/15 blur-3xl" />

      <div className="relative mx-auto max-w-xl animate-rise text-center">
        <span className="mx-auto flex h-11 w-11 rotate-[-8deg] items-center justify-center rounded-[14px] bg-coral text-plum shadow-lg shadow-plum/10">
          <Leaf size={20} fill="currentColor" strokeWidth={1.5} />
        </span>

        <span className="eyebrow mt-8 justify-center">Page not found</span>

        <h1 className="mt-5 font-display text-[clamp(5rem,18vw,9.5rem)] leading-[0.85] tracking-[-0.06em] text-plum">
          4<span className="text-coral">0</span>4
        </h1>

        <p className="mx-auto mt-6 max-w-md text-lg leading-7 text-muted">
          This page has wandered off — perhaps through the gardens at Aarra Springs. Let&apos;s walk you back.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/"
            className="rounded-full bg-plum px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-plum/10 transition hover:-translate-y-0.5 hover:bg-plum-light active:scale-[0.97]"
          >
            Back to home <ArrowRight className="ml-2 inline" size={16} />
          </a>
          <a
            href="tel:+917411206633"
            className="flex items-center gap-2 rounded-full border border-plum/20 px-6 py-4 text-sm font-semibold text-plum transition hover:bg-plum hover:text-lime"
          >
            <Phone size={15} /> Call our team
          </a>
        </div>

        <p className="mt-10 text-xs uppercase tracking-[0.14em] text-muted/70">
          Aarra Springs · Chikka Tirupathi, Bengaluru
        </p>
      </div>
    </div>
  );
}
