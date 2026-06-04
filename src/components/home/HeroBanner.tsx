import { ArrowRight, PlayCircle } from "lucide-react";
import heroImg from "@/assets/hero-tractor.jpg";

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden text-white min-h-[640px] md:min-h-[720px] flex items-center">
      {/* Background image */}
      <img
        src={heroImg}
        alt="Tractor in green farmland at golden hour"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Gradient overlays for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#071C0E]/95 via-[#071C0E]/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#071C0E]/80 via-transparent to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-background to-transparent" />

      <div className="container-page relative z-10 py-20 md:py-28">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur text-xs font-medium mb-6">
          <span className="h-2 w-2 rounded-full bg-[#6EE7A0] animate-pulse" />
          Authorized Multi-Brand Agri Dealer
        </div>

        <h1 className="font-display font-extrabold text-[clamp(2.5rem,5.5vw,4.75rem)] leading-[1.04] tracking-tight">
          Powering Progress.
          <br />
          <span className="text-lime-gradient">Cultivating Tomorrow.</span>
        </h1>

        <p className="mt-6 text-base md:text-lg text-white/85 max-w-xl leading-relaxed">
          Tractors, implements, irrigation and farm finance — every solution your land deserves, from one trusted partner.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="/swaraj"
            className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3.5 rounded-full font-semibold text-sm hover:bg-[#A7F3C4] transition-colors shadow-elevated"
          >
            Explore Tractors <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#enquiry"
            className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3.5 rounded-full font-semibold text-sm hover:bg-white/10 transition-colors backdrop-blur"
          >
            <PlayCircle className="h-4 w-4" /> Book a Test Drive
          </a>
        </div>

        <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg">
          {[
            { n: "13+", l: "Tractor Models" },
            { n: "50yr", l: "Brand Legacy" },
            { n: "10k+", l: "Happy Farmers" },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-3xl md:text-4xl font-display font-bold text-[#A7F3C4]">{s.n}</div>
              <div className="text-xs text-white/70 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
