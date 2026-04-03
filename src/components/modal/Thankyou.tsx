import H1 from "@/components/ui/H1";
import Button from "@/components/ui/Button";

interface ThankyouProps {
  handleClick: () => void;
}

export default function Thankyou({ handleClick }: ThankyouProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <H1 className="!text-[3rem] text-center">Cheers!</H1>
      <span className="text-[4rem] ml-2">&#x1F9D1;&#x200D;&#x1F680;</span>
      <p className="text-[1.6rem] mb-2">Message received.</p>
      <p className="text-[1.6rem] mb-2">We&apos;ll contact you shortly.</p>
      <Button onClick={handleClick}>Close</Button>
    </div>
  );
}
