import { SITE } from "@/constants/site";

export function MapEmbed() {
  return (
    <div className="overflow-hidden rounded-3xl border border-navy-700/80 shadow-xl">
      <div className="border-b border-navy-700/60 bg-white px-6 py-4">
        <p className="font-game text-xs uppercase tracking-[0.25em] text-gold-500">Location</p>
        <p className="mt-1 font-display text-lg font-semibold text-ink">Visit Our Office</p>
      </div>
      <iframe
        src={SITE.contact.mapEmbedUrl}
        width="100%"
        height="420"
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
