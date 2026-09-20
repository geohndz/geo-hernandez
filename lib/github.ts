import snapshot from "@/content/github-contributions.json";

export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type ContributionCalendar = {
  username: string;
  href: string;
  total: number;
  repos: number | null;
  days: ContributionDay[];
};

function asLevel(value: number): ContributionDay["level"] {
  if (value <= 0) return 0;
  if (value >= 4) return 4;
  return value as 1 | 2 | 3;
}

export function getContributionCalendar(): ContributionCalendar | null {
  if (!snapshot.days?.length) return null;

  return {
    username: snapshot.username,
    href: snapshot.href,
    total: snapshot.total,
    repos: snapshot.repos,
    days: snapshot.days.map((day) => ({
      date: day.date,
      count: day.count,
      level: asLevel(day.level),
    })),
  };
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function weeksFromDays(days: ContributionDay[]) {
  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

export function lastContribution(days: ContributionDay[]) {
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) return days[i];
  }
  return null;
}

export function monthLabelsForWeeks(weeks: ContributionDay[][]) {
  return weeks.map((week, index) => {
    const firstOfMonth = week.find((day) => day.date.endsWith("-01"));
    if (firstOfMonth) {
      return MONTHS[Number(firstOfMonth.date.slice(5, 7)) - 1];
    }
    if (index === 0 && week[0]) {
      return MONTHS[Number(week[0].date.slice(5, 7)) - 1];
    }
    return null;
  });
}
