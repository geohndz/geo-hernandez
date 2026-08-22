import { Lightbulb, Puzzle } from "lucide-react";

function F1ProblemStill({
  src,
  alt,
  label,
}: {
  src: string;
  alt: string;
  label: string;
}) {
  return (
    <figure>
      <div className="overflow-hidden rounded-[10px] bg-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="h-auto w-full" />
      </div>
      <figcaption className="mt-3 text-[15px] text-muted">{label}</figcaption>
    </figure>
  );
}

export function F1Why() {
  const left = [
    {
      src: "/media/formula-1/problem/broadcast-feed.png",
      label: "Broadcast feed",
      alt: "F1 TV Premium collage of live race feeds",
    },
    {
      src: "/media/formula-1/problem/team-radio.png",
      label: "Team radio",
      alt: "Hamilton team radio transcript overlay",
    },
    {
      src: "/media/formula-1/problem/track-data.png",
      label: "Track Data",
      alt: "Malaysian Grand Prix circuit map with sector data",
    },
  ];
  const right = [
    {
      src: "/media/formula-1/problem/driver-telemetry.png",
      label: "Driver Telemetry",
      alt: "F1 driver telemetry dashboard with track map and gauges",
    },
    {
      src: "/media/formula-1/problem/onboard-cameras.png",
      label: "Onboard cameras",
      alt: "Onboard camera view behind Lewis Hamilton",
    },
    {
      src: "/media/formula-1/problem/leaderboards.png",
      label: "Leaderboards",
      alt: "Formula 1 live leaderboard graphic",
    },
  ];

  return (
    <>
      <div className="study-text mt-2">
        <div className="study-card px-6 py-6 md:px-8 md:py-7">
          <h3 className="font-display text-[20px] font-medium tracking-tight text-fg md:text-[22px]">
            Why This Project?
          </h3>
          <p className="mt-3 text-[16px] leading-[1.75] text-muted">
            Unlike most projects, this did not start with a complaint. It started
            with a gap.
          </p>
        </div>
        <p className="mt-10 text-center text-[16px] leading-[1.75] text-muted">
          A Formula 1 fan already lives inside:
        </p>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
        <div className="space-y-8">
          {left.map((item) => (
            <F1ProblemStill key={item.label} {...item} />
          ))}
        </div>
        <div className="space-y-8">
          {right.map((item) => (
            <F1ProblemStill key={item.label} {...item} />
          ))}
        </div>
      </div>
      <p className="study-text mt-10 text-center text-[16px] leading-[1.75] text-muted">
        All of it lands on a rectangle someone else is cutting. There is no
        native Formula 1 experience for a headset. If you want the race in VR,
        you are mirroring a desktop or sitting in a virtual cinema, watching
        television with extra steps.
      </p>
    </>
  );
}

export function F1Opportunity() {
  return (
    <div className="study-text study-card mt-10 px-6 py-6 md:px-8 md:py-7">
      <h3 className="font-display text-[20px] font-medium tracking-tight text-fg md:text-[22px]">
        Opportunity
      </h3>
      <p className="mt-3 text-[16px] leading-[1.75] text-muted">
        The data already exists. The screen is the bottleneck.
      </p>
      <p className="mt-4 border-l border-white/80 pl-5 text-[16px] leading-relaxed text-fg">
        What if Formula 1 viewing was designed for the space around you, not
        for a television that happens to be in a headset?
      </p>
      <p className="mt-4 text-[16px] leading-[1.75] text-muted">
        That was the opening. Not a floating TV. A HUD.
      </p>
    </div>
  );
}

export function F1Solution() {
  const items = [
    { number: "01", label: "Watch the race" },
    { number: "02", label: "Monitor standings" },
    { number: "03", label: "Switch onboard cameras" },
    { number: "04", label: "Access driver information" },
    { number: "05", label: "Follow race events" },
  ];

  return (
    <div className="study-text mt-8">
      <p className="text-center text-[16px] leading-[1.75] text-muted">
        This allows fans to:
      </p>
      <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={item.number}
            className="flex items-center gap-3 rounded-[20px] border border-line bg-card px-3 py-3"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-black text-[13px] font-medium text-muted">
              {item.number}
            </span>
            <span className="text-[15px] font-medium leading-snug tracking-tight text-fg">
              {item.label}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-center text-[16px] leading-[1.75] text-muted">
        without leaving the broadcast
      </p>
    </div>
  );
}

