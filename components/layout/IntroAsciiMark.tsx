"use client";

import { useEffect, useRef } from "react";
import { LOGO_PATH, LOGO_VIEWBOX } from "./Logo";

const CHARS = ".:-=+*#%@&$<>[]{}()/\\!?01";

function pickChar() {
  return CHARS[(Math.random() * CHARS.length) | 0] ?? "#";
}

export function IntroAsciiMark() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const node = canvasRef.current;
    const graphics = node?.getContext("2d", { alpha: true });
    if (!node || !graphics) return;
    const canvas: HTMLCanvasElement = node;
    const ctx: CanvasRenderingContext2D = graphics;

    const started = performance.now();
    const fillMs = 1100;
    let raf = 0;
    let running = true;
    let mask: Uint8ClampedArray | null = null;
    let maskW = 0;
    let maskH = 0;
    const glyphs: string[] = [];

    function buildMask(width: number, height: number) {
      const off = document.createElement("canvas");
      off.width = width;
      off.height = height;
      const offCtx = off.getContext("2d");
      if (!offCtx) return;
      offCtx.clearRect(0, 0, width, height);
      offCtx.fillStyle = "#fff";
      offCtx.save();
      offCtx.scale(width / LOGO_VIEWBOX.width, height / LOGO_VIEWBOX.height);
      offCtx.fill(new Path2D(LOGO_PATH));
      offCtx.restore();
      const image = offCtx.getImageData(0, 0, width, height);
      mask = image.data;
      maskW = width;
      maskH = height;
    }

    function inside(x: number, y: number) {
      if (!mask) return false;
      const px = Math.min(maskW - 1, Math.max(0, x | 0));
      const py = Math.min(maskH - 1, Math.max(0, y | 0));
      return mask[(py * maskW + px) * 4 + 3]! > 40;
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.round(width));
      const h = Math.max(1, Math.round(height));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildMask(w, h);
    }

    function draw(now: number) {
      const { width, height } = canvas.getBoundingClientRect();
      if (width < 2 || height < 2 || !mask) return;

      const t = Math.min(1, (now - started) / fillMs);
      const fill = 1 - Math.pow(1 - t, 3);
      const cell = Math.max(12, Math.round(Math.min(width, height) / 24));
      const cols = Math.ceil(width / cell);
      const rows = Math.ceil(height / cell);
      const count = cols * rows;
      if (glyphs.length !== count) {
        glyphs.length = 0;
        for (let i = 0; i < count; i++) glyphs.push(pickChar());
      }

      ctx.clearRect(0, 0, width, height);
      ctx.font = `${Math.round(cell * 1.22)}px 'Pixelify Sans', ui-monospace, monospace`;
      ctx.textBaseline = "top";
      ctx.textAlign = "left";

      for (let y = 0; y < rows; y++) {
        const cy = y * cell + cell * 0.5;
        const filled = cy / height >= 1 - fill - 0.02;
        if (!filled) continue;

        for (let x = 0; x < cols; x++) {
          const cx = x * cell + cell * 0.45;
          if (!inside(cx, cy)) continue;
          const i = y * cols + x;
          if (Math.random() < 0.18) glyphs[i] = pickChar();
          const edge = Math.min(1, (cy - (1 - fill) * height) / (cell * 4));
          ctx.fillStyle = `rgba(212,212,212,${0.55 + edge * 0.45})`;
          ctx.fillText(glyphs[i] ?? "#", x * cell, y * cell);
        }
      }
    }

    function tick(now: number) {
      if (!running) return;
      draw(now);
      raf = requestAnimationFrame(tick);
    }

    resize();
    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="relative h-80 w-60 md:h-[400px] md:w-[295px]">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
