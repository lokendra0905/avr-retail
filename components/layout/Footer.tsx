import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { FOOTER, SITE } from "@/constants/site";
import { getAllServices } from "@/lib/services";
import { getPhoneUrl, getEmailUrl } from "@/lib/utils";
import { Logo } from "@/components/shared/Logo";

export function Footer() {
  const services = getAllServices();

  return (
    <footer className="border-t border-navy-700 bg-navy-900">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo variant="footer" />
            <p className="mt-3 text-xs italic text-ink-muted">{SITE.brandTagline}</p>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              {FOOTER.description}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-ink">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {FOOTER.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-ink-muted transition-colors hover:text-gold-500">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className="text-sm text-ink-muted transition-colors hover:text-gold-500">
                  What We Do
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-ink">What We Do</h3>
            <ul className="mt-4 space-y-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="text-sm text-ink-muted transition-colors hover:text-gold-500">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-ink">Contact</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2 text-sm text-ink-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                {SITE.contact.address}
              </li>
              <li>
                <a href={getPhoneUrl(SITE.contact.phone)} className="flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-gold-500">
                  <Phone className="h-4 w-4 text-gold-500" />
                  {SITE.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={getEmailUrl(SITE.contact.email)} className="flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-gold-500">
                  <Mail className="h-4 w-4 text-gold-500" />
                  {SITE.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-navy-700 pt-8 text-center text-sm text-ink-muted/80">
          {FOOTER.copyright}
        </div>
      </div>
    </footer>
  );
}
