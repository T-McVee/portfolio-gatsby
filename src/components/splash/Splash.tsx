"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Logo from "./Logo";
import HeaderUpper from "./HeaderUpper";
import HeaderLower from "./HeaderLower";
import BgFront from "./BgFront";
import type { ContactMethod } from "@/lib/types";

interface SplashProps {
  handleOpenModal: () => void;
  contactMethods: ContactMethod[];
}

export default function Splash({
  handleOpenModal,
  contactMethods,
}: SplashProps) {
  const bgFrontRef = useRef<HTMLDivElement>(null);
  const headerUpperRef = useRef<HTMLDivElement>(null);
  const headerLowerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const refs = [bgFrontRef, headerUpperRef, headerLowerRef];
    refs.forEach(ref => {
      if (ref.current) ref.current.style.willChange = "transform";
    });

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        if (bgFrontRef.current) {
          bgFrontRef.current.style.transform = `translateY(${scrollY * -0.12}px)`;
        }
        if (headerUpperRef.current) {
          headerUpperRef.current.style.transform = `translateY(${scrollY * -0.17}px)`;
        }
        if (headerLowerRef.current) {
          headerLowerRef.current.style.transform = `translateY(${scrollY * -0.12}px)`;
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full h-screen p-[5.5rem] max-tablet:p-8 overflow-hidden">
      {/* Background image - z-0 */}
      <Image
        src="/images/bg-splash-back.jpg"
        alt="Background"
        fill
        priority
        className="object-cover z-0"
      />
      {/* Foreground mountain image - z-[1] */}
      <BgFront ref={bgFrontRef} />
      {/* Gradient overlay - z-[3] */}
      <div className="absolute top-0 left-0 z-[3] w-full h-full bg-gradient-to-b from-[rgba(255,250,233,0.35)] to-[rgba(255,255,255,0.78)] opacity-[0.83] pointer-events-none" />
      {/* Content - z-[5] */}
      <Logo />
      <header className="w-full h-[calc(100%-80px)]">
        <HeaderUpper ref={headerUpperRef} handleOpenModal={handleOpenModal} />
        <HeaderLower ref={headerLowerRef} contactMethods={contactMethods} />
      </header>
    </section>
  );
}
