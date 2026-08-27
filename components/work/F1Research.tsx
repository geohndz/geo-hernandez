const references = [
  {
    title: "Designing for visionOS",
    href: "https://developer.apple.com/design/human-interface-guidelines/designing-for-visionos",
    body: "A stable spatial anchor, windows that recede instead of competing, and a field of view you design for instead of filling.",
  },
  {
    title: "Meta Horizon: Design immersive experiences",
    href: "https://developers.meta.com/horizon/design/",
    body: "Comfort over spectacle, sessions you can actually finish, and interactions that do not ask the body to do the interface's job.",
  },
  {
    title: "Accessibility and UX Design: Building Inclusive User Experiences",
    href: "https://vispero.com/resources/accessibility-and-ux-design-building-inclusive-user-experiences/",
    body: "If you have to hunt for the thing you came for, the experience is already excluding people. Clarity is an accessibility decision.",
  },
] as const;

const measures = [
  {
    title: "Comfort",
    body: "A viewer can last a full Grand Prix without steering to keep up.",
  },
  {
    title: "Findability",
    body: "Standings, cameras, and radio are where you left them, every lap.",
  },
  {
    title: "Attention",
    body: "The stream never loses the middle. Supporting information knows it is supporting.",
  },
] as const;

export function F1Research() {
  return (
    <div>
      <div className="study-text grid gap-4 sm:grid-cols-3">
        {measures.map((item) => (
          <div key={item.title} className="study-card p-5 md:p-6">
            <p className="font-medium tracking-tight text-fg">{item.title}</p>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{item.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 border-t border-line pt-16">
        <h3 className="study-text font-display text-[21px] font-medium tracking-tight">
          References
        </h3>
        <p className="study-text mt-4 text-[16px] leading-[1.75] text-muted">
          I did not invent spatial rules for this project. I translated three
          sources into a Formula 1 viewing problem.
        </p>
        <ul className="study-text mt-8 space-y-4">
          {references.map((item) => (
            <li key={item.href} className="study-card px-6 py-5 md:px-7 md:py-6">
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="font-medium tracking-tight text-fg underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-white/70"
              >
                {item.title}
              </a>
              <p className="mt-2 text-[16px] leading-[1.75] text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
