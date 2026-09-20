import {
  getContributionCalendar,
  lastContribution,
  monthLabelsForWeeks,
  weeksFromDays,
} from "@/lib/github";
import { cn } from "@/lib/cn";

const LEVEL: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "bg-white/[0.06]",
  1: "bg-[#16382c]",
  2: "bg-[#1f6b4a]",
  3: "bg-[#2ea043]",
  4: "bg-[#56d364]",
};

function formatDate(date: string) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function formatDay(date: string, count: number) {
  const label = formatDate(date);
  if (count === 0) return `No contributions on ${label}`;
  return `${count} contribution${count === 1 ? "" : "s"} on ${label}`;
}

export function CommitMatrix() {
  const calendar = getContributionCalendar();
  if (!calendar) return null;

  const weeks = weeksFromDays(calendar.days);
  const months = monthLabelsForWeeks(weeks);
  const latest = lastContribution(calendar.days);

  return (
    <a
      href={calendar.href}
      target="_blank"
      rel="noreferrer"
      className="study-card mx-auto block w-full max-w-[36rem] px-4 py-4 text-left outline-offset-4 md:px-5 md:py-5"
      aria-label={`${calendar.total} GitHub contributions in the last year${latest ? `, last on ${formatDate(latest.date)}` : ""}`}
    >
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <p className="min-w-0 text-[12px] text-muted">
          {calendar.total.toLocaleString("en-US")} contributions last year
        </p>
        {calendar.repos != null ? (
          <p className="shrink-0 text-right text-[12px] text-dim">
            {calendar.repos.toLocaleString("en-US")}{" "}
            {calendar.repos === 1 ? "repository" : "repositories"}
          </p>
        ) : null}
      </div>
      <div aria-hidden="true" className="flex justify-end overflow-hidden">
        <div className="w-max shrink-0">
          <div
            className="mb-1.5 grid"
            style={{
              gridTemplateColumns: `repeat(${weeks.length}, 10px)`,
              columnGap: 3,
            }}
          >
            {months.map((month, index) => (
              <span
                key={`${month ?? "gap"}-${index}`}
                className="h-3 text-left text-[10px] leading-none text-dim"
              >
                {month}
              </span>
            ))}
          </div>
          <div
            className="grid"
            style={{
              gridAutoFlow: "column",
              gridTemplateRows: "repeat(7, 10px)",
              gridAutoColumns: 10,
              gap: 3,
            }}
          >
            {calendar.days.map((day) => (
              <span
                key={day.date}
                title={formatDay(day.date, day.count)}
                className={cn("size-2.5 rounded-[3px]", LEVEL[day.level])}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="mt-3 text-right text-[12px] text-dim">
        {latest
          ? `Last contribution on ${formatDate(latest.date)}`
          : "No contributions yet"}
      </p>
    </a>
  );
}
