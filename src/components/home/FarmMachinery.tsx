import { useState, useMemo } from "react";
import { ChevronRight, Wrench, Send, Check } from "lucide-react";
import { sendEnquiryEmail } from "@/lib/api/email.functions";
import { toast } from "sonner";

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

type MachineryItem = {
  name: string;
  category: "combine" | "basic" | "special";
  image?: string;
  specs?: Array<{ label: string; value: string }>;
  description: string;
  features?: string[];
};

const machineryItems: MachineryItem[] = [
  {
    name: "Swaraj 8200 Self-Propelled Combine",
    category: "combine",
    image: img8200,
    specs: [
      { label: "Engine Power", value: "101 HP" },
      { label: "Cutter Bar Width", value: "4.3 m (14 ft)" },
      { label: "Threshing System", value: "Tangential Axial Flow" },
      { label: "Discharge", value: "Hydraulic Swing Auger" },
    ],
    description: "Heavy-duty self-propelled combine with a Smart Harvesting Algorithm that dynamically regulates cutting speed based on crop density.",
    features: [
      "Smart Harvesting Algorithm for variable density crops",
      "High-lug mud-terrain tires for wet paddy fields",
      "Ergonomic cabin with canopy & night work lights",
    ],
  },
  {
    name: "Gyrovator ZLX",
    category: "basic",
    image: imgGyrovatorZLX,
    specs: [
      { label: "Working Depth", value: "150–200 mm" },
      { label: "Blade Type", value: "Boron Steel L-Type" },
      { label: "Drive System", value: "Oil-Bath Side Gear" },
      { label: "Blade Options", value: "36 / 42 / 48 blades" },
    ],
    description: "Heavy-duty rotavator with oil-bath side gear drive for deep soil inversion and wet land puddling.",
    features: ["Multi-speed gearbox", "Spring-loaded rear trailing board", "Sealed bearing blocks"],
  },
  {
    name: "Gyrovator SLX",
    category: "basic",
    image: imgGyrovatorSLX,
    specs: [
      { label: "Working Depth", value: "150–200 mm" },
      { label: "Blade Type", value: "Boron Steel L-Type" },
      { label: "Drive System", value: "Oil-Bath Side Gear" },
    ],
    description: "Robust rotavator for thorough soil preparation across diverse field conditions with multi-speed rotor adjustment.",
    features: ["Spring-loaded rear trailing board", "Sealed bearing blocks for wet conditions"],
  },
  {
    name: "Duravator SLX Plus",
    category: "basic",
    image: imgDuravatorSLX,
    specs: [
      { label: "Blade Type", value: "Boron Steel L-Type" },
      { label: "Drive System", value: "Oil-Bath Side Gear" },
    ],
    description: "Enhanced Duravator with reinforced build for intensive cultivation in heavy and water-logged soils.",
    features: ["Heavy-duty gearbox", "Sealed bearing blocks"],
  },
  {
    name: "MB Plough 2-Bottom",
    category: "basic",
    image: imgMBPlough2,
    description: "2-bottom mouldboard plough with large curved steel blades that deeply invert the topsoil, burying weeds and surfacing fresh nutrients.",
  },
  {
    name: "MB Plough 3-Bottom",
    category: "basic",
    image: imgMBPlough3,
    description: "3-bottom mouldboard plough for faster coverage — inverts more soil per pass, ideal for large-scale primary tillage.",
  },
  {
    name: "Disc Plough 2-Bottom",
    category: "basic",
    image: imgDiscPlough2,
    description: "2-bottom disc plough with heavy concave steel discs that slice through unbroken ground and chop crop residue into the soil.",
  },
  {
    name: "Disc Plough 3-Bottom",
    category: "basic",
    image: imgDiscPlough3,
    description: "3-bottom disc plough for higher throughput on hard soils — handles thick unbroken ground efficiently.",
  },
  {
    name: "Disc Harrow",
    category: "basic",
    image: imgDiscHarrow,
    description: "Concave disc harrow that chops and mixes crop residue into the soil and pulverises large clods after primary tillage.",
  },
  {
    name: "Spring Loaded Cultivator",
    category: "basic",
    image: imgCultivator,
    description: "Wide-frame cultivator with spring-supported tynes that break up hard soil clods and uproot weeds — springs protect against hidden rock damage.",
  },
  {
    name: "Seed Drill",
    category: "basic",
    image: imgSeedDrill,
    description: "Drops seeds evenly into prepared soil at controlled depths for consistent germination across the field.",
  },
  {
    name: "Multicrop Thresher",
    category: "basic",
    image: imgThresher,
    description: "Stationary PTO-powered machine that separates grains from chaff and stalks after manual or combine harvest.",
  },
  {
    name: "Fertilizer Spreader",
    category: "basic",
    image: imgFertSpreader,
    description: "Tractor-mounted spreader for broadcasting fertilizer evenly across fields in a single pass.",
  },
  {
    name: "Shredder",
    category: "basic",
    image: imgShredder,
    description: "Tractor-mounted shredder that chops heavy crop residue back into the soil, improving organic matter and reducing stubble burning.",
  },
  {
    name: "Trailer",
    category: "basic",
    image: imgTrailer,
    description: "Heavy-duty haulage trolley for transporting harvested crops, farm inputs, and other loads.",
  },
  {
    name: "Swaraj 22 P Dewulf Potato Planter",
    category: "special",
    image: imgPotatoPlanter,
    specs: [
      { label: "Row Config", value: "2-Row Concurrent" },
      { label: "Hopper", value: "240–300 kg" },
      { label: "Metering", value: "Cup-Type Seed Wheel" },
      { label: "Tasks", value: "Furrow + Seed + Fertilizer + Ridge" },
    ],
    description: "Automated 2-row potato planter that simultaneously opens furrows, sows seed, places fertilizer, and forms ridges in a single pass.",
    features: [
      "Uniform potato placement — no gaps or double drops",
      "Parallelogram-guided furrow openers for constant depth on slopes",
    ],
  },
  {
    name: "Square Baler SQ180",
    category: "special",
    image: imgSquareBaler,
    specs: [
      { label: "Pickup Width", value: "1.8 m" },
      { label: "Knotters", value: "Dual Heavy Knotters" },
      { label: "Lubrication", value: "Auto on knotter loops" },
    ],
    description: "Compresses loose straw or hay into dense, tied square bales continuously without stopping the tractor line.",
    features: ["High-density compressing plunger chamber", "Auto-lube knotter — no manual stops"],
  },
  {
    name: "Round Baler",
    category: "special",
    image: imgRoundBaler,
    specs: [
      { label: "Pickup Width", value: "1.8 m" },
      { label: "Tynes", value: "Spring Steel" },
    ],
    description: "Forms dense round bales of straw or hay directly in the field for easy handling and storage.",
    features: ["Continuous baling operation", "Spring steel pickup tynes"],
  },
  {
    name: "Straw Reaper",
    category: "special",
    image: imgStrawReaper,
    description: "Cuts, threshes, and cleans residual straw stalks left after a combine harvester — converts field waste into usable fodder via an output pipe.",
  },
];

