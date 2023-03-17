import React from "react";

interface Props {
  children?: React.ReactNode;
}

function Text({ children }: Props) {
  return (
    <p className=" font-k2d text-center text-color-text bg-custom-black/20 rounded-xl p-4 mb-8">
      {children}
    </p>
  );
}

export default Text;