export function F1Constraints() {
  const items = [
    {
      number: "01",
      title: "Long viewing sessions",
      body: "A race regularly runs two to three hours. The layout has to survive the whole thing, not the first lap.",
    },
    {
      number: "02",
      title: "Battery life",
      body: "Consumer headsets do not last a Grand Prix. Every extra turn of the head is energy you do not have.",
    },
    {
      number: "03",
      title: "Motion comfort",
      body: "If you have to steer to read the standings, you will stop reading the standings.",
    },
    {
      number: "04",
      title: "Live data",
      body: "Telemetry, cameras, and race control keep moving. The interface cannot freeze while the race does not.",
    },
  ];

  return (
    <div className="study-text mt-8">
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.number} className="study-card p-5 md:px-6 md:py-5">
            <p className="text-[13px] text-muted">{item.number}</p>
            <p className="mt-2 font-medium tracking-tight text-fg">{item.title}</p>
            <p className="mt-2 text-[16px] leading-[1.75] text-muted">{item.body}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-[20px] border border-[#c4a574]/55 bg-[#241f14] px-6 py-6 md:px-8 md:py-7">
        <h3 className="font-display text-[20px] font-medium tracking-tight text-fg md:text-[22px]">
          Design for the race, not the demo
        </h3>
        <p className="mt-3 text-[16px] leading-[1.75] text-muted">
          I designed for Meta Quest-class headsets because that is what people
          actually own. Comfort beat spectacle. If it only looks right for thirty
          seconds, it is not a viewing system.
        </p>
        <p className="mt-4 border-l border-[#c4a574]/80 pl-5 text-[16px] leading-relaxed text-fg">
          Two hours in a headset only works if you barely have to look around.
        </p>
      </div>
    </div>
  );
}

export function F1Decisions() {
  return (
    <div className="mt-2 space-y-4">
      <F1DecisionCard
        number={1}
        title="Fixed Central Stream"
        problem="Users should never lose the race"
        solution="The live broadcast remains anchored in a fixed central position"
        figure="/media/formula-1/decisions/fixed-central-stream.png"
        figureAlt="Live cockpit stream locked in the center with supporting panels faded at the edges"
        why={[
          "Reduces head steering",
          "Creates a consistent focal point",
          "Mimics familiar television behavior",
          "Improves comfort during long sessions",
        ]}
        outcome="Users can quickly glance at supporting information and immediately return to the race."
      />
      <F1DecisionCard
        number={2}
        title="Spatial Zones"
        problem="Race information competes for attention."
        solution="The interface is divided into three spatial zones: Left, Center, Right. Each zone serves a distinct purpose."
        figure="/media/formula-1/decisions/spatial-zones.png"
        figureAlt="Three spatial zones: leaderboard and radio on the left, race stream in the center, driver information on the right"
        outcome="Users spend less time searching for information and more time watching the race."
      />
      <F1DecisionCard
        number={3}
        title="Window Hierarchy"
        problem="Not every piece of information deserves equal prominence."
        solution="Created a hierarchy of windows: Primary, Secondary, and Support."
        figure="/media/formula-1/decisions/window-hierarchy.png"
        figureAlt="Window hierarchy diagram with primary, secondary, and support regions"
        outcome="Clear visual hierarchy reduces cognitive load."
      />
      <F1DecisionCard
        number={4}
        title="Modular Window System"
        problem="Future race experiences may require new information modules"
        solution="Windows were designed as reusable system components"
        figure="/media/formula-1/decisions/modular-window.png"
        figureAlt="Annotated module with title, top bar, action icon, and content regions"
        caption="Each module can be added, removed, resized, or repositioned without redesigning the interface."
        outcome="The system can scale as new race features are introduced."
      />
    </div>
  );
}

