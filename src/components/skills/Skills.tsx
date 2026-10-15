import H2 from "@/components/ui/H2";
import SkillsList from "./SkillsList";
import type { Skill } from "@/lib/types";

interface SkillsProps {
  skills: Skill[];
}

export default function Skills({ skills }: SkillsProps) {
  if (!skills) return null;
  return (
    <section
      className="flex flex-col w-full py-48 px-[5.5rem] bg-light-grey text-black max-tablet:p-16"
      data-testid="skills"
    >
      <H2>Skills</H2>
      <SkillsList skills={skills} />
      <hr className="mt-56 max-tablet:mt-16" />
    </section>
  );
}
