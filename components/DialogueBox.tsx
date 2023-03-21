import { motion } from "framer-motion";
import React from "react";
import { variants } from "../globals/animations";
import MultipleSentences from "./MultipleSentences";
import TextBubble from "./TextBubble";

interface Props {
  dialogue: Record<string, any>[];
}

function DialogueBox({ dialogue }: Props) {
  const arr = [
    {
      type: "question",
      src: "Nimue",
      text: "Pray tell, young sourceress, how many musical spells were crafted under the shroud of darkness in the album bearing the name Midnights, which was created by the songstress known to some as the queen of heartbreak and the ruler of the snakes?",
    },
    {
      type: "question",
      src: "Nimue",
      text: "In order to free me and acquire this domain you must prove your worth. Are you ready to challenge me ?",
    },
    {
      type: "question",
      src: "Nimue",
      text: "Pray tell, young sourceress, how many musical spells were crafted under the shroud of darkness in the album bearing the name Midnights, which was created by the songstress known to some as the queen of heartbreak and the ruler of the snakes?",
    },
    {
      type: "question",
      src: "Nimue",
      text: "In order to free me and acquire this domain you must prove your worth. Are you ready to challenge me ?",
    },
    {
      type: "question",
      src: "Nimue",
      text: "Pray tell, young sourceress, how many musical spells were crafted under the shroud of darkness in the album bearing the name Midnights, which was created by the songstress known to some as the queen of heartbreak and the ruler of the snakes?",
    },
    {
      type: "question",
      src: "Nimue",
      text: "In order to free me and acquire this domain you must prove your worth. Are you ready to challenge me ?",
    },
  ];

  console.log(dialogue);
  return (
    <motion.div
      variants={variants}
      animate="show"
      initial="hidden"
      layout
      className="flex flex-col justify-center items-center w-full px-4 h-full"
    >
      <MultipleSentences sentencesArray={arr} />
      {dialogue.map((bubble, index) => {
        const { text } = bubble;
        return (
          <TextBubble type={bubble.type} variants={variants} key={index}>
            {text}
          </TextBubble>
        );
      })}
    </motion.div>
  );
}

export default DialogueBox;
