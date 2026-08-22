"use client";

import { useEffect, useRef } from "react";

const RAMP = " .'`^\":;~-+<>i!lI?/\\|(){}[]*#%@";

export function AsciiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const node = canvasRef.current;
    const graphics = node?.getContext("2d");
    if (!node || !graphics) return;
    const canvas: HTMLCanvasElement = node;
    const ctx: CanvasRenderingContext2D = graphics;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: 0.5, y: 0.4, tx: 0.5, ty: 0.4 };
    let raf = 0;
    let running = true;
    let visible = true;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now());
    }

    function draw(time: number) {
      const { width, height } = canvas.getBoundingClientRect();
      if (width < 2 || height < 2) return;

      const ease = 1 - Math.exp(-0.045);
      pointer.x += (pointer.tx - pointer.x) * ease;
      pointer.y += (pointer.ty - pointer.y) * ease;

      const t = time / 1000;
      const cell = 14;
      const cols = Math.ceil(width / cell) + 1;
      const rows = Math.ceil(height / cell) + 1;

      ctx.clearRect(0, 0, width, height);
      ctx.font = "12px 'Pixelify Sans', ui-monospace, monospace";
      ctx.textBaseline = "top";
      ctx.fillStyle = "rgba(148, 148, 148, 0.2)";

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const nx = x / cols;
          const ny = y / rows;
          const dx = nx - pointer.x;
          const dy = ny - pointer.y;
          const falloff = Math.exp(-(dx * dx * 7 + dy * dy * 10));
          const wave =
            Math.sin(nx * 9.5 + t * 0.55) * Math.cos(ny * 8.2 - t * 0.42) +
            Math.sin((nx * 1.4 + ny) * 11 - t * 0.7) * 0.45 +
            falloff * 0.55;
          const n = Math.min(1, Math.max(0, wave * 0.5 + 0.5));
          const glyph = RAMP[(n * (RAMP.length - 1)) | 0];
          ctx.fillText(glyph, x * cell, y * cell);
        }
      }
    }

    function tick(now: number) {
      if (!running) return;
      draw(now);
      if (!motion.matches && visible) {
        raf = requestAnimationFrame(tick);
      }
    }

    function onPointerMove(event: PointerEvent) {
      const bounds = canvas.getBoundingClientRect();
      pointer.tx = (event.clientX - bounds.left) / Math.max(bounds.width, 1);
      pointer.ty = (event.clientY - bounds.top) / Math.max(bounds.height, 1);
    }

    resize();
    void document.fonts.ready.then(() => draw(performance.now()));
    raf = requestAnimationFrame(tick);

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const section = canvas.parentElement?.parentElement ?? canvas;
    section.addEventListener("pointermove", onPointerMove, { passive: true });

    const intersection = new IntersectionObserver((entries) => {
      visible = entries[entries.length - 1]?.isIntersecting ?? true;
      if (visible && !motion.matches) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(tick);
      }
    });
    intersection.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
      intersection.disconnect();
      section.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden select-none [mask-image:radial-gradient(ellipse_72%_82%_at_50%_42%,black_18%,rgba(0,0,0,0.72)_48%,rgba(0,0,0,0.28)_68%,transparent_82%)] [-webkit-mask-image:radial-gradient(ellipse_72%_82%_at_50%_42%,black_18%,rgba(0,0,0,0.72)_48%,rgba(0,0,0,0.28)_68%,transparent_82%)]"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
