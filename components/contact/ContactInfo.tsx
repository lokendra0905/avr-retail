import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { CONTACT } from "@/constants/contact";
import { SITE } from "@/constants/site";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { getPhoneUrl, getEmailUrl, getWhatsAppUrl } from "@/lib/utils";

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-500/10">
          <MapPin className="h-6 w-6 text-gold-500" />
        </div>
        <div>
          <h3 className="font-semibold text-white">Address</h3>
          <p className="mt-1 text-white/60">{SITE.contact.address}</p>
          <a
            href={SITE.contact.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm text-gold-400 hover:underline"
          >
            Find us on Google Maps
          </a>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-500/10">
          <Phone className="h-6 w-6 text-gold-500" />
        </div>
        <div>
          <h3 className="font-semibold text-white">Phone</h3>
          <a
            href={getPhoneUrl(SITE.contact.phone)}
            className="mt-1 block text-white/60 hover:text-gold-400"
          >
            {SITE.contact.phoneDisplay}
          </a>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-500/10">
          <Mail className="h-6 w-6 text-gold-500" />
        </div>
        <div>
          <h3 className="font-semibold text-white">Email</h3>
          <a
            href={getEmailUrl(SITE.contact.email)}
            className="mt-1 block text-white/60 hover:text-gold-400"
          >
            {SITE.contact.email}
          </a>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-500/10">
          <Clock className="h-6 w-6 text-gold-500" />
        </div>
        <div>
          <h3 className="font-semibold text-white">Office Hours</h3>
          {CONTACT.officeHours.map((h) => (
            <p key={h.day} className="mt-1 text-white/60">
              {h.day}: {h.hours}
            </p>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-4">
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
