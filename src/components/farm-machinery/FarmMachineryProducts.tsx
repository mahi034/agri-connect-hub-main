import { useState, useMemo, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronRight, Wrench, Send, Check, AlertCircle } from "lucide-react";
import { sendEnquiryEmail } from "@/lib/api/email.functions";
import { toast } from "sonner";

import heroImg from "@/assets/swaraj-8200.png";
import img8200 from "@/assets/swaraj-8200.png";
import imgGyrovatorZLX from "@/assets/gyrovator-zlx.png";
import imgGyrovatorSLX from "@/assets/gyrovator-slx.png";
import imgDuravatorSLX from "@/assets/duravator-slx-plus.png";
import imgMBPlough2 from "@/assets/mb-plough-2bottom.png";
import imgMBPlough3 from "@/assets/mb-plough-3bottom.png";
import imgDiscPlough2 from "@/assets/disc-plough-2bottom.png";
import imgDiscPlough3 from "@/assets/disc-plough-3bottom.png";
import imgDiscHarrow from "@/assets/disc-harrow.png";
import imgCultivator from "@/assets/spring-loaded-cultivator.png";
import imgSeedDrill from "@/assets/seed-drill.png";
import imgThresher from "@/assets/multicrop-thresher.png";
import imgFertSpreader from "@/assets/fertilizer-spreader.png";
import imgShredder from "@/assets/shredder.png";
import imgTrailer from "@/assets/trailer.png";
import imgPotatoPlanter from "@/assets/potato-planter.png";
import imgRoundBaler from "@/assets/round-baler.png";
import imgSquareBaler from "@/assets/square-baler.png";
import imgStrawReaper from "@/assets/straw-reaper.png";

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = "combine" | "basic" | "special";

type MachineryItem = {
  name: string;
  category: Category;
  image?: string;
  specs?: Array<{ label: string; value: string }>;
  description: string;
  features?: string[];
};

// ─── Data ─────────────────────────────────────────────────────────────────────

