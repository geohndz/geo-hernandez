"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { pageFade } from "@/lib/motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const shellRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={shellRef}
      initial="initial"
      animate="animate"
      variants={pageFade}
      onAnimationComplete={() => {
        // Transforms on this wrapper break position: sticky for the whole page.
        if (shellRef.current) shellRef.current.style.transform = "none";
      }}
    >
      {children}
    </motion.div>
  );
}
