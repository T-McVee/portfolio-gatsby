import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import type { Skill as SkillType } from "@/lib/types";

interface SkillProps {
  skill: SkillType;
}

export default function Skill({ skill }: SkillProps) {
  return (
    <div
      className="flex flex-col items-center justify-center w-48 bg-surface list-none rounded-small mr-4 mb-4 py-4 max-tablet:w-32 max-tablet:h-32 max-tablet:mb-8 max-[568px]:w-full max-[568px]:h-32 max-[568px]:p-0 max-[568px]:m-0"
      data-testid="skill"
    >
      {skill.useFontAwesome ? (
        <FontAwesomeIcon
          icon={[skill.faLibrary!, skill.faIcon!] as IconProp}
          className="text-[4rem] max-tablet:text-[3rem]"
          data-testid="logo"
        />
      ) : (
        <Image
          src={skill.image!}
          alt={skill.name}
          width={64}
          height={64}
          className="w-16 h-16 max-tablet:w-12 max-tablet:h-12 object-contain"
          data-testid="logo"
        />
      )}
      <h2 className="w-full text-center text-[1rem] font-light mt-2 max-phone:text-[0.8rem]">
        {skill.name}
      </h2>
    </div>
  );
}
