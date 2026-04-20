import H1 from "@/components/ui/H1";

export default function Bio() {
  return (
    <section className="w-full py-48 px-[5.5rem] max-tablet:px-8">
      <H1>
        <span className="whitespace-nowrap max-tablet:whitespace-normal">
          Builder of things.
        </span>{" "}
        <span>
          Sometimes restaurants.
        </span>{" "}
        <span className="whitespace-nowrap max-tablet:whitespace-normal">
          <br /> Mostly software.
        </span>
      </H1>
      <div className="max-w-[1504px] w-[calc(90%-5.5rem)] max-tablet:w-full flex flex-col gap-6">
        <p className="text-xl">
          Somewhere between a mixing desk, a ski hill restaurant, and an IDE, a
          career was forged.
        </p>

        <p className="text-xl">
          Audio engineer → restaurateur → software developer. It’s not a typo.
          It’s the natural trajectory of someone wired to build things and
          pursue the most exciting opportunities in the room.
        </p>

        <p className="text-xl">
          Today, that lands at Mojo Soup as a Senior Software Developer. My
          daily focus? Front end architecture, building AI-powered apps and dev
          tools, and a healthy obsession with what actually happens when
          powerful tech meets real humans in the wild.
        </p>

        <p className="text-xl">
          Tying it all together is a simple belief.{" "}
          <i>Technology is the force that shapes our world</i>, for better or
          worse. You can’t fight it. Tech touches everything. Tech always
          prevails. The real question was never whether to embrace it, but
          whether to get dragged along by the current or learn how to ride the
          wave.
        </p>
      </div>
      {/* <p className="text-[1.2rem] mb-16 tracking-wide leading-[1.8rem]"> */}
      {/*   Howdy, based in Brisbane, Australia, I&apos;m a Software Developer and */}
      {/*   Marketing Specialist (Who may have taken a 7-year detour as a */}
      {/*   restaurateur in Canada, but that&apos;s a whole{" "} */}
      {/*   <a */}
      {/*     href="https://www.instagram.com/1609ssm/" */}
      {/*     target="_blank" */}
      {/*     rel="noopener noreferrer" */}
      {/*     className="no-underline text-accent-1" */}
      {/*   > */}
      {/*     other story */}
      {/*   </a> */}
      {/*   ). I find the outcomes of applying technology to life&apos;s problems */}
      {/*   fascinating and rewarding. It&apos;s what first drew me to software */}
      {/*   development and what I inspire to create in every project. */}
      {/* </p> */}
      {/* <div className="flex flex-row max-tablet:flex-col"> */}
      {/*   <XpBlock heading="Software development" number="4" /> */}
      {/*   <XpBlock heading="Marketing" number="9" /> */}
      {/* </div> */}
      <hr className="mt-48" />
    </section>
  );
}
