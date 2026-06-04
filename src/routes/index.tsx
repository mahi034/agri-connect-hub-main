import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroBanner } from "@/components/home/HeroBanner";
import { BrandsShowcase } from "@/components/home/BrandsShowcase";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { EnquirySection } from "@/components/home/EnquirySection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cropmak — Roots of Innovations | Multi-Brand Agri Dealer" },
      { name: "description", content: "Authorized multi-brand agri dealer. Swaraj tractors, implements, irrigation, and farm finance — all under one trusted roof." },
      { property: "og:title", content: "Cropmak — Roots of Innovations" },
      { property: "og:description", content: "Tractors, implements, irrigation & finance for India's farmers." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <HeroBanner />
        <BrandsShowcase />
        <WhyChooseUs />
        <EnquirySection />
      </main>
      <Footer />
    </div>
  );
}
