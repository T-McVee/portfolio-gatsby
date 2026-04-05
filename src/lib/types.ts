export interface Project {
  title: string;
  subtitle: string;
  order: number;
  tags: string[];
  linkLive?: string;
  linkRepo?: string;
  cover: string;
  description: string;
}

export interface Skill {
  name: string;
  useFontAwesome: boolean;
  faLibrary?: string;
  faIcon?: string;
  image?: string;
  order: number;
}

export interface ContactMethod {
  address: string;
  type: string;
  faLibrary: string;
  faIcon: string;
  order: number;
}

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
  ascii?: string;
  order: number;
}

export interface SiteMetadata {
  title: string;
  description: string;
  ogUrl: string;
  ogTitle: string;
  ogImage: string;
}
