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
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/40"
      aria-label="Chat on WhatsApp"
    >
      <motion.span
        className="absolute inset-0 rounded-full bg-[#25D366]"
        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        aria-hidden
      />
      <MessageCircle className="relative h-7 w-7" />
    </motion.a>
  );
}
