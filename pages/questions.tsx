import { motion, LayoutGroup } from "framer-motion";
import { InferGetServerSidePropsType } from "next";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import DialogueBox from "../components/DialogueBox";
import MultipleSentences from "../components/MultipleSentences";
import { getQuestions } from "../fetch-data";
import { introduction } from "../globals/introduction";

function Questions({
  _questions,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const divRef = useRef<HTMLDivElement>(null!);
  const [tryGuessing, setTryGuessing] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(_questions[0]);
  const [dialogueBox, setDialogueBox] = useState(introduction);
  const [myAnswer, setMyAnswer] = useState("");

  useEffect(() => {
    if (!divRef.current) return;
    divRef.current.scrollTop = divRef.current.scrollHeight;
  }, [dialogueBox]);

  const updateCurrentQuestion = () => {
    setCurrentQuestion(
      _questions.find((q: any) => q.question_number === q.question_number + 1)
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
      setDialogueBox((prev) => [
        ...prev,
        { type: "question", src: "Me", text: "I don't know" },
      ]);
    }
  };

  const handleAnswer = async (answer: string) => {
    return new Promise((resolve) => {
      setMyAnswer(answer);
      updateDialogueBoxWithAnswer(answer);
      resolve(true);
    }).then(() => {
      setTimeout(() => {
        determineCorrectAnswer(answer);
      }, 750);
    });
  };

  return (
    <LayoutGroup>
      <motion.div className="bg-bg-primary min-h-screen w-screen flex flex-col items-start justify-center">
        <motion.h1
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

        <ul className="grid grid-cols-2 w-full p-2 gap-2">
          {tryGuessing &&
            currentQuestion.possible_answers.map(
              (answer: string, index: number) => {
                return (
                  <li className="" key={index}>
                    <Button
                      text={answer}
                      onClick={() => {
                        handleAnswer(answer);
                      }}
                    />
                  </li>
                );
              }
            )}
        </ul>
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
