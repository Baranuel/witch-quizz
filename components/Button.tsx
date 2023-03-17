import React from "react";

interface Props {
  text: string;
  onClick: () => void;
}

function Button({ text, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="py-3 min-w-[155px] px-8 font-k2d text-color-primary border rounded-lg border-color-primary"
    >
      {text}
    </button>
  );
}

export default Button;
