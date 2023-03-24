import { motion } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { variants } from "../globals/animations";
import TextBubble from "./TextBubble";

interface Props {
  dialogue: Record<string, any>[];
  setTryGuessing: React.Dispatch<React.SetStateAction<boolean>>;
  numberOfAddedBubbles: number;
}

function DialogueBox({ dialogue, numberOfAddedBubbles, setTryGuessing }: Props) {
  const [firstRender, setFirstRender] = useState(true);
  const [sentences, setSentences] = useState([dialogue[0]]);
  const lastAddedItem = dialogue[dialogue.length - numberOfAddedBubbles];
  const [isWriting, setIsWriting] = useState(false);
  const divRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    if (!divRef.current) return;
    console.log("scrolling");
    divRef.current.scrollTop = divRef.current.scrollHeight + 100 ;
  },[sentences, isWriting]);

  useEffect(() => {
    //ugly hack to prevent the first sentence from being added twice
    if (!firstRender) {
      setTimeout(
        () => {
          setSentences((prev) => [...prev, lastAddedItem]);
        },
        lastAddedItem.src === "Rhysand" ? 750 : 0
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
    ref={divRef}
      variants={variants}
      animate="show"
      initial="hidden"
      layout

      className="flex flex-col scroll-smooth items-start w-full overflow-y-scroll h-[70vh] pb-12 px-4 "
    >
      {sentences.map((bubble, index) => {
        const { text } = bubble;
        return (
          <TextBubble
          setIsWriting={setIsWriting}
            setTryGuessing={setTryGuessing}
            nextSentence={() => nextSentence(index)}
            src={bubble.src}
            question={bubble.question}
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
