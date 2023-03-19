import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import TextBubble from "./TextBubble";
import { variants, textBubbleAnimate } from "../globals/animations";

interface Props {
  questions: Record<string, any>[];
}

function TextGroup({ questions }: Props) {
  // constants
  const lastQuestionId = questions[questions.length - 1].id;
  const NEXT_QUESTION_ID_INCREMENT = 1;
  const questionsRef = useRef<HTMLDivElement>(null!);

  //states
  const [questionsToShow, setQuestionsToShow] = useState([questions[0]]);

  // functions
  const showNextQuestion = (id: number) => {
    if (id > lastQuestionId) return;
    scrollToBottom();
    setQuestionsToShow((prev) => [...prev, questions[id]]);
  };

  const scrollToBottom = () => {
    if (!questionsRef.current) return;
    questionsRef.current.scrollTop = questionsRef.current.scrollHeight;
  };

  return (
    <motion.div
      ref={questionsRef}
      className="max-h-[65vh] w-full overflow-auto px-4"
      variants={variants}
      animate="show"
      initial="hidden"
    >
      {questionsToShow.map((question: any, index: number) => {
        return (
          <TextBubble
            showNextQuestion={() => {
              showNextQuestion(question.id + NEXT_QUESTION_ID_INCREMENT);
            }}
            question={question}
            key={question.id}
            variants={textBubbleAnimate}
          >
            {question.question}
          </TextBubble>
        );
      })}
    </motion.div>
  );
}

export default TextGroup;
