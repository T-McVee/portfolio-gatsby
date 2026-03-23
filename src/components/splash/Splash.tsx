"use client";

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
      <BgFront />
      {/* Gradient overlay - z-[3] */}
      <div className="absolute top-0 left-0 z-[3] w-full h-full bg-gradient-to-b from-[rgba(255,250,233,0.35)] to-[rgba(255,255,255,0.78)] opacity-[0.83] pointer-events-none" />
      {/* Content - z-[5] */}
      <Logo />
      <header className="w-full h-[calc(100%-80px)]">
        <HeaderUpper handleOpenModal={handleOpenModal} />
        <HeaderLower contactMethods={contactMethods} />
      </header>
    </section>
  );
}
