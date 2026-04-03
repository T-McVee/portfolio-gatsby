import { forwardRef } from "react";
import SocialIcons from "@/components/ui/SocialIcons";
import type { ContactMethod } from "@/lib/types";

interface HeaderLowerProps {
  contactMethods: ContactMethod[];
}

const HeaderLower = forwardRef<HTMLDivElement, HeaderLowerProps>(
  function HeaderLower({ contactMethods }, ref) {
    return (
      <div
        ref={ref}
        className="relative z-[5] flex justify-end w-full h-56 pt-6"
      >
        <div className="flex w-64 flex-col items-end">
          <h2 className="text-[2.5rem] font-normal uppercase text-right leading-[2.75rem] w-fit mb-3 text-black max-laptop:[text-shadow:0_0_26px_rgba(255,255,255,0.7)]">
            Software Dev{" "}
            <span className="bold">
              / <br />
              Builder
            </span>
          </h2>
          {/* <p className="text-right text-[1.2rem] font-medium p-2 max-laptop:[text-shadow:4px_0_14px_rgba(255,255,255,1)]"> */}
          {/*   Hi, my name&apos;s Tim McVinish. I love using technology to create */}
          {/*   engaging experiences and solve problems. */}
          {/* </p> */}
        </div>
        <SocialIcons
          contactMethods={contactMethods}
          wrapperClass="relative z-[5] flex flex-col items-start w-12 h-2/3 justify-around"
          iconClass="text-[2rem] mx-4"
          linkClass="no-underline text-black transition-colors duration-200 hover:text-accent-1 hover:cursor-pointer"
        />
      </div>
    );
  },
);

export default HeaderLower;
