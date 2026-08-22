function QuoteLine({
  children,
  accent = false,
}: {
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <p
      className={
        accent
          ? "mt-3 border-l border-[#c4b5fd] pl-5 text-[16px] leading-relaxed text-[#d4c4ff]"
          : "mt-3 border-l border-white/80 pl-5 text-[16px] leading-relaxed text-fg"
      }
    >
      {children}
    </p>
  );
}

export function Validation() {
  const findings = [
    "Flexibility beat spectacle every time we tested.",
    "Once they had a pen and a pin, those tools weren't extras. They were the lesson.",
    "Layer combinations covered activities that used to require four paper maps.",
  ];

  return (
    <div className="mt-2">
      <p className="study-text text-[16px] leading-[1.75] text-muted">
        Teachers sat with prototypes throughout. They didn&apos;t hedge. The
        feedback went straight back into the next pass.
      </p>
      <div className="study-text mt-8 rounded-[20px] border border-[#a855f7]/80 bg-[rgba(112,64,196,0.16)] px-6 py-6 md:px-8 md:py-7">
        <h3 className="font-display text-[20px] font-medium tracking-tight text-fg md:text-[22px]">
          From the classroom
        </h3>
        <p className="mt-3 text-[16px] leading-[1.75] text-[#d4c4ff]">
          One of them said it out loud:
        </p>
        <QuoteLine accent>
          &ldquo;This is everything we&apos;ve ever wanted.&rdquo;
        </QuoteLine>
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

export function Impact() {
  return (
    <div className="study-text mt-2 space-y-4">
      <article className="study-card px-6 py-6 md:px-8 md:py-7">
        <h3 className="font-display text-[20px] font-medium tracking-tight text-fg md:text-[22px]">
          Teacher Impact
        </h3>
        <p className="mt-3 text-[16px] leading-[1.75] text-muted">
          They can stack the maps the lesson needs, mark them while they talk,
          and invent an activity on the fly instead of hoping the printed set
          matches the plan.
        </p>
      </article>
      <article className="study-card px-6 py-6 md:px-8 md:py-7">
        <h3 className="font-display text-[20px] font-medium tracking-tight text-fg md:text-[22px]">
          Organizational Impact
        </h3>
        <p className="mt-3 text-[16px] leading-[1.75] text-muted">
          Map files used to take three days because legends and labels lived in
          the artwork.
        </p>
        <p className="mt-2 text-[28px] font-medium tracking-tight text-fg md:text-[34px]">
          3 days → 1.5 Days
        </p>
        <p className="mt-6 text-[16px] leading-[1.75] text-muted">
          Standing up a new interactive went from a ten-minute code pass to a
          minute in the builder.
        </p>
        <p className="mt-2 text-[28px] font-medium tracking-tight text-fg md:text-[34px]">
          10 Minutes → 1 Minute
        </p>
      </article>
      <article className="study-card px-6 py-6 md:px-8 md:py-7">
        <h3 className="font-display text-[20px] font-medium tracking-tight text-fg md:text-[22px]">
          Product Impact
        </h3>
        <p className="mt-3 text-[16px] leading-[1.75] text-muted">
          The same layered system can take the next region&apos;s maps without
          rebuilding the product.
        </p>
      </article>
    </div>
  );
}

export function Reflection() {
  return (
    <div className="study-text mt-2">
      <h3 className="font-display text-[20px] font-medium tracking-tight text-fg md:text-[22px]">
        What I Learned
      </h3>
      <p className="mt-5 text-[16px] leading-[1.75] text-muted">
        I spent a long time assuming a better geography product meant more
        technology: a globe, live data, interactions that felt expensive.
        Talking to teachers was the correction.
      </p>
      <p className="mt-5 text-[16px] leading-[1.75] text-muted">
        They needed to rearrange what they already taught, not replace it.{" "}
        <strong className="font-medium text-fg">
          Build for the period, not the demo,
        </strong>{" "}
        and you get something that is easier to ship, easier to stand in
        front of, and actually used.
      </p>
    </div>
  );
}
