"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const VIEW_H = 225;
const GROUND_Y = 201;
const PX = 2;
const GRAVITY = 3100;
const JUMP_V = -720;
const DUCK_FALL_BOOST = 3.2;
const START_SPEED = 300;
const MAX_SPEED = 620;
const ACCELERATION = 8;
const DINO_X = 26;
// Airtime is 2 * JUMP_V / GRAVITY, so obstacles never spawn closer than one jump.
const MIN_GAP_SECONDS = 0.55;
const HIGH_SCORE_KEY = "geo-dino-high";

const DINO_BODY = [
  "............######....",
  "...........#########..",
  "...........###.######.",
  "...........##########.",
  "...........#########..",
  "...........#####......",
  "..........########....",
  "#.........#######.....",
  "##.....###########....",
  "###...############....",
  "##################....",
  ".##################...",
  "..###############.##..",
  "...#############......",
  "....###########.......",
  ".....#########........",
  ".....########.........",
  ".....########.........",
];

const DINO_LEGS_STAND = [
  ".....##..##...........",
  ".....##..##...........",
  ".....#...#............",
  "....###.###...........",
];

const DINO_LEGS_A = [
  ".....##..##...........",
  ".....##..##...........",
  ".....##...............",
  "....###...............",
];

const DINO_LEGS_B = [
  ".....##..##...........",
  ".....##..##...........",
  ".........##...........",
  ".........###..........",
];

const DINO_DUCK_BODY = [
  "................######....",
  "...............#########..",
  "...............###.######.",
  "...............##########.",
  "...............#########..",
  "#####..........#####......",
  "####################......",
  "######################....",
  "#####################.....",
  "..###################.....",
];

const DINO_DUCK_LEGS_A = [
  "....####....####..........",
  "...####......####.........",
];

const DINO_DUCK_LEGS_B = [
  "....####....####..........",
  "....####......####........",
];

const CACTUS_SMALL = [
  "...###....",
  "...###....",
  "...###....",
  "#..###....",
  "#..###..#.",
  "#..###..#.",
  "######..#.",
  "...###..#.",
  "...######.",
  "...###....",
  "...###....",
  "...###....",
  "...###....",
  "...###....",
];

const CACTUS_LARGE = [
  "....####.....",
  "....####.....",
  "....####.....",
  "....####.....",
  "##..####.....",
  "##..####..##.",
  "##..####..##.",
  "##..####..##.",
  "########..##.",
  "....####..##.",
  "....########.",
  "....####.....",
  "....####.....",
  "....####.....",
  "....####.....",
  "....####.....",
  "....####.....",
  "....####.....",
];

const BIRD_WING_UP = [
  "..........###...",
  ".........####...",
  "........####....",
  ".......####.....",
  "......####......",
  ".....#########..",
  "##############..",
  "......########..",
  "................",
  "................",
  "................",
  "................",
];

const BIRD_WING_DOWN = [
  "................",
  "................",
  "................",
  "................",
  "................",
  ".....#########..",
  "##############..",
  "......########..",
  "......####......",
  ".......####.....",
  "........####....",
  ".........###....",
];

const CLOUD = [
  "....#####....",
  "..#########..",
  ".###########.",
  "#############",
  "..#########..",
];

type Phase = "idle" | "running" | "over";

type Obstacle = {
  kind: "cactus" | "bird";
  x: number;
  y: number;
  width: number;
  height: number;
  rows: string[];
  count: number;
  flap: number;
  insetX: number;
  insetY: number;
};

function spriteSize(rows: string[]) {
  return { width: (rows[0]?.length ?? 0) * PX, height: rows.length * PX };
}

const DINO_SIZE = {
  width: spriteSize(DINO_BODY).width,
  height: (DINO_BODY.length + DINO_LEGS_A.length) * PX,
};

// First row of the bird sprite the body occupies; above and below it is wing sweep.
const BIRD_BODY_TOP = 5 * PX;

const DUCK_SIZE = {
  width: spriteSize(DINO_DUCK_BODY).width,
  height: (DINO_DUCK_BODY.length + DINO_DUCK_LEGS_A.length) * PX,
};

function drawSprite(
  ctx: CanvasRenderingContext2D,
  rows: string[],
  x: number,
  y: number,
) {
  for (let row = 0; row < rows.length; row += 1) {
    const line = rows[row]!;
    let run = 0;
    for (let col = 0; col <= line.length; col += 1) {
      if (line[col] === "#") {
        run += 1;
        continue;
      }
      if (run > 0) {
        ctx.fillRect(x + (col - run) * PX, y + row * PX, run * PX, PX);
        run = 0;
      }
    }
  }
}

