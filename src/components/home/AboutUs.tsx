import { ShieldCheck, Users, MapPin, Tractor, Wrench, Award } from "lucide-react";
import fieldsImg from "@/assets/fields.jpg";

const highlights = [
  {
    icon: Award,
    title: "Authorized Swaraj Dealer",
    desc: "Certified by Mahindra & Mahindra to sell and service the full Swaraj tractor and farm machinery lineup.",
  },
  {
    icon: Tractor,
    title: "26+ Tractor Models",
    desc: "From 15 HP to 70 HP — compact orchard tractors to heavy-duty field machines, all under one roof.",
  },
  {
    icon: Wrench,
    title: "Complete Farm Machinery",
    desc: "Rotavators, ploughs, harvesters, balers, seed drills and more — everything from sowing to harvest.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Pricing",
    desc: "Honest on-paper quotes with zero hidden charges. We also help with bank loan and EMI paperwork.",
  },
  {
    icon: Users,
    title: "10,000+ Farmers Served",
    desc: "Over a decade of trust across Andhra Pradesh — from small landholders to large commercial farms.",
  },
  {
    icon: MapPin,
    title: "Andhra Pradesh Based",
    desc: "Locally rooted and farmer-first. Our team understands the soil, the crops and the seasons of this region.",
  },
];

export function AboutUs() {
  return (
    <section id="about" className="py-8 md:py-10">
      <div className="container-page">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-[0.2em] text-amber-brand font-semibold mb-3">About Cropmak</div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            Your trusted agri partner —{" "}
            <span className="text-primary">rooted in Andhra Pradesh.</span>
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Cropmak is an authorized Swaraj dealership serving farmers across Andhra Pradesh. We stock the complete range of Swaraj tractors and farm machinery, backed by trained technicians, genuine spare parts, and a service team that responds when you need it most.
          </p>
        </div>

        {/* Split — image + text */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-elevated">
            <img
              src={fieldsImg}
              alt="Green farmland — Cropmak dealer region"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071C0E]/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-medium">
                <span className="h-2 w-2 rounded-full bg-[#6EE7A0] animate-pulse" />
                Authorized Swaraj Dealer · Andhra Pradesh
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-4">
              More than a dealership — a farming partner.
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Founded on the belief that every farmer deserves access to the best machinery at an honest price, Cropmak has grown into one of the most trusted Swaraj dealerships in Andhra Pradesh. We don't just sell tractors — we guide farmers through model selection, financing, and after-sales support every step of the way.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Whether you're cultivating paddy, cotton, sugarcane or pulses, our team has the expertise to match you with the right tractor and implements for your land and crop cycle.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="bg-primary-soft rounded-xl px-4 py-3 text-center min-w-[90px]">
                <div className="text-2xl font-display font-bold text-primary">26+</div>
                <div className="text-xs text-muted-foreground mt-0.5">Models</div>
              </div>
              <div className="bg-primary-soft rounded-xl px-4 py-3 text-center min-w-[90px]">
                <div className="text-2xl font-display font-bold text-primary">50 yr</div>
                <div className="text-xs text-muted-foreground mt-0.5">Swaraj Legacy</div>
              </div>
              <div className="bg-primary-soft rounded-xl px-4 py-3 text-center min-w-[90px]">
                <div className="text-2xl font-display font-bold text-primary">10k+</div>
                <div className="text-xs text-muted-foreground mt-0.5">Farmers</div>
              </div>
              <div className="bg-primary-soft rounded-xl px-4 py-3 text-center min-w-[90px]">
                <div className="text-2xl font-display font-bold text-primary">15–70</div>
                <div className="text-xs text-muted-foreground mt-0.5">HP Range</div>
              </div>
            </div>
          </div>
        </div>

        {/* 6 highlight cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {highlights.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/40 hover:shadow-soft transition-all">
              <div className="h-11 w-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                <Icon className="h-5 w-5" />
              </div>
              <h4 className="font-display font-bold text-base text-foreground mb-1.5">{title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
