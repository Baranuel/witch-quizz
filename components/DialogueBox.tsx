import { motion } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { textBubbleAnimate, variants } from "../globals/animations";
import TextBubble from "./TextBubble";

interface Props {
  dialogue: Record<string, any>[];
  isLastQuestion: boolean;
  handleStartSpellCast: () => void;
  setTryGuessing: React.Dispatch<React.SetStateAction<boolean>>;
  setRevealClues: React.Dispatch<React.SetStateAction<boolean>>;
  numberOfAddedBubbles: number;
  revealClues: boolean;
}

function DialogueBox({ dialogue, numberOfAddedBubbles, setTryGuessing, revealClues, setRevealClues, isLastQuestion, handleStartSpellCast }: Props) {

  const [firstRender, setFirstRender] = useState(true);
  const [sentences, setSentences] = useState([dialogue[0]]);
  const lastAddedItem = dialogue[dialogue.length - numberOfAddedBubbles];
  const [isWriting, setIsWriting] = useState(false);
  const divRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    if (!divRef.current) return;
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

      className="flex flex-col scroll-smooth items-start w-full overflow-y-scroll h-[calc(100vh-100px-150px)] pb-32 px-4 "
    >
      {sentences.map((bubble, index) => {
        const { text } = bubble;
        return (
          <TextBubble
          handleStartSpellCast={handleStartSpellCast}
          isLastQuestion={isLastQuestion}
            revealClues={revealClues}
            setRevealClues={setRevealClues}
            setIsWriting={setIsWriting}
            setTryGuessing={setTryGuessing}
            nextSentence={() => nextSentence(index)}
            clue={bubble.clue}
            src={bubble.src}
            question={bubble.question}
            variants={textBubbleAnimate}
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
