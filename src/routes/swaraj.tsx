import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SwarajProducts } from "@/components/swaraj/SwarajProducts";

export const Route = createFileRoute("/swaraj")({
  head: () => ({
    meta: [
      { title: "Swaraj Tractors — All Models | Cropmak Authorized Dealer" },
      { name: "description", content: "Explore the full Swaraj tractor lineup from 15 HP to 70 HP. Best-sellers like 735 FE & 855 FE. Authorized Cropmak dealership." },
      { property: "og:title", content: "Swaraj Tractors — All Models | Cropmak" },
      { property: "og:description", content: "13+ Swaraj tractor models. Mera Swaraj. Powered by Mahindra & Mahindra." },
    ],
  }),
  component: SwarajPage,
});

function SwarajPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <SwarajProducts />
      </main>
      <Footer />
    </div>
  );
}
