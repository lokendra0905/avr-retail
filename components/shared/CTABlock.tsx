"use client";

import { motion } from "framer-motion";
import { SITE } from "@/constants/site";
import { Button } from "@/components/ui/Button";
import { getPhoneUrl, getWhatsAppUrl } from "@/lib/utils";
import { Phone, MessageCircle, Sparkles } from "lucide-react";

type CTABlockProps = {
  title?: string;
  subtitle?: string;
};

export function CTABlock({
  title = "Ready to Start Your Project?",
  subtitle = "Get in touch with India's leading retail fit out company for a free consultation.",
}: CTABlockProps) {
  const titleWords = title.split(" ");
  const lastWord = titleWords.pop() ?? "";
  const restTitle = titleWords.join(" ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative overflow-hidden rounded-3xl border border-navy-700/80 p-8 shadow-xl md:p-14 text-center mesh-cta"
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold-500/10 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-gold-400/10 blur-3xl" aria-hidden />

      <div className="relative">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/10">
          <Sparkles className="h-6 w-6 text-gold-500" />
        </div>
        <h3 className="font-display text-2xl font-bold text-ink md:text-4xl">
          {restTitle && <span>{restTitle} </span>}
          <span className="text-gradient-brand">{lastWord}</span>
        </h3>
        <p className="mx-auto mt-4 max-w-xl text-ink-muted leading-relaxed">{subtitle}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
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
    </motion.div>
  );
}
