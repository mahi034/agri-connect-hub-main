import { ShieldCheck, Wrench, Award, Sprout, Quote } from "lucide-react";
import farmerImg from "@/assets/farmer.jpg";

const usps = [
  { icon: Award, title: "Authorized Dealer", desc: "Genuine products, factory warranty, verified pricing." },
  { icon: ShieldCheck, title: "Transparent Pricing", desc: "Honest on-paper quotes. Zero hidden charges." },
  { icon: Wrench, title: "Service-First", desc: "Trained technicians and original spare parts." },
  { icon: Sprout, title: "Agronomy Support", desc: "Crop & machinery advisory from farming experts." },
];

export function WhyChooseUs() {
  return (
    <section id="why" className="py-20 md:py-28 bg-primary-soft/40">
      <div className="container-page">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-[0.2em] text-amber-brand font-semibold mb-3">Why Cropmak</div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            Built for farmers. <span className="text-primary">Trusted across India.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
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

        {/* Testimonial */}
        <div className="relative grid lg:grid-cols-5 rounded-3xl overflow-hidden bg-gradient-to-br from-primary to-primary-mid text-white">
          <div className="lg:col-span-2 aspect-[4/3] lg:aspect-auto">
            <img src={farmerImg} alt="Happy farmer" loading="lazy" className="w-full h-full object-cover" />
          </div>
          <div className="lg:col-span-3 p-8 md:p-12 flex flex-col justify-center relative">
            <Quote className="absolute top-6 right-6 h-20 w-20 text-white/10" />
            <p className="text-xl md:text-2xl font-display leading-relaxed relative">
              "Bought my Swaraj 735 FE through Cropmak. Service was spotless and they helped with the loan paperwork too."
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center font-bold">R</div>
              <div>
                <div className="font-semibold">Ravi Kumar</div>
                <div className="text-xs text-white/70">Farmer · Telangana</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
