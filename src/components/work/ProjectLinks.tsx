import ProjectLink from "./ProjectLink";

interface LinkItem {
  text: string;
  url?: string;
}

interface ProjectLinksProps {
  links: LinkItem[];
  rightAlign?: boolean;
}

export default function ProjectLinks({ links, rightAlign }: ProjectLinksProps) {
  if (!links) return null;
  return (
    <div
      className={`flex flex-row w-full my-8 ${rightAlign ? "justify-start" : "justify-end"} ${rightAlign ? "text-left" : "text-right"}`}
    >
      {links.map(
        (link) =>
          link.url && (
            <ProjectLink
              key={link.text}
              text={link.text}
              href={link.url}
              rightAlign={rightAlign}
            />
          )
      )}
    </div>
  );
}
