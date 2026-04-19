"use client";

import { useState, useRef } from "react";
import { library, config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faXmark, faDesktop } from "@fortawesome/free-solid-svg-icons";

config.autoAddCss = false;
import type { Project, Skill, ContactMethod, TimelineEntry } from "@/lib/types";

import Splash from "@/components/splash/Splash";
import Bio from "@/components/bio/Bio";
import Work from "@/components/work/Work";
import Skills from "@/components/skills/Skills";
import LowerCta from "@/components/ui/LowerCta";
import Footer from "@/components/ui/Footer";
import Timeline from "@/components/timeline/Timeline";
import ContactFormModal from "@/components/modal/ContactFormModal";
import TimelineExperiment from "@/components/timeline/TimelineExperiment";

library.add(fab, faEnvelope, faXmark, faDesktop);

interface PageClientProps {
  projects: Project[];
  skills: Skill[];
  contactMethods: ContactMethod[];
  timeline: TimelineEntry[];
}

export default function PageClient({
  projects,
  skills,
  contactMethods,
  timeline,
}: PageClientProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formInfo, setFormInfo] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleOpenModal = () => {
    dialogRef.current?.showModal();
  };

  const handleCloseModal = () => {
    dialogRef.current?.close();
    setFormInfo({ name: "", email: "", phone: "", message: "" });
    setIsSubmitted(false);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formInfo),
      });
      if (res.ok) {
        setIsSubmitted(true);
        setFormInfo({ name: "", email: "", phone: "", message: "" });
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className="relative">
      {/* Deepest layer: full-page wash behind content (hero is opaque). Fold-aligned
          using 100dvh so it stays tied to the splash/bio seam when the browser chrome
          or vh/dvh differs — avoids a white strip when scrolling. */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        {/* Horizontal soften band exactly at hero → content boundary */}
        <div
          className="absolute inset-x-0 h-40 max-tablet:h-32 bg-gradient-to-b from-[rgb(255,236,214)]/95 from-0% via-[rgb(255,245,235)]/55 via-45% to-transparent to-100%"
          style={{ top: "calc(100dvh - 5rem)" }}
        />
        <div
          className="absolute right-0 h-[min(1800px,200vh)] w-[min(2400px,320vw)] opacity-[0.97]"
          style={{
            top: "calc(100dvh - min(11rem, 16dvh))",
            background:
              "radial-gradient(ellipse 95% 72% at 100% 0%, rgb(255, 195, 75) 0%, rgb(255, 220, 165) 12%, rgb(210, 225, 255) 32%, rgb(235, 244, 255) 48%, rgba(255, 255, 255, 0) 72%)",
          }}
        />
        <div
          className="absolute right-0 h-[min(1400px,170vh)] w-[min(2000px,280vw)] opacity-65 max-tablet:opacity-50"
          style={{
            top: "calc(100dvh - min(7rem, 12dvh))",
            background:
              "radial-gradient(ellipse 88% 68% at 100% 0%, rgb(70, 150, 230) 0%, rgb(175, 210, 255) 28%, rgba(248, 250, 253, 0) 62%)",
          }}
        />
        <div
          className="absolute left-0 h-[min(900px,120vh)] w-[min(1400px,95vw)] opacity-35 max-tablet:opacity-25"
          style={{
            top: "calc(100dvh + min(8rem, 12dvh))",
            background:
              "radial-gradient(ellipse 70% 55% at 0% 20%, rgb(255, 230, 190) 0%, rgba(255, 255, 255, 0) 55%)",
          }}
        />
      </div>

      <div className="relative z-10">
        <Splash
          handleOpenModal={handleOpenModal}
          contactMethods={contactMethods}
        />
        <Bio />
        {/* <Timeline entries={timeline} /> */}
        <TimelineExperiment entries={timeline} />
        {/* <Work projects={projects} /> */}
        {/* <Skills skills={skills} /> */}
        <LowerCta handleOpenModal={handleOpenModal} />
        <Footer contactMethods={contactMethods} />
        <ContactFormModal
          dialogRef={dialogRef}
          isSubmitted={isSubmitted}
          formInfo={formInfo}
          handleCloseModal={handleCloseModal}
          handleFormChange={handleFormChange}
          handleFormSubmit={handleFormSubmit}
        />
      </div>
    </div>
  );
}
