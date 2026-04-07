import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faDesktop } from "@fortawesome/free-solid-svg-icons";

interface ProjectLinkProps {
  text: string;
  href: string;
  rightAlign?: boolean;
}

export default function ProjectLink({
  text,
  href,
  rightAlign,
}: ProjectLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-row border-none bg-none no-underline"
    >
      <span
        className={[
          "relative text-[1rem] text-text tracking-wider",
          rightAlign ? "pr-8 pb-4" : "pl-8 pb-4",
          "after:content-[''] after:absolute after:w-full after:scale-x-0",
          "after:h-[1.5px] after:bottom-0 after:left-0 after:bg-accent-1",
          "after:transition-transform after:duration-200 after:ease-out",
          rightAlign
            ? "after:origin-bottom-right group-hover:after:origin-bottom-left"
            : "after:origin-bottom-left group-hover:after:origin-bottom-right",
          "group-hover:after:scale-x-100",
        ].join(" ")}
      >
        <FontAwesomeIcon
          icon={text === "live" ? faDesktop : faGithub}
          className="text-[1.2rem] mr-1 translate-y-[0.1rem] transition-all duration-200 group-hover:text-accent-1 group-hover:scale-95"
        />
        {text}
      </span>
    </a>
  );
}
