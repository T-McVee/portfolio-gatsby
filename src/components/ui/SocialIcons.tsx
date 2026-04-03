import Icon from "./Icon";
import type { ContactMethod } from "@/lib/types";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

interface SocialIconsProps {
  contactMethods: ContactMethod[];
  wrapperClass?: string;
  iconClass?: string;
  linkClass?: string;
}

export default function SocialIcons({
  contactMethods,
  wrapperClass,
  iconClass,
  linkClass = "no-underline text-inherit transition-colors duration-200 hover:text-accent-1 hover:cursor-pointer",
}: SocialIconsProps) {
  return (
    <div className={wrapperClass}>
      {contactMethods.map((method) => (
        <a
          href={method.address}
          target="_blank"
          rel="noopener noreferrer"
          key={method.type}
          className={linkClass}
        >
          <Icon
            icon={[method.faLibrary, method.faIcon] as IconProp}
            label={`Tim's ${method.type}`}
            className={iconClass}
          />
        </a>
      ))}
    </div>
  );
}
