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
  const divRef = useRef<HTMLDivElement>(null!);
  const [tryGuessing, setTryGuessing] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(_questions[0]);
  const [arrayOfWrongResponses, setArrayOfWrongResponses] = useState(responses_after_wrong_answer)
  const [dialogueBox, setDialogueBox] = useState(introduction);

  useEffect(() => {
    if (!divRef.current) return;
    divRef.current.scrollTop = divRef.current.scrollHeight + 100;
  }, [dialogueBox]);

  const updateCurrentQuestion = () => {
    setCurrentQuestion((prev:any) => 
      _questions.find((question:any) => question.question_number === prev.question_number + 1)
    );
  };

  const updateDialogueBoxWithAnswer = (answer: string) => {
    setDialogueBox((prev) => [
      ...prev,
      { type: "answer", src: "Me", text: answer },
    ]);
  };

  const determineCorrectAnswer = (answer: string) => {
    if (answer === currentQuestion.correct_answer) {
      setTryGuessing(false);
      updateCurrentQuestion();
    } else {
      const randomResponse = arrayOfWrongResponses[Math.floor(Math.random() * arrayOfWrongResponses.length)]
      setDialogueBox((prev) => [
        ...prev,
        { type: "question", src: "Me", text: randomResponse },
        { type: "question", src: "Me", text: randomResponse },
      ]);
      setArrayOfWrongResponses((prev) => prev.filter((response) => response !== randomResponse))
    }
  };

  const handleAnswer = (answer: string) => {
    updateDialogueBoxWithAnswer(answer);
    setTimeout(() => {
      determineCorrectAnswer(answer);
    }, 750);
  };

  console.log(currentQuestion)

  return (
    <LayoutGroup>
      <motion.div className="bg-bg-primary min-h-screen w-screen flex flex-col items-start justify-center">
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
        <motion.div
          layout
          ref={divRef}
          className="w-full overflow-y-scroll h-[75vh] "
        >
          <DialogueBox dialogue={dialogueBox} />
        </motion.div>

      <motion.ul  variants={variants} initial="hidden" animate='show' className="grid grid-cols-2 w-full p-2 h-[10vh]  gap-2">
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
