"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { aboutStickers, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { easeOutExpo } from "@/lib/motion";

const placements = [
  // matcha
  "left-1 top-5 w-[62px] -rotate-[14deg] sm:w-[68px] md:left-0 md:top-7 md:w-[74px]",
  // book
  "right-0 top-10 w-[72px] rotate-[10deg] sm:w-[84px] md:-right-1 md:top-8 md:w-[96px]",
  // shoe
  "bottom-3 left-1/2 w-[160px] -translate-x-1/2 rotate-[-8deg] sm:w-[175px] md:bottom-2 md:left-auto md:right-[-8px] md:w-[190px] md:translate-x-0 md:rotate-[-12deg]",
] as const;

const bob = [
  { y: [0, -7, 0], duration: 3.4, delay: 0 },
  { y: [0, -5, 0], duration: 4.1, delay: 0.55 },
  { y: [0, -6, 0], duration: 3.7, delay: 1.1 },
] as const;

export function AboutPortrait() {
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="relative overflow-visible px-9 pb-16 pt-14 sm:px-11 md:px-10 md:pb-20 md:pt-16">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-line bg-card shadow-[0_24px_60px_rgba(0,0,0,0.45)] md:rounded-[32px]">
        <Image
          src={site.portrait}
          alt={site.legalName}
          fill
          sizes="(min-width: 768px) 40vw, 90vw"
          className="object-cover object-[50%_18%]"
          priority
        />
      </div>

      {aboutStickers.map((sticker, i) => {
        const motionBob = bob[i]!;
        return (
          <motion.figure
            key={sticker.src}
            className={cn(
              "absolute z-10 flex flex-col items-center overflow-visible",
              placements[i],
            )}
            initial={reduce ? false : { opacity: 0, y: 18, scale: 0.92 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.7, delay: 0.18 + i * 0.1, ease: easeOutExpo }}
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
                  "relative w-full overflow-visible drop-shadow-[0_14px_28px_rgba(0,0,0,0.55)]",
                  sticker.framed &&
                    "overflow-hidden rounded-[6px] border border-white/15 bg-black shadow-[0_12px_28px_rgba(0,0,0,0.5)]",
                )}
              >
                <Image
                  src={sticker.src}
                  alt=""
                  width={sticker.width}
                  height={sticker.height}
                  className="h-auto w-full max-w-none select-none"
                  draggable={false}
                />
              </div>
              <figcaption className="mt-1 max-w-[11rem] rounded-full border border-line bg-card/90 px-2.5 py-1 text-center text-[10px] leading-snug text-muted backdrop-blur-sm sm:text-[11px]">
                {sticker.label}
              </figcaption>
            </motion.div>
          </motion.figure>
        );
      })}
    </div>
  );
}
