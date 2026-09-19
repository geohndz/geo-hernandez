import { cn } from "@/lib/cn";

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <rect x="6.5" y="5.5" width="3.75" height="13" rx="1.2" fill="currentColor" />
      <rect x="13.75" y="5.5" width="3.75" height="13" rx="1.2" fill="currentColor" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        d="M8.2 5.6c0-.7.76-1.12 1.35-.76l9.1 5.4c.58.35.58 1.17 0 1.52l-9.1 5.4c-.59.36-1.35-.06-1.35-.76V5.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function PlayPauseGlyph({ playing }: { playing: boolean }) {
  const layer =
    "absolute inset-0 grid place-items-center transition-[opacity,transform] duration-[160ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";

  return (
    <span className="relative block h-4 w-4">
      <span
        className={cn(
          layer,
          playing ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0",
        )}
      >
        <PauseIcon />
      </span>
      <span
        className={cn(
          layer,
          playing ? "pointer-events-none scale-95 opacity-0" : "scale-100 opacity-100",
        )}
      >
        <PlayIcon />
      </span>
    </span>
  );
}
