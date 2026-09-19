import { site } from "@/content/site";

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

const USER_AGENT = "geohernandez-portfolio (https://geohernandez.xyz)";

function githubUsername() {
  return site.links.github.replace(/\/+$/, "").split("/").pop() ?? "geohndz";
}

function asLevel(value: number): ContributionDay["level"] {
  if (value <= 0) return 0;
  if (value >= 4) return 4;
  return value as 1 | 2 | 3;
}

function parseCount(label: string) {
  if (/^no contributions/i.test(label)) return 0;
  const match = label.match(/^(\d+)/);
  return match ? Number(match[1]) : 0;
}

async function fromGithubHtml(username: string): Promise<ContributionCalendar> {
  const response = await fetch(`https://github.com/users/${username}/contributions`, {
    headers: { "User-Agent": USER_AGENT, Accept: "text/html" },
    next: { revalidate: 3600 },
  });
  if (!response.ok) {
    throw new Error(`GitHub contributions responded ${response.status}`);
  }

  const html = await response.text();
  const totalMatch = html.match(/([\d,]+)\s+contributions/);
  const cells = [
    ...html.matchAll(
      /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="([0-4])"[^>]*>[\s\S]*?<tool-tip[^>]*>([^<]*)<\/tool-tip>/g,
    ),
  ];

  const days = cells
    .map(([, date, level, label]) => ({
      date,
      count: parseCount(label.trim()),
      level: asLevel(Number(level)),
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  if (days.length < 50) {
    throw new Error("GitHub contributions markup was missing days");
  }

  return {
    username,
    href: site.links.github,
    total: totalMatch ? Number(totalMatch[1].replaceAll(",", "")) : days.reduce((sum, day) => sum + day.count, 0),
    repos: null,
    days,
  };
}

async function fromPublicApi(username: string): Promise<ContributionCalendar> {
  const response = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
    { next: { revalidate: 3600 } },
  );
  if (!response.ok) {
    throw new Error(`Contributions API responded ${response.status}`);
  }

  const data = (await response.json()) as {
    total?: { lastYear?: number };
    contributions?: Array<{ date: string; count: number; level: number }>;
  };
  const days = (data.contributions ?? [])
    .map((day) => ({
      date: day.date,
      count: day.count,
      level: asLevel(day.level),
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  if (days.length < 50) {
    throw new Error("Contributions API returned no calendar");
  }

  return {
    username,
    href: site.links.github,
    total: data.total?.lastYear ?? days.reduce((sum, day) => sum + day.count, 0),
    repos: null,
    days,
  };
}

async function publicRepoCount(username: string) {
  const response = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "application/vnd.github+json",
    },
    next: { revalidate: 3600 },
  });
  if (!response.ok) return null;
  const data = (await response.json()) as { public_repos?: number };
  return typeof data.public_repos === "number" ? data.public_repos : null;
}

async function loadCalendar(username: string) {
  try {
    return await fromGithubHtml(username);
  } catch {
    return fromPublicApi(username);
  }
}

export async function getContributionCalendar(): Promise<ContributionCalendar | null> {
  const username = githubUsername();
  try {
    const [calendar, repos] = await Promise.all([
      loadCalendar(username),
      publicRepoCount(username).catch(() => null),
    ]);
    calendar.repos = repos;
    return calendar;
  } catch {
    return null;
  }
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
