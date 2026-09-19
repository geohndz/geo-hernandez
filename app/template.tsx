"use client";

import { motion, useReducedMotion } from "motion/react";
import { pageFade } from "@/lib/motion";

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div>{children}</div>;
  }

  return (
    <motion.div initial="initial" animate="animate" variants={pageFade}>
      {children}
    </motion.div>
  );
}
