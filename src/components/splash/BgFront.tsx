import { forwardRef } from "react";
import Image from "next/image";

const BgFront = forwardRef<HTMLDivElement>(function BgFront(_props, ref) {
  return (
    <div ref={ref} className="absolute top-0 left-0 z-[1] w-full h-full">
      <Image
        src="/images/bg-splash-front.webp"
        alt="Standing on top of a mountain"
        fill
        priority
        className="object-cover z-[1]"
      />
      <div
        className="absolute -bottom-32 left-0 w-full h-32 bg-bg z-[2]"
        data-testid="white"
      />
    </div>
  );
});

export default BgFront;
