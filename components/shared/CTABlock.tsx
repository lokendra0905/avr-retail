import { SITE } from "@/constants/site";
import { Button } from "@/components/ui/Button";
import { getPhoneUrl, getWhatsAppUrl } from "@/lib/utils";
import { Phone, MessageCircle } from "lucide-react";

type CTABlockProps = {
  title?: string;
  subtitle?: string;
};

export function CTABlock({
  title = "Ready to Start Your Project?",
  subtitle = "Get in touch with India's leading retail fit out company for a free consultation.",
}: CTABlockProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-navy-700 bg-navy-800 p-8 shadow-lg md:p-12 text-center">
      <div className="absolute inset-0 bg-brand-glow opacity-60" />
      <div className="relative">
        <h3 className="font-display text-2xl font-bold text-ink md:text-3xl">{title}</h3>
        <p className="mt-3 text-ink-muted max-w-xl mx-auto">{subtitle}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href={getPhoneUrl(SITE.contact.phone)} external size="lg">
            <Phone className="h-5 w-5" />
            {SITE.contact.phoneDisplay}
          </Button>
          <Button href={getWhatsAppUrl(SITE.contact.whatsapp)} external variant="outline" size="lg">
            <MessageCircle className="h-5 w-5" />
            WhatsApp Us
          </Button>
          <Button href="/contact" variant="secondary" size="lg">
            Contact Page
          </Button>
        </div>
      </div>
    </div>
  );
}
