import { useState, useMemo, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Star, Flame, TrendingUp, Send, Check, Gauge, Cog, Fuel, Tractor, Zap, AlertCircle } from "lucide-react";
import { sendEnquiryEmail } from "@/lib/api/email.functions";
import { toast } from "sonner";

import swarajHeroImg from "@/assets/swaraj-963fe.png";
import imgTarget630 from "@/assets/swaraj-target-630-4wd.png";
import imgTarget625_4WD from "@/assets/swaraj-target-625-4wd.png";
import imgTarget625_2WD from "@/assets/swaraj-target-625-2wd.png";
import img724XM from "@/assets/swaraj-724xm.png";
import img724XMOrchard from "@/assets/swaraj-724xm-orchard.png";
import img724XMOrchardNT from "@/assets/swaraj-724xm-orchard-nt.png";
import img825XM from "@/assets/swaraj-825xm.png";
import img724_4WD from "@/assets/swaraj-724-4wd.png";
import img733FE from "@/assets/swaraj-733fe.png";
import img735FE from "@/assets/swaraj-735fe.png";
import img735FEeR from "@/assets/swaraj-735feer.png";
import img735XT_4WD from "@/assets/swaraj-735xt-4wd.png";
import img742XT from "@/assets/swaraj-742xt.png";
import img843XM from "@/assets/swaraj-843xm.png";
import img843XT from "@/assets/swaraj-843xt.png";
import img744FE from "@/assets/swaraj-744fe.png";
import img744FE_4WD from "@/assets/swaraj-744fe-4wd.png";
import img744XT from "@/assets/swaraj-744xt.png";
import img855FE from "@/assets/swaraj-855fe.png";
import img855FE_4WD from "@/assets/swaraj-855fe-4wd.png";
import img834FE from "@/assets/swaraj-834fe.png";
import img963FE from "@/assets/swaraj-963fe.png";
import img969FE from "@/assets/swaraj-969fe.png";

// ─── Types ────────────────────────────────────────────────────────────────────

