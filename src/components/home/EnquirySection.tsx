import { useState } from "react";
import { Send, Phone, Mail, MapPin, Check } from "lucide-react";
import { EMAIL, PHONE_DISPLAY, PHONE_TEL, gmailComposeUrl } from "@/lib/contact";

export function EnquirySection() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [form, setForm] = useState({ name: "", phone: "", interest: "Swaraj Tractors", message: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Open Gmail compose in a new tab with the enquiry pre-filled
    const body = `Name: ${form.name}\nPhone: ${form.phone}\nInterest: ${form.interest}\n\n${form.message}`;
    window.open(
      gmailComposeUrl({ subject: `Cropmak Enquiry — ${form.interest}`, body }),
      "_blank",
      "noopener,noreferrer",
    );
    setStatus("sent");
    setTimeout(() => setStatus("idle"), 3500);
  };

  return (
    <section id="enquiry" className="py-20 md:py-28">
      <div className="container-page grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2">
          <div className="text-xs uppercase tracking-[0.2em] text-amber-brand font-semibold mb-3">Get in Touch</div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Talk to a Cropmak expert.
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Tractor demos, irrigation surveys, finance options — we respond within one working hour.
          </p>

          <div className="space-y-3">
            <ContactRow icon={Phone} label="Call us" value={PHONE_DISPLAY} href={`tel:${PHONE_TEL}`} />
            <ContactRow icon={Mail} label="Email (opens Gmail)" value={EMAIL} href={gmailComposeUrl()} external />
            <ContactRow icon={MapPin} label="Visit" value="Cropmak Hub, India" href="#" />
          </div>
        </div>

        <div className="lg:col-span-3">
          <form onSubmit={onSubmit} className="bg-card rounded-2xl border border-border p-7 md:p-9 shadow-soft">
            <h3 className="font-display font-bold text-xl mb-1">Send us an enquiry</h3>
            <p className="text-sm text-muted-foreground mb-6">Submitting opens Gmail with your message pre-filled.</p>

            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Full Name *" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Your name" />
              <Field label="Phone *" required type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="+91 ..." />
              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Interest</label>
                <select
                  value={form.interest}
                  onChange={(e) => setForm({ ...form, interest: e.target.value })}
                  className="bg-background border border-border rounded-lg px-3.5 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                >
                  <option>Swaraj Tractors</option>
                  <option>Implements</option>
                  <option>Irrigation</option>
                  <option>Farm Finance</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 mt-4">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={4}
                placeholder="Tell us about your farm and what you're looking for..."
                className="bg-background border border-border rounded-lg px-3.5 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
              />
            </div>

            <button
              type="submit"
              className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-mid text-primary-foreground px-7 py-3.5 rounded-full font-semibold text-sm transition-colors shadow-soft"
            >
              {status === "sent" ? (<><Check className="h-4 w-4" /> Gmail opened — hit send to deliver</>) : (<>Send via Gmail <Send className="h-4 w-4" /></>)}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon: Icon, label, value, href, external }: { icon: typeof Phone; label: string; value: string; href: string; external?: boolean }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-soft transition-all"
    >
      <div className="h-11 w-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center shrink-0">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <div className="text-xs text-muted-foreground uppercase tracking-wider">{label}</div>
        <div className="font-semibold text-foreground truncate">{value}</div>
      </div>
    </a>
  );
}

function Field({ label, value, onChange, ...props }: { label: string; value: string; onChange: (v: string) => void } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <input
        {...props}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-background border border-border rounded-lg px-3.5 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
      />
    </div>
  );
}
