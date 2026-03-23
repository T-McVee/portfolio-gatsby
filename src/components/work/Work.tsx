import H1 from "@/components/ui/H1";
import Projects from "./Projects";
import type { Project } from "@/lib/types";

interface WorkProps {
  projects: Project[];
}

export default function Work({ projects }: WorkProps) {
  return (
    <section className="flex flex-col w-full px-[5.5rem] max-tablet:px-8">
      <H1>
        Work.Work.
        <wbr />
        Work.
      </H1>
      <Projects projects={projects} />
    </section>
  );
}
