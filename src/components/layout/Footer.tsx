import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin } from "lucide-react";
import { EMAIL, PHONE_DISPLAY, PHONE_TEL, gmailComposeUrl } from "@/lib/contact";
import logoImg from "@/assets/cropmak-logo.png";

export function Footer() {
  return (
    <footer className="bg-[#071C0E] text-white/80">
      <div className="container-page py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="mb-4">
            <div className="flex items-center gap-2.5">
              <img src={logoImg} alt="Cropmak Logo" className="h-10 w-10 rounded-full object-contain" />
              <div className="leading-tight">
                <div className="font-display font-extrabold text-lg tracking-tight text-white">CROPMAK</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-amber-brand font-semibold">Roots of Innovations</div>
              </div>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-white/60 max-w-sm">
            An authorized multi-brand agricultural dealer — tractors, implements, irrigation and finance under one trusted roof.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/" className="hover:text-[#6EE7A0]">Home</Link></li>
            <li><Link to="/swaraj" className="hover:text-[#6EE7A0]">Swaraj Tractors</Link></li>
            <li><Link to="/farm-machinery" className="hover:text-[#6EE7A0]">Farm Machinery</Link></li>
            <li><a href="/#about" className="hover:text-[#6EE7A0]">About Us</a></li>
            <li><a href="/#why" className="hover:text-[#6EE7A0]">Why Cropmak</a></li>
            <li><a href="/#enquiry" className="hover:text-[#6EE7A0]">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Reach Us</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={`tel:${PHONE_TEL}`} className="flex gap-2.5 hover:text-[#6EE7A0]">
                <Phone className="h-4 w-4 text-[#6EE7A0] mt-0.5 shrink-0" /> {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a href={gmailComposeUrl()} target="_blank" rel="noopener noreferrer" className="flex gap-2.5 hover:text-[#6EE7A0]">
                <Mail className="h-4 w-4 text-[#6EE7A0] mt-0.5 shrink-0" /> {EMAIL}
              </a>
            </li>
            <li className="flex gap-2.5">
              <MapPin className="h-4 w-4 text-[#6EE7A0] mt-0.5 shrink-0" /> Cropmak Dealership Hub, India
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <div>© {new Date().getFullYear()} Cropmak. All rights reserved.</div>
          <div>Authorized dealer · Swaraj Tractors (Mahindra & Mahindra) and partner brands</div>
        </div>
      </div>
    </footer>
  );
}
