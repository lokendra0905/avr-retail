import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { FOOTER, SITE } from "@/constants/site";
import { getAllServices } from "@/lib/services";
import { getPhoneUrl, getEmailUrl } from "@/lib/utils";
import { Logo } from "@/components/shared/Logo";

export function Footer() {
  const services = getAllServices();

  return (
    <footer className="border-t border-white/5 bg-navy-900">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo variant="footer" />
            <p className="mt-3 text-xs italic text-white/50">{SITE.brandTagline}</p>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              {FOOTER.description}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {FOOTER.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-gold-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white">Services</h3>
            <ul className="mt-4 space-y-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-white/60 transition-colors hover:text-gold-400"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white">Contact</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2 text-sm text-white/60">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                {SITE.contact.address}
              </li>
              <li>
                <a
                  href={getPhoneUrl(SITE.contact.phone)}
                  className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-gold-400"
                >
                  <Phone className="h-4 w-4 text-gold-500" />
                  {SITE.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={getEmailUrl(SITE.contact.email)}
                  className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-gold-400"
                >
                  <Mail className="h-4 w-4 text-gold-500" />
                  {SITE.contact.email}
                </a>
              </li>
            </ul>
            <div className="mt-4 flex gap-3">
              {Object.entries(SITE.social).map(([key, url]) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-navy-800 px-3 py-1 text-xs capitalize text-white/60 transition-colors hover:bg-gold-500/20 hover:text-gold-400"
                >
                  {key}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-8 text-center text-sm text-white/40">
          {FOOTER.copyright}
        </div>
      </div>
    </footer>
  );
}
