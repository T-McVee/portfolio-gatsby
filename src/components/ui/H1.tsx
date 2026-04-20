interface H1Props {
  children: React.ReactNode;
  className?: string;
}

export default function H1({ children, className }: H1Props) {
  return (
    <h1
      className={`text-[4rem] font-bold w-full mb-16 max-tablet:text-[3rem] max-tablet:break-words max-phone:text-[2rem] ${className ?? ""}`}
    >
      {children}
    </h1>
  );
}
