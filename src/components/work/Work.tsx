import H2 from "@/components/ui/H2";
import Projects from "./Projects";
import type { Project } from "@/lib/types";

interface WorkProps {
  projects: Project[];
}

export default function Work({ projects }: WorkProps) {
  return (
    <section className="flex flex-col w-full px-[5.5rem] max-tablet:px-8">
      <H2>
        Work.Work.
        <wbr />
        Work.
      </H2>
      <Projects projects={projects} />
    </section>
  );
}
