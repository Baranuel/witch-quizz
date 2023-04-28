import Link from "next/link";
import React from "react";

interface Props {
  text: string;
  href: string;
}

function LinkComponent({ text, href }: Props) {
  return (
    <Link
      href={`/${href}`}
      className="py-3 min-w-[155px] px-8 font-k2d text-center text-color-primary border rounded-lg border-color-primary"
    >
      {text}
    </Link>
  );
}

export default LinkComponent;
