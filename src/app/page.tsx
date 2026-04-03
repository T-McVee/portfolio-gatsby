import { getProjects, getSkills, getContactMethods, getTimeline } from "@/lib/content";
import PageClient from "./PageClient";

export default function Home() {
  const projects = getProjects();
  const skills = getSkills();
  const contactMethods = getContactMethods();
  const timeline = getTimeline();

  return (
    <PageClient
      projects={projects}
      skills={skills}
      contactMethods={contactMethods}
      timeline={timeline}
    />
  );
}
