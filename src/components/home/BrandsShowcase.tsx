import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import swarajImg from "@/assets/swaraj-963fe.png";
import machineryImg from "@/assets/swaraj-8200.png";

const sections = [
  {
    key: "tractors",
    badge: "Authorized Swaraj Dealer",
    sub: "Mahindra & Mahindra",
    title: "Swaraj Tractors",
    tagline: "Mera Swaraj.",
    bullets: [
      "26+ models from 15 HP to 70 HP",
      "Best-sellers: 735 FE, 744 FE & 855 FE",
      "50 years of trusted legacy",
      "Genuine pricing — no middlemen",
    ],
    cta: "View All Tractors",
    href: "/swaraj",
    image: swarajImg,
    accent: "#C8102E",
    imageContain: true,
  },
  {
    key: "machinery",
    badge: "Implements & Harvesters",
    sub: "Combines · Rotavators · Ploughs · Balers",
    title: "Farm Machinery",
    tagline: "For every stage of farming.",
    bullets: [
      "Swaraj 8200 Self-Propelled Combine (101 HP)",
      "Gyrovators, MB Ploughs & Disc Harrows",
      "Seed Drills, Threshers & Balers",
      "Special purpose: Potato Planter & Straw Reaper",
    ],
    cta: "View All Machinery",
    href: "/farm-machinery",
    image: machineryImg,
    accent: "#1E6B3F",
    imageContain: true,
  },
];

export function BrandsShowcase() {
  return (
    <section id="products" className="py-20 md:py-28">
      <div className="container-page">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-[0.2em] text-amber-brand font-semibold mb-3">Our Products</div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            Tractors & Farm Machinery —{" "}
            <span className="text-primary">all under one roof.</span>
          </h2>
        </div>

        <div className="space-y-8">
          {sections.map(s => (
            <div
              key={s.key}
              className="grid lg:grid-cols-5 rounded-3xl overflow-hidden bg-card border-2 shadow-elevated"
              style={{ borderColor: `${s.accent}30` }}
            >
              {/* Image */}
              <div className="lg:col-span-3 relative aspect-[4/3] lg:aspect-auto">
                <img
                  src={s.image}
                  alt={s.title}
                  className={`absolute inset-0 w-full h-full ${s.imageContain ? "object-contain p-6 bg-muted/30" : "object-cover"}`}
                  loading="lazy"
                />
                <div
                  className="absolute top-5 left-5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-bold text-white shadow-lg"
                  style={{ background: s.accent }}
                >
                  ★ {s.badge}
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-2 p-8 md:p-10 flex flex-col justify-center">
                <div className="text-xs text-muted-foreground uppercase tracking-wider">{s.sub}</div>
                <h3 className="font-display font-bold text-3xl md:text-4xl text-foreground mt-2">{s.title}</h3>
                <p className="mt-1 font-display font-semibold italic" style={{ color: s.accent }}>{s.tagline}</p>
                <ul className="mt-5 space-y-2.5">
                  {s.bullets.map(b => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: s.accent }} />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  to={s.href}
                  className="mt-8 inline-flex items-center gap-2 self-start px-6 py-3 rounded-full font-semibold text-sm text-white transition-transform hover:scale-105"
                  style={{ background: s.accent }}
                >
                  {s.cta} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
