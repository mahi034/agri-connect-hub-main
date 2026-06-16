import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, Menu, X, ArrowRight } from "lucide-react";
import { EMAIL, PHONE_DISPLAY, PHONE_TEL, gmailComposeUrl } from "@/lib/contact";
import logoImg from "@/assets/cropmak-logo.png";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Tractors", to: "/swaraj" },
  { label: "Farm Machinery", to: "/farm-machinery" },
  { label: "About Us", to: "/#about" },
  { label: "Why Us", to: "/#why" },
  { label: "Contact", to: "/#enquiry" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const showTestDrive = !pathname.startsWith("/farm-machinery");

  return (
    <header className="sticky top-0 z-50">
      {/* Top utility bar */}
      <div className="bg-primary text-primary-foreground text-xs">
        <div className="container-page flex items-center justify-between h-9">
          <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-1.5 hover:opacity-80">
            <Phone className="h-3.5 w-3.5" /> {PHONE_DISPLAY}
          </a>
          <a
            href={gmailComposeUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 hover:opacity-80"
          >
            <Mail className="h-3.5 w-3.5" /> {EMAIL}
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-white/95 backdrop-blur-md border-b border-border/70">
        <div className="container-page flex items-center justify-between h-[80px]">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={logoImg} alt="Cropmak Logo" className="h-10 w-10 rounded-full object-contain" />
            <div className="leading-tight">
              <div className="font-display font-extrabold text-lg tracking-tight text-primary">CROPMAK</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-amber-brand font-semibold">Roots of Innovations</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-md"
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {showTestDrive && (
              <Link
                to="/"
                hash="enquiry"
                className="hidden md:inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-mid transition-colors shadow-soft"
              >
                Book a Test Drive <ArrowRight className="h-4 w-4" />
              </Link>
            )}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-md hover:bg-muted"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden border-t border-border bg-white">
            <div className="container-page py-3 flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="py-3 text-sm font-medium border-b border-border last:border-0"
                >
                  {item.label}
                </Link>
              ))}
              {showTestDrive && (
                <Link
                  to="/"
                  hash="enquiry"
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex items-center justify-center gap-1.5 bg-primary text-primary-foreground px-4 py-3 rounded-full text-sm font-semibold"
                >
                  Book a Test Drive <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
