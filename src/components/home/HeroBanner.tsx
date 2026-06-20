import { useEffect, useRef } from "react";
import heroVideo from "@/assets/hero-agri.mp4";
import heroImg from "@/assets/swaraj-tractor.jpg";

export function HeroBanner() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // React doesn't reliably set the `muted` property on the DOM node,
    // and iOS Safari only autoplays videos it considers muted. Set it
    // imperatively and kick off playback to cover browsers that ignore
    // the autoPlay attribute (notably iOS).
    video.muted = true;
    video.defaultMuted = true;

    const tryPlay = () => {
      const p = video.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          // Autoplay was blocked (e.g. iOS Low Power Mode) — poster stays visible.
        });
      }
    };

    if (video.readyState >= 2) {
      tryPlay();
    } else {
      video.addEventListener("loadeddata", tryPlay, { once: true });
    }

    return () => video.removeEventListener("loadeddata", tryPlay);
  }, []);

  return (
    <section className="relative overflow-hidden text-white min-h-[640px] md:min-h-[720px] flex items-center">
      {/* Background video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={heroImg}
        className="absolute inset-0 w-full h-full object-cover object-center"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#071C0E]/60 via-[#071C0E]/15 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#071C0E]/25 via-transparent to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-background to-transparent" />

      <div className="container-page relative z-10 py-20 md:py-28">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur text-xs font-medium mb-6">
          <span className="h-2 w-2 rounded-full bg-[#6EE7A0] animate-pulse" />
          Authorized Swaraj Dealer — Andhra Pradesh
        </div>

        <h1 className="font-display font-extrabold text-[clamp(2.5rem,5.5vw,4.75rem)] leading-[1.04] tracking-tight">
          Powering Progress.
          <br />
          <span className="text-lime-gradient">Cultivating Tomorrow.</span>
        </h1>

        <p className="mt-6 text-base md:text-lg text-white/85 max-w-xl leading-relaxed">
          Tractors and farm machinery — every solution your land deserves, from one trusted partner.
        </p>

        <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg">
          {[
            { n: "26+", l: "Tractor Models" },
            { n: "50 yr", l: "Brand Legacy" },
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
