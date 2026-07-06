"use client";

import { useRef, useState, useLayoutEffect, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProjects } from "@/lib/services";

const HEADER = 72;

type PinPhase = "before" | "pinned" | "after";

export function ScrollGallery() {
  const projects = getFeaturedProjects(8);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);

  const [dims, setDims] = useState({
    scrollRange: 0,
    sectionHeight: 0,
    stickyHeight: 0,
  });
  const [pin, setPin] = useState<{ progress: number; phase: PinPhase }>({
    progress: 0,
    phase: "before",
  });

  const measure = useCallback(() => {
    const track = trackRef.current;
    const clip = clipRef.current;
    if (!track || !clip) return;

    const scrollRange = Math.max(0, track.scrollWidth - clip.clientWidth);
    const viewH = window.innerHeight;
    const stickyHeight = viewH - HEADER;
    // Pin zone length = scrollRange; section must be stickyHeight + scrollRange tall
    const sectionHeight = scrollRange > 0 ? scrollRange + stickyHeight : stickyHeight;

    setDims({ scrollRange, sectionHeight, stickyHeight });
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    if (clipRef.current) ro.observe(clipRef.current);
    window.addEventListener("resize", measure);

    const t1 = requestAnimationFrame(measure);
    const t2 = setTimeout(measure, 300);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(t1);
      clearTimeout(t2);
    };
  }, [measure, projects.length]);

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      if (!section || dims.sectionHeight === 0) return;

      const { scrollRange, stickyHeight } = dims;
      const rect = section.getBoundingClientRect();

      if (scrollRange <= 0) {
        setPin({ progress: 0, phase: "before" });
        return;
      }

      // Gallery hasn't reached the pin line yet — normal page scroll
      if (rect.top > HEADER) {
        setPin({ progress: 0, phase: "before" });
        return;
      }

      // Gallery fully scrolled through — release page scroll
      if (rect.bottom <= stickyHeight + HEADER) {
        setPin({ progress: 1, phase: "after" });
        return;
      }

      // Pinned zone: vertical scroll only drives horizontal movement
      const scrolledIntoPin = HEADER - rect.top;
      const progress = Math.min(1, Math.max(0, scrolledIntoPin / scrollRange));
      setPin({ progress, phase: "pinned" });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [dims]);

  const translateX = -(pin.progress * dims.scrollRange);

  const panelPosition =
    pin.phase === "pinned"
      ? "fixed left-0 right-0 z-30"
      : pin.phase === "after"
        ? "absolute bottom-0 left-0 right-0"
        : "relative";

  return (
    <section
      ref={sectionRef}
      className="relative isolate bg-[#0a0a0a]"
      style={{ height: dims.sectionHeight > 0 ? dims.sectionHeight : "100vh" }}
      aria-label="Portfolio scroll gallery"
    >
      <div
        className={`${panelPosition} flex flex-col overflow-hidden bg-[#0a0a0a]`}
        style={{
          top: pin.phase === "pinned" ? HEADER : undefined,
          height: dims.stickyHeight || "calc(100vh - 72px)",
        }}
      >
        <div className="shrink-0 px-6 pb-4 pt-8 md:px-10">
          <p className="font-game text-xs uppercase tracking-[0.35em] text-gold-500">
            Portfolio
          </p>
          <div className="mt-2 flex items-end justify-between gap-4">
            <h2 className="font-game text-3xl font-bold uppercase text-white md:text-5xl">
              Scroll To <span className="text-gradient-brand">Explore</span>
            </h2>
            <p className="hidden font-game-alt text-xs uppercase tracking-widest text-white/30 md:block">
              {pin.phase === "pinned"
                ? `${Math.round(pin.progress * 100)}% · keep scrolling`
                : "Scroll to browse projects ↓"}
            </p>
          </div>
        </div>

        <div
          ref={clipRef}
          className="flex min-h-0 flex-1 items-center overflow-hidden"
        >
          <div
            ref={trackRef}
            className="flex items-stretch gap-5 will-change-transform md:gap-7"
            style={{
              transform: `translate3d(${translateX}px, 0, 0)`,
              paddingLeft: "max(1.5rem, calc((100vw - 80rem) / 2 + 1.5rem))",
              paddingRight: "1.5rem",
            }}
          >
            {projects.map(({ service, project }, i) => (
              <Link
                key={`${service.slug}-${project.slug}`}
                href={`/services/${service.slug}/${project.slug}`}
                className="group relative w-[78vw] shrink-0 sm:w-[52vw] md:w-[40vw] lg:w-[30vw]"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 78vw, 30vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <span className="font-game text-[10px] uppercase tracking-[0.25em] text-gold-400">
                      {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")} — {service.title}
                    </span>
                    <h3 className="mt-2 font-display text-xl font-bold text-white md:text-2xl">
                      {project.title}
                    </h3>
                    {project.location && (
                      <p className="mt-1 text-sm text-white/50">{project.location}</p>
                    )}
                    <span className="mt-4 inline-flex items-center gap-1 font-game-alt text-xs uppercase tracking-widest text-white/60 opacity-0 transition-opacity group-hover:opacity-100">
                      View Case <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {dims.scrollRange > 0 && (
          <div className="shrink-0 px-6 pb-8 pt-3 md:px-10">
            <div className="h-1 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-400 transition-[width] duration-75"
                style={{ width: `${pin.progress * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