function makeCactus(viewW: number): Obstacle {
  const large = Math.random() > 0.55;
  const rows = large ? CACTUS_LARGE : CACTUS_SMALL;
  const roll = Math.random();
  const count = large ? (roll > 0.55 ? 2 : 1) : roll > 0.75 ? 3 : roll > 0.35 ? 2 : 1;
  const { width, height } = spriteSize(rows);
  return {
    kind: "cactus",
    x: viewW + 12,
    y: GROUND_Y - height,
    width: width * count - (count - 1) * 2 * PX,
    height,
    rows,
    count,
    flap: 0,
    insetX: 3,
    insetY: 3,
  };
}

function makeBird(viewW: number): Obstacle {
  const { width, height } = spriteSize(BIRD_WING_UP);
  // Low birds have to be jumped, high ones fly clear over the dino's head.
  // Both leave room for the wing sweep so it never clips the ground or the dino.
  const low = GROUND_Y - height - 2;
  const high = GROUND_Y - DINO_SIZE.height - 4 - height;
  const y = Math.random() > 0.4 ? low : high;
  return {
    kind: "bird",
    x: viewW + 12,
    y,
    width,
    height,
    rows: BIRD_WING_UP,
    count: 1,
    flap: 0,
    insetX: 3,
    insetY: BIRD_BODY_TOP - 1,
  };
}

