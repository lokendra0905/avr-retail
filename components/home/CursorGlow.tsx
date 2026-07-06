"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorGlow() {
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 120, damping: 22 });
  const springY = useSpring(y, { stiffness: 120, damping: 22 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
    };
  }, [x, y, visible]);

  if (!visible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[30] hidden md:block"
      aria-hidden
    >
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute -translate-x-1/2 -translate-y-1/2"
      >
        <div className="h-80 w-80 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/40" />
      </motion.div>
    </motion.div>
  );
}