type TractorModel = {
  name: string;
  hp: number;
  hpLabel: string;
  range: "20-30" | "31-40" | "41-45" | "46-50" | "61-70";
  cc: number;
  cylinders?: number;
  rpm?: number;
  torque?: string;
  gears?: string;
  lift?: string;
  pto?: string;
  brakes?: string;
  airCleaner?: string;
  cooling?: string;
  fuelTank?: string;
  weight?: string;
  groundClearance?: string;
  features?: string[];
  tag?: "best" | "top" | "popular";
  note?: string;
  image?: string;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const tractors: TractorModel[] = [
  // ── 20–30 HP ──
  {
    name: "Swaraj Target 630 4WD",
    hp: 29, hpLabel: "29 HP", range: "20-30",
    cc: 1331, cylinders: 3, rpm: 2800,
    torque: "87 Nm", lift: "980 kg", gears: "9F + 3R",
    pto: "540 & 540E", brakes: "Oil Immersed",
    airCleaner: "Dry Type, Dual Element", cooling: "Liquid Cooled, Direct Injection",
    fuelTank: "27 L", weight: "910 kg",
    features: ["4WD all-terrain traction", "Sync-shift transmission", "Oil immersed brakes"],
    tag: "popular",
    image: imgTarget630,
  },
  {
    name: "Swaraj Target 625 4WD",
    hp: 25, hpLabel: "25 HP", range: "20-30",
    cc: 1331, cylinders: 3, rpm: 2400,
    torque: "83.1 Nm", lift: "980 kg", gears: "9F + 3R",
    pto: "540 & 540E", brakes: "Oil Immersed",
    airCleaner: "Dry Type, Dual Element", cooling: "Liquid Cooled, Direct Injection",
    fuelTank: "27 L", weight: "910 kg",
    features: ["4WD drive system", "Dual clutch IPTO", "Sync-shift gearbox"],
    image: imgTarget625_4WD,
  },
  {
    name: "Swaraj Target 625 2WD",
    hp: 25, hpLabel: "25 HP", range: "20-30",
    cc: 1331, cylinders: 3, rpm: 2400,
    torque: "83.1 Nm", lift: "980 kg", gears: "9F + 3R",
    pto: "540 & 540E", brakes: "Oil Immersed",
    airCleaner: "Dry Type, Dual Element", cooling: "Liquid Cooled",
    fuelTank: "27 L", weight: "870 kg",
    features: ["2WD lightweight variant", "Single/dual clutch options", "Sync-shift gearbox"],
    image: imgTarget625_2WD,
  },
  {
    name: "Swaraj 724 XM",
    hp: 30, hpLabel: "25–30 HP", range: "20-30",
    cc: 1824, cylinders: 2, rpm: 1800,
    lift: "1000 kg", gears: "8F + 2R",
    pto: "540 / 1000 r/min", brakes: "Water Sealed Disc",
    airCleaner: "3-Stage Oil Bath", cooling: "Water Cooled",
    weight: "1670 kg", groundClearance: "380 mm",
    features: ["380 mm ground clearance", "Dual PTO speeds", "Power steering optional"],
    image: img724XM,
  },
  {
    name: "Swaraj 724 XM Orchard",
    hp: 28, hpLabel: "25–30 HP", range: "20-30",
    cc: 1824, cylinders: 2, rpm: 1800,
    lift: "1000 kg", gears: "6F + 2R",
    pto: "540 / 1000 r/min", brakes: "Oil Immersed",
    airCleaner: "Dry Type, Dual Element", cooling: "Water Cooled",
    weight: "1435 kg", groundClearance: "260 mm",
    features: ["Orchard-width chassis", "Dual PTO: 540 / 1000 r/min", "Power steering standard"],
    image: img724XMOrchard,
  },
  {
    name: "Swaraj 724 XM Orchard NT",
    hp: 27, hpLabel: "25–30 HP", range: "20-30",
    cc: 1824, cylinders: 2, rpm: 1800,
    lift: "1000 kg", gears: "6F + 2R",
    pto: "540 r/min", brakes: "Oil Immersed",
    airCleaner: "Dry Type, Dual Element", cooling: "Water Cooled",
    weight: "1530 kg", groundClearance: "250 mm",
    features: ["Narrow track 1092 mm", "840 mm rear track width", "Inter-row crop clearance"],
    image: img724XMOrchardNT,
  },
  {
    name: "Swaraj 825 XM",
    hp: 26, hpLabel: "20–30 HP", range: "20-30",
    cc: 1537, cylinders: 1, rpm: 1650,
    lift: "1000 kg", gears: "8F + 2R",
    pto: "540 r/min", brakes: "Dry Disc",
    airCleaner: "3-Stage Oil Bath", cooling: "Water Cooled",
    weight: "1850 kg", groundClearance: "380 mm",
    features: ["Single cylinder engine", "380 mm ground clearance", "Rural cultivation & transport"],
    image: img825XM,
  },
  {
    name: "Swaraj 724 FE 4WD",
    hp: 24, hpLabel: "20–30 HP", range: "20-30",
    cc: 1823, cylinders: 2, rpm: 1800,
    torque: "114 Nm", lift: "750 kg", gears: "8F + 4R",
    pto: "540, 540E", brakes: "Oil Immersed Multi Disc",
    airCleaner: "Dry Type, Dual Element", cooling: "Water Cooled",
    fuelTank: "24.5 L", weight: "1250 kg", groundClearance: "260 mm",
    features: ["4WD for wet fields & mud", "High backup torque 114 Nm", "Oil immersed multi disc brakes"],
    image: img724_4WD,
  },

  // ── 31–40 HP ──
  {
    name: "Swaraj 735 FE",
    hp: 39, hpLabel: "31–40 HP", range: "31-40",
    cc: 2734, cylinders: 3, rpm: 1800,
    lift: "1650 kg", gears: "8F + 2R",
    pto: "540 r/min", brakes: "Oil Immersed",
    cooling: "Water Cooled, Direct Injection",
    features: ["Dual clutch IPTO", "Side-shift gearbox", "Digital console"],
    tag: "best",
    image: img735FE,
  },
  {
    name: "Swaraj 735 FEeR",
    hp: 38, hpLabel: "31–40 HP", range: "31-40",
    cc: 2734, cylinders: 3, rpm: 1800,
    lift: "1650 kg", gears: "8F + 2R",
    pto: "540 r/min", brakes: "Oil Immersed",
    cooling: "Water Cooled, Direct Injection",
    features: ["Ergonomic side-shift transmission", "Proven 2734 cc engine", "Digital instrument cluster"],
    image: img735FEeR,
  },
  {
    name: "Swaraj 834 FE",
    hp: 36, hpLabel: "31–40 HP", range: "31-40",
    cc: 2730, cylinders: 3, rpm: 1900,
    lift: "1650 kg", gears: "8F + 2R",
    pto: "540 r/min", brakes: "Oil Immersed",
    airCleaner: "3-Stage Wet", cooling: "Water Cooled",
    fuelTank: "56 L", weight: "1840 kg", groundClearance: "400 mm",
    features: ["Side-shift gearbox", "400 mm ground clearance"],
    image: img834FE,
  },
  {
    name: "Swaraj 733 FE",
    hp: 34, hpLabel: "31–40 HP", range: "31-40",
    cc: 2592, cylinders: 3, rpm: 1800,
    lift: "1650 kg", gears: "8F + 2R",
    pto: "540 r/min", brakes: "Oil Immersed",
    cooling: "Water Cooled",
    features: ["High ground clearance chassis", "Rough farm transport optimized", "3-cylinder engine"],
    image: img733FE,
  },

  // ── 41–45 HP ──
  {
    name: "Swaraj 735 XT",
    hp: 41, hpLabel: "41–45 HP", range: "41-45",
    cc: 3307, cylinders: 3, rpm: 2000,
    lift: "1650 kg", gears: "8F + 2R",
    pto: "540 r/min", brakes: "Oil Immersed",
    airCleaner: "3-Stage Wet", fuelTank: "56 L",
    weight: "1929 kg", groundClearance: "395 mm",
    features: ["3307 cc segment-best engine", "Multi-speed IPTO", "Side-shift gearbox"],
    image: img735XT_4WD,
  },
  {
    name: "Swaraj 735 XT 4WD",
    hp: 42, hpLabel: "41–45 HP", range: "41-45",
    cc: 3307, cylinders: 3, rpm: 2000,
    lift: "1700 kg", gears: "8F + 2R",
    pto: "540 r/min", brakes: "Oil Immersed",
    airCleaner: "3-Stage Wet", cooling: "Water Cooled, Direct Injection",
    fuelTank: "56 L", weight: "1929 kg", groundClearance: "395 mm",
    features: ["4WD all-terrain drive", "1700 kg lift capacity", "Multi-speed IPTO"],
    image: img735XT_4WD,
  },
  {
    name: "Swaraj 742 XT",
    hp: 43, hpLabel: "41–45 HP", range: "41-45",
    cc: 3307, cylinders: 3, rpm: 2000,
    lift: "1700 kg", gears: "8F + 2R",
    pto: "540 r/min", brakes: "Oil Immersed",
    airCleaner: "3-Stage Wet", fuelTank: "56 L",
    weight: "2053 kg", groundClearance: "440 mm",
    features: ["440 mm maximum clearance", "High backup torque for rotavators", "1700 kg lift capacity"],
    image: img742XT,
  },
  {
    name: "Swaraj 843 XM",
    hp: 44, hpLabel: "41–45 HP", range: "41-45",
    cc: 2730, cylinders: 4, rpm: 1900,
    lift: "1500 kg", gears: "8F + 2R",
    pto: "540 r/min", brakes: "Oil Immersed",
    airCleaner: "3-Stage Wet",
    fuelTank: "56 L", weight: "1840 kg", groundClearance: "400 mm",
    features: ["4-cylinder engine", "Low maintenance ergonomic design", "400 mm ground clearance"],
    image: img843XM,
  },
  {
    name: "Swaraj 843 XT",
    hp: 45, hpLabel: "41–45 HP", range: "41-45",
    cc: 2734, cylinders: 3, rpm: 2100,
    lift: "1800 kg", gears: "8F + 2R",
    pto: "540 / 4-speed multi", brakes: "Oil Immersed",
    airCleaner: "3-Stage Wet", fuelTank: "56 L",
    features: ["1800 kg hydraulic lift", "Multi-speed PTO for straw balers", "12-inch larger clutch"],
    image: img843XT,
  },

  // ── 46–50 HP ──
  {
    name: "Swaraj 744 FE",
    hp: 46, hpLabel: "46–50 HP", range: "46-50",
    cc: 3307, cylinders: 3, rpm: 2000,
    lift: "2000 kg", gears: "8F + 2R",
    pto: "540 r/min", brakes: "Oil Immersed",
    fuelTank: "62 L", weight: "2060 kg", groundClearance: "435 mm",
    features: ["2000 kg hydraulic lift", "4-speed multi IPTO", "Digital instrument cluster"],
    tag: "top",
    image: img744FE,
  },
  {
    name: "Swaraj 744 FE 4WD",
    hp: 47, hpLabel: "46–50 HP", range: "46-50",
    cc: 3307, cylinders: 3, rpm: 2000,
    lift: "2000 kg", gears: "8F + 2R",
    pto: "540 / 4-speed multi", brakes: "Oil Immersed",
    airCleaner: "3-Stage Wet",
    fuelTank: "62 L", weight: "2060 kg", groundClearance: "435 mm",
    features: ["4WD with power steering", "Sealed casted front axle", "2000 kg lift capacity"],
    image: img744FE_4WD,
  },
  {
    name: "Swaraj 744 XT",
    hp: 48, hpLabel: "46–50 HP", range: "46-50",
    cc: 3478, cylinders: 3, rpm: 2000,
    lift: "2000 kg", gears: "8F + 2R",
    pto: "540 / 4-speed multi", brakes: "Oil Immersed",
    airCleaner: "3-Stage Wet",
    fuelTank: "62 L", weight: "2220 kg", groundClearance: "437 mm",
    features: ["High-torque 3478 cc engine", "100 Ah battery", "Digital cluster with error codes"],
    image: img744XT,
  },
  {
    name: "Swaraj 855 FE",
    hp: 50, hpLabel: "46–50 HP", range: "46-50",
    cc: 3478, cylinders: 3, rpm: 2000,
    lift: "2000 kg", gears: "8F + 2R",
    pto: "540 r/min", brakes: "Oil Immersed",
    airCleaner: "3-Stage Wet",
    fuelTank: "62 L", weight: "2220 kg", groundClearance: "437 mm",
    features: ["100 Ah battery", "LED fender & tail lamps", "Easy hitch standard"],
    image: img855FE,
  },
  {
    name: "Swaraj 855 FE 4WD",
    hp: 50, hpLabel: "46–50 HP", range: "46-50",
    cc: 3478, cylinders: 3, rpm: 2000,
    lift: "2000 kg", gears: "8F + 2R",
    pto: "540 / 4-speed multi", brakes: "Oil Immersed",
    airCleaner: "3-Stage Wet", cooling: "Water Cooled",
    fuelTank: "62 L", weight: "2455 kg", groundClearance: "350 mm",
    features: ["Reduces slippage in waterlogged soils", "Sealed casted FAB front axle", "iPTO independent hand lever"],
    image: img855FE_4WD,
  },

  // ── 61–70 HP ──
  {
    name: "Swaraj 963 FE",
    hp: 65, hpLabel: "61–65 HP", range: "61-70",
    cc: 3820, cylinders: 3, rpm: 2100,
    lift: "2200 kg", gears: "12F + 12R",
    pto: "540, 540E, 8-speed multi", brakes: "Oil Immersed Disc",
    airCleaner: "Dry Type", cooling: "Water Cooled",
    weight: "2700 kg", groundClearance: "407 mm",
    features: ["Power steering standard", "DCV pre-fitted", "15% higher torque delivery"],
    note: "Also available: 12F + 2R gearbox",
    image: img963FE,
  },
  {
    name: "Swaraj 969 FE",
    hp: 70, hpLabel: "66–70 HP", range: "61-70",
    cc: 3478, cylinders: 3, rpm: 2000,
    lift: "2200 kg", gears: "12F + 3R",
    pto: "540, 540E, multispeed", brakes: "Oil Immersed Multi Disc",
    airCleaner: "Dry Type", cooling: "Water Cooled",
    weight: "2700 kg", groundClearance: "407 mm",
    features: ["Heavy-duty 2200 kg hydraulic lift", "High-torque responsive engine", "Premium 70 HP class"],
    note: "Also available: 12F + 12R with creeper / shuttle",
    image: img969FE,
  },
];

const filters = [
  { key: "all", label: "All Models" },
  { key: "20-30", label: "20–30 HP" },
  { key: "31-40", label: "31–40 HP" },
  { key: "41-45", label: "41–45 HP" },
  { key: "46-50", label: "46–50 HP" },
  { key: "61-70", label: "61–70 HP" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function SwarajProducts() {
  const [filter, setFilter] = useState("all");
  const [selectedModel, setSelectedModel] = useState("Any model");
  const contentRef = useRef<HTMLDivElement>(null);

  const handleFilterChange = (key: string) => {
    setFilter(key);
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  const filtered = useMemo(
    () => filter === "all" ? tractors : tractors.filter(t => t.range === filter),
    [filter]
  );

  const handleQuickEnquire = (modelName: string) => {
    setSelectedModel(modelName);
    document.getElementById("callback")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0A0E14] via-[#1a0608] to-[#2a0a0d] text-white">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 80% 30%, rgba(200,16,46,0.5), transparent 55%)" }} />
        <div className="container-page relative py-12 md:py-20">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to Cropmak
          </Link>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-swaraj/20 border border-swaraj/40 text-xs font-medium mb-5">
                <span className="h-2 w-2 rounded-full bg-swaraj" /> Authorized Swaraj Dealer
              </div>
              <h1 className="font-display font-extrabold text-4xl md:text-6xl leading-[1.05]">Swaraj Tractors</h1>
              <p className="text-xl md:text-2xl text-swaraj/95 font-display font-semibold mt-2 italic">Mera Swaraj.</p>
              <p className="mt-5 text-white/70 leading-relaxed max-w-lg">
                India's homegrown tractor brand by Mahindra & Mahindra. Explore the full lineup — built tough, priced fair, trusted across generations.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-5 max-w-md">
                {[
                  { n: "26+", l: "Models" },
                  { n: "15–70", l: "HP Range" },
                  { n: "50 yr", l: "Legacy" },
                ].map(s => (
                  <div key={s.l}>
                    <div className="text-3xl font-display font-bold text-swaraj">{s.n}</div>
                    <div className="text-xs text-white/60 mt-1 uppercase tracking-wider">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,16,46,0.4),transparent_60%)] blur-3xl" />
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-elevated bg-white/5">
                <img src={swarajHeroImg} alt="Swaraj 963 FE" className="w-full h-auto object-contain p-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <section className="sticky top-[105px] z-30 bg-background/95 backdrop-blur border-b border-border">
        <div className="container-page py-4 flex gap-2 overflow-x-auto">
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => handleFilterChange(f.key)}
              className="shrink-0 px-4 py-2 rounded-full text-sm font-semibold border-2 transition-colors"
              style={{
                background: filter === f.key ? "var(--swaraj)" : "white",
                color: filter === f.key ? "white" : "var(--foreground)",
                borderColor: filter === f.key ? "var(--swaraj)" : "var(--color-border)",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* Models grid */}
      <section ref={contentRef} className="py-12 md:py-16 scroll-mt-[160px]">
        <div className="container-page grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(t => (
            <TractorCard key={t.name} model={t} onEnquire={() => handleQuickEnquire(t.name)} />
          ))}
        </div>
      </section>

      <CallbackForm models={tractors} selectedModel={selectedModel} onModelChange={setSelectedModel} />
    </>
  );
}

// ─── TractorCard ──────────────────────────────────────────────────────────────

function TractorCard({ model, onEnquire }: { model: TractorModel; onEnquire: () => void }) {
  const tagMap = {
    best: { label: "Best Seller", icon: Flame, color: "var(--swaraj)" },
    top: { label: "Top Pick", icon: Star, color: "#C97A0A" },
    popular: { label: "Popular", icon: TrendingUp, color: "#1E6B3F" },
  };
  const tag = model.tag ? tagMap[model.tag] : null;

  const specs = [
    model.cc > 0   ? { icon: Cog,   label: "Displacement", value: `${model.cc.toLocaleString()} cc` } : null,
    model.torque   ? { icon: Gauge, label: "Max Torque",   value: model.torque }
                   : model.rpm ? { icon: Zap, label: "Rated RPM", value: `${model.rpm.toLocaleString()} r/min` } : null,
    model.gears    ? { icon: Cog,   label: "Gears",        value: model.gears } : null,
    model.lift     ? { icon: Gauge, label: "Lift Cap.",    value: model.lift } : null,
  ].filter(Boolean) as Array<{ icon: typeof Cog; label: string; value: string }>;

  return (
    <div className="group relative bg-card border-2 border-border rounded-2xl overflow-hidden hover:border-swaraj/40 hover:-translate-y-1 hover:shadow-elevated transition-all flex flex-col">
      {tag && (
        <div className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold text-white shadow-md" style={{ background: tag.color }}>
          <tag.icon className="h-3 w-3" /> {tag.label}
        </div>
      )}

      {model.image ? (
        <div className="aspect-[4/3] bg-muted overflow-hidden">
          <img src={model.image} alt={model.name} className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300" />
        </div>
      ) : (
        <div className="aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
          <Tractor className="h-16 w-16 text-muted-foreground/30" />
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Swaraj</div>
            <h3 className="font-display font-bold text-lg text-foreground mt-0.5 leading-tight">
              {model.name.replace("Swaraj ", "").replace("CODE by Swaraj", "CODE")}
            </h3>
          </div>
          <div className="text-right shrink-0 ml-2">
            <div className="text-xl font-display font-extrabold text-swaraj leading-none">{model.hpLabel}</div>
            {model.cylinders && <div className="text-xs text-muted-foreground mt-0.5">{model.cylinders}-cyl</div>}
          </div>
        </div>

        {/* Main spec grid */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {specs.map(s => (
            <SpecBox key={s.label} icon={s.icon} label={s.label} value={s.value} />
          ))}
        </div>

        {/* Secondary specs */}
        {(model.pto || model.brakes || model.airCleaner || model.cooling || model.fuelTank || model.groundClearance || model.weight) && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {model.pto && (
              <span className="text-xs bg-muted/60 text-muted-foreground rounded-md px-2 py-1">PTO: {model.pto}</span>
            )}
            {model.brakes && (
              <span className="text-xs bg-muted/60 text-muted-foreground rounded-md px-2 py-1">Brakes: {model.brakes}</span>
            )}
            {model.airCleaner && (
              <span className="text-xs bg-muted/60 text-muted-foreground rounded-md px-2 py-1">Air: {model.airCleaner}</span>
            )}
            {model.cooling && (
              <span className="text-xs bg-muted/60 text-muted-foreground rounded-md px-2 py-1">{model.cooling}</span>
            )}
            {model.fuelTank && (
              <span className="inline-flex items-center gap-1 text-xs bg-muted/60 text-muted-foreground rounded-md px-2 py-1">
                <Fuel className="h-3 w-3" /> {model.fuelTank}
              </span>
            )}
            {model.groundClearance && (
              <span className="text-xs bg-muted/60 text-muted-foreground rounded-md px-2 py-1">Clr: {model.groundClearance}</span>
            )}
            {model.weight && (
              <span className="text-xs bg-muted/60 text-muted-foreground rounded-md px-2 py-1">Wt: {model.weight}</span>
            )}
          </div>
        )}

        {/* Features list */}
        {model.features && model.features.length > 0 && (
          <ul className="mb-3 space-y-1">
            {model.features.slice(0, 3).map(f => (
              <li key={f} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                <Check className="h-3 w-3 text-swaraj shrink-0 mt-0.5" /> {f}
              </li>
            ))}
          </ul>
        )}

        {model.note && (
          <p className="text-xs text-muted-foreground bg-muted/40 rounded-lg px-3 py-2 mb-3 italic">{model.note}</p>
        )}

        <button
          onClick={onEnquire}
          className="block w-full text-center bg-foreground text-background hover:bg-swaraj py-2.5 rounded-full text-sm font-semibold transition-colors mt-auto"
        >
          Quick Enquire
        </button>
      </div>
    </div>
  );
}

function SpecBox({ icon: Icon, label, value }: { icon: typeof Cog; label: string; value: string }) {
  return (
    <div className="bg-muted/60 rounded-lg p-2.5">
      <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3 w-3" /> {label}
      </div>
      <div className="font-semibold text-sm text-foreground mt-0.5">{value}</div>
    </div>
  );
}

// ─── CallbackForm ─────────────────────────────────────────────────────────────

function CallbackForm({ models, selectedModel, onModelChange }: { models: TractorModel[]; selectedModel: string; onModelChange: (m: string) => void }) {
  const [form, setForm] = useState({ name: "", phone: "" });
  const [touched, setTouched] = useState({ name: false, phone: false });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [shake, setShake] = useState(false);

  const nameError = touched.name && !form.name.trim() ? "Please enter your full name" : null;
  const phoneError = touched.phone
    ? form.phone.length === 0
      ? "Phone number is required"
      : form.phone.length < 10
      ? "Must be a 10-digit mobile number"
      : null
    : null;

  const touch = (f: keyof typeof touched) => setTouched(t => ({ ...t, [f]: true }));

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, phone: true });
    if (!form.name.trim() || form.phone.length < 10) {
      triggerShake();
      return;
    }
    setStatus("sending");
    try {
      await sendEnquiryEmail({
        data: {
          name: form.name,
          phone: form.phone,
          interest: `Swaraj Callback Request — ${selectedModel}`,
          message: "Please call me back.",
        },
      });
      setStatus("sent");
      toast.success("Our team will contact you shortly", { duration: 3000 });
      setForm({ name: "", phone: "" });
      setTouched({ name: false, phone: false });
      onModelChange("Any model");
      setTimeout(() => setStatus("idle"), 3500);
    } catch (error) {
      console.error("Failed to send email:", error);
      toast.error("Failed to send request. Please try again.");
      setStatus("idle");
    }
  };

  return (
    <section id="callback" className="py-16 bg-gradient-to-br from-[#0A0E14] to-[#1a0608] text-white">
      <div className="container-page max-w-3xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold">Request a callback</h2>
          <p className="mt-3 text-white/60">Pricing, demo bookings, finance & EMI — sorted in one call.</p>
        </div>
        <form
          onSubmit={onSubmit}
          noValidate
          className={`bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 md:p-8 grid md:grid-cols-3 gap-x-4 gap-y-5 ${shake ? "animate-[shake_0.45s_ease-in-out]" : ""}`}
        >
          {/* Name field */}
          <div className="flex flex-col gap-1.5">
            <input
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              onBlur={() => touch("name")}
              placeholder="Your name"
              disabled={status === "sending"}
              className={`border rounded-lg px-4 py-3 text-sm placeholder:text-white/35 focus:outline-none focus:ring-2 disabled:opacity-50 transition-all duration-200 ${
                nameError
                  ? "bg-red-500/10 border-red-400/70 focus:border-red-400 focus:ring-red-400/20 text-white"
                  : "bg-white/5 border-white/15 focus:border-swaraj focus:ring-swaraj/20"
              }`}
            />
            {nameError && (
              <div className="flex items-center gap-1.5 text-red-400">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span className="text-xs font-medium">{nameError}</span>
              </div>
            )}
          </div>

          {/* Phone field */}
          <div className="flex flex-col gap-1.5">
            <input
              type="tel"
              inputMode="numeric"
              value={form.phone}
              maxLength={10}
              placeholder="10-digit mobile number"
              disabled={status === "sending"}
              onBlur={() => touch("phone")}
              onChange={e => setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
              className={`border rounded-lg px-4 py-3 text-sm placeholder:text-white/35 focus:outline-none focus:ring-2 disabled:opacity-50 transition-all duration-200 ${
                phoneError
                  ? "bg-red-500/10 border-red-400/70 focus:border-red-400 focus:ring-red-400/20 text-white"
                  : "bg-white/5 border-white/15 focus:border-swaraj focus:ring-swaraj/20"
              }`}
            />
            {phoneError && (
              <div className="flex items-center gap-1.5 text-red-400">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span className="text-xs font-medium">{phoneError}</span>
              </div>
            )}
          </div>

          {/* Model select */}
          <div className="flex flex-col gap-1.5">
            <select
              value={selectedModel}
              onChange={e => onModelChange(e.target.value)}
              disabled={status === "sending"}
              className="bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-swaraj focus:ring-2 focus:ring-swaraj/20 disabled:opacity-50 transition-all duration-200"
            >
              <option className="text-foreground">Any model</option>
              {models.map(m => <option key={m.name} className="text-foreground">{m.name}</option>)}
            </select>
          </div>

          <button
            type="submit"
            disabled={status === "sending" || status === "sent"}
            className="md:col-span-3 inline-flex items-center justify-center gap-2 bg-swaraj hover:opacity-90 text-white px-6 py-3.5 rounded-full font-semibold text-sm transition-opacity disabled:opacity-70"
          >
            {status === "sending" ? "Sending..." : status === "sent" ? <><Check className="h-4 w-4" /> Request Sent</> : <>Send Request <Send className="h-4 w-4" /></>}
          </button>
        </form>
      </div>
    </section>
  );
}
