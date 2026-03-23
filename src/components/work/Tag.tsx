interface TagProps {
  text: string;
  rightAlign?: boolean;
}

export default function Tag({ text, rightAlign }: TagProps) {
  if (!text) return null;
  return (
    <li
      className={`
        w-fit px-6 py-2 list-none text-[1.2rem] lowercase text-white bg-grey rounded-small
        mt-2 mr-2 transition-transform duration-200 hover:scale-[1.02] hover:cursor-default
        max-xl:text-[1rem] max-xl:px-5
        max-laptop:text-[1.2rem] max-laptop:px-6
        max-tablet:text-[1rem] max-tablet:px-5
        ${rightAlign ? "max-laptop:mt-2 max-laptop:mr-2" : "max-laptop:mt-2 max-laptop:ml-2 max-laptop:mr-0"}
      `}
      data-testid="tag"
    >
      {text}
    </li>
  );
}
