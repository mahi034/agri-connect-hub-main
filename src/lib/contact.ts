// All email links open Gmail compose in a new tab
export const EMAIL = "info@cropmak.com";
export const PHONE_DISPLAY = "+91 123456789";
export const PHONE_TEL = "+913456789056";

export function gmailComposeUrl(opts?: { subject?: string; body?: string; to?: string }) {
  const to = opts?.to ?? EMAIL;
  const params = new URLSearchParams({ view: "cm", fu: "1", to });
  if (opts?.subject) params.set("su", opts.subject);
  if (opts?.body) params.set("body", opts.body);
  return `https://mail.google.com/mail/?${params.toString()}`;
}
