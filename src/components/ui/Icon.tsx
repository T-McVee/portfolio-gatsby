import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

interface IconProps {
  icon: IconProp;
  label: string;
  className?: string;
}

export default function Icon({ label, icon, className }: IconProps) {
  return (
    <>
      <span className="sr-only">{label}</span>
      <FontAwesomeIcon icon={icon} className={className} />
    </>
  );
}
