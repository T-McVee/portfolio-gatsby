"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Description from "./Description";
import type { Project as ProjectType } from "@/lib/types";

interface ProjectProps {
  project: ProjectType;
  rightAlign?: boolean;
}

export default function Project({ project, rightAlign }: ProjectProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const links = [
    { text: "live", url: project.linkLive },
    { text: "repo", url: project.linkRepo },
  ];

  const openSite = () => {
    if (project.linkLive) window.open(project.linkLive);
  };

  const coverClasses = `relative rounded-small overflow-hidden cursor-pointer transition-all duration-[0.4s] aspect-[16/10] shadow-[2px_2px_8px_var(--color-surface)] hover:shadow-[2px_2px_12px_var(--color-surface-alt)] hover:scale-[1.01]`;

  return (
    <article
      ref={ref}
      className={[
        "animate-on-scroll",
        rightAlign ? "from-right" : "",
        "flex mb-48 max-w-[1504px]",
        "w-[calc(90%-5.5rem)]",
        rightAlign ? "flex-row" : "flex-row",
        rightAlign ? "ml-[5.5rem]" : "ml-10",
        rightAlign ? "max-laptop:flex-col" : "max-laptop:flex-col-reverse",
        rightAlign
          ? "max-laptop:ml-0 max-laptop:float-left"
          : "max-laptop:ml-10 max-laptop:float-right",
        "max-phone:w-full",
      ].join(" ")}
      data-testid="project"
    >
      {rightAlign && (
        <div
          className={`${coverClasses} w-[58%] max-laptop:w-full mr-8 max-laptop:mr-0`}
          onClick={openSite}
          data-testid="cover-image"
        >
          <Image
            src={project.cover}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <Description
        title={project.title}
        subtitle={project.subtitle}
        body={project.description}
        links={links}
        tags={project.tags}
        rightAlign={rightAlign}
      />
      {!rightAlign && (
        <div
          className={`${coverClasses} w-[58%] max-laptop:w-full ml-8 max-laptop:ml-0`}
          onClick={openSite}
          data-testid="cover-image"
        >
          <Image
            src={project.cover}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
      )}
    </article>
  );
}
