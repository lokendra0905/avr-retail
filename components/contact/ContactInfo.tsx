import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { CONTACT } from "@/constants/contact";
import { SITE } from "@/constants/site";
import { Button } from "@/components/ui/Button";
import { getPhoneUrl, getEmailUrl, getWhatsAppUrl } from "@/lib/utils";

const contactItems = [
  {
    icon: MapPin,
    title: "Address",
    content: SITE.contact.address,
    link: { href: SITE.contact.mapLink, label: "Find us on Google Maps", external: true },
  },
  {
    icon: Phone,
    title: "Phone",
    content: SITE.contact.phoneDisplay,
    link: { href: getPhoneUrl(SITE.contact.phone), label: null, external: true },
  },
  {
    icon: Mail,
    title: "Email",
    content: SITE.contact.email,
    link: { href: getEmailUrl(SITE.contact.email), label: null, external: true },
  },
] as const;

export function ContactInfo() {
  return (
    <div className="glass-card p-8 md:p-10">
      <p className="font-game text-xs uppercase tracking-[0.3em] text-gold-500">Get In Touch</p>
      <h2 className="mt-2 font-display text-2xl font-bold text-ink">Contact Details</h2>

      <div className="mt-8 space-y-6">
        {contactItems.map(({ icon: Icon, title, content, link }) => (
          <div key={title} className="flex items-start gap-4 border-b border-navy-700/60 pb-6 last:border-0 last:pb-0">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-500/15 to-gold-400/5">
              <Icon className="h-5 w-5 text-gold-500" />
            </div>
            <div>
              <h3 className="font-game-alt text-xs font-semibold uppercase tracking-wider text-ink-muted">
                {title}
              </h3>
              {link.href ? (
                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="mt-1 block text-ink leading-relaxed transition-colors hover:text-gold-500"
                >
                  {content}
                </a>
              ) : (
                <p className="mt-1 text-ink leading-relaxed">{content}</p>
              )}
              {link.label && (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block font-accent text-sm text-gold-500 hover:underline"
                >
                  {link.label}
                </a>
              )}
            </div>
          </div>
        ))}

        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-500/15 to-gold-400/5">
            <Clock className="h-5 w-5 text-gold-500" />
          </div>
          <div>
            <h3 className="font-game-alt text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Office Hours
            </h3>
            {CONTACT.officeHours.map((h) => (
              <p key={h.day} className="mt-1 text-ink">
                <span className="font-medium">{h.day}:</span>{" "}
                <span className="text-ink-muted">{h.hours}</span>
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button href={getPhoneUrl(SITE.contact.phone)} external>
          <Phone className="h-4 w-4" />
          Call Now
        </Button>
        <Button href={getWhatsAppUrl(SITE.contact.whatsapp)} external variant="outline">
          WhatsApp
        </Button>
        <Button href={getEmailUrl(SITE.contact.email)} external variant="secondary">
          <Mail className="h-4 w-4" />
          Email Us
        </Button>
      </div>
    </div>
  );
}
