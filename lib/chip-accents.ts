/** White filled category pill for cards without a hover state. */
export const chipCategoryWhite =
  "border-white/90 bg-white text-[#0a0a0a]";

/** White outlined category pill for cards without a hover state. */
export const chipCategoryWhiteOutline =
  "border-white/80 bg-transparent text-white";

/** Tag chip shell — no color tokens; pair with chipAccentsActive or chipAccents. */
export const chipTagBase =
  "rounded-full border px-2.5 py-1 text-[11px]";

/** Tag chip accents always on (no hover). Use on cards without a hover state. */
export const chipAccentsActive = {
  purple: "border-[#c4b5fd] bg-[#2a1848] text-[#f3edff]",
  orange: "border-[#ffb86a] bg-[#3d220e] text-[#ffe8cc]",
  red: "border-[#f5a8a8] bg-[#3d1414] text-[#ffe8e8]",
  navy: "border-[#9db4ff] bg-[#1a2a5c] text-[#e8eeff]",
  ice: "border-[#7ed4e8] bg-[#0d3340] text-[#e3f7fb]",
  green: "border-[#6ee7a0] bg-[#0d3d22] text-[#dcffe8]",
  yellow: "border-[#f5d56a] bg-[#3d3208] text-[#fff3c4]",
  blue: "border-[#9db4ff] bg-[#1a2f6e] text-[#e8eeff]",
  teal: "border-[#5eead4] bg-[#0a3d3d] text-[#d9faf5]",
} as const;

/** Default tinted category chip styles (no hover). */
export const chipCategoryAccents = {
  purple: "border-[#c4b5fd] bg-[#2a1848] text-[#f3edff]",
  orange: "border-[#ffb86a] bg-[#3d220e] text-[#ffe8cc]",
  red: "border-[#f5a8a8] bg-[#3d1414] text-[#ffe8e8]",
  navy: "border-[#9db4ff] bg-[#1a2a5c] text-[#e8eeff]",
  ice: "border-[#7ed4e8] bg-[#0d3340] text-[#e3f7fb]",
  green: "border-[#6ee7a0] bg-[#0d3d22] text-[#dcffe8]",
  yellow: "border-[#f5d56a] bg-[#3d3208] text-[#fff3c4]",
  blue: "border-[#9db4ff] bg-[#1a2f6e] text-[#e8eeff]",
  teal: "border-[#5eead4] bg-[#0a3d3d] text-[#d9faf5]",
} as const;

/** Tag chip accents that activate on card hover. Only use on cards with a hover state. */
export const chipAccents = {
  purple:
    "transition-[border-color,background-color,color] duration-200 group-hover:border-[#c4b5fd] group-hover:bg-[#2a1848] group-hover:text-[#f3edff]",
  orange:
    "transition-[border-color,background-color,color] duration-200 group-hover:border-[#ffb86a] group-hover:bg-[#3d220e] group-hover:text-[#ffe8cc]",
  red: "transition-[border-color,background-color,color] duration-200 group-hover:border-[#f5a8a8] group-hover:bg-[#3d1414] group-hover:text-[#ffe8e8]",
  navy:
    "transition-[border-color,background-color,color] duration-200 group-hover:border-[#9db4ff] group-hover:bg-[#1a2a5c] group-hover:text-[#e8eeff]",
  ice: "transition-[border-color,background-color,color] duration-200 group-hover:border-[#7ed4e8] group-hover:bg-[#0d3340] group-hover:text-[#e3f7fb]",
  green:
    "transition-[border-color,background-color,color] duration-200 group-hover:border-[#6ee7a0] group-hover:bg-[#0d3d22] group-hover:text-[#dcffe8]",
  yellow:
    "transition-[border-color,background-color,color] duration-200 group-hover:border-[#f5d56a] group-hover:bg-[#3d3208] group-hover:text-[#fff3c4]",
  blue:
    "transition-[border-color,background-color,color] duration-200 group-hover:border-[#9db4ff] group-hover:bg-[#1a2f6e] group-hover:text-[#e8eeff]",
  teal:
    "transition-[border-color,background-color,color] duration-200 group-hover:border-[#5eead4] group-hover:bg-[#0a3d3d] group-hover:text-[#d9faf5]",
} as const;

/** Category chips: solid fill always on. Use on cards without a hover state. */
export const chipCategoryFilled = {
  purple: "border-[#6d28d9] bg-[#6d28d9] text-white",
  orange: "border-[#f59e4a] bg-[#f59e4a] text-[#1c1005]",
  red: "border-[#c53030] bg-[#c53030] text-white",
  navy: "border-[#3b5bdb] bg-[#3b5bdb] text-white",
  ice: "border-[#5ec8e0] bg-[#5ec8e0] text-[#083344]",
  green: "border-[#4ade80] bg-[#4ade80] text-[#052e16]",
  yellow: "border-[#f5c84a] bg-[#f5c84a] text-[#1a1400]",
  blue: "border-[#3b5bdb] bg-[#3b5bdb] text-white",
  teal: "border-[#2dd4bf] bg-[#2dd4bf] text-[#042f2e]",
} as const;

/** Category chips: solid fill on card hover. Only use on cards with a hover state. */
export const chipCategoryHover = {
  purple:
    "transition-[border-color,background-color,color] duration-200 group-hover:border-[#6d28d9] group-hover:bg-[#6d28d9] group-hover:text-white",
  orange:
    "transition-[border-color,background-color,color] duration-200 group-hover:border-[#f59e4a] group-hover:bg-[#f59e4a] group-hover:text-[#1c1005]",
  red: "transition-[border-color,background-color,color] duration-200 group-hover:border-[#c53030] group-hover:bg-[#c53030] group-hover:text-white",
  navy:
    "transition-[border-color,background-color,color] duration-200 group-hover:border-[#3b5bdb] group-hover:bg-[#3b5bdb] group-hover:text-white",
  ice: "transition-[border-color,background-color,color] duration-200 group-hover:border-[#5ec8e0] group-hover:bg-[#5ec8e0] group-hover:text-[#083344]",
  green:
    "transition-[border-color,background-color,color] duration-200 group-hover:border-[#4ade80] group-hover:bg-[#4ade80] group-hover:text-[#052e16]",
  yellow:
    "transition-[border-color,background-color,color] duration-200 group-hover:border-[#f5c84a] group-hover:bg-[#f5c84a] group-hover:text-[#1a1400]",
  blue:
    "transition-[border-color,background-color,color] duration-200 group-hover:border-[#3b5bdb] group-hover:bg-[#3b5bdb] group-hover:text-white",
  teal:
    "transition-[border-color,background-color,color] duration-200 group-hover:border-[#2dd4bf] group-hover:bg-[#2dd4bf] group-hover:text-[#042f2e]",
} as const;

export type ChipAccent = keyof typeof chipAccents;

export const chipBase =
  "rounded-full border border-line bg-card px-2.5 py-1 text-[11px] text-white";

export const chipCategoryBase =
  "shrink-0 rounded-full border px-3 py-1 text-[12px] whitespace-nowrap";
