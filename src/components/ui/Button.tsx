interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function Button({
  children,
  onClick,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="text-[1.2rem] text-white bg-accent-1 px-4 py-4 border-none rounded-small mt-2 hover:cursor-pointer hover:outline hover:outline-1 hover:outline-black"
    >
      {children}
    </button>
  );
}
