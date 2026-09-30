import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFAB } from "@/components/layout/WhatsAppFAB";
import { MobileBottomBar } from "@/components/layout/MobileBottomBar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Amenities } from "@/components/sections/Amenities";
import { Pricing } from "@/components/sections/Pricing";
import { Estimator } from "@/components/sections/Estimator";
import { Wellness } from "@/components/sections/Wellness";
import { Testimonials } from "@/components/sections/Testimonials";
import { Gallery } from "@/components/sections/Gallery";
import { Faq } from "@/components/sections/Faq";
import { Visit } from "@/components/sections/Visit";
import { TrustMarquee } from "@/components/ui/TrustMarquee";
import { scrollToId } from "@/lib/site";

export default function Home() {
  // Selected care tier is shared between Pricing cards, the Estimator slider, and the form.
  const [selectedCare, setSelectedCare] = useState(2);

  const selectCareAndEstimate = (index: number) => {
    setSelectedCare(index);
    scrollToId("estimator");
  };

  return (
    <div id="top" className="min-h-screen overflow-x-hidden bg-cream text-ink">
      <Header />
      <main>
        <Hero />
        <TrustMarquee />
        <About />
        <Services />
        <Amenities />
        <Pricing selectedCare={selectedCare} onSelectCare={selectCareAndEstimate} />
        <Estimator selectedCare={selectedCare} onSelectCare={setSelectedCare} />
        <Wellness />
        <Testimonials />
        <Gallery />
        <Faq />
        <Visit selectedCare={selectedCare} />
      </main>
      <Footer />
      <WhatsAppFAB />
      <MobileBottomBar onBookTour={() => scrollToId("visit")} />
    </div>
  );
}
