import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import { InferGetServerSidePropsType } from "next";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import DialogueBox from "../components/DialogueBox";
import MultipleSentences from "../components/MultipleSentences";
import { getQuestions } from "../fetch-data";
import { answersAnimate, textBubbleAnimate, variants } from "../globals/animations";
import { introduction } from "../globals/introduction";
import { responses_after_wrong_answer } from "../globals/responses";

function Questions({
  _questions,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [numberOfAddedBubbles, setNumberOfAddedBubbles] = useState(1);
  const [tryGuessing, setTryGuessing] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(_questions[0]);
  const [arrayOfWrongResponses, setArrayOfWrongResponses] = useState(responses_after_wrong_answer)
  const [dialogueBox, setDialogueBox] = useState(introduction);



  const updateCurrentQuestion = () => {
    setCurrentQuestion((prev:any) => 
      _questions.find((question:any) => question.question_number === prev.question_number + 1)
    );
  };

  const updateDialogueBoxWithAnswer = (answer: string) => {
    setNumberOfAddedBubbles(1)
    setDialogueBox((prev) => [
      ...prev,
      { type: "answer", src: "Me", text: answer },
    ]);
  };

  const updateDialogueAfterWrongAnswer = () => {
    const randomResponse = arrayOfWrongResponses[Math.floor(Math.random() * arrayOfWrongResponses.length)]
    const randomResponse1 = arrayOfWrongResponses[Math.floor(Math.random() * arrayOfWrongResponses.length)]
    //testing if we can update in sequence
    const text = [{ type: "question", src: "Nimue", text: randomResponse,},{ type: "question", src: "Nimue", text: randomResponse1}]
    updateDialogueBoxInSequence(text,2)
    setArrayOfWrongResponses((prev) => prev.filter((response) => response !== randomResponse))
   }

   const updateDialogueBoxInSequence = (bubbles:any[], numberOfAddedBubbles?:any) => {
      setNumberOfAddedBubbles((prev) => numberOfAddedBubbles || 1);
      setDialogueBox((prev) => [
        ...prev.concat(bubbles)
      ]);
   }
  

  const determineCorrectAnswer = (answer: string) => {
    if (answer === currentQuestion.correct_answer) {
      setTryGuessing(false);
      updateCurrentQuestion();
    } else {
      updateDialogueAfterWrongAnswer();
     
  };
}

  const handleAnswer = (answer: string) => {
    updateDialogueBoxWithAnswer(answer);
    setTimeout(() => {
      determineCorrectAnswer(answer);
    }, 750);
  };

  console.log(currentQuestion)

  return (
    <LayoutGroup>
      <motion.div className="flex flex-col justify-between h-screen">

      <motion.div className="bg-bg-primary h-screen w-screen flex flex-col items-start justify-between">
        <motion.div
          layout
          className="mt-24"
          >
          <motion.h1
          onClick={() => setTryGuessing(prev => !prev)}
          layout
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="text-[calc(100vw/10)] mb-4 px-4 font-k2d text-color-heading "
          >
          Encounter
        </motion.h1>
          <DialogueBox numberOfAddedBubbles={numberOfAddedBubbles} dialogue={dialogueBox} />
        </motion.div>

      <motion.ul  variants={variants} initial="hidden" animate='show' className="grid grid-cols-2 w-full p-2   gap-2">
        <AnimatePresence initial={false} mode='popLayout'>
          {tryGuessing &&
            currentQuestion.possible_answers.map(
              (answer: string, index: number) => {
                return (
                  <motion.li variants={answersAnimate} exit={{opacity: 0,scale:0.5, y:50}} key={index}>
                    <Button
                      text={answer}
                      onClick={() => {
                        handleAnswer(answer);
                      }}
                      />
                  </motion.li>)})}
                      </AnimatePresence>
        </motion.ul>
      </motion.div>
    </motion.div>
    </LayoutGroup>
  );
}

export default Questions;

export async function getServerSideProps(context: any) {
  try {
    const questions = await getQuestions();

    return {
      props: { isConnected: true, _questions: questions },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}
