interface H2Props {
  children: React.ReactNode;
  className?: string;
}

export default function H2({ children, className }: H2Props) {
  return (
    <h2
      className={`text-[4rem] w-full mb-16 max-tablet:text-[3rem] max-tablet:break-words ${className ?? ""}`}
    >
      {children}
    </h2>
  );
}
