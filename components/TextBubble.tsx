import { motion } from "framer-motion";
import React from "react";
import { TypeAnimation } from "react-type-animation";

interface Props {
  children?: React.ReactNode;
  type: string;
  variants: Record<string, any>;
  nextSentence?: () => void;
}

function TextBubble({ children, variants, type, nextSentence }: Props) {
  return (
    <motion.div
      layout
      variants={variants}
      className={`flex ${
        type === "question"
          ? " min-w-full text-left"
          : " min-w-fit text-left self-end"
      }  text-color-text bg-custom-black/20 rounded-xl py-6 px-4 mb-4  font-k2d  `}
    >
      {type === "question" && (
        <h3 className=" flex text-sm text-color-heading min-w-[75px]">
          - Nimue
        </h3>
      )}
      <TypeAnimation
        sequence={[
          () => {
            return new Promise((resolve) => setTimeout(resolve, 500));
          },
          children as string,
          () => {
            nextSentence && nextSentence();
          },
        ]}
        className="  min-w-4/5 text-sm "
        wrapper="p"
        speed={99}
        cursor={false}
      />
    </motion.div>
  );
}

export default TextBubble;
