import { motion } from "framer-motion";
import React, { useState } from "react";
import TextBubble from "./TextBubble";
import { variants, textBubbleAnimate } from "../globals/animations";

interface Props {
  questions: Record<string, any>[];
}

function TextGroup({ questions }: Props) {
  const lastQuestionId = questions[questions.length - 1].id;
  const NEXT_QUESTION_ID_INCREMENT = 1;
  console.log;
  const [questionsToShow, setQuestionsToShow] = useState([questions[0]]);

  const showNextQuestion = (id: number) => {
    if (id > lastQuestionId) return;
    setQuestionsToShow((prev) => [...prev, questions[id]]);
  };

  return (
    <motion.div variants={variants} animate="show" initial="hidden">
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
