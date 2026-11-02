"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { graphic } from "@/content/graphic";
import { cn } from "@/lib/cn";
import { easeOutExpo } from "@/lib/motion";

const placements = [
  "left-1 top-2 w-[64px] -rotate-[14deg] sm:w-[72px] md:-left-5 md:top-4 md:w-[84px]",
  "right-0 top-7 w-[76px] rotate-[10deg] sm:w-[88px] md:-right-6 md:top-6 md:w-[104px]",
  "bottom-1 right-1 w-[146px] -rotate-[8deg] sm:w-[162px] md:bottom-0 md:-right-3 md:w-[188px]",
] as const;

const bob = [
  { y: [0, -7, 0], duration: 3.4, delay: 0 },
  { y: [0, -5, 0], duration: 4.1, delay: 0.55 },
  { y: [0, -6, 0], duration: 3.7, delay: 1.1 },
] as const;

export function GraphicPortrait() {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="relative overflow-visible px-3 pb-16 pt-8 sm:px-4 md:px-6 md:pb-20 md:pt-10">
      <div className="relative aspect-square border border-[var(--gd-rule)]">
        <Image
          src={graphic.portrait.src}
          alt={graphic.portrait.alt}
          fill
          sizes="(min-width: 768px) 36vw, 90vw"
          className="object-cover object-[50%_28%]"
        />
      </div>

      {graphic.interests.map((item, i) => {
        const motionBob = bob[i]!;
        return (
          <motion.figure
            key={item.src}
            className={cn(
              "absolute z-10 flex flex-col items-center overflow-visible",
              placements[i],
            )}
            initial={reduce ? false : { opacity: 0, y: 16, scale: 0.94 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.7, delay: 0.12 + i * 0.08, ease: easeOutExpo }}
          >
            <motion.div
              className="flex flex-col items-center"
              animate={
                reduce
                  ? undefined
                  : hovered === i
                    ? { y: 0, scale: 1.02 }
                    : { y: [...motionBob.y], scale: 1 }
              }
              transition={
                hovered === i
                  ? { duration: 0.18, ease: [0.77, 0, 0.175, 1] }
                  : {
                      y: {
                        duration: motionBob.duration,
                        delay: motionBob.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                      scale: { duration: 0.18, ease: [0.77, 0, 0.175, 1] },
                    }
              }
              onHoverStart={() => {
                if (reduce) return;
                if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
                  setHovered(i);
                }
              }}
              onHoverEnd={() => setHovered(null)}
            >
              <div
                className={cn(
                  "relative w-full drop-shadow-[0_10px_16px_rgba(18,18,18,0.16)]",
                  "framed" in item &&
                    item.framed &&
                    "overflow-hidden border border-[var(--gd-rule)] bg-[var(--gd-paper)]",
                )}
              >
                <Image
                  src={item.src}
                  alt=""
                  width={item.width}
                  height={item.height}
                  className="h-auto w-full select-none"
                  draggable={false}
                />
              </div>
              <figcaption className="relative z-10 mt-1.5 whitespace-nowrap rounded-full bg-white px-2 py-[3px] text-center text-[11px] leading-none text-[var(--gd-ink)] shadow-[0_4px_12px_rgba(18,18,18,0.12)]">
                {item.label}
              </figcaption>
            </motion.div>
          </motion.figure>
        );
      })}
    </div>
  );
}
