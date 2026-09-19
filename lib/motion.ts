export const easeOutExpo = [0.22, 1, 0.36, 1] as const;

export const duration = {
  press: 0.16,
  hover: 0.18,
  ui: 0.2,
  page: 0.24,
  hero: 0.28,
} as const;

export const springSoft = {
  type: "spring" as const,
  stiffness: 380,
  damping: 32,
};

export const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.hero, ease: easeOutExpo },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.page, ease: easeOutExpo },
  },
};

export const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

export const pageFade = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: duration.page, ease: easeOutExpo },
  },
  exit: { opacity: 0, transition: { duration: duration.ui } },
};
