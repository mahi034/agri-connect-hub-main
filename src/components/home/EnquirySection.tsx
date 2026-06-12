import { useState } from "react";
import { Send, Phone, Mail, MapPin, Check, Loader2, AlertCircle } from "lucide-react";
import { EMAIL, PHONE_DISPLAY, PHONE_TEL, gmailComposeUrl } from "@/lib/contact";
import { sendEnquiryEmail } from "@/lib/api/email.functions";
import { toast } from "sonner";

export function EnquirySection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({ name: "", phone: "", interest: "Swaraj Tractors", message: "" });
  const [touched, setTouched] = useState({ name: false, phone: false });

  const nameError = touched.name && !form.name.trim() ? "Full name is required" : null;
  const phoneError = touched.phone && (
    form.phone.length === 0 ? "Phone number is required" :
    form.phone.length < 10 ? "Enter a valid 10-digit mobile number" : null
  );

  const touch = (field: keyof typeof touched) => setTouched(t => ({ ...t, [field]: true }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, phone: true });
    if (!form.name.trim() || form.phone.length < 10) return;
    setStatus("sending");

    try {
      await sendEnquiryEmail({ data: form });
      setStatus("sent");
      toast.success("Our team will contact you shortly", { duration: 3000 });
      setForm({ name: "", phone: "", interest: "Swaraj Tractors", message: "" });
      setTouched({ name: false, phone: false });
      setTimeout(() => setStatus("idle"), 3500);
    } catch (error) {
      console.error("Failed to send email:", error);
      toast.error("Failed to send enquiry. Please try again.");
      setStatus("idle");
    }
  };

  return (
    <section id="enquiry" className="py-8 md:py-10">
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
            <ContactRow icon={Mail} label="Email" value={EMAIL} href={gmailComposeUrl()} external />
            <ContactRow icon={MapPin} label="Visit" value="Cropmak Hub, India" href="#" />
          </div>
        </div>

        <div className="lg:col-span-3">
          <form onSubmit={onSubmit} className="bg-card rounded-2xl border border-border p-7 md:p-9 shadow-soft">
            <h3 className="font-display font-bold text-xl mb-1">Send us an enquiry</h3>
            <p className="text-sm text-muted-foreground mb-6">We will get back to you as soon as possible.</p>

            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Full Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} onBlur={() => touch("name")} error={nameError} placeholder="Your name" disabled={status === "sending"} />
              <PhoneField label="Phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} onBlur={() => touch("phone")} error={phoneError || null} disabled={status === "sending"} />
              <div className="md:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Interest</label>
                <select
                  value={form.interest}
                  onChange={(e) => setForm({ ...form, interest: e.target.value })}
                  disabled={status === "sending"}
                  className="bg-background border border-border rounded-lg px-3.5 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 disabled:opacity-50"
                >
                  <option>Swaraj Tractors</option>
                  <option>Farm Machinery</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 mt-4">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={4}
                disabled={status === "sending"}
                placeholder="Tell us about your farm and what you're looking for..."
                className="bg-background border border-border rounded-lg px-3.5 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-mid text-primary-foreground px-7 py-3.5 rounded-full font-semibold text-sm transition-colors shadow-soft disabled:opacity-70"
            >
              {status === "sending" ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>
              ) : status === "sent" ? (
                <><Check className="h-4 w-4" /> Enquiry Sent</>
              ) : (
                <>Send Enquiry <Send className="h-4 w-4" /></>
              )}
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

function FieldError({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-1.5 mt-1 text-red-500">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
      <span className="text-xs font-medium">{message}</span>
    </div>
  );
}

function Field({ label, value, onChange, error, onBlur, ...props }: { label: string; value: string; onChange: (v: string) => void; error?: string | null; onBlur?: () => void } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "onBlur">) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label} <span className="text-red-400">*</span>
      </label>
      <input
        {...props}
        value={value}
        onBlur={onBlur}
        onChange={(e) => onChange(e.target.value)}
        className={`bg-background border rounded-lg px-3.5 py-3 text-sm focus:outline-none focus:ring-2 disabled:opacity-50 transition-colors ${
          error
            ? "border-red-400 bg-red-50/40 focus:border-red-400 focus:ring-red-400/15"
            : "border-border focus:border-primary focus:ring-primary/15"
        }`}
      />
      {error && <FieldError message={error} />}
    </div>
  );
}

function PhoneField({ label, value, onChange, onBlur, error, disabled }: { label: string; value: string; onChange: (v: string) => void; onBlur?: () => void; error: string | null; disabled?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label} <span className="text-red-400">*</span>
      </label>
      <input
        type="tel"
        inputMode="numeric"
        value={value}
        maxLength={10}
        placeholder="10-digit mobile number"
        disabled={disabled}
        onBlur={onBlur}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 10))}
        className={`bg-background border rounded-lg px-3.5 py-3 text-sm focus:outline-none focus:ring-2 disabled:opacity-50 transition-colors ${
          error
            ? "border-red-400 bg-red-50/40 focus:border-red-400 focus:ring-red-400/15"
            : "border-border focus:border-primary focus:ring-primary/15"
        }`}
      />
      {error && <FieldError message={error} />}
    </div>
  );
}
