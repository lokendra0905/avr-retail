"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
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
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const services = getAllServices();
  const pathname = usePathname();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";
  const darkHero = isHome && !scrolled;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500",
        darkHero
          ? "border-white/10 bg-black/20 py-3.5 backdrop-blur-md"
          : scrolled
            ? "border-navy-700/60 bg-white/90 py-2.5 shadow-lg shadow-black/[0.04] backdrop-blur-2xl"
            : "border-transparent bg-white/70 py-3.5 backdrop-blur-xl"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6">
        <Logo variant="header" />

        <nav className="hidden items-center gap-1 lg:gap-2 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "nav-link rounded-lg px-3 py-2",
                pathname === link.href && "text-gold-500",
                darkHero && "text-white/70 hover:text-gold-400"
              )}
            >
              {link.label}
            </Link>
          ))}

          <div
            className="relative ml-2"
            ref={dropdownRef}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link
              href="/services"
              className={cn(
                "nav-link flex items-center gap-1 rounded-lg px-3 py-2",
                (servicesOpen || pathname.startsWith("/services")) && "text-gold-500",
                darkHero && "text-white/70 hover:text-gold-400"
              )}
            >
              What We Do
              <ChevronDown
                className={cn("h-4 w-4 transition-transform duration-300", servicesOpen && "rotate-180")}
              />
            </Link>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-0 w-72 overflow-hidden rounded-2xl border border-navy-700/80 bg-white/95 py-2 pt-3 shadow-2xl shadow-black/10 backdrop-blur-xl"
                >
                  <Link
                    href="/services"
                    onClick={() => setServicesOpen(false)}
                    className="mx-2 mb-1 block rounded-xl border-b border-navy-700/60 px-4 py-3 font-accent text-sm font-semibold text-gold-500 transition-colors hover:bg-gold-500/8"
                  >
                    All Services →
                  </Link>
                  {services.map((s, i) => (
                    <motion.div
                      key={s.slug}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <Link
                        href={`/services/${s.slug}`}
                        onClick={() => setServicesOpen(false)}
                        className="block px-5 py-2.5 font-accent text-sm text-ink-muted transition-colors hover:bg-navy-900/60 hover:text-ink"
                      >
                        {s.title}
                      </Link>
                    </motion.div>
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
          className={cn(
            "rounded-lg p-2 transition-colors md:hidden",
            darkHero ? "text-white hover:bg-white/10" : "text-ink hover:bg-navy-900/60"
          )}
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
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-navy-700/60 bg-white/95 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 font-accent text-ink-muted transition-colors hover:bg-navy-900/50 hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="flex items-center gap-1">
                <Link
                  href="/services"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-xl px-4 py-3 font-accent text-ink-muted transition-colors hover:bg-navy-900/50 hover:text-ink"
                >
                  What We Do
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="rounded-xl px-3 py-3 text-ink-muted hover:bg-navy-900/50"
                  aria-label="Toggle services menu"
                >
                  <ChevronDown className={cn("h-4 w-4 transition-transform", mobileServicesOpen && "rotate-180")} />
                </button>
              </div>
              <AnimatePresence>
                {mobileServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="ml-4 space-y-1 overflow-hidden border-l-2 border-gold-500/30 pl-3"
                  >
                    <Link href="/services" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm font-semibold text-gold-500">
                      All Services
                    </Link>
                    {services.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        onClick={() => setOpen(false)}
                        className="block px-3 py-2 text-sm text-ink-muted"
                      >
                        {s.title}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="btn-shine mt-3 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-gold-500 to-gold-600 px-6 py-3.5 font-accent text-sm font-semibold text-white shadow-lg shadow-gold-500/25"
              >
                Get a Quote
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
