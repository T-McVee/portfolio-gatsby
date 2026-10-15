import { getProjects, getSkills, getContactMethods } from "@/lib/content";
import ClientLayout from "./ClientLayout";

export const dynamic = "force-static";

export default function Home() {
  const projects = getProjects();
  const skills = getSkills();
  const contactMethods = getContactMethods();

  return (
    <ClientLayout
      projects={projects}
      skills={skills}
      contactMethods={contactMethods}
    />
  );
}
