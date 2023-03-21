import { motion } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import { variants } from "../globals/animations";
import TextBubble from "./TextBubble";

interface Props {
  dialogue: Record<string, any>[];
}

function DialogueBox({ dialogue }: Props) {
  const [firstRender, setFirstRender] = useState(true);
  const [sentences, setSentences] = useState([dialogue[0]]);
  const lastAddedItem = dialogue[dialogue.length - 1];

  useEffect(() => {
    //ugly hack to prevent the first sentence from being added twice
    if (!firstRender) {
      setTimeout(
        () => {
          setSentences((prev) => [...prev, lastAddedItem]);
        },
        lastAddedItem.src === "Nimue" ? 750 : 0
      );
    } else {
      setFirstRender(false);
    }
  }, [dialogue]);

  const nextSentence = (index: number) => {
    if (index >= dialogue.length - 1) return;
    setTimeout(() => {
      setSentences((prev) => [...prev, dialogue[index + 1]]);
    }, 750);
  };

  return (
    <motion.div
      variants={variants}
      animate="show"
      initial="hidden"
      layout
      className="flex flex-col  items-center w-full px-4 h-full"
    >
      {sentences.map((bubble, index) => {
        const { text } = bubble;
        return (
          <TextBubble
            nextSentence={() => nextSentence(index)}
            type={bubble.type}
            variants={variants}
            key={index}
          >
            {text}
          </TextBubble>
        );
      })}
    </motion.div>
  );
}

export default DialogueBox;
