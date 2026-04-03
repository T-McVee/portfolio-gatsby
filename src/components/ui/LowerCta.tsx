import ButtonCta from "./ButtonCta";

interface LowerCtaProps {
  handleOpenModal: () => void;
}

export default function LowerCta({ handleOpenModal }: LowerCtaProps) {
  return (
    <section className="flex flex-col items-center justify-center w-full bg-light-grey px-[5.5rem] pb-48 max-tablet:pb-16">
      <h1 className="text-[2rem] mb-8 text-center">Let&apos;s connect</h1>
      <ButtonCta text="Get in contact" handleClick={handleOpenModal} />
    </section>
  );
}
