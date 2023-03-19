import { motion } from "framer-motion";
import React from "react";
import { TypeAnimation } from "react-type-animation";

interface Props {
  children?: React.ReactNode;
  question: Record<string, any>;
  variants: Record<string, any>;
  showNextQuestion: (id: number) => void;
}

function TextBubble({ children, variants, showNextQuestion, question }: Props) {
  const TIME_TO_WAIT_BEFORE_NEXT_QUESTION = 750;

  const handleNextQuestion = (id: number, delay: number) => {
    setTimeout(() => showNextQuestion(id), delay);
  };

  return (
    <motion.div
      layout
      variants={variants}
      className="flex text-color-text bg-custom-black/20 rounded-xl py-6 px-4 mb-4 gap-2 font-k2d justify-between min-w-full"
    >
      <h3 className="self-start text-sm text-color-heading min-w-[75px]">
        - Nimue
      </h3>
      <TypeAnimation
        sequence={[
          children as string,
          () => {
            handleNextQuestion(question.id, TIME_TO_WAIT_BEFORE_NEXT_QUESTION);
          },
        ]}
        className=" text-left w-4/5 text-sm "
        speed={75}
        cursor={false}
      />
    </motion.div>
  );
}

export default TextBubble;
