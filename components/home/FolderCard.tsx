"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

export type FolderAccent = "red" | "green" | "blue";

export type FolderItem = {
  href?: string;
  title: string;
  description: string;
  image?: string;
  video?: string;
  kind?: "phone" | "desktop";
  sheets?: Array<{ image?: string; video?: string }>;
};

function unitFromSeed(seed: string, salt: number) {
  let hash = salt;
  for (let i = 0; i < seed.length; i += 1) {
    hash = Math.imul(hash ^ seed.charCodeAt(i), 16777619);
  }
  return (hash >>> 0) / 4294967296;
}

function randomDeg(seed: string, salt: number, min: number, max: number) {
  return min + unitFromSeed(seed, salt) * (max - min);
}

function folderAngles(seed: string): [number, number, number] {
  return [
    randomDeg(seed, 11, -26, -5),
    randomDeg(seed, 29, -10, 10),
    randomDeg(seed, 47, 6, 26),
  ];
}

const washes: Record<FolderAccent, string> = {
  red: "group-hover:[background-image:linear-gradient(145deg,rgba(196,48,48,0.42)_0%,rgba(120,24,24,0.18)_46%,transparent_100%)]",
  green:
    "group-hover:[background-image:linear-gradient(145deg,rgba(32,150,78,0.42)_0%,rgba(14,78,42,0.18)_46%,transparent_100%)]",
  blue: "group-hover:[background-image:linear-gradient(145deg,rgba(48,92,210,0.42)_0%,rgba(24,48,130,0.18)_46%,transparent_100%)]",
};

const washByHref: Record<string, FolderAccent> = {
  "/applications": "red",
  "/websites": "green",
  "/creative-explorations": "blue",
};

export function FolderCard({
  item,
  accent,
}: {
  item: FolderItem;
  accent?: FolderAccent;
}) {
  const rotations = folderAngles(item.href ?? item.title);
  const wash = washes[accent ?? (item.href ? washByHref[item.href] : undefined) ?? "red"];

  const card = (
    <article className="relative aspect-[3/2] w-full transition-transform duration-500 group-hover:-translate-y-0.5">
      <div
        className={cn(
          "absolute inset-0 overflow-hidden rounded-[28px] border border-line bg-[var(--line)] transition-[background] duration-500",
          wash,
        )}
      />

      <div
        className={cn(
          "absolute top-[2%] z-10",
          item.kind === "phone"
            ? "left-1/2 h-[72%] w-[26%] -translate-x-1/2"
            : "left-[22%] right-[22%] h-[52%]",
        )}
      >
        <Sheet
          rotate={rotations[0]}
          hoverRotate={rotations[0] - 9}
          hoverX="-12px"
          hoverY="-10px"
          className={item.sheets?.[0] ? cn("overflow-hidden bg-black", item.kind === "phone" && "rounded-[18px]") : undefined}
        >
          {item.sheets?.[0] ? <SheetMedia media={item.sheets[0]} /> : null}
        </Sheet>
        <Sheet
          rotate={rotations[1]}
          hoverRotate={rotations[1] - 1}
          hoverX="0px"
          hoverY="-14px"
          className={item.sheets?.[1] ? cn("overflow-hidden bg-black", item.kind === "phone" && "rounded-[18px]") : undefined}
        >
          {item.sheets?.[1] ? <SheetMedia media={item.sheets[1]} /> : null}
        </Sheet>
        <Sheet
          rotate={rotations[2]}
          hoverRotate={rotations[2] + 9}
          hoverX="12px"
          hoverY="-10px"
          className={cn(
            "overflow-hidden shadow-[0_12px_28px_rgba(0,0,0,0.35)]",
            item.kind === "phone" ? "rounded-[18px] bg-black" : "rounded-[12px] bg-white",
          )}
        >
          {item.video ? (
            <video
              className="h-full w-full object-cover object-top"
              src={item.video}
              poster={item.image}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden
            />
          ) : item.image ? (
            <Image
              src={item.image}
              alt=""
              fill
              sizes="(min-width: 768px) 18vw, 60vw"
              className="object-cover object-top"
            />
          ) : null}
        </Sheet>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 h-[50%] overflow-hidden rounded-b-[28px] border-x border-b border-line">
        <svg
          viewBox="0 0 400 56"
          preserveAspectRatio="none"
          aria-hidden
          className="relative z-10 block h-14 w-full text-card"
        >
          <path
            fill="currentColor"
            d="M0 56 V16 C0 6 8 0 18 0 H188 C204 0 212 8 222 18 C234 31 246 36 268 36 H400 V56 Z"
          />
          <path
            fill="none"
            stroke="var(--line-strong)"
            strokeWidth="1.25"
            vectorEffect="non-scaling-stroke"
            d="M0 16 C0 6 8 0 18 0 H188 C204 0 212 8 222 18 C234 31 246 36 268 36 H400"
          />
        </svg>
        <h3 className="absolute left-5 top-[22px] z-20 max-w-[52%] truncate font-display text-[19px] leading-none tracking-tight">
          {item.title}
        </h3>
        <div className="absolute inset-x-0 bottom-0 top-14 bg-card px-5 pt-1">
          <p className="line-clamp-3 text-[13.5px] leading-relaxed text-muted">
            {item.description}
          </p>
        </div>
      </div>
    </article>
  );

  const className =
    "group relative z-0 mx-auto block w-full max-w-folder pt-6 hover:z-10";

  if (item.href) {
    if (item.href.startsWith("/")) {
      return (
        <Link href={item.href} className={className}>
          {card}
        </Link>
      );
    }
    return (
      <a href={item.href} target="_blank" rel="noreferrer" className={className}>
        {card}
      </a>
    );
  }

  return <div className={className}>{card}</div>;
}

function Sheet({
  rotate,
  hoverRotate,
  hoverX,
  hoverY,
  className,
  children,
}: {
  rotate: number;
  hoverRotate: number;
  hoverX: string;
  hoverY: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "absolute inset-0 origin-bottom rounded-[14px] shadow-[0_10px_24px_rgba(0,0,0,0.28)] transition-transform duration-500 ease-out [transform:rotate(var(--r))] group-hover:[transform:translate(var(--hx),var(--hy))_rotate(var(--hr))]",
        !children && "bg-[#e8e8e8]",
        className,
      )}
      style={
        {
          "--r": `${rotate.toFixed(1)}deg`,
          "--hr": `${hoverRotate.toFixed(1)}deg`,
          "--hx": hoverX,
          "--hy": hoverY,
        } as React.CSSProperties
      }
    >
      {children ?? (
        <div className="space-y-1.5 px-4 pt-4">
          <span className="block h-1 w-[72%] rounded-full bg-black/10" />
          <span className="block h-1 w-[54%] rounded-full bg-black/10" />
          <span className="block h-1 w-[63%] rounded-full bg-black/10" />
        </div>
      )}
    </div>
  );
}

function SheetMedia({ media }: { media: { image?: string; video?: string } }) {
  if (media.video) {
    return (
      <video
        className="h-full w-full object-cover object-top"
        src={media.video}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
      />
    );
  }

  if (media.image) {
    return (
      <Image
        src={media.image}
        alt=""
        fill
        sizes="(min-width: 768px) 18vw, 60vw"
        className="object-cover object-top"
      />
    );
  }

  return null;
}
