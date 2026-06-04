import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Tractor, Wrench, Droplets, Landmark, ArrowRight, Check } from "lucide-react";
import swarajImg from "@/assets/swaraj-tractor.jpg";
import implementsImg from "@/assets/implements.jpg";
import irrigationImg from "@/assets/irrigation.jpg";
import fieldsImg from "@/assets/fields.jpg";

type TabKey = "tractors" | "implements" | "irrigation" | "finance";

const tabs: { key: TabKey; label: string; icon: typeof Tractor; color: string }[] = [
  { key: "tractors", label: "Tractors", icon: Tractor, color: "#C8102E" },
  { key: "implements", label: "Implements", icon: Wrench, color: "#1E6B3F" },
  { key: "irrigation", label: "Irrigation", icon: Droplets, color: "#0369A1" },
  { key: "finance", label: "Finance", icon: Landmark, color: "#6D28D9" },
];

type Brand = { name: string; sub: string; bullets: string[]; cta: string; href: string; image: string };

const content: Record<TabKey, Brand[]> = {
  tractors: [
    {
      name: "Swaraj Tractors",
      sub: "Featured Partner · Mahindra & Mahindra",
      bullets: ["13+ models from 15 HP to 70 HP", "Best-sellers: 735 FE & 855 FE", "50 years of trusted legacy"],
      cta: "View All Models",
      href: "/swaraj",
      image: swarajImg,
    },
  ],
  implements: [
    { name: "Rotavators & Tillers", sub: "Soil preparation", bullets: ["Heavy-duty blades", "5–8 ft working width", "Low maintenance"], cta: "Enquire", href: "#enquiry", image: implementsImg },
    { name: "Harvesters & Reapers", sub: "Crop harvesting", bullets: ["Wheat, paddy, maize", "High output per hour", "Operator-friendly"], cta: "Enquire", href: "#enquiry", image: implementsImg },
    { name: "Seed Drills", sub: "Precision sowing", bullets: ["Uniform seed depth", "Multi-crop adaptable", "Fuel efficient"], cta: "Enquire", href: "#enquiry", image: implementsImg },
  ],
  irrigation: [
    { name: "Drip Irrigation", sub: "Water-efficient systems", bullets: ["Up to 60% water saving", "Crop-specific design", "Free farm survey"], cta: "Get a Quote", href: "#enquiry", image: irrigationImg },
    { name: "Sprinkler Systems", sub: "Wide-area coverage", bullets: ["Portable & fixed setups", "Uniform spray", "Quick install"], cta: "Get a Quote", href: "#enquiry", image: irrigationImg },
    { name: "Agri Pumps", sub: "Diesel & solar pumps", bullets: ["1–10 HP range", "Solar subsidy support", "5-year warranty"], cta: "Get a Quote", href: "#enquiry", image: irrigationImg },
  ],
  finance: [
    { name: "Farm Loans", sub: "Tractor & equipment finance", bullets: ["Up to 90% on-road funding", "Flexible 1–7 year tenure", "Fast paperwork"], cta: "Check Eligibility", href: "#enquiry", image: fieldsImg },
    { name: "Crop Insurance", sub: "Protect your harvest", bullets: ["PMFBY scheme support", "All major crops covered", "Quick claim filing"], cta: "Apply Now", href: "#enquiry", image: fieldsImg },
  ],
};

export function BrandsShowcase() {
  const [active, setActive] = useState<TabKey>("tractors");
  const activeTab = tabs.find((t) => t.key === active)!;

  return (
    <section id="brands" className="py-20 md:py-28">
      <div className="container-page">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-[0.2em] text-amber-brand font-semibold mb-3">Our Products & Services</div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            Everything your farm needs — <span className="text-primary">in one place.</span>
          </h2>
        </div>

        {/* Pill tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = active === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all border-2"
                style={{
                  background: isActive ? t.color : "white",
                  color: isActive ? "white" : t.color,
                  borderColor: isActive ? t.color : `${t.color}33`,
                  boxShadow: isActive ? `0 8px 24px -10px ${t.color}` : "none",
                }}
              >
                <Icon className="h-4 w-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Cards grid */}
        {content[active].length === 1 ? (
          <FeaturedCard brand={content[active][0]} accent={activeTab.color} />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content[active].map((b) => <BrandCard key={b.name} brand={b} accent={activeTab.color} />)}
          </div>
        )}
      </div>
    </section>
  );
}

function FeaturedCard({ brand, accent }: { brand: Brand; accent: string }) {
  return (
    <div className="grid lg:grid-cols-5 rounded-3xl overflow-hidden bg-card border-2 shadow-elevated" style={{ borderColor: `${accent}30` }}>
      <div className="lg:col-span-3 relative aspect-[4/3] lg:aspect-auto">
        <img src={brand.image} alt={brand.name} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute top-5 left-5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-bold text-white shadow-lg" style={{ background: accent }}>
          ★ Featured Partner
        </div>
      </div>
      <div className="lg:col-span-2 p-8 md:p-10 flex flex-col justify-center">
        <div className="text-xs text-muted-foreground uppercase tracking-wider">{brand.sub}</div>
        <h3 className="font-display font-bold text-3xl md:text-4xl text-foreground mt-2">{brand.name}</h3>
        <ul className="mt-6 space-y-3">
          {brand.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-sm text-foreground/80">
              <Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: accent }} />
              {b}
            </li>
          ))}
        </ul>
        <Link
          to={brand.href}
          className="mt-8 inline-flex items-center gap-2 self-start px-6 py-3 rounded-full font-semibold text-sm text-white transition-transform hover:scale-105"
          style={{ background: accent }}
        >
          {brand.cta} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function BrandCard({ brand, accent }: { brand: Brand; accent: string }) {
  return (
    <div className="group bg-card border border-border rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-elevated transition-all">
      <div className="aspect-[5/3] overflow-hidden bg-muted">
        <img src={brand.image} alt={brand.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-6">
        <h3 className="font-display font-bold text-lg text-foreground">{brand.name}</h3>
        <div className="text-xs text-muted-foreground mt-0.5">{brand.sub}</div>
        <ul className="mt-4 space-y-2">
          {brand.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-foreground/75">
              <Check className="h-3.5 w-3.5 mt-1 shrink-0" style={{ color: accent }} />
              {b}
            </li>
          ))}
        </ul>
        <a
          href={brand.href}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold hover:gap-2.5 transition-all"
          style={{ color: accent }}
        >
          {brand.cta} <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
