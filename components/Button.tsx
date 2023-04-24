import React from "react";

interface Props {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

function Button({ text, onClick, disabled }: Props) {
  return (
    <button
      onClick={onClick}
      className={`py-3  w-full  px-4 font-k2d text-color-primary border rounded-lg border-color-primary ${disabled && "opacity-30 pointer-events-none"}`}
    >
      {text}
    </button>
  );
}

export default Button;
