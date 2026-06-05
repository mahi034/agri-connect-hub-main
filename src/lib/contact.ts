// All contact info is configured via .env (VITE_* vars are exposed to the browser)
// Update VITE_CONTACT_EMAIL, VITE_PHONE_DISPLAY, and VITE_PHONE_TEL in your .env file
export const EMAIL = import.meta.env.VITE_CONTACT_EMAIL ?? "info@cropmak.com";
export const PHONE_DISPLAY = import.meta.env.VITE_PHONE_DISPLAY ?? "+91 93923 65175";
export const PHONE_TEL = import.meta.env.VITE_PHONE_TEL ?? "+919392365175";

export function gmailComposeUrl(opts?: { subject?: string; body?: string; to?: string }) {
  const to = opts?.to ?? EMAIL;
  const params = new URLSearchParams({ view: "cm", fu: "1", to });
  if (opts?.subject) params.set("su", opts.subject);
  if (opts?.body) params.set("body", opts.body);
  return `https://mail.google.com/mail/?${params.toString()}`;
}
