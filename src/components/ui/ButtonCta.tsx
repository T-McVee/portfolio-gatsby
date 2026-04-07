"use client";

interface ButtonCtaProps {
  text: string;
  handleClick: () => void;
}

export default function ButtonCta({ text, handleClick }: ButtonCtaProps) {
  return (
    <div
      onClick={handleClick}
      className="
        inline-block px-4 py-2 border border-border rounded-small
        text-[19px] text-text relative overflow-hidden z-[1]
        transition-all duration-200 ease-in cursor-pointer
        before:content-[''] before:absolute before:right-full before:top-0
        before:w-[140%] before:h-[180%] before:bg-text/5 before:rounded-full
        before:block before:transition-all before:duration-500 before:delay-100
        before:ease-[cubic-bezier(0.55,0,0.1,1)] before:z-[-1]
        before:translate-x-[-25%] before:scale-y-100 before:scale-x-125
        after:content-[''] after:absolute after:right-[105%] after:top-1/4
        after:w-[160%] after:h-[190%] after:bg-accent-1 after:rounded-full
        after:block after:transition-all after:duration-500 after:delay-100
        after:ease-[cubic-bezier(0.55,0,0.1,1)] after:z-[-1]
        after:translate-x-[-50%] after:scale-y-100 after:scale-x-[1.45]
        hover:text-white hover:border-accent-1
        hover:before:right-[-105%] hover:before:bg-accent-1
        hover:before:translate-x-[-50%] hover:before:scale-y-[1.4] hover:before:scale-x-[1.3]
        hover:after:right-[-100%] hover:after:bg-accent-1
        hover:after:translate-x-[-50%] hover:after:scale-y-[1.4] hover:after:scale-x-[1.3]
      "
    >
      {text}
    </div>
  );
}
