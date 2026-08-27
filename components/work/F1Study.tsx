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
      <figcaption className="mt-3 text-center text-[15px] text-muted">{label}</figcaption>
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
            This did not start with a complaint. It started with a gap. The sport
            already produces more live information than a rectangle can hold, and
            there is still no native way to watch it in a headset.
          </p>
        </div>
        <p className="mt-12 text-center text-[16px] leading-[1.75] text-muted">
          During a Grand Prix a fan already lives inside:
        </p>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
        <div className="space-y-10">
          {left.map((item) => (
            <F1ProblemStill key={item.label} {...item} />
          ))}
        </div>
        <div className="space-y-10">
          {right.map((item) => (
            <F1ProblemStill key={item.label} {...item} />
          ))}
        </div>
      </div>
      <p className="study-text mt-12 text-center text-[16px] leading-[1.75] text-muted">
        All of it lands on a rectangle someone else is cutting. There is no
        native Formula 1 experience for a headset. If you want the race in VR
        today, you are mirroring a desktop or sitting in a virtual cinema:
        television with extra steps, and none of the spatial advantages the
        hardware actually has.
      </p>
    </>
  );
}

export function F1Opportunity() {
  return (
    <div className="study-text study-card px-6 py-6 md:px-8 md:py-7">
      <h3 className="font-display text-[20px] font-medium tracking-tight text-fg md:text-[22px]">
        Opportunity
      </h3>
      <p className="mt-3 text-[16px] leading-[1.75] text-muted">
        The data already exists. The screen is the bottleneck. Fans are already
        doing the work of stitching a race together. The opening was to stop
        asking a television to hold it.
      </p>
      <p className="mt-4 border-l border-white/80 pl-5 text-[16px] leading-relaxed text-fg">
        What if Formula 1 viewing was designed for the space around you, not
        for a television that happens to be in a headset?
      </p>
      <p className="mt-4 text-[16px] leading-[1.75] text-muted">
        That question is about attention before it is about visuals: where it
        lives, what is allowed to move, and how much of the body the interface
        is allowed to spend.
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
    <div className="study-text">
      <p className="text-center text-[16px] leading-[1.75] text-muted">
        From a seated position, without leaving the broadcast, a fan can:
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
      <p className="mt-10 text-center text-[16px] leading-[1.75] text-muted">
        Those are the jobs. The system is how they stay in reach.
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
    <div className="study-text">
      <div className="grid gap-5 sm:grid-cols-2">
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
          seconds, it is not a viewing system, and it is not a product.
        </p>
        <p className="mt-4 border-l border-[#c4a574]/80 pl-5 text-[16px] leading-relaxed text-fg">
          Two hours in a headset only works if you barely have to look around.
        </p>
      </div>
    </div>
  );
}

export function F1Exploration() {
  return (
    <figure>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/media/formula-1/iterations/notebook.jpg"
        alt="Notebook pages working out the core layout, the target audience and content needs, a comparison of the F1-branded, VisionOS, and general racing directions, and sketches of modular windows and spatial interaction"
        className="h-auto w-full"
      />
      <figcaption className="mt-3 text-center text-[13px] text-muted">
        The core layout, who it was for and what they needed within reach, the
        three visual directions side by side, and how a module should behave
        once you can put it anywhere.
      </figcaption>
    </figure>
  );
}

export function F1Direction() {
  return (
    <div className="study-text study-card px-6 py-6 md:px-8 md:py-7">
      <h3 className="font-display text-[20px] font-medium tracking-tight text-fg md:text-[22px]">
        The Turn
      </h3>
      <p className="mt-3 text-[16px] leading-[1.75] text-muted">
        Three looks in, some of the work was trying to win a beauty contest. A
        livery is not an interface, and a headset is not a more expensive
        television.
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
    <div>
      <p className="study-text text-[16px] leading-[1.75] text-muted">
        I put the concept on a Quest with people who already watch Formula 1.
        The questions were the ones I had written down as success: could they
        stay comfortable, could they find things without hunting, and did they
        still watch the race.
      </p>
      <figure className="study-text mt-12">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/media/formula-1/process/user-testing.jpg"
          alt="A classmate wearing a Meta Quest headset and holding controllers during a user test of the F1 VR layout"
          className="mx-auto block h-auto max-h-[min(640px,80vh)] w-auto max-w-full object-contain"
        />
        <figcaption className="mt-3 text-center text-[15px] text-muted">
          Testing the layout on a Quest with someone who already watches the sport.
        </figcaption>
      </figure>
      <div className="study-text mt-12 rounded-[20px] border border-[#a855f7]/80 bg-[rgba(112,64,196,0.16)] px-6 py-6 md:px-8 md:py-7">
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
      <h3 className="mt-16 text-center font-display text-[22px] font-medium tracking-tight text-fg md:text-[26px]">
        Key Findings
      </h3>
      <div className="study-text mt-8 space-y-4">
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
    <div className="study-text">
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
        Design for the length of a session, not the first thirty seconds. Build
        a system you can add a module to, not a one-off overlay. Translate a
        platform instead of copying a screen. Prototype the interaction, then
        test it with the people who already know the job.{" "}
        <strong className="font-medium text-fg">
          Keep the race in front of you, and the data around you,
        </strong>{" "}
        and spatial computing starts to feel like watching, not operating
        software.
      </p>
    </div>
  );
}
