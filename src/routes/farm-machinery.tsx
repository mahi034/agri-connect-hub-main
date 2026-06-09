import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FarmMachineryProducts } from "@/components/farm-machinery/FarmMachineryProducts";

export const Route = createFileRoute("/farm-machinery")({
  head: () => ({
    meta: [
      { title: "Farm Machinery — Implements & Harvesters | Cropmak" },
      { name: "description", content: "Combine harvesters, rotavators, ploughs, balers, seed drills and more. Authorized dealer — genuine pricing." },
      { property: "og:title", content: "Farm Machinery | Cropmak" },
      { property: "og:description", content: "19+ implements from combines to cultivators. Cropmak authorized dealer." },
    ],
  }),
  component: FarmMachineryPage,
});

function FarmMachineryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <FarmMachineryProducts />
      </main>
      <Footer />
    </div>
  );
}
