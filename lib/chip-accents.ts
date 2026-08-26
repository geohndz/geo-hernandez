/** Tag chip accents that activate on card hover. */
export const chipAccents = {
  purple:
    "transition-[border-color,background-color,color] duration-500 group-hover:border-[#a855f7]/80 group-hover:bg-[rgba(112,64,196,0.18)] group-hover:text-[#d4c4ff]",
  orange:
    "transition-[border-color,background-color,color] duration-500 group-hover:border-[#f59e4a]/80 group-hover:bg-[rgba(232,110,40,0.18)] group-hover:text-[#ffd2a8]",
  red: "transition-[border-color,background-color,color] duration-500 group-hover:border-[#f07171]/80 group-hover:bg-[rgba(196,48,48,0.18)] group-hover:text-[#ffc4c4]",
  navy:
    "transition-[border-color,background-color,color] duration-500 group-hover:border-[#6b8cff]/80 group-hover:bg-[rgba(32,58,140,0.22)] group-hover:text-[#c5d2ff]",
  ice: "transition-[border-color,background-color,color] duration-500 group-hover:border-[#5ec8e0]/80 group-hover:bg-[rgba(48,140,168,0.20)] group-hover:text-[#b8eaf5]",
  green:
    "transition-[border-color,background-color,color] duration-500 group-hover:border-[#4ade80]/70 group-hover:bg-[rgba(32,150,78,0.18)] group-hover:text-[#b6f0c8]",
  yellow:
    "transition-[border-color,background-color,color] duration-500 group-hover:border-[#f5c84a]/80 group-hover:bg-[rgba(234,186,36,0.18)] group-hover:text-[#ffe9a8]",
  blue: "transition-[border-color,background-color,color] duration-500 group-hover:border-[#6b8cff]/80 group-hover:bg-[rgba(48,92,210,0.20)] group-hover:text-[#c5d2ff]",
  teal: "transition-[border-color,background-color,color] duration-500 group-hover:border-[#2dd4bf]/70 group-hover:bg-[rgba(10,78,82,0.22)] group-hover:text-[#a8f0e8]",
} as const;

/** Category chips: tinted by default, solid fill on card hover. */
export const chipCategoryAccents = {
  purple:
    "border-[#a855f7]/80 bg-[rgba(112,64,196,0.18)] text-[#d4c4ff] transition-[border-color,background-color,color] duration-500 group-hover:border-[#a855f7] group-hover:bg-[#a855f7] group-hover:text-white",
  orange:
    "border-[#f59e4a]/80 bg-[rgba(232,110,40,0.18)] text-[#ffd2a8] transition-[border-color,background-color,color] duration-500 group-hover:border-[#f59e4a] group-hover:bg-[#f59e4a] group-hover:text-[#1a1008]",
  red: "border-[#f07171]/80 bg-[rgba(196,48,48,0.18)] text-[#ffc4c4] transition-[border-color,background-color,color] duration-500 group-hover:border-[#f07171] group-hover:bg-[#f07171] group-hover:text-[#1a0808]",
  navy:
    "border-[#6b8cff]/80 bg-[rgba(32,58,140,0.22)] text-[#c5d2ff] transition-[border-color,background-color,color] duration-500 group-hover:border-[#6b8cff] group-hover:bg-[#6b8cff] group-hover:text-[#0a1020]",
  ice: "border-[#5ec8e0]/80 bg-[rgba(48,140,168,0.20)] text-[#b8eaf5] transition-[border-color,background-color,color] duration-500 group-hover:border-[#5ec8e0] group-hover:bg-[#5ec8e0] group-hover:text-[#061418]",
  green:
    "border-[#4ade80]/70 bg-[rgba(32,150,78,0.18)] text-[#b6f0c8] transition-[border-color,background-color,color] duration-500 group-hover:border-[#4ade80] group-hover:bg-[#4ade80] group-hover:text-[#06140c]",
  yellow:
    "border-[#f5c84a]/80 bg-[rgba(234,186,36,0.18)] text-[#ffe9a8] transition-[border-color,background-color,color] duration-500 group-hover:border-[#f5c84a] group-hover:bg-[#f5c84a] group-hover:text-[#1a1408]",
  blue: "border-[#6b8cff]/80 bg-[rgba(48,92,210,0.20)] text-[#c5d2ff] transition-[border-color,background-color,color] duration-500 group-hover:border-[#6b8cff] group-hover:bg-[#6b8cff] group-hover:text-[#0a1020]",
  teal: "border-[#2dd4bf]/70 bg-[rgba(10,78,82,0.22)] text-[#a8f0e8] transition-[border-color,background-color,color] duration-500 group-hover:border-[#2dd4bf] group-hover:bg-[#2dd4bf] group-hover:text-[#061412]",
} as const;

export type ChipAccent = keyof typeof chipAccents;

export const chipBase =
  "rounded-full border border-line bg-card px-2.5 py-1 text-[11px] text-muted";

export const chipCategoryBase =
  "shrink-0 rounded-full border px-3 py-1 text-[12px] whitespace-nowrap";
