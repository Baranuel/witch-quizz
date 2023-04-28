import { motion } from "framer-motion";
import React from "react";
import { TypeAnimation } from "react-type-animation";

interface Props {
  children?: React.ReactNode;
  isLastQuestion?: boolean;
  setTryGuessing?: React.Dispatch<React.SetStateAction<boolean>>;
  setRevealClues?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsWriting: React.Dispatch<React.SetStateAction<boolean>>;
  question?: boolean;
  clue?: string;
  src: string;
  variants: Record<string, any>;
  revealClues?: boolean;
  handleStartSpellCast?: () => void;
  nextSentence?: () => void;
}

function TextBubble({
  children,
  variants,
  src,
  nextSentence,
  question,
  setTryGuessing,
  setIsWriting,
  clue,
  revealClues,
  setRevealClues,
  isLastQuestion,
  handleStartSpellCast,
}: Props) {
  return (
    <motion.div
      layout
      variants={variants}
      className={`flex ${
        src === "Rhysand"
          ? " min-w-full text-left"
          : " min-w-fit text-left self-end"
      }  text-color-text ${
        clue && revealClues ? "bg-cobalt-blue/20" : "bg-custom-black/20 "
      } rounded-xl py-6 px-4 mb-4  font-k2d transition-colors duration-300  `}
    >
      {src === "Rhysand" && (
        <div className=" flex flex-col justify-between text-sm text-color-heading min-w-[75px]">
          <h3>- Rhysand</h3>
          <h3>{clue && revealClues && clue}</h3>
        </div>
      )}
      <TypeAnimation
        sequence={[
          () => {
            setIsWriting(true);
            return new Promise((resolve) => setTimeout(resolve, 250));
          },
          children as string,
          () => {
            setIsWriting(false);
            new Promise((resolve) => {
              setTimeout(() => {
                question && setTryGuessing && setTryGuessing(true);
                question &&
                  isLastQuestion &&
                  handleStartSpellCast &&
                  handleStartSpellCast();
                resolve(true);
              }, 250);
            });

            nextSentence && nextSentence();
          },
        ]}
        className="  min-w-4/5 text-sm "
        wrapper="p"
        speed={55}
        cursor={false}
      />
    </motion.div>
  );
}

export default TextBubble;
