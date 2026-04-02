import { forwardRef } from "react";
import ButtonCta from "@/components/ui/ButtonCta";

interface HeaderUpperProps {
  handleOpenModal: () => void;
}

const HeaderUpper = forwardRef<HTMLDivElement, HeaderUpperProps>(
  function HeaderUpper({ handleOpenModal }, ref) {
    return (
      <div ref={ref} className="relative z-[5] w-full h-[calc(100%-14rem)] border-r border-black">
        <h1 className="text-[4.5rem] font-normal uppercase leading-[5rem] mb-4 max-phone:text-[2.5rem] max-phone:leading-[3rem]">
          Tim <br /> <span className="bold">McVinish</span>
        </h1>
        <ButtonCta text="get in contact" handleClick={handleOpenModal} />
      </div>
    );
  }
);

export default HeaderUpper;
