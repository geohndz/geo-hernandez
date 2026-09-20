import { writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const USERNAME = "geohndz";
const HREF = "https://github.com/geohndz";
const USER_AGENT = "geohernandez-portfolio (https://geohernandez.xyz)";
const OUT = join(dirname(fileURLToPath(import.meta.url)), "../content/github-contributions.json");

function asLevel(value) {
  if (value <= 0) return 0;
  if (value >= 4) return 4;
  return value;
}

async function loadCalendar() {
  const response = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`,
    { headers: { "User-Agent": USER_AGENT, Accept: "application/json" } },
  );
  if (!response.ok) {
    throw new Error(`Contributions API responded ${response.status}`);
  }

  const data = await response.json();
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
    total: data.total?.lastYear ?? days.reduce((sum, day) => sum + day.count, 0),
    days,
  };
}

async function publicRepoCount() {
  const response = await fetch(`https://api.github.com/users/${USERNAME}`, {
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "application/vnd.github+json",
    },
  });
  if (!response.ok) return null;
  const data = await response.json();
  return typeof data.public_repos === "number" ? data.public_repos : null;
}

try {
  const [calendar, repos] = await Promise.all([loadCalendar(), publicRepoCount().catch(() => null)]);
  writeFileSync(
    OUT,
    `${JSON.stringify(
      {
        username: USERNAME,
        href: HREF,
        total: calendar.total,
        repos,
        days: calendar.days,
      },
      null,
      2,
    )}\n`,
  );
  console.log(`Wrote ${calendar.days.length} days to ${OUT}`);
} catch (error) {
  if (existsSync(OUT)) {
    console.warn(`Snapshot failed; keeping existing file. ${error instanceof Error ? error.message : error}`);
    process.exit(0);
  }
  console.error(error);
  process.exit(1);
}
