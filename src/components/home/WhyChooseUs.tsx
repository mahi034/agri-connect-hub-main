import { useState } from "react";
import { ShieldCheck, Wrench, Award, Sprout, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import img735FE from "@/assets/swaraj-735fe.png";
import img963FE from "@/assets/swaraj-963fe.png";
import img8200 from "@/assets/swaraj-8200.png";
import img744FE from "@/assets/swaraj-744fe.png";
import img855FE from "@/assets/swaraj-855fe.png";
import imgGyrovator from "@/assets/gyrovator-zlx.png";

const usps = [
  { icon: Award, title: "Authorized Dealer", desc: "Genuine products, factory warranty, verified pricing." },
  { icon: ShieldCheck, title: "Transparent Pricing", desc: "Honest on-paper quotes. Zero hidden charges." },
  { icon: Wrench, title: "Service-First", desc: "Trained technicians and original spare parts." },
  { icon: Sprout, title: "Agronomy Support", desc: "Crop & machinery advisory from farming experts." },
];

const testimonials = [
  {
    quote: "Bought my Swaraj 735 FE through Cropmak. Service was spotless and they helped with the loan paperwork too.",
    name: "Ravi Kumar",
    location: "Farmer · Proddatur, AP",
    product: "Swaraj 735 FE",
    image: img735FE,
  },
  {
    quote: "The 744 FE handles our 25-acre paddy field without any trouble. Cropmak gave us the best price and delivered on time.",
    name: "Suresh Reddy",
    location: "Farmer · Kallur, AP",
    product: "Swaraj 744 FE",
    image: img744FE,
  },
  {
    quote: "We use the Swaraj 8200 combine every harvest season. It cuts, threshes and cleans in one go — saves us at least 10 days of labour.",
    name: "Venkata Rao",
    location: "Farmer · Gopawaram, AP",
    product: "Swaraj 8200 Combine",
    image: img8200,
  },
  {
    quote: "963 FE is a beast for heavy transport and deep ploughing. Cropmak's after-sales team is always just a call away.",
    name: "Narayan Reddy",
    location: "Farmer · Modameedipalle, AP",
    product: "Swaraj 963 FE",
    image: img963FE,
  },
  {
    quote: "The Gyrovator ZLX attached to my 735 FE pulverises our black cotton soil perfectly. Seedbed is ready in half the time.",
    name: "Krishna Murthy",
    location: "Farmer · Chowdur, AP",
    product: "Gyrovator ZLX",
    image: imgGyrovator,
  },
  {
    quote: "855 FE 4WD never gets stuck even in waterlogged fields during the kharif season. Worth every rupee.",
    name: "Ramesh Babu",
    location: "Farmer · Proddatur, AP",
    product: "Swaraj 855 FE 4WD",
    image: img855FE,
  },
];

function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex(i => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex(i => (i + 1) % testimonials.length);

  // Show 3 cards on large, 2 on medium, 1 on small
  const visible = [
    testimonials[index % testimonials.length],
    testimonials[(index + 1) % testimonials.length],
    testimonials[(index + 2) % testimonials.length],
  ];

  return (
    <>
    <div className="relative flex items-center gap-3">
      {/* Left arrow */}
      <button
        onClick={prev}
        className="shrink-0 h-10 w-10 rounded-full border-2 border-border bg-card hover:border-primary hover:text-primary flex items-center justify-center transition-colors"
        aria-label="Previous"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Cards */}
      <div className="flex-1 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {visible.map((t, i) => (
          <div
            key={`${t.name}-${index}-${i}`}
            className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col"
          >
            <div className="h-36 bg-muted/40">
              <img src={t.image} alt={t.product} loading="lazy" className="w-full h-full object-contain p-4" />
            </div>
            <div className="p-5 flex flex-col flex-1">
              <Quote className="h-5 w-5 text-primary/30 mb-2 shrink-0" />
              <p className="text-sm text-foreground/80 leading-relaxed flex-1">"{t.quote}"</p>
              <div className="mt-4 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary-soft text-primary flex items-center justify-center font-bold text-sm shrink-0">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.location}</div>
                  </div>
                </div>
                <span className="text-[10px] bg-primary-soft text-primary rounded-full px-2.5 py-1 font-medium shrink-0 text-right">
                  {t.product}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right arrow */}
      <button
        onClick={next}
        className="shrink-0 h-10 w-10 rounded-full border-2 border-border bg-card hover:border-primary hover:text-primary flex items-center justify-center transition-colors"
        aria-label="Next"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>

    {/* Dot indicators */}
    <div className="flex items-center justify-center gap-2 mt-6">
      {testimonials.map((_, i) => (
        <button
          key={i}
          onClick={() => setIndex(i)}
          className="h-2 rounded-full transition-all"
          style={{
            width: i === index ? "1.5rem" : "0.5rem",
            background: i === index ? "var(--color-primary)" : "var(--color-border)",
          }}
          aria-label={`Go to ${i + 1}`}
        />
      ))}
    </div>
    </>
  );
}

export function WhyChooseUs() {
  return (
    <section id="why" className="py-8 md:py-10 bg-primary-soft/40">
      <div className="container-page">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-[0.2em] text-amber-brand font-semibold mb-3">Why Cropmak</div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            Built for farmers. <span className="text-primary">Trusted across India.</span>
          </h2>
        </div>

        {/* USP cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {usps.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/40 hover:shadow-soft transition-all">
              <div className="h-12 w-12 rounded-xl bg-primary-soft text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-lg mb-1.5 text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-10">
          <div className="text-xs uppercase tracking-[0.2em] text-amber-brand font-semibold mb-3">Customer Stories</div>
          <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground">
            What farmers say about us
          </h2>
        </div>

        <TestimonialCarousel />
      </div>
    </section>
  );
}
