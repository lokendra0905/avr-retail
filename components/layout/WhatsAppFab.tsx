"use client";

import { MessageCircle } from "lucide-react";
import { SITE } from "@/constants/site";
import { getWhatsAppUrl } from "@/lib/utils";
import { motion } from "framer-motion";

export function WhatsAppFab() {
  return (
    <motion.a
      href={getWhatsAppUrl(SITE.contact.whatsapp)}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring" }}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-ink shadow-lg shadow-[#25D366]/30 transition-transform hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </motion.a>
  );
}
