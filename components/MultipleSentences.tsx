import React, { useState } from "react";
import { variants } from "../globals/animations";
import TextBubble from "./TextBubble";

interface Props {
  sentencesArray: Record<string, any>[];
}

function MultipleSentences({ sentencesArray }: Props) {
  const [sentences, setSentences] = useState([sentencesArray[0]]);

  const nextSentence = (index: number) => {
    if (index === sentencesArray.length - 1) return;
    setSentences([...sentences, sentencesArray[index + 1]]);
  };

  return (
    <div>
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
    </div>
  );
}

export default MultipleSentences;