export const machineryItems: MachineryItem[] = [
  // ── Combine ──
  {
    name: "Swaraj 8200 Self-Propelled Combine",
    category: "combine",
    image: img8200,
    specs: [
      { label: "Engine Power", value: "73.5 kW @ 2200 r/min" },
      { label: "Cutting Width", value: "4.2–4.3 m (14 ft)" },
      { label: "Grain Tank", value: "2500 L" },
      { label: "Threshing", value: "Tangential Axial Flow" },
    ],
    description: "Heavy-duty self-propelled combine with Smart E Technology for Best-in-Class grain quality and least grain loss. Harvests wheat, paddy, soybean, and more.",
    features: [
      "Smart E Technology — advanced automated harvesting",
      "Best-in-class grain cleanliness & least grain loss",
      "High fuel efficiency with higher acreage output",
      "High-lug mud-terrain tires for wet paddy fields",
      "Ergonomic cabin with canopy & night work lights",
    ],
  },

  // ── Basic — Rotavators ──
  {
    name: "Gyrovator ZLX",
    category: "basic",
    image: imgGyrovatorZLX,
    specs: [
      { label: "Working Width", value: "1.25–2.05 m" },
      { label: "Blade Options", value: "36 / 42 / 48 / 54 / 60" },
      { label: "Blade Type", value: "Helicoidal Anti-Wear" },
      { label: "Tractor Req.", value: "30 HP & above" },
    ],
    description: "Entry-level rotavator with oil-bath side gear drive that simultaneously cuts, mixes and levels soil. Ideal for pre-sowing preparation and wet land puddling.",
    features: [
      "Multi-speed gearbox for varied applications",
      "3-in-1: cutting, mixing & leveling in one pass",
      "Spring-loaded rear trailing board for level finish",
      "Sealed bearing blocks — dust & water proof",
    ],
  },
  {
    name: "Gyrovator SLX",
    category: "basic",
    image: imgGyrovatorSLX,
    specs: [
      { label: "Working Width", value: "1.50–2.50 m" },
      { label: "Blade Options", value: "36 / 42 / 48 / 60" },
      { label: "Gearbox", value: "4-Speed" },
      { label: "Tractor Req.", value: "40–60 HP" },
    ],
    description: "Mid-range rotavator with 4-speed gearbox for thorough soil preparation and post-harvest crop residue processing across diverse field conditions.",
    features: [
      "4-speed gearbox for precise soil finish",
      "Adjustable trailing board for even surface",
      "Water-tight sealing for wet & dry land use",
      "Oil-filled bearings on both sides",
    ],
  },
  {
    name: "Duravator SLX Plus",
    category: "basic",
    image: imgDuravatorSLX,
    specs: [
      { label: "Working Width", value: "1.60–2.50 m" },
      { label: "Blade Options", value: "36 / 42 / 48 / 54 / 60" },
      { label: "Gearbox", value: "Multi-Speed Robust" },
      { label: "Tractor Req.", value: "45–70 HP" },
    ],
    description: "Heavy-duty premium rotavator built for intensive cultivation on hard soils. Durablades and double cone mechanical seal ensure low maintenance and long service life.",
    features: [
      "Durablades — high durability, low maintenance",
      "Strong mast absorbs vibrations for break-free operation",
      "Double cone mechanical seal — dust & dirt proof",
      "High load capacity bearings for hard soil work",
    ],
  },

  // ── Basic — Ploughs ──
  {
    name: "MB Plough 2-Bottom",
    category: "basic",
    image: imgMBPlough2,
    specs: [
      { label: "Bottoms", value: "2" },
      { label: "Tractor Req.", value: "40 HP+" },
      { label: "Soil Type", value: "Canal / Heavy Rain" },
      { label: "Operation", value: "Primary Tillage" },
    ],
    description: "2-bottom mouldboard plough that deeply inverts the topsoil, completely burying weeds and crop residue while surfacing fresh fertile nutrients.",
    features: [
      "Complete soil inversion & pulverization",
      "Buries weeds — mechanical weed suppression",
      "Improves drainage & root development",
      "Increases soil oxygen for better nutrient cycling",
    ],
  },
  {
    name: "MB Plough 3-Bottom",
    category: "basic",
    image: imgMBPlough3,
    specs: [
      { label: "Bottoms", value: "3" },
      { label: "Tractor Req.", value: "40 HP+" },
      { label: "Soil Type", value: "Canal / Heavy Rain" },
      { label: "Operation", value: "Primary Tillage" },
    ],
    description: "3-bottom mouldboard plough for faster field coverage — inverts more soil per pass across large fields with heavy weed pressure.",
    features: [
      "Higher throughput vs 2-bottom",
      "Complete topsoil inversion for weed burial",
      "Enhanced soil aeration & nutrient cycling",
      "Durable construction for extended field life",
    ],
  },
  {
    name: "Disc Plough 2-Bottom",
    category: "basic",
    image: imgDiscPlough2,
    specs: [
      { label: "Discs", value: "2" },
      { label: "Disc Type", value: "Heavy Concave Steel" },
      { label: "Soil Type", value: "Hard / Dry / Rocky" },
      { label: "Operation", value: "Primary Tillage" },
    ],
    description: "2-bottom disc plough with heavy concave steel discs that slice through unbroken, hard and dry ground while chopping surface crop residue into the soil.",
    features: [
      "Slices through unbroken hard ground",
      "Effective on dry, rocky or stony soils",
      "Chops and incorporates crop residue",
      "Lower soil resistance than MB plough",
    ],
  },
  {
    name: "Disc Plough 3-Bottom",
    category: "basic",
    image: imgDiscPlough3,
    specs: [
      { label: "Discs", value: "3" },
      { label: "Disc Type", value: "Heavy Concave Steel" },
      { label: "Soil Type", value: "Hard / Dry / Rocky" },
      { label: "Operation", value: "Primary Tillage" },
    ],
    description: "3-bottom disc plough for higher throughput on hard and dry soils — three heavy concave discs cover more ground per pass efficiently.",
    features: [
      "Higher coverage rate than 2-bottom",
      "Handles thick unbroken ground efficiently",
      "Works well in dry and hard soil conditions",
      "Buries surface residue and weeds",
    ],
  },
  {
    name: "Disc Harrow",
    category: "basic",
    image: imgDiscHarrow,
    specs: [
      { label: "Operation", value: "Secondary Tillage" },
      { label: "Disc Type", value: "Concave Steel" },
      { label: "Use", value: "Clod Breaking & Mixing" },
      { label: "After", value: "Primary Ploughing" },
    ],
    description: "Concave disc harrow that chops and mixes crop residue into the soil and pulverises large clods after primary tillage to prepare a fine seedbed.",
    features: [
      "Pulverises clods after ploughing",
      "Mixes surface residue into soil",
      "Levels uneven field surface",
      "Used as secondary tillage implement",
    ],
  },

  // ── Basic — Cultivation & Sowing ──
  {
    name: "Spring Loaded Cultivator",
    category: "basic",
    image: imgCultivator,
    specs: [
      { label: "Tyne Type", value: "Spring-Loaded" },
      { label: "Operation", value: "Inter-Tillage" },
      { label: "Use", value: "Weed Control & Aeration" },
      { label: "Protection", value: "Rock/Debris Safe" },
    ],
    description: "Wide-frame cultivator with spring-supported tynes that break up hard clods and uproot weeds. Springs absorb shock from hidden rocks and debris, protecting the frame.",
    features: [
      "Breaks hard clods & uproots weeds",
      "Spring protection from hidden rock damage",
      "Aerates soil for better root penetration",
      "Suitable for inter-tillage operations",
    ],
  },
  {
    name: "Seed Drill",
    category: "basic",
    image: imgSeedDrill,
    specs: [
      { label: "Operation", value: "Sowing" },
      { label: "Placement", value: "Controlled Depth" },
      { label: "Distribution", value: "Uniform Row Spacing" },
      { label: "Drive", value: "Ground Wheel" },
    ],
    description: "Tractor-drawn seed drill that drops seeds evenly into prepared soil at precise, controlled depths for consistent germination and uniform crop establishment.",
    features: [
      "Precise seed depth control for uniform germination",
      "Uniform row spacing reduces seed wastage",
      "Optional combined seed & fertilizer application",
      "Ground wheel drive — no PTO required",
    ],
  },

  // ── Basic — Post-Harvest ──
  {
    name: "Multicrop Thresher",
    category: "basic",
    image: imgThresher,
    specs: [
      { label: "Tractor Req.", value: "40 HP" },
      { label: "Drive", value: "PTO / Diesel Engine" },
      { label: "Crops", value: "Wheat, Soybean, Pulses" },
      { label: "Operation", value: "Stationary" },
    ],
    description: "Stationary multicrop thresher powered by tractor PTO or diesel engine that separates grains from chaff and stalks after harvest. Handles wheat, soybeans, black grams and beans.",
    features: [
      "Multi-crop: wheat, soybean, black grams, beans",
      "PTO or independent diesel engine drive",
      "Fully safe feed cutter design",
      "Robust construction for long service life",
    ],
  },
  {
    name: "Fertilizer Spreader",
    category: "basic",
    image: imgFertSpreader,
    specs: [
      { label: "Mounting", value: "3-Point Linkage" },
      { label: "Drive", value: "PTO-Powered" },
      { label: "Operation", value: "Broadcast Spreading" },
      { label: "Application", value: "Granular Fertilizer" },
    ],
    description: "Tractor-mounted PTO-powered spreader for broadcasting granular fertilizer evenly across fields in a single fast pass, reducing application time and ensuring uniform coverage.",
    features: [
      "Uniform fertilizer distribution per pass",
      "Adjustable spreading rate & width",
      "3-point linkage easy mounting",
      "Reduces manual labor significantly",
    ],
  },
  {
    name: "Shredder",
    category: "basic",
    image: imgShredder,
    specs: [
      { label: "Mounting", value: "3-Point Linkage" },
      { label: "Drive", value: "PTO-Powered" },
      { label: "Operation", value: "Residue Shredding" },
      { label: "Benefit", value: "Organic Matter Return" },
    ],
    description: "Tractor-mounted PTO shredder that finely chops heavy crop residue — maize stalks, sugarcane trash, cotton stalks — back into the field, building organic matter and eliminating stubble burning.",
    features: [
      "Chops heavy stalks: maize, cotton, sugarcane",
      "Returns organic matter to soil",
      "Eliminates need for stubble burning",
      "Saves time vs manual residue removal",
    ],
  },
  {
    name: "Trailer",
    category: "basic",
    image: imgTrailer,
    specs: [
      { label: "Type", value: "Heavy-Duty Hydraulic" },
      { label: "Coupling", value: "Tractor Hitch" },
      { label: "Use", value: "Crop & Input Transport" },
      { label: "Load", value: "High Capacity" },
    ],
    description: "Heavy-duty hydraulic haulage trailer for transporting harvested crops, farm inputs, and other loads across the farm and to the market.",
    features: [
      "Hydraulic tipping for easy unloading",
      "High-capacity load platform",
      "Durable steel construction",
      "Suitable for field & road transport",
    ],
  },

  // ── Special Purpose ──
  {
    name: "Swaraj 22P Dewulf Potato Planter",
    category: "special",
    image: imgPotatoPlanter,
    specs: [
      { label: "Rows", value: "2-Row Concurrent" },
      { label: "Hopper", value: "240–300 kg" },
      { label: "Metering", value: "Cup-Type Seed Wheel" },
      { label: "Fertilizer Box", value: "65 L (optional)" },
    ],
    description: "Automated 2-row potato planter that simultaneously opens furrows, sows seed, places fertilizer, and forms ridges in a single pass. Boosts planting productivity by 25%.",
    features: [
      "25% productivity increase vs manual planting",
      "Mechanical vibrator for improved singulation",
      "Zig-zag or straight-line planting pattern",
      "Brush-cleaned cups — no missed or double drops",
      "Parallelogram-guided furrow openers for constant depth on slopes",
    ],
  },
  {
    name: "Square Baler SQ180",
    category: "special",
    image: imgSquareBaler,
    specs: [
      { label: "Bale Size", value: "46×36×30–140 cm" },
      { label: "Bale Weight", value: "~17.5 kg avg" },
      { label: "Min. Tractor", value: "55 HP" },
      { label: "PTO Speed", value: "540 r/min" },
    ],
    description: "High-density square baler that continuously compresses loose straw or hay into uniformly tied bales suitable for industrial use — pulp, paper, packaging & power generation.",
    features: [
      "Adjustable spring-loaded bale chamber for density control",
      "Heavy-duty draw bar for demanding field conditions",
      "Independent hay fork drive — consistent feeding",
      "Auto-lube knotters — no manual stops",
      "Eliminates stubble burning with crop residue sales",
    ],
  },
  {
    name: "Round Baler",
    category: "special",
    image: imgRoundBaler,
    specs: [
      { label: "Bale Size", value: "670×980 mm" },
      { label: "Bale Weight", value: "20–35 kg" },
      { label: "Min. Tractor", value: "35 HP" },
      { label: "PTO Speed", value: "540 r/min" },
    ],
    description: "Forms dense round bales of straw or hay directly in the field for easy transport and storage. Hydraulic bale ejection and twine auto-wrapping minimize manual intervention.",
    features: [
      "Hydraulic bale ejection system",
      "Twine auto-wrapping — adjustable wrapping count",
      "Centralized lubrication with cleaning brush",
      "3-point linkage for easy transport with tractor",
    ],
  },
  {
    name: "Straw Reaper",
    category: "special",
    image: imgStrawReaper,
    specs: [
      { label: "Cutting Width", value: "2500 mm" },
      { label: "Output", value: "1–2 acres/hour" },
      { label: "Residue Grain", value: "40–50 kg collected" },
      { label: "Thresher Blades", value: "288 blades" },
    ],
    description: "Cuts, threshes, and cleans residual straw stalks left after a combine harvester — converts post-harvest field waste into usable fodder delivered via an output pipe.",
    features: [
      "Oscillating blade cuts wheat stalks cleanly",
      "Revolving reel feeds material to threshing auger",
      "288-blade threshing drum — thorough grain separation",
      "Special hand lever for stone trap & depth adjustment",
      "Heavy-duty gearbox for continuous operation",
    ],
  },
];

