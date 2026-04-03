import fs from "fs";
import path from "path";
import type { Project, Skill, ContactMethod, SiteMetadata } from "./types";

const contentDir = path.join(process.cwd(), "src/content");

export function getSiteMetadata(): SiteMetadata {
  const raw = fs.readFileSync(
    path.join(contentDir, "site-metadata.json"),
    "utf-8"
  );
  return JSON.parse(raw);
}

export function getSkills(): Skill[] {
  const raw = fs.readFileSync(path.join(contentDir, "skills.json"), "utf-8");
  const skills: Skill[] = JSON.parse(raw);
  return skills.sort((a, b) => a.order - b.order);
}

export function getContactMethods(): ContactMethod[] {
  const raw = fs.readFileSync(
    path.join(contentDir, "contact-methods.json"),
    "utf-8"
  );
  const methods: ContactMethod[] = JSON.parse(raw);
  return methods.sort((a, b) => a.order - b.order);
}

export function getProjects(): Project[] {
  const projectsDir = path.join(contentDir, "projects");
  const files = fs
    .readdirSync(projectsDir)
    .filter((f) => f.endsWith(".mdx"))
    .sort();

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(projectsDir, file), "utf-8");
    const { frontmatter, body } = parseMdx(raw);
    return {
      ...frontmatter,
      description: body.trim(),
    } as Project;
  });
}

function parseMdx(content: string): {
  frontmatter: Record<string, unknown>;
  body: string;
} {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: content };

  const frontmatter: Record<string, unknown> = {};
  const lines = match[1].split("\n");

  for (const line of lines) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value: string | string[] = line.slice(colonIndex + 1).trim();

    // Handle arrays
    if (value.startsWith("[")) {
      try {
        value = JSON.parse(value);
      } catch {
        value = (value as string).slice(1, -1).split(",").map((s) => s.trim().replace(/^["']|["']$/g, ""));
      }
    } else {
      // Remove surrounding quotes
      value = value.replace(/^["']|["']$/g, "");
    }

    frontmatter[key] = value;
  }

  return { frontmatter, body: match[2] };
}
