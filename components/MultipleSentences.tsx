import { motion } from "framer-motion";
import React, { useState } from "react";
import { variants } from "../globals/animations";
import TextBubble from "./TextBubble";

interface Props {
  sentencesArray: Record<string, any>[];
}

function MultipleSentences({ sentencesArray }: Props) {
  //get the first sentence from array and then add more in "nextSentence" function
  const [sentences, setSentences] = useState([sentencesArray[0]]);

  const nextSentence = (index: number) => {
    if (index === sentencesArray.length - 1) return;
    setSentences((prev) => [...prev, sentencesArray[index + 1]]);
  };

  return (
    <motion.div
      variants={variants}
      animate="show"
      initial="hidden"
      layout
      className="w-full"
    >
      {sentences.map((sentence: any, index: any) => {
        const { text } = sentence;
        return (
          <TextBubble
            type="question"
            key={index}
            nextSentence={() => nextSentence(index)}
            variants={variants}
          >
            {text}
          </TextBubble>
        );
      })}
    </motion.div>
  );
}

export default MultipleSentences;
