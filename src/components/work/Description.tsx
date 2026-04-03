import Tags from "./Tags";
import ProjectLinks from "./ProjectLinks";

interface LinkItem {
  text: string;
  url?: string;
}

interface DescriptionProps {
  title: string;
  subtitle: string;
  body: string;
  links: LinkItem[];
  tags: string[];
  rightAlign?: boolean;
}

export default function Description({
  title,
  subtitle,
  body,
  links,
  tags,
  rightAlign,
}: DescriptionProps) {
  const align = rightAlign ? "text-left" : "text-right";

  return (
    <div
      className="w-[42%] max-w-[500px] max-laptop:w-full max-laptop:max-w-full max-laptop:mt-4"
      data-testid="description"
    >
      <h2
        className={`font-light mb-4 text-[2rem] ${align} max-xl:text-[1.5rem] max-laptop:text-[2rem] max-tablet:text-[1.5rem]`}
      >
        {title}
      </h2>
      <p
        className={`text-accent-2 ${align} text-[1.5rem] font-light lowercase mb-4 max-xl:text-[1.2rem] max-laptop:text-[1.5rem] max-tablet:text-[1.2rem]`}
        data-testid="subtitle"
      >
        {subtitle}
      </p>
      <p
        className={`text-[1.2rem] ${align} mb-4 max-xl:text-[1rem] max-xl:leading-[1.2rem] max-laptop:text-[1.2rem] max-laptop:leading-[1.5rem] max-tablet:text-[1rem]`}
        data-testid="body"
      >
        {body}
      </p>
      <ProjectLinks links={links} rightAlign={rightAlign} />
      <Tags tags={tags} rightAlign={rightAlign} />
    </div>
  );
}
