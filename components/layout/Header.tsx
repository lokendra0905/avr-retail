"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/constants/site";
import { getAllServices } from "@/lib/services";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/shared/Logo";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const services = getAllServices();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-navy-700/80 bg-navy-800/95 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Logo variant="header" />

        <nav className="hidden items-center gap-6 lg:gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-muted transition-colors hover:text-gold-500"
            >
              {link.label}
            </Link>
          ))}

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setServicesOpen(!servicesOpen)}
              className={cn(
                "flex items-center gap-1 text-sm font-medium transition-colors",
                servicesOpen ? "text-gold-500" : "text-ink-muted hover:text-gold-500"
              )}
            >
              What We Do
              <ChevronDown className={cn("h-4 w-4 transition-transform", servicesOpen && "rotate-180")} />
            </button>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute right-0 top-full mt-2 w-64 overflow-hidden rounded-xl border border-navy-700 bg-navy-800 py-2 shadow-xl"
                >
                  <Link
                    href="/services"
                    onClick={() => setServicesOpen(false)}
                    className="block border-b border-navy-700 px-4 py-2.5 text-sm font-semibold text-gold-500 hover:bg-navy-900"
                  >
                    All Services
                  </Link>
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      onClick={() => setServicesOpen(false)}
                      className="block px-4 py-2.5 text-sm text-ink-muted transition-colors hover:bg-navy-900 hover:text-ink"
                    >
                      {s.title}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        <div className="hidden md:block">
          <Button href="/contact" size="sm">
            Get a Quote
          </Button>
        </div>

        <button
          type="button"
          className="text-ink md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-navy-700 bg-navy-800 md:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((link, i) => (
                <motion.div key={link.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
                  <Link href={link.href} onClick={() => setOpen(false)} className="block rounded-lg px-4 py-3 text-ink-muted hover:bg-navy-900 hover:text-ink">
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <button
                type="button"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-ink-muted hover:bg-navy-900"
              >
                What We Do
                <ChevronDown className={cn("h-4 w-4", mobileServicesOpen && "rotate-180")} />
              </button>
              {mobileServicesOpen && (
                <div className="ml-4 space-y-1 border-l border-navy-700 pl-2">
                  <Link href="/services" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-gold-500">All Services</Link>
                  {services.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-ink-muted">
                      {s.title}
                    </Link>
                  ))}
                </div>
              )}
              <Link href="/contact" onClick={() => setOpen(false)} className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-ink">
                Get a Quote
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
