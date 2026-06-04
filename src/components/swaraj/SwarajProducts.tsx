import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Star, Flame, TrendingUp, Send, Check, Gauge, Cog, Fuel } from "lucide-react";
import swarajImg from "@/assets/swaraj-tractor.jpg";
import { EMAIL, gmailComposeUrl } from "@/lib/contact";

type Model = {
  name: string;
  hp: number;
  range: "15" | "20-30" | "31-40" | "41-50" | "61-70";
  cc: number;
  torque: string;
  lift: string;
  gears: string;
  tag?: "best" | "top" | "popular";
};

const models: Model[] = [
  { name: "Swaraj 717", hp: 15, range: "15", cc: 825, torque: "32 Nm", lift: "780 kg", gears: "6F + 3R" },
  { name: "Swaraj 724 XM", hp: 25, range: "20-30", cc: 1118, torque: "85 Nm", lift: "1000 kg", gears: "8F + 2R" },
  { name: "Swaraj 825 XM", hp: 28, range: "20-30", cc: 1396, torque: "90 Nm", lift: "1000 kg", gears: "8F + 2R" },
  { name: "Swaraj Target 630 4WD", hp: 30, range: "20-30", cc: 1318, torque: "94 Nm", lift: "1200 kg", gears: "9F + 3R", tag: "popular" },
  { name: "Swaraj 733 FE", hp: 34, range: "31-40", cc: 2354, torque: "120 Nm", lift: "1500 kg", gears: "8F + 2R" },
  { name: "Swaraj 735 FE", hp: 39, range: "31-40", cc: 2734, torque: "139 Nm", lift: "1700 kg", gears: "8F + 2R", tag: "best" },
  { name: "Swaraj 834 XM", hp: 36, range: "31-40", cc: 2272, torque: "118 Nm", lift: "1500 kg", gears: "8F + 2R" },
  { name: "Swaraj 742 XT", hp: 42, range: "41-50", cc: 2734, torque: "157 Nm", lift: "1700 kg", gears: "8F + 2R" },
  { name: "Swaraj 843 XM", hp: 45, range: "41-50", cc: 2734, torque: "164 Nm", lift: "1700 kg", gears: "8F + 2R" },
  { name: "Swaraj 744 FE", hp: 48, range: "41-50", cc: 2734, torque: "175 Nm", lift: "1800 kg", gears: "8F + 2R" },
  { name: "Swaraj 855 FE", hp: 50, range: "41-50", cc: 3136, torque: "192 Nm", lift: "1700 kg", gears: "8F + 2R", tag: "top" },
  { name: "Swaraj 963 FE", hp: 65, range: "61-70", cc: 3478, torque: "230 Nm", lift: "2000 kg", gears: "8F + 2R" },
  { name: "Swaraj 969 FE", hp: 70, range: "61-70", cc: 3478, torque: "245 Nm", lift: "2000 kg", gears: "8F + 2R" },
];

const filters = [
  { key: "all", label: "All Models" },
  { key: "15", label: "15 HP" },
  { key: "20-30", label: "20–30 HP" },
  { key: "31-40", label: "31–40 HP" },
  { key: "41-50", label: "41–50 HP" },
  { key: "61-70", label: "61–70 HP" },
];

