"use client";

import Skill from "./Skill";
import type { Skill as SkillType } from "@/lib/types";

interface SkillsListProps {
  skills: SkillType[];
}

export default function SkillsList({ skills }: SkillsListProps) {
  if (!skills) return null;

  return (
    <div className="w-full flex flex-row flex-wrap justify-center max-tablet:snap-x max-tablet:snap-mandatory max-tablet:overflow-x-auto max-tablet:flex-nowrap max-tablet:justify-start max-tablet:gap-4 max-tablet:pb-4">
      {skills.map((skill) => (
        <div key={skill.name} className="max-tablet:snap-center max-tablet:shrink-0">
          <Skill skill={skill} />
        </div>
      ))}
    </div>
  );
}
