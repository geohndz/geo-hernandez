"use client";

import { motion } from "motion/react";
import { pageFade } from "@/lib/motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial="initial" animate="animate" variants={pageFade}>
      {children}
    </motion.div>
  );
}
