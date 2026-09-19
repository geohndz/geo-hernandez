"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { duration, easeOutExpo } from "@/lib/motion";
import { Sidebar } from "./Sidebar";

export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/70"
            onClick={onClose}
          />
          <motion.div
            initial={reduce ? { opacity: 0 } : { x: "-100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "-100%" }}
            transition={
              reduce
                ? { duration: duration.ui, ease: easeOutExpo }
                : { type: "spring", stiffness: 380, damping: 36 }
            }
            className="absolute inset-y-0 left-0 w-[min(84vw,320px)] border-r border-line"
          >
            <Sidebar onNavigate={onClose} layoutPrefix="mobile" />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