export function DinoGame({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scoreRef = useRef<HTMLSpanElement>(null);
  const highRef = useRef<HTMLSpanElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const phaseRef = useRef<Phase>("idle");

  const game = useRef({
    viewW: 600,
    scale: 1,
    speed: START_SPEED,
    score: 0,
    high: 0,
    dinoY: 0,
    vy: 0,
    ducking: false,
    legTimer: 0,
    legFrame: 0,
    sinceBird: 0,
    gapToNext: 400,
    obstacles: [] as Obstacle[],
    clouds: [] as { x: number; y: number }[],
    dots: [] as { x: number; row: number; width: number }[],
    overAt: 0,
  });

  const setPhaseBoth = useCallback((next: Phase) => {
    phaseRef.current = next;
    setPhase(next);
  }, []);

  const reset = useCallback(() => {
    const state = game.current;
    state.speed = START_SPEED;
    state.score = 0;
    state.dinoY = 0;
    state.vy = 0;
    state.legFrame = 0;
    state.sinceBird = 0;
    state.obstacles = [];
    state.gapToNext = state.viewW * 0.75;
    state.overAt = 0;
    if (scoreRef.current) scoreRef.current.textContent = "00000";
  }, []);

  const jump = useCallback(() => {
    const state = game.current;
    if (phaseRef.current === "idle") {
      reset();
      setPhaseBoth("running");
      state.vy = JUMP_V;
      return;
    }
    if (phaseRef.current === "over") {
      if (performance.now() - state.overAt < 350) return;
      reset();
      setPhaseBoth("running");
      return;
    }
    if (state.dinoY === 0) state.vy = JUMP_V;
  }, [reset, setPhaseBoth]);

  useEffect(() => {
    const stored = Number(window.localStorage.getItem(HIGH_SCORE_KEY) ?? 0);
    const high = Number.isFinite(stored) ? stored : 0;
    game.current.high = high;
    if (highRef.current) {
      highRef.current.textContent = String(high).padStart(5, "0");
    }
  }, []);

  useEffect(() => {
    const node = canvasRef.current;
    const wrapNode = wrapRef.current;
    const graphics = node?.getContext("2d");
    if (!node || !wrapNode || !graphics) return;
    const canvas: HTMLCanvasElement = node;
    const wrap: HTMLDivElement = wrapNode;
    const ctx: CanvasRenderingContext2D = graphics;

    const state = game.current;

    function seedScenery() {
      state.clouds = Array.from({ length: 5 }, (_, i) => ({
        x: (state.viewW / 5) * i + 40,
        y: 14 + Math.random() * 64,
      }));
      state.dots = Array.from({ length: 36 }, () => ({
        x: Math.random() * state.viewW,
        row: Math.floor(Math.random() * 4),
        width: (1 + Math.floor(Math.random() * 3)) * PX,
      }));
    }

    function resize() {
      const width = wrap.clientWidth;
      if (!width) return;
      const viewW = width < 480 ? 380 : 720;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const scale = width / viewW;
      state.viewW = viewW;
      state.scale = scale * dpr;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(VIEW_H * scale * dpr);
      canvas.style.height = `${VIEW_H * scale}px`;
      if (state.clouds.length === 0) seedScenery();
    }

    resize();
    const sizeObserver = new ResizeObserver(resize);
    sizeObserver.observe(wrap);

    let raf = 0;
    let last = 0;
    let visible = true;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function spawn() {
      state.sinceBird += 1;
      const bird = state.speed > 340 && state.sinceBird > 1 && Math.random() > 0.55;
      if (bird) state.sinceBird = 0;
      const obstacle = bird ? makeBird(state.viewW) : makeCactus(state.viewW);
      state.obstacles.push(obstacle);
      state.gapToNext =
        obstacle.width + state.speed * (MIN_GAP_SECONDS + Math.random() * 0.7);
    }

    function hits(obstacle: Obstacle) {
      const size = state.ducking && state.dinoY === 0 ? DUCK_SIZE : DINO_SIZE;
      const top = GROUND_Y - size.height + state.dinoY;
      const ax = DINO_X + 4;
      const ay = top + 4;
      const aw = size.width - 12;
      const ah = size.height - 6;
      const bx = obstacle.x + obstacle.insetX;
      const by = obstacle.y + obstacle.insetY;
      const bw = obstacle.width - obstacle.insetX * 2;
      const bh = obstacle.height - obstacle.insetY * 2;
      return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
    }

    function endRun() {
      state.overAt = performance.now();
      const score = Math.floor(state.score);
      if (score > state.high) {
        state.high = score;
        window.localStorage.setItem(HIGH_SCORE_KEY, String(score));
        if (highRef.current) {
          highRef.current.textContent = String(score).padStart(5, "0");
        }
      }
      setPhaseBoth("over");
    }

    function update(dt: number) {
      const running = phaseRef.current === "running";

      if (running) {
        state.speed = Math.min(MAX_SPEED, state.speed + ACCELERATION * dt);
        const travel = state.speed * dt;
        state.score += travel * 0.06;

        state.gapToNext -= travel;
        if (state.gapToNext <= 0) spawn();

        for (const obstacle of state.obstacles) {
          obstacle.x -= travel * (obstacle.kind === "bird" ? 1.18 : 1);
          if (obstacle.kind === "bird") obstacle.flap += dt;
        }
        state.obstacles = state.obstacles.filter((item) => item.x + item.width > -24);

        for (const dot of state.dots) {
          dot.x -= travel;
          if (dot.x < -8) {
            dot.x = state.viewW + Math.random() * 40;
            dot.row = Math.floor(Math.random() * 4);
          }
        }

        const gravity =
          state.ducking && state.dinoY < 0 ? GRAVITY * DUCK_FALL_BOOST : GRAVITY;
        state.vy += gravity * dt;
        state.dinoY = Math.min(0, state.dinoY + state.vy * dt);
        if (state.dinoY === 0) state.vy = 0;

        state.legTimer += dt;
        if (state.legTimer > 0.09) {
          state.legTimer = 0;
          state.legFrame = state.legFrame === 0 ? 1 : 0;
        }

        if (state.obstacles.some(hits)) endRun();

        if (scoreRef.current) {
          scoreRef.current.textContent = String(Math.floor(state.score)).padStart(5, "0");
        }
      }

      const drift = (running ? state.speed * 0.16 : reduceMotion ? 0 : 12) * dt;
      for (const cloud of state.clouds) {
        cloud.x -= drift;
        if (cloud.x < -30) {
          cloud.x = state.viewW + Math.random() * 90;
          cloud.y = 14 + Math.random() * 64;
        }
      }
    }

    function draw() {
      ctx.setTransform(state.scale, 0, 0, state.scale, 0, 0);
      ctx.clearRect(0, 0, state.viewW, VIEW_H);

      ctx.fillStyle = "rgba(245,245,245,0.16)";
      for (const cloud of state.clouds) {
        drawSprite(ctx, CLOUD, Math.round(cloud.x), Math.round(cloud.y));
      }

      ctx.fillStyle = "rgba(245,245,245,0.34)";
      ctx.fillRect(0, GROUND_Y, state.viewW, PX);
      for (const dot of state.dots) {
        ctx.fillRect(Math.round(dot.x), GROUND_Y + (dot.row + 1) * PX, dot.width, PX);
      }

      ctx.fillStyle = "#f5f5f5";
      for (const obstacle of state.obstacles) {
        if (obstacle.kind === "cactus") {
          const step = spriteSize(obstacle.rows).width - 2 * PX;
          for (let i = 0; i < obstacle.count; i += 1) {
            drawSprite(ctx, obstacle.rows, Math.round(obstacle.x + i * step), obstacle.y);
          }
        } else {
          const wings = Math.floor(obstacle.flap * 5) % 2 === 0 ? BIRD_WING_UP : BIRD_WING_DOWN;
          drawSprite(ctx, wings, Math.round(obstacle.x), obstacle.y);
        }
      }

      const airborne = state.dinoY < 0;
      const ducking = state.ducking && !airborne && phaseRef.current === "running";
      if (ducking) {
        const top = GROUND_Y - DUCK_SIZE.height;
        drawSprite(ctx, DINO_DUCK_BODY, DINO_X, top);
        drawSprite(
          ctx,
          state.legFrame === 0 ? DINO_DUCK_LEGS_A : DINO_DUCK_LEGS_B,
          DINO_X,
          top + DINO_DUCK_BODY.length * PX,
        );
        return;
      }

      const top = GROUND_Y - DINO_SIZE.height + state.dinoY;
      drawSprite(ctx, DINO_BODY, DINO_X, top);
      const legs =
        phaseRef.current !== "running" || airborne
          ? DINO_LEGS_STAND
          : state.legFrame === 0
            ? DINO_LEGS_A
            : DINO_LEGS_B;
      drawSprite(ctx, legs, DINO_X, top + DINO_BODY.length * PX);
    }

    function frame(now: number) {
      if (!visible) return;
      const dt = last === 0 ? 0 : Math.min((now - last) / 1000, 1 / 30);
      last = now;
      update(dt);
      draw();
      raf = requestAnimationFrame(frame);
    }

    const inView = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting);
        cancelAnimationFrame(raf);
        if (!visible) return;
        last = 0;
        raf = requestAnimationFrame(frame);
      },
      { threshold: 0 },
    );
    inView.observe(canvas);

    raf = requestAnimationFrame(frame);

    function onBlur() {
      state.ducking = false;
    }
    window.addEventListener("blur", onBlur);

    return () => {
      cancelAnimationFrame(raf);
      sizeObserver.disconnect();
      inView.disconnect();
      window.removeEventListener("blur", onBlur);
    };
  }, [setPhaseBoth]);

  return (
    <div
      ref={wrapRef}
      tabIndex={0}
      role="application"
      aria-label="Dino runner mini game. Press space to jump, arrow down to duck."
      onKeyDown={(event) => {
        if (event.code === "Space" || event.code === "ArrowUp") {
          event.preventDefault();
          jump();
        }
        if (event.code === "ArrowDown") {
          event.preventDefault();
          game.current.ducking = true;
        }
      }}
      onKeyUp={(event) => {
        if (event.code === "ArrowDown") game.current.ducking = false;
      }}
      onPointerDown={(event) => {
        event.preventDefault();
        wrapRef.current?.focus();
        jump();
      }}
      className={cn(
        "relative w-full cursor-pointer touch-none select-none overflow-hidden rounded-[20px] border border-line bg-card/60 outline-none transition-colors hover:border-line-strong focus-visible:border-line-strong",
        className,
      )}
    >
      <canvas ref={canvasRef} className="block w-full" />

      <div className="pointer-events-none absolute right-4 top-3 flex gap-3 font-pixel text-[13px] tracking-[0.14em]">
        <span className="text-dim">
          HI <span ref={highRef}>00000</span>
        </span>
        <span className="text-fg" ref={scoreRef}>
          00000
        </span>
      </div>

      {phase !== "running" ? (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1 text-center">
          {phase === "over" ? (
            <p className="font-pixel text-[15px] tracking-[0.22em] text-fg">GAME OVER</p>
          ) : null}
          <p className="font-pixel text-[12px] tracking-[0.16em] text-dim">
            {phase === "over" ? "SPACE OR TAP TO RUN AGAIN" : "CLICK OR TAP TO START"}
          </p>
          {phase === "idle" ? (
            <p className="font-pixel text-[11px] tracking-[0.14em] text-dim/70">
              SPACE TO JUMP · DOWN TO DUCK
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
