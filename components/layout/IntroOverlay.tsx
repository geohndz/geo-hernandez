"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Logo } from "./Logo";
import { springSoft } from "@/lib/motion";

export function IntroOverlay() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const seen = sessionStorage.getItem("geo-intro");
    if (seen) return;

    const show = window.requestAnimationFrame(() => setVisible(true));
    const hide = window.setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("geo-intro", "1");
    }, 1400);

    return () => {
      window.cancelAnimationFrame(show);
      window.clearTimeout(hide);
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.82, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={springSoft}
          >
            <Logo className="h-16 w-12 text-[#d4d4d4] md:h-20 md:w-[60px]" animated />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
