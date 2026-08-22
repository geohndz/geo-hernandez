import { awards } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

type Award = (typeof awards)[number];

export function AwardList({ items }: { items: readonly Award[] }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((award) => (
        <Reveal key={`${award.title}-${award.date}`}>
          <li className="grid grid-cols-[1fr_auto] items-baseline gap-4 py-4 md:grid-cols-[1.4fr_1fr_auto]">
            <p className="text-[15px] font-medium tracking-tight">{award.title}</p>
            <p className="hidden text-sm text-muted md:block">{award.org}</p>
            <p className="text-right text-sm tabular-nums text-dim">{award.date}</p>
            <p className="col-span-2 text-sm text-muted md:hidden">{award.org}</p>
          </li>
        </Reveal>
      ))}
    </ul>
  );
}