const filters = [
  { key: "all", label: "All" },
  { key: "combine", label: "Combine Harvesters" },
  { key: "basic", label: "Basic Implements" },
  { key: "special", label: "Special Purpose" },
];

export function FarmMachinery() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState("Any item");

  const handleEnquire = (name: string) => {
    setSelectedItem(name);
    document.getElementById("machinery-enquiry")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="farm-machinery" className="py-20 md:py-28 bg-muted/30">
      <div className="container-page">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-[0.2em] text-amber-brand font-semibold mb-3">Farm Machinery</div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            Implements for every <span className="text-primary">stage of farming.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            From land preparation to post-harvest — combine harvesters, rotavators, ploughs, balers, and more.
          </p>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className="px-4 py-2 rounded-full text-sm font-semibold border-2 transition-colors"
              style={{
                background: activeFilter === f.key ? "#1E6B3F" : "white",
                color: activeFilter === f.key ? "white" : "var(--foreground)",
                borderColor: activeFilter === f.key ? "#1E6B3F" : "var(--color-border)",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-12">
          {(activeFilter === "all" || activeFilter === "combine") && (
            <MachineryGroup
              title="Combine Harvesters"
              items={machineryItems.filter(m => m.category === "combine")}
              onEnquire={handleEnquire}
            />
          )}
          {(activeFilter === "all" || activeFilter === "basic") && (
            <MachineryGroup
              title="Basic Implements"
              items={machineryItems.filter(m => m.category === "basic")}
              onEnquire={handleEnquire}
            />
          )}
          {(activeFilter === "all" || activeFilter === "special") && (
            <MachineryGroup
              title="Special Purpose Implements"
              items={machineryItems.filter(m => m.category === "special")}
              onEnquire={handleEnquire}
            />
          )}
        </div>

        {/* Inline enquiry form */}
        <MachineryEnquiryForm
          items={machineryItems}
          selectedItem={selectedItem}
          onItemChange={setSelectedItem}
        />
      </div>
    </section>
  );
}

function MachineryGroup({ title, items, onEnquire }: { title: string; items: MachineryItem[]; onEnquire: (name: string) => void }) {
  if (!items.length) return null;
  return (
    <div>
      <h3 className="font-display font-bold text-xl text-foreground mb-5 flex items-center gap-3">
        <span className="h-1 w-6 bg-[#1E6B3F] rounded-full" />
        {title}
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {items.map(item => (
          <MachineryCard key={item.name} item={item} onEnquire={() => onEnquire(item.name)} />
        ))}
      </div>
    </div>
  );
}

function MachineryCard({ item, onEnquire }: { item: MachineryItem; onEnquire: () => void }) {
  return (
    <div className="group bg-card border-2 border-border rounded-2xl overflow-hidden hover:border-[#1E6B3F]/40 hover:-translate-y-1 hover:shadow-elevated transition-all flex flex-col">
      {item.image ? (
        <div className="aspect-[4/3] bg-muted overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
          <Wrench className="h-12 w-12 text-muted-foreground/30" />
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        <h4 className="font-display font-bold text-base text-foreground leading-snug mb-3">{item.name}</h4>

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

function MachineryEnquiryForm({
  items,
  selectedItem,
  onItemChange,
}: {
  items: MachineryItem[];
  selectedItem: string;
  onItemChange: (v: string) => void;
}) {
  const [form, setForm] = useState({ name: "", phone: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      onItemChange("Any item");
      setTimeout(() => setStatus("idle"), 3500);
    } catch {
      toast.error("Failed to send request. Please try again.");
      setStatus("idle");
    }
  };

  return (
    <div id="machinery-enquiry" className="mt-16 bg-gradient-to-br from-[#0d2b1a] to-[#1a4029] rounded-3xl p-8 md:p-12 text-white">
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-display font-bold">Enquire about machinery</h3>
        <p className="mt-2 text-white/60">Get pricing, availability, and demo details in one call.</p>
      </div>
      <form onSubmit={onSubmit} className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
        <input
          required
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          placeholder="Your name *"
          disabled={status === "sending"}
          className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm placeholder:text-white/40 focus:outline-none focus:border-[#4ade80] disabled:opacity-50"
        />
        <input
          required
          type="tel"
          value={form.phone}
          onChange={e => setForm({ ...form, phone: e.target.value })}
          placeholder="Phone *"
          disabled={status === "sending"}
          className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm placeholder:text-white/40 focus:outline-none focus:border-[#4ade80] disabled:opacity-50"
        />
        <select
          value={selectedItem}
          onChange={e => onItemChange(e.target.value)}
          disabled={status === "sending"}
          className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#4ade80] disabled:opacity-50"
        >
          <option className="text-foreground">Any item</option>
          {items.map(m => (
            <option key={m.name} className="text-foreground">{m.name}</option>
          ))}
        </select>
        <button
          type="submit"
          disabled={status === "sending" || status === "sent"}
          className="md:col-span-3 inline-flex items-center justify-center gap-2 bg-[#1E6B3F] hover:opacity-90 text-white px-6 py-3.5 rounded-full font-semibold text-sm transition-opacity disabled:opacity-70"
        >
          {status === "sending"
            ? "Sending..."
            : status === "sent"
            ? <><Check className="h-4 w-4" /> Request Sent</>
            : <>Send Enquiry <Send className="h-4 w-4" /></>}
        </button>
      </form>
    </div>
  );
}
