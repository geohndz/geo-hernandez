"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Logo } from "./Logo";
import { cn } from "@/lib/cn";

type Piece = {
  x: number;
  y: number;
  rotate: number;
  z: number;
};

const rest = { x: 0, y: 0, rotate: 0 };

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function crumple(): Piece[] {
  const stack = [1, 2, 3].sort(() => Math.random() - 0.5);
  return [
    { x: rand(8, 20), y: rand(-8, 10), rotate: rand(-32, 26), z: stack[0]! },
    { x: rand(-10, 8), y: rand(-12, 10), rotate: rand(-24, 28), z: stack[1]! },
    { x: rand(-26, -10), y: rand(-10, 12), rotate: rand(-30, 24), z: stack[2]! },
  ];
}

const spring = { type: "spring" as const, stiffness: 480, damping: 16, mass: 0.55 };

export function BrandLockup({
  logoClassName = "h-[22px] w-[16px] text-fg",
  className,
}: {
  logoClassName?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [pieces, setPieces] = useState<Piece[]>([
    { ...rest, z: 0 },
    { ...rest, z: 0 },
    { ...rest, z: 0 },
  ]);

  function onEnter() {
    if (reduce) return;
    setPieces(crumple());
    setHovered(true);
  }

  function onLeave() {
    setHovered(false);
    setPieces([
      { ...rest, z: 0 },
      { ...rest, z: 0 },
      { ...rest, z: 0 },
    ]);
  }

  const labels = ["Geo", "Hernandez"] as const;

  return (
    <span
      className={cn("relative flex items-center gap-2.5", className)}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <motion.span
        className="relative inline-flex origin-center will-change-transform"
        animate={hovered ? { x: pieces[0]?.x, y: pieces[0]?.y, rotate: pieces[0]?.rotate } : rest}
        transition={spring}
        style={{ zIndex: hovered ? pieces[0]?.z : 0 }}
      >
        <Logo className={logoClassName} />
      </motion.span>
      <span className="flex items-center gap-1">
        {labels.map((word, i) => {
          const piece = pieces[i + 1];
          return (
            <motion.span
              key={word}
              className="relative inline-block origin-center whitespace-nowrap will-change-transform"
              animate={
                hovered
                  ? { x: piece?.x, y: piece?.y, rotate: piece?.rotate }
                  : rest
              }
              transition={{ ...spring, delay: hovered ? 0.03 * (i + 1) : 0 }}
              style={{ zIndex: hovered ? piece?.z : 0 }}
            >
              {word}
            </motion.span>
          );
        })}
      </span>
    </span>
  );
}
