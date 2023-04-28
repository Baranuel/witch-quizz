import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import { ObjectId } from "mongodb";
import { InferGetServerSidePropsType } from "next";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import DialogueBox from "../components/DialogueBox";
import { getQuestions } from "../fetch-data";
import {
  answersAnimate,
  textBubbleAnimate,
  variants,
} from "../globals/animations";
import { introduction } from "../globals/introduction";
import { responses_after_wrong_answer } from "../globals/responses";
import Countdown from "../components/Countdown";

interface questionDto {
  id?: ObjectId;
  question_number: number;
  question: DialogueBubbleDto;
  correct_answer: string;
  possible_answers: string[];
  story: DialogueBubbleDto[];
}

interface DialogueBubbleDto {
  question?: boolean;
  src: string;
  text: string;
  clue?: string;
}

function Questions({
  _questions,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const story: questionDto[] = introduction.concat(_questions);
  const [currentQuestion, setCurrentQuestion] = useState<questionDto>(story[0]);
  const [myWrongAnswers, setMyWrongAnswers] = useState<string[]>([]);
  const [firstRender, setFirstRender] = useState(true);
  const [numberOfAddedBubbles, setNumberOfAddedBubbles] = useState(1);
  const [showDialogueBox, setShowDialogueBox] = useState(true);
  const [tryGuessing, setTryGuessing] = useState(false);
  const [winState, setWinState] = useState(false);

  const [arrayOfWrongResponses, setArrayOfWrongResponses] = useState(
    responses_after_wrong_answer
  );

  const [dialogueBox, setDialogueBox] = useState<DialogueBubbleDto[]>(
    currentQuestion.story
  );

  const [showCountdown, setShowCountdown] = useState(false);

  const isLastQuestion =
    currentQuestion.question_number === story[story.length - 1].question_number;

  const [revealClues, setRevealClues] = useState(isLastQuestion && tryGuessing);

  const [spellCast, setSpellCast] = useState<string>("");

  const castTheSpell = () => {
    // const spell = spellCast.toUpperCase()
    // if(spell !== currentQuestion.correct_answer) return
    setShowCountdown(false);
    setTryGuessing(false);
    setShowDialogueBox(false);
    setWinState(true);
  };

  useEffect(() => {
    if (!firstRender) {
      const { question } = currentQuestion;
      updateDialogueBoxInSequence(currentQuestion.story, question);
    } else {
      setFirstRender(false);
    }
  }, [currentQuestion]);

  const updateCurrentQuestion = () => {
    if (isLastQuestion) return;
    setCurrentQuestion((prev) => {
      return {
        ...story[prev.question_number + 1],
      };
    });
  };

  const updateDialogueBoxWithAnswer = (answer: string) => {
    setNumberOfAddedBubbles(1);
    setDialogueBox((prev: any) => [...prev, { src: "Me", text: answer }]);
  };

  const updateDialogueAfterWrongAnswer = () => {
    const randomResponse =
      arrayOfWrongResponses[
        Math.floor(Math.random() * arrayOfWrongResponses.length)
      ];

    //testing if we can update in sequence
    const text = [{ src: "Rhysand", text: randomResponse }];
    updateDialogueBoxInSequence(text);
    setArrayOfWrongResponses((prev) =>
      prev.filter((response) => response !== randomResponse)
    );
  };

  const updateDialogueBoxInSequence = (
    bubbles: DialogueBubbleDto[],
    question?: DialogueBubbleDto
  ) => {
    const arrayOfStoryAndQuestion = question
      ? bubbles.concat(question)
      : bubbles;
    setNumberOfAddedBubbles((prev) => arrayOfStoryAndQuestion.length);
    setDialogueBox((prev: any) => [...prev.concat(arrayOfStoryAndQuestion)]);
  };

  const determineCorrectAnswer = (answer: string) => {
    if (answer === currentQuestion.correct_answer) {
      setTryGuessing(false);
      updateCurrentQuestion();
    } else {
      setMyWrongAnswers((prev) => [...prev, answer]);
      updateDialogueAfterWrongAnswer();
    }
  };

  const handleAnswer = (answer: string) => {
    updateDialogueBoxWithAnswer(answer);
    setTimeout(() => {
      determineCorrectAnswer(answer);
    }, 750);
  };

  const handleStartSpellCast = () => {
    setRevealClues(true);
    setShowCountdown(true);
  };

  return (
    <>
      <motion.div className="flex flex-col justify-between h-screen">
        <LayoutGroup>
          <motion.div
            className={`bg-bg-primary h-screen w-screen flex flex-col items-start justify-between ${
              !showDialogueBox
                ? "bg-color-heading transition-bg-color duration-1000"
                : ""
            }`}
          >
            <motion.div layout className="mt-2">
              <motion.div
                className={`flex items-center justify-between bg-bg-primary w-screen sticky top-0 mb-4 ${
                  !showDialogueBox
                    ? "bg-color-heading transition-bg-color duration-1000 h-0"
                    : ""
                }`}
              >
                <motion.h1
                  onClick={() => castTheSpell()}
                  layout
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className={`text-[calc(100vw/10)] px-4 font-k2d text-color-heading `}
                >
                  Encounter
                </motion.h1>
                {showCountdown && <Countdown number={30} />}
              </motion.div>
              {winState && (
                <motion.div
                  initial={{ opacity: 0, y: 1000 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 1, duration: 0.5 },
                  }}
                  className="flex flex-col items-center justify-center h-screen w-screen "
                >
                  <motion.h1 className="text-3xl">
                    Thank you for saving me
                  </motion.h1>
                  <motion.h2 className="mt-2 text-xl">
                    {" "}
                    You have unlocked this domain
                  </motion.h2>
                  <motion.p className="text-3xl mt-6">1 3 0 7</motion.p>
                </motion.div>
              )}
              <AnimatePresence>
                {showDialogueBox && (
                  <DialogueBox
                    handleStartSpellCast={handleStartSpellCast}
                    isLastQuestion={isLastQuestion}
                    numberOfAddedBubbles={numberOfAddedBubbles}
                    dialogue={dialogueBox}
                    setTryGuessing={setTryGuessing}
                    revealClues={revealClues}
                    setRevealClues={setRevealClues}
                  />
                )}
              </AnimatePresence>
              <AnimatePresence></AnimatePresence>
            </motion.div>

            <AnimatePresence initial={false} mode="popLayout">
              {!isLastQuestion && (
                <motion.ul
                  variants={variants}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, scale: 0.5, y: 50 }}
                  className="grid grid-cols-2 w-full p-2 h-[120px] items-center fixed bottom-0 gap-2"
                >
                  <AnimatePresence initial={false} mode="popLayout">
                    {tryGuessing &&
                      currentQuestion.possible_answers.map(
                        (answer: string, index: number) => {
                          const disabled = myWrongAnswers.includes(answer);
                          return (
                            <motion.li
                              variants={answersAnimate}
                              exit={{ opacity: 0, scale: 0.5, y: 50 }}
                              transition={{ duration: 0.3 }}
                              key={index}
                              className="w-full"
                            >
                              <Button
                                disabled={disabled}
                                text={answer}
                                onClick={() => {
                                  handleAnswer(answer);
                                }}
                              />
                            </motion.li>
                          );
                        }
                      )}
                  </AnimatePresence>
                </motion.ul>
              )}
            </AnimatePresence>

            <AnimatePresence initial={false} mode="popLayout">
              {isLastQuestion && (
                <motion.div
                  variants={variants}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, scale: 0.5, y: 50 }}
                  className="flex h-[100px] items-center p-2 w-full gap-2 justify-between fixed bottom-0 "
                >
                  <AnimatePresence initial={false} mode="popLayout">
                    {tryGuessing && (
                      <motion.div
                        variants={answersAnimate}
                        exit={{ opacity: 0, scale: 0.5, y: 50 }}
                        className=" flex items-center w-full gap-2 justify-between"
                      >
                        <input
                          onChange={(e) => setSpellCast(e.target.value)}
                          type="text"
                          className="bg-bg-secondary text-color-heading p-3 w-full basis-2/3 rounded-md bg-custom-black/30 border border-color-primary uppercase "
                        />
                        <div className="w-full basis-1/3">
                          <Button text="Cast" onClick={() => castTheSpell()} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </motion.div>
    </>
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
