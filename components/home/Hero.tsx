"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { AsciiBackground } from "@/components/home/AsciiBackground";
import { fadeUp, stagger } from "@/lib/motion";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-16 md:px-12 md:pb-28 md:pt-24 lg:px-16">
      <AsciiBackground />

      <motion.div
        className="relative mx-auto flex max-w-2xl flex-col items-center text-center"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeUp} className="relative mb-8">
          <div className="absolute inset-0 rounded-full bg-white/10 blur-2xl" />
          <div className="relative h-28 w-28 overflow-hidden rounded-full ring-1 ring-white/15 md:h-32 md:w-32">
            <Image
              src={site.portrait}
              alt={site.legalName}
              fill
              sizes="128px"
              className="object-cover object-[50%_22%]"
              priority
            />
          </div>
        </motion.div>
        <motion.p
          variants={fadeUp}
          className="max-w-xl font-display text-[23px] font-medium leading-[1.35] tracking-[-0.02em] text-fg md:text-[29px]"
        >
          {site.description}
        </motion.p>
        <motion.ul variants={fadeUp} className="mt-7 flex flex-wrap justify-center gap-2.5">
          {site.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-line bg-card px-3.5 py-1.5 text-[12px] text-muted"
            >
              {tag}
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
