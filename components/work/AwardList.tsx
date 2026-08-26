import { awards } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

type Award = (typeof awards)[number];

const logos: Record<string, string> = {
  "Pensacola Christian College": "/media/awards/pcc.png",
  "Communication Arts": "/media/awards/communication-arts.png",
  "American Advertising Federation": "/media/awards/aaf.png",
};

const logoOnWhite = new Set(["American Advertising Federation"]);

function OrgLogo({ org, className }: { org: string; className?: string }) {
  const logo = logos[org];
  if (!logo) return null;
  return (
    <div
      className={cn(
        logoOnWhite.has(org)
          ? "flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white p-2"
          : "h-16 w-16 overflow-hidden rounded-2xl",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo}
        alt=""
        className={
          logoOnWhite.has(org)
            ? "h-full w-full object-contain"
            : "h-full w-full object-cover"
        }
      />
    </div>
  );
}

export function AwardList({ items }: { items: readonly Award[] }) {
  return (
    <ul className="flex flex-wrap justify-center gap-4">
      {items.map((award) => {
        const mark = "mark" in award ? award.mark : undefined;
        return (
          <Reveal
            key={`${award.title}-${award.date}`}
            className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc((100%-2rem)/3)]"
          >
            <li
              className={cn(
                "flex h-full overflow-hidden rounded-[22px] border border-line bg-card p-5",
                mark ? "flex-row items-center gap-4" : "flex-col",
              )}
            >
              {mark ? (
                <>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <OrgLogo org={award.org} className="mb-5" />
                    <p className="font-display text-[18px] font-medium tracking-tight">
                      {award.title}
                    </p>
                    <p className="mt-2 text-[14px] text-muted">{award.org}</p>
                    <p className="mt-auto pt-4 text-[13px] tabular-nums text-dim">
                      {award.date}
                    </p>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={mark}
                    alt=""
                    className="h-[110px] w-auto shrink-0 drop-shadow-[0_8px_18px_rgba(0,0,0,0.45)] sm:h-[120px]"
                  />
                </>
              ) : (
                <>
                  <OrgLogo org={award.org} className="mb-5" />
                  <p className="font-display text-[18px] font-medium tracking-tight">
                    {award.title}
                  </p>
                  <p className="mt-2 text-[14px] text-muted">{award.org}</p>
                  <p className="mt-auto pt-4 text-[13px] tabular-nums text-dim">
                    {award.date}
                  </p>
                </>
              )}
            </li>
          </Reveal>
        );
      })}
    </ul>
  );
}