const filters: { key: string; label: string }[] = [
  { key: "all", label: "All" },
  { key: "combine", label: "Combine Harvesters" },
  { key: "basic", label: "Basic Implements" },
  { key: "special", label: "Special Purpose" },
];

// ─── Page Component ───────────────────────────────────────────────────────────

export function FarmMachineryProducts() {
  const [filter, setFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState("Any item");
  const contentRef = useRef<HTMLDivElement>(null);

  const handleFilterChange = (key: string) => {
    setFilter(key);
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  const filtered = useMemo(
    () => filter === "all" ? machineryItems : machineryItems.filter(m => m.category === filter),
    [filter]
  );

  const handleQuickEnquire = (name: string) => {
    setSelectedItem(name);
    document.getElementById("machinery-callback")?.scrollIntoView({ behavior: "smooth" });
  };

  // Group for "all" view
  const groups: { key: Category; title: string }[] = [
    { key: "combine", title: "Combine Harvesters" },
    { key: "basic", title: "Basic Implements" },
    { key: "special", title: "Special Purpose Implements" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0A150D] via-[#0d2b1a] to-[#0f3320] text-white">
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(circle at 80% 30%, rgba(30,107,63,0.7), transparent 55%)" }} />
        <div className="container-page relative py-12 md:py-20">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to Cropmak
          </Link>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E6B3F]/30 border border-[#1E6B3F]/50 text-xs font-medium mb-5">
                <span className="h-2 w-2 rounded-full bg-[#4ade80]" /> Authorized Swaraj Dealer
              </div>
              <h1 className="font-display font-extrabold text-4xl md:text-6xl leading-[1.05]">Farm Machinery</h1>
              <p className="text-xl md:text-2xl text-[#4ade80]/90 font-display font-semibold mt-2">Implements for every stage.</p>
              <p className="mt-5 text-white/70 leading-relaxed max-w-lg">
                From combine harvesters to rotavators, ploughs, balers, and planters — everything you need from sowing to harvest, all under one roof.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-5 max-w-md">
                {[
                  { n: "1", l: "Combine" },
                  { n: "13", l: "Implements" },
                  { n: "4", l: "Special" },
                ].map(s => (
                  <div key={s.l}>
                    <div className="text-3xl font-display font-bold text-[#4ade80]">{s.n}</div>
                    <div className="text-xs text-white/60 mt-1 uppercase tracking-wider">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,107,63,0.5),transparent_60%)] blur-3xl" />
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-elevated bg-white/5">
                <img src={heroImg} alt="Swaraj 8200 Combine Harvester" className="w-full h-auto object-contain p-4" />
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
                background: filter === f.key ? "#1E6B3F" : "white",
                color: filter === f.key ? "white" : "var(--foreground)",
                borderColor: filter === f.key ? "#1E6B3F" : "var(--color-border)",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* Content */}
      <section ref={contentRef} className="py-12 md:py-16 scroll-mt-[160px]">
        <div className="container-page">
          {filter === "all" ? (
            <div className="space-y-12">
              {groups.map(g => {
                const items = machineryItems.filter(m => m.category === g.key);
                return (
                  <div key={g.key}>
                    <h2 className="font-display font-bold text-xl text-foreground mb-5 flex items-center gap-3">
                      <span className="h-1 w-6 bg-[#1E6B3F] rounded-full" />
                      {g.title}
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {items.map(item => (
                        <MachineryCard key={item.name} item={item} onEnquire={() => handleQuickEnquire(item.name)} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(item => (
                <MachineryCard key={item.name} item={item} onEnquire={() => handleQuickEnquire(item.name)} />
              ))}
            </div>
          )}
        </div>
      </section>

      <CallbackForm items={machineryItems} selectedItem={selectedItem} onItemChange={setSelectedItem} />
    </>
  );
}

// ─── MachineryCard ────────────────────────────────────────────────────────────

function MachineryCard({ item, onEnquire }: { item: MachineryItem; onEnquire: () => void }) {
  return (
    <div className="group bg-card border-2 border-border rounded-2xl overflow-hidden hover:border-[#1E6B3F]/40 hover:-translate-y-1 hover:shadow-elevated transition-all flex flex-col">
      {item.image ? (
        <div className="aspect-[4/3] bg-muted overflow-hidden">
          <img src={item.image} alt={item.name} className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300" />
        </div>
      ) : (
        <div className="aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
          <Wrench className="h-14 w-14 text-muted-foreground/30" />
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-bold text-base text-foreground leading-snug mb-3">{item.name}</h3>

        {item.specs && item.specs.length > 0 && (
          <div className="grid grid-cols-2 gap-1.5 mb-3">
            {item.specs.map(s => (
              <div key={s.label} className="bg-muted/60 rounded-lg p-2">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
                <div className="font-semibold text-xs text-foreground mt-0.5">{s.value}</div>
              </div>
            ))}
          </div>
        )}

        <p className="text-sm text-muted-foreground leading-relaxed mb-3 flex-1">{item.description}</p>

        {item.features && item.features.length > 0 && (
          <ul className="space-y-1 mb-4">
            {item.features.map(f => (
              <li key={f} className="flex items-start gap-1.5 text-xs">
                <ChevronRight className="h-3 w-3 text-[#1E6B3F] mt-0.5 shrink-0" />
                <span className="text-foreground/80">{f}</span>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={onEnquire}
          className="block w-full text-center bg-foreground text-background hover:bg-[#1E6B3F] py-2.5 rounded-full text-sm font-semibold transition-colors mt-auto"
        >
          Quick Enquire
        </button>
      </div>
    </div>
  );
}

// ─── CallbackForm ─────────────────────────────────────────────────────────────

function CallbackForm({
  items,
  selectedItem,
  onItemChange,
}: {
  items: MachineryItem[];
  selectedItem: string;
  onItemChange: (v: string) => void;
}) {
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
          interest: `Farm Machinery Enquiry — ${selectedItem}`,
          message: "Please call me back.",
        },
      });
      setStatus("sent");
      toast.success("Our team will contact you shortly", { duration: 3000 });
      setForm({ name: "", phone: "" });
      setTouched({ name: false, phone: false });
      onItemChange("Any item");
      setTimeout(() => setStatus("idle"), 3500);
    } catch (error) {
      console.error("Failed to send email:", error);
      toast.error("Failed to send request. Please try again.");
      setStatus("idle");
    }
  };

  return (
    <section id="machinery-callback" className="py-16 bg-gradient-to-br from-[#0A150D] to-[#0d2b1a] text-white">
      <div className="container-page max-w-3xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold">Request a callback</h2>
          <p className="mt-3 text-white/60">Pricing, availability, and demo bookings — sorted in one call.</p>
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
                  : "bg-white/5 border-white/15 focus:border-[#4ade80] focus:ring-[#4ade80]/20"
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
                  : "bg-white/5 border-white/15 focus:border-[#4ade80] focus:ring-[#4ade80]/20"
              }`}
            />
            {phoneError && (
              <div className="flex items-center gap-1.5 text-red-400">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span className="text-xs font-medium">{phoneError}</span>
              </div>
            )}
          </div>

          {/* Item select */}
          <div className="flex flex-col gap-1.5">
            <select
              value={selectedItem}
              onChange={e => onItemChange(e.target.value)}
              disabled={status === "sending"}
              className="bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#4ade80] focus:ring-2 focus:ring-[#4ade80]/20 disabled:opacity-50 transition-all duration-200"
            >
              <option className="text-foreground">Any item</option>
              {items.map(m => <option key={m.name} className="text-foreground">{m.name}</option>)}
            </select>
          </div>

          <button
            type="submit"
            disabled={status === "sending" || status === "sent"}
            className="md:col-span-3 inline-flex items-center justify-center gap-2 bg-[#1E6B3F] hover:opacity-90 text-white px-6 py-3.5 rounded-full font-semibold text-sm transition-opacity disabled:opacity-70"
          >
            {status === "sending" ? "Sending..." : status === "sent" ? <><Check className="h-4 w-4" /> Request Sent</> : <>Send Request <Send className="h-4 w-4" /></>}
          </button>
        </form>
      </div>
    </section>
  );
}
