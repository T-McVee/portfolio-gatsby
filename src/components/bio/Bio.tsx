import H1 from "@/components/ui/H1";
import XpBlock from "./XpBlock";

export default function Bio() {
  return (
    <section className="w-full py-48 px-[5.5rem] max-tablet:px-8">
      <H1>In love with technology, schooled in marketing</H1>
      <p className="text-[1.2rem] mb-16 tracking-wide leading-[1.8rem]">
        Howdy, based in Brisbane, Australia, I&apos;m a Software Developer and
        Marketing Specialist (Who may have taken a 7-year detour as a
        restaurateur in Canada, but that&apos;s a whole{" "}
        <a
          href="https://www.instagram.com/1609ssm/"
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline text-accent-1"
        >
          other story
        </a>
        ). I find the outcomes of applying technology to life&apos;s problems
        fascinating and rewarding. It&apos;s what first drew me to software
        development and what I inspire to create in every project.
      </p>
      <div className="flex flex-row max-tablet:flex-col">
        <XpBlock heading="Software development" number="4" />
        <XpBlock heading="Marketing" number="9" />
      </div>
      <hr className="mt-48" />
    </section>
  );
}
