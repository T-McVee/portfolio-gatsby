import H1 from "@/components/ui/H1";
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
      <H1>Skills</H1>
      <SkillsList skills={skills} />
      <hr className="mt-56 max-tablet:mt-16" />
    </section>
  );
}
