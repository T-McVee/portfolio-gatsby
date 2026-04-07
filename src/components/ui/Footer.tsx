import SocialIcons from "./SocialIcons";
import type { ContactMethod } from "@/lib/types";

interface FooterProps {
  contactMethods: ContactMethod[];
}

export default function Footer({ contactMethods }: FooterProps) {
  return (
    <footer className="flex flex-col items-center justify-center w-full text-white bg-surface-dark px-[5.5rem] pt-12 pb-8">
      <SocialIcons
        contactMethods={contactMethods}
        wrapperClass="text-center"
        iconClass="text-[2rem] mx-4 text-white transition-colors duration-200 hover:text-accent-1"
        linkClass="no-underline text-white transition-colors duration-200 hover:text-accent-1"
      />
      <a
        href="mailto:iam@tmcvee.com"
        className="text-white no-underline transition-colors duration-200 hover:text-accent-1"
      >
        <p className="text-[1.2rem] my-4">iam@tmcvee.com</p>
      </a>
      <p className="text-[1rem] text-center">
        &copy; Copyright {new Date().getFullYear()} Tim McVinish
        <span className="text-[1.2rem] ml-2">&#x1F9D1;&#x200D;&#x1F680;</span>
      </p>
    </footer>
  );
}