function F1DecisionCard({
  number,
  title,
  problem,
  solution,
  figure,
  figureAlt,
  why,
  caption,
  outcome,
}: {
  number: number;
  title: string;
  problem: string;
  solution: string;
  figure: string;
  figureAlt: string;
  why?: string[];
  caption?: string;
  outcome: string;
}) {
  return (
    <article className="study-text study-card px-6 py-6 md:px-8 md:py-7">
      <p className="text-[13px] text-muted">Decision #{number}</p>
      <h3 className="mt-2 font-display text-[20px] font-medium tracking-tight text-fg md:text-[22px]">
        {title}
      </h3>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-[13px] text-muted">Problem</p>
          <div className="flex gap-3 rounded-[14px] bg-red-950/45 px-4 py-4 text-[15px] leading-relaxed text-red-200">
            <Puzzle className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />
            <p>{problem}</p>
          </div>
        </div>
        <div>
          <p className="mb-2 text-[13px] text-muted">Solution</p>
          <div className="flex gap-3 rounded-[14px] bg-emerald-950/45 px-4 py-4 text-[15px] leading-relaxed text-emerald-200">
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
            <p>{solution}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-[14px] bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={figure} alt={figureAlt} className="h-auto w-full" />
      </div>

      {why ? (
        <>
          <p className="mt-6 text-[16px] font-medium text-fg">Why?</p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[16px] leading-[1.75] text-muted">
            {why.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </>
      ) : null}

      {caption ? (
        <p className="mt-6 text-[16px] leading-[1.75] text-muted">{caption}</p>
      ) : null}

      <p className="mt-6 text-[16px] font-medium text-fg">Outcome</p>
      <p className="mt-3 border-l border-white/80 pl-5 text-[16px] leading-relaxed text-fg">
        {outcome}
      </p>
    </article>
  );
}

export function F1Exploration() {
  const pages = [
    {
      src: "/media/formula-1/iterations/01.jpg",
      alt: "Notebook sketch of a core layout centered on a fixed broadcast window",
    },
    {
      src: "/media/formula-1/iterations/02.jpg",
      alt: "Notebook notes for an F1 VR dashboard, target audience, and content needs",
    },
    {
      src: "/media/formula-1/iterations/03.jpg",
      alt: "Notebook comparison of F1-branded, VisionOS, and general racing visual directions",
    },
    {
      src: "/media/formula-1/iterations/04.jpg",
      alt: "Notebook sketches of modular windows, handles, and spatial interaction",
    },
  ];

  return (
    <div className="mt-2">
      <h3 className="text-center font-display text-[22px] font-medium tracking-tight text-fg md:text-[26px]">
        Early Exploration
      </h3>
      <p className="mt-3 text-center text-[16px] leading-[1.75] text-muted">
        I explored three visual directions
      </p>
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {pages.map((page) => (
          <div key={page.src} className="overflow-hidden rounded-[10px] bg-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={page.src} alt={page.alt} className="h-auto w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function F1Direction() {
  return (
    <div className="study-text study-card mt-8 px-6 py-6 md:px-8 md:py-7">
      <h3 className="font-display text-[20px] font-medium tracking-tight text-fg md:text-[22px]">
        The Turn
      </h3>
      <p className="mt-3 text-[16px] leading-[1.75] text-muted">
        Three looks in, some of the work was trying to win a beauty contest. A
        livery is not an interface.
      </p>
      <p className="mt-4 border-l border-white/80 pl-5 text-[16px] leading-relaxed text-fg">
        Keep the stream in charge, quiet everything else down, and borrow from
        racing HUDs instead of television chrome.
      </p>
    </div>
  );
}

export function F1Validation() {
  const findings = [
    "They wanted the race stream locked. Once it drifted, they stopped watching and started hunting.",
    "Peripheral panels only worked if they stayed secondary. Equal weight meant equal noise.",
    "A layout that did not reshuffle itself was easier to live in for two hours.",
  ];

  return (
    <div className="mt-2">
      <p className="study-text text-[16px] leading-[1.75] text-muted">
        I put the concept on a Quest with people who already watch Formula 1.
        The questions were simple: could they stay comfortable, could they find
        things, and did they still watch the race.
      </p>
      <div className="study-text mt-8 rounded-[20px] border border-[#a855f7]/80 bg-[rgba(112,64,196,0.16)] px-6 py-6 md:px-8 md:py-7">
        <h3 className="font-display text-[20px] font-medium tracking-tight text-fg md:text-[22px]">
          From the headset
        </h3>
        <p className="mt-3 text-[16px] leading-[1.75] text-[#d4c4ff]">
          The note that kept coming back:
        </p>
        <p className="mt-3 border-l border-[#c4b5fd] pl-5 text-[16px] leading-relaxed text-[#d4c4ff]">
          &ldquo;Don&apos;t make me look for the race.&rdquo;
        </p>
      </div>
      <h3 className="mt-12 text-center font-display text-[22px] font-medium tracking-tight text-fg md:text-[26px]">
        Key Findings
      </h3>
      <div className="study-text mt-6 space-y-4">
        {findings.map((finding, i) => (
          <div key={finding} className="study-card px-6 py-5 md:px-7 md:py-6">
            <p className="text-[13px] text-muted">Finding {i + 1}</p>
            <p className="mt-2 text-[18px] font-medium leading-snug tracking-tight text-fg">
              {finding}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function F1Reflection() {
  return (
    <div className="study-text mt-2">
      <h3 className="font-display text-[20px] font-medium tracking-tight text-fg md:text-[22px]">
        Spatial Design Is Not Floating Screens
      </h3>
      <p className="mt-5 text-[16px] leading-[1.75] text-muted">
        Putting windows in 3D is the easy part. The work is hierarchy, a place
        for everything to live, and a session you can survive. Every interface
        decision had to take something off the viewer&apos;s body: less turning,
        less searching, less deciding where to look.
      </p>
      <p className="mt-5 text-[16px] leading-[1.75] text-muted">
        What I learned: design for the length of a race, not the first thirty
        seconds. Build a system you can add a module to, not a one-off overlay.
        Translate a broadcast instead of copying one.{" "}
        <strong className="font-medium text-fg">
          Keep the race in front of you, and the data around you,
        </strong>{" "}
        and spatial computing starts to feel like watching, not operating
        software.
      </p>
    </div>
  );
}