export function SwarajProducts() {
  const [filter, setFilter] = useState<string>("all");
  const filtered = useMemo(() => filter === "all" ? models : models.filter(m => m.range === filter), [filter]);

  return (
    <>
      {/* Brand hero */}
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
                  { n: "13+", l: "Models" },
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
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-elevated">
                <img src={swarajImg} alt="Swaraj Tractor" width={1400} height={1000} className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <section className="sticky top-[105px] z-30 bg-background/95 backdrop-blur border-b border-border">
        <div className="container-page py-4 flex gap-2 overflow-x-auto">
          {filters.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className="shrink-0 px-4 py-2 rounded-full text-sm font-semibold border-2 transition-colors"
                style={{
                  background: active ? "var(--swaraj)" : "white",
                  color: active ? "white" : "var(--foreground)",
                  borderColor: active ? "var(--swaraj)" : "var(--color-border)",
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Models grid */}
      <section className="py-12 md:py-16">
        <div className="container-page grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((m) => <ModelCard key={m.name} model={m} />)}
        </div>
      </section>

      <CallbackForm models={models} />
    </>
  );
}

function ModelCard({ model }: { model: Model }) {
  const tagMap = {
    best: { label: "Best Seller", icon: Flame, color: "var(--swaraj)" },
    top: { label: "Top Pick", icon: Star, color: "#C97A0A" },
    popular: { label: "Popular", icon: TrendingUp, color: "#1E6B3F" },
  };
  const tag = model.tag ? tagMap[model.tag] : null;

  const enquireUrl = gmailComposeUrl({
    to: EMAIL,
    subject: `Enquiry for ${model.name}`,
    body: `Hi Cropmak,\n\nI'd like more info on the ${model.name} (${model.hp} HP).\n\nName:\nPhone:\nLocation:\n\nThanks.`,
  });

  return (
    <div className="group relative bg-card border-2 border-border rounded-2xl p-6 hover:border-swaraj/40 hover:-translate-y-1 hover:shadow-elevated transition-all">
      {tag && (
        <div className="absolute -top-3 right-5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold text-white shadow-md" style={{ background: tag.color }}>
          <tag.icon className="h-3 w-3" /> {tag.label}
        </div>
      )}

      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Swaraj</div>
          <h3 className="font-display font-bold text-xl text-foreground mt-1">{model.name.replace("Swaraj ", "")}</h3>
        </div>
        <div className="text-right">
          <div className="text-3xl font-display font-extrabold text-swaraj leading-none">{model.hp}</div>
          <div className="text-xs text-muted-foreground mt-1">HP</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 mb-5">
        <Spec icon={Cog} label="Engine" value={`${model.cc} CC`} />
        <Spec icon={Gauge} label="Torque" value={model.torque} />
        <Spec icon={Fuel} label="Lift" value={model.lift} />
        <Spec icon={Cog} label="Gears" value={model.gears} />
      </div>

      <a
        href={enquireUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center bg-foreground text-background hover:bg-swaraj py-2.5 rounded-full text-sm font-semibold transition-colors"
      >
        Enquire via Gmail
      </a>
    </div>
  );
}

function Spec({ icon: Icon, label, value }: { icon: typeof Cog; label: string; value: string }) {
  return (
    <div className="bg-muted/60 rounded-lg p-2.5">
      <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3 w-3" /> {label}
      </div>
      <div className="font-semibold text-sm text-foreground mt-0.5">{value}</div>
    </div>
  );
}

function CallbackForm({ models }: { models: Model[] }) {
  const [form, setForm] = useState({ name: "", phone: "", model: "Any model" });
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Name: ${form.name}\nPhone: ${form.phone}\nModel: ${form.model}\n\nPlease call me back.`;
    window.open(
      gmailComposeUrl({ subject: `Swaraj Callback Request — ${form.model}`, body }),
      "_blank",
      "noopener,noreferrer",
    );
    setSent(true);
    setTimeout(() => setSent(false), 3500);
  };

  return (
    <section id="callback" className="py-16 bg-gradient-to-br from-[#0A0E14] to-[#1a0608] text-white">
      <div className="container-page max-w-3xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold">Request a callback</h2>
          <p className="mt-3 text-white/60">Pricing, demo bookings, finance & EMI — sorted in one call.</p>
        </div>
        <form onSubmit={onSubmit} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 md:p-8 grid md:grid-cols-3 gap-4">
          <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name *" className="bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-sm placeholder:text-white/40 focus:outline-none focus:border-swaraj" />
          <input required type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Phone *" className="bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-sm placeholder:text-white/40 focus:outline-none focus:border-swaraj" />
          <select value={form.model} onChange={e => setForm({ ...form, model: e.target.value })} className="bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-swaraj">
            <option className="text-foreground">Any model</option>
            {models.map(m => <option key={m.name} className="text-foreground">{m.name}</option>)}
          </select>
          <button
            type="submit"
            className="md:col-span-3 inline-flex items-center justify-center gap-2 bg-swaraj hover:opacity-90 text-white px-6 py-3.5 rounded-full font-semibold text-sm transition-opacity"
          >
            {sent ? (<><Check className="h-4 w-4" /> Gmail opened — hit send to deliver</>) : (<>Send Request via Gmail <Send className="h-4 w-4" /></>)}
          </button>
        </form>
      </div>
    </section>
  );
}
