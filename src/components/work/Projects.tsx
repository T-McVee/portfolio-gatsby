import Project from "./Project";
import type { Project as ProjectType } from "@/lib/types";

interface ProjectsProps {
  projects: ProjectType[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <main className="w-full overflow-x-hidden">
      {projects.map((proj) => (
        <Project
          key={proj.title}
          project={proj}
          rightAlign={proj.order % 2 === 1}
        />
      ))}
    </main>
  );
}
