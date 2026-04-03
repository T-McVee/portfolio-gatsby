"use client";

import { useState, useRef } from "react";
import { library, config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faXmark, faDesktop } from "@fortawesome/free-solid-svg-icons";

config.autoAddCss = false;
import type { Project, Skill, ContactMethod } from "@/lib/types";

import Splash from "@/components/splash/Splash";
import Bio from "@/components/bio/Bio";
import Work from "@/components/work/Work";
import Skills from "@/components/skills/Skills";
import LowerCta from "@/components/ui/LowerCta";
import Footer from "@/components/ui/Footer";
import ContactFormModal from "@/components/modal/ContactFormModal";

library.add(fab, faEnvelope, faXmark, faDesktop);

interface PageClientProps {
  projects: Project[];
  skills: Skill[];
  contactMethods: ContactMethod[];
}

export default function PageClient({
  projects,
  skills,
  contactMethods,
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    <div>
      <Splash handleOpenModal={handleOpenModal} contactMethods={contactMethods} />
      <Bio />
      <Work projects={projects} />
      <Skills skills={skills} />
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
  );
}
