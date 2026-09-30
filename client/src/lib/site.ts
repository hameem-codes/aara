export const site = {
  name: "Aarra Communities",
  campus: "Aarra Springs",
  phoneDisplay: "+91 74112 06633",
  phoneHref: "tel:+917411206633",
  whatsappNumber: "917411206633",
  email: "life@aarra.in",
  address: "NH 648 Chikka Tirupathi, Near Whitefield, Anchemuskur, Karnataka 563160",
  whatsappUrl:
    "https://api.whatsapp.com/send?phone=917411206633&text=Hi%20Aarra%20team,%20I%20would%20like%20to%20inquire%20about%20senior%20living%20options.",
} as const;

/** Smooth-scrolls to an element id, respecting prefers-reduced-motion via CSS `scroll-behavior`. */
export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
