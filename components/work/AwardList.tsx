import { awards } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

type Award = (typeof awards)[number];

const logos: Record<string, string> = {
  "Pensacola Christian College": "/media/awards/pcc.png",
  "Communication Arts": "/media/awards/communication-arts.png",
  "American Advertising Federation": "/media/awards/aaf.png",
};

const logoOnWhite = new Set(["American Advertising Federation"]);

export function AwardList({ items }: { items: readonly Award[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((award) => {
        const logo = logos[award.org];
        return (
          <Reveal key={`${award.title}-${award.date}`}>
            <li className="flex h-full flex-col rounded-[22px] border border-line bg-card p-5">
              {logo ? (
                <div
                  className={
                    logoOnWhite.has(award.org)
                      ? "mb-5 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white p-2"
                      : "mb-5 h-16 w-16 overflow-hidden rounded-2xl"
                  }
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo}
                    alt=""
                    className={
                      logoOnWhite.has(award.org)
                        ? "h-full w-full object-contain"
                        : "h-full w-full object-cover"
                    }
                  />
                </div>
              ) : null}
              <p className="font-display text-[18px] font-medium tracking-tight">
                {award.title}
              </p>
              <p className="mt-2 text-[14px] text-muted">{award.org}</p>
              <p className="mt-auto pt-4 text-[13px] tabular-nums text-dim">
                {award.date}
              </p>
            </li>
          </Reveal>
        );
      })}
    </ul>
  );
}
