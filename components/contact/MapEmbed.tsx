import { SITE } from "@/constants/site";

export function MapEmbed() {
  return (
    <div className="overflow-hidden rounded-2xl border border-navy-700">
      <iframe
        src={SITE.contact.mapEmbedUrl}
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="AVR Retail office location on Google Maps"
        className="w-full"
      />
    </div>
  );
}
