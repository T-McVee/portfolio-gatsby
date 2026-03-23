import Image from "next/image";

export default function BgFront() {
  return (
    <div className="absolute top-0 left-0 z-[1] w-full h-full">
      <Image
        src="/images/bg-splash-front.webp"
        alt="Standing on top of a mountain"
        fill
        priority
        className="object-cover z-[1]"
      />
      <div
        className="absolute -bottom-32 left-0 w-full h-32 bg-white z-[2]"
        data-testid="white"
      />
    </div>
  );
}
