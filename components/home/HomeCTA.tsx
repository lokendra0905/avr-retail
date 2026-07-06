"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { SITE } from "@/constants/site";
import { getPhoneUrl } from "@/lib/utils";

export function HomeCTA() {
  return (
    <section className="relative overflow-hidden bg-ink py-32">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(229,78,38,0.2), transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,184,0,0.1), transparent 50%)",
        }}
      />
      <div className="relative mx-auto max-w-[1400px] px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-game text-xs uppercase tracking-[0.4em] text-gold-400"
        >
          Start Your Project
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-6 font-game text-[clamp(2.5rem,6vw,4.5rem)] font-bold uppercase leading-[0.95] text-white"
        >
          Ready To Transform
          <br />
          <span className="text-gradient-brand">Your Store?</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-6 max-w-lg text-white/50"
        >
          From concept to handover — let&apos;s build a retail space your customers won&apos;t forget.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="btn-shine inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 px-10 py-4 font-game text-sm font-semibold uppercase tracking-wider text-white shadow-xl shadow-gold-500/30 transition-transform hover:-translate-y-1"
          >
            Get Free Consultation
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={getPhoneUrl(SITE.contact.phone)}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-10 py-4 font-game text-sm font-semibold uppercase tracking-wider text-white transition-all hover:border-gold-500/50 hover:bg-white/5"
          >
            <Phone className="h-4 w-4 text-gold-400" />
            {SITE.contact.phoneDisplay}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
