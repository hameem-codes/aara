import { MessageCircle } from "lucide-react";
import { site } from "@/lib/site";

export function WhatsAppFAB() {
  return (
    <a
      href={site.whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-20 right-4 z-30 flex items-center gap-2 rounded-full bg-[#1d9e62] px-4 py-3 text-xs font-bold text-white shadow-xl shadow-[#1d9e62]/25 transition hover:-translate-y-0.5 sm:bottom-7 sm:right-7"
      aria-label="Chat with care team on WhatsApp"
    >
      <span className="fab-pulse absolute inset-0 -z-10 rounded-full bg-[#1d9e62]" aria-hidden="true" />
      <MessageCircle size={16} fill="currentColor" aria-hidden="true" />
      <span className="hidden sm:inline">Chat with care team</span>
    </a>
  );
}
