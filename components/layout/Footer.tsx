import Link from "next/link";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";
import { FOOTER, SITE } from "@/constants/site";
import { getAllServices } from "@/lib/services";
import { getPhoneUrl, getEmailUrl } from "@/lib/utils";
import { Logo } from "@/components/shared/Logo";

export function Footer() {
  const services = getAllServices();

  return (
    <footer className="relative border-t border-navy-700 bg-navy-900">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo variant="footer" />
            <p className="mt-3 font-accent text-xs italic tracking-wide text-ink-muted">
              {SITE.brandTagline}
            </p>
            <p className="mt-5 text-sm leading-relaxed text-ink-muted">{FOOTER.description}</p>
          </div>

          <div>
            <h3 className="font-accent text-sm font-semibold uppercase tracking-widest text-ink">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3">
              {FOOTER.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-ink-muted transition-colors hover:text-gold-500"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="group inline-flex items-center gap-1 text-sm text-ink-muted transition-colors hover:text-gold-500"
                >
                  What We Do
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100" />
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-accent text-sm font-semibold uppercase tracking-widest text-ink">
              What We Do
            </h3>
            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group inline-flex items-center gap-1 text-sm text-ink-muted transition-colors hover:text-gold-500"
                  >
                    {service.title}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-accent text-sm font-semibold uppercase tracking-widest text-ink">
              Contact
            </h3>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3 text-sm text-ink-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                {SITE.contact.address}
              </li>
              <li>
                <a
                  href={getPhoneUrl(SITE.contact.phone)}
                  className="flex items-center gap-3 text-sm text-ink-muted transition-colors hover:text-gold-500"
                >
                  <Phone className="h-4 w-4 text-gold-500" />
                  {SITE.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={getEmailUrl(SITE.contact.email)}
                  className="flex items-center gap-3 text-sm text-ink-muted transition-colors hover:text-gold-500"
                >
                  <Mail className="h-4 w-4 text-gold-500" />
                  {SITE.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-navy-700 pt-8 text-center font-accent text-sm text-ink-muted/80">
          {FOOTER.copyright}
        </div>
      </div>
    </footer>
  );
}
