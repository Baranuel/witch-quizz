import { motion } from "framer-motion";
import React from "react";
import { TypeAnimation } from "react-type-animation";

interface Props {
  children?: React.ReactNode;
  setTryGuessing?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsWriting: React.Dispatch<React.SetStateAction<boolean>>;
  question?: boolean;
  src: string;
  variants: Record<string, any>;
  nextSentence?: () => void;
}

function TextBubble({ children, variants, src, nextSentence, question, setTryGuessing, setIsWriting }: Props) {
  return (
    <motion.div
      layout
      variants={variants}
      className={`flex ${
        src === "Rhysand"
          ? " min-w-full text-left"
          : " min-w-fit text-left self-end"
      }  text-color-text bg-custom-black/20 rounded-xl py-6 px-4 mb-4  font-k2d  `}
    >
      {src === "Rhysand" && (
        <h3 className=" flex text-sm text-color-heading min-w-[75px]">
          - Rhysand
        </h3>
      )}
      <TypeAnimation
        sequence={[
          () => {
            setIsWriting(true)
            return new Promise((resolve) => setTimeout(resolve, 250));
          },
          children as string,
          () => {      
            setIsWriting(false)     
             new Promise((resolve) => {
             setTimeout(() => {
              question && setTryGuessing && setTryGuessing(true);
              resolve(true)
             }, 250)
             });

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
