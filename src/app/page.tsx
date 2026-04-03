import { getProjects, getSkills, getContactMethods } from "@/lib/content";
import PageClient from "./PageClient";

export default function Home() {
  const projects = getProjects();
  const skills = getSkills();
  const contactMethods = getContactMethods();

  return (
    <PageClient
      projects={projects}
      skills={skills}
      contactMethods={contactMethods}
    />
  );
}
