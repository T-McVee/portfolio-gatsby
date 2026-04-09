interface XpBlockProps {
  heading: string;
  number: string;
}

export default function XpBlock({ heading, number }: XpBlockProps) {
  return (
    <div className="mr-8 first:mb-8">
      <h2 className="text-[1rem] font-light lowercase text-dark-grey mb-4">
        {heading}:
      </h2>
      <div className="flex flex-row">
        <div
          className="text-[6rem] font-medium text-accent-1 leading-[3.5rem] max-tablet:text-[4rem]"
          data-testid="number"
        >
          {number}
        </div>
        <div className="text-accent-1 text-[2rem] leading-[1rem] font-semibold mr-2 max-tablet:text-[1.5rem]">
          +
        </div>
        <div className="text-[2rem] w-40 leading-[1.8rem]">
          Years of experience
        </div>
      </div>
    </div>
  );
}
