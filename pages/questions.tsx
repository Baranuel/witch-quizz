import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import { ObjectId } from "mongodb";
import { InferGetServerSidePropsType } from "next";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import DialogueBox from "../components/DialogueBox";
import { getQuestions } from "../fetch-data";
import { answersAnimate, textBubbleAnimate, variants } from "../globals/animations";
import { introduction } from "../globals/introduction";
import { responses_after_wrong_answer } from "../globals/responses";

interface questionDto {
  id?: ObjectId;
  question_number: number;
  question: DialogueBubbleDto;
  correct_answer: string;
  possible_answers: string[];
  story: DialogueBubbleDto[];
}

interface DialogueBubbleDto {
  question?: boolean ;
  src: string;
  text: string;
  clue?: string;
}

function Questions({
  _questions,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const story:questionDto[] = introduction.concat(_questions)
  const [firstRender, setFirstRender] = useState(true);
  const [numberOfAddedBubbles, setNumberOfAddedBubbles] = useState(1);
  const [tryGuessing, setTryGuessing] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<questionDto>(story[0]);
  const [arrayOfWrongResponses, setArrayOfWrongResponses] = useState(responses_after_wrong_answer)
  const [dialogueBox, setDialogueBox] = useState<DialogueBubbleDto[]>(currentQuestion.story);

  const isLastQuestion = currentQuestion.question_number === story[story.length - 1].question_number
  const [revealClues, setRevealClues] = useState(isLastQuestion && tryGuessing);

  useEffect( () => {
    if(!firstRender) {

      const {question} = currentQuestion
      updateDialogueBoxInSequence(currentQuestion.story, question)
    } else {
      setFirstRender(false)
    }
  },[currentQuestion])

  

  const updateCurrentQuestion = () => {
    if(isLastQuestion) return;
    setCurrentQuestion((prev) => {
      return {
        ...story[prev.question_number + 1],
      }
    });
    
  };

  const updateDialogueBoxWithAnswer = (answer: string) => {
    setNumberOfAddedBubbles(1)
    setDialogueBox((prev:any) => [
      ...prev,
      {  src: "Me", text: answer },
    ]);
  };

  const updateDialogueAfterWrongAnswer = () => {
    const randomResponse = arrayOfWrongResponses[Math.floor(Math.random() * arrayOfWrongResponses.length)]

    //testing if we can update in sequence
    const text = [{ src: "Rhysand", text: randomResponse}]
    updateDialogueBoxInSequence(text)
    setArrayOfWrongResponses((prev) => prev.filter((response) => response !== randomResponse))
   }

   const updateDialogueBoxInSequence = (bubbles:DialogueBubbleDto[], question?:DialogueBubbleDto) => {
      const arrayOfStoryAndQuestion = question ? bubbles.concat(question) : bubbles
      setNumberOfAddedBubbles((prev) => arrayOfStoryAndQuestion.length);
      setDialogueBox((prev:any) => [
        ...prev.concat(arrayOfStoryAndQuestion)
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


  return (
      <motion.div className="flex flex-col justify-between h-screen">
    <LayoutGroup>

      <motion.div className="bg-bg-primary h-screen w-screen flex flex-col items-start justify-between">
        <motion.div
          layout
          className="mt-2"
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
          <DialogueBox isLastQuestion={isLastQuestion} numberOfAddedBubbles={numberOfAddedBubbles} dialogue={dialogueBox} setTryGuessing={setTryGuessing} revealClues={revealClues} setRevealClues={setRevealClues} />
        </motion.div>

  <AnimatePresence initial={false} mode='popLayout'>
   {!isLastQuestion &&
    <motion.ul  variants={variants} initial="hidden" animate='show' exit={{opacity: 0,scale:0.5, y:50}} className="grid grid-cols-2 w-full p-2 
    h-[120px] items-center gap-2">
        <AnimatePresence initial={false} mode='popLayout'>

           {tryGuessing &&
             currentQuestion.possible_answers.map(
               (answer: string, index: number) => {
                 return (
                   <motion.li variants={answersAnimate} exit={{opacity: 0,scale:0.5, y:50}}   transition={{ duration: 0.3 }}
                      key={index} className='w-full'>
                     <Button
                       text={answer}
                       onClick={() => {
                         handleAnswer(answer);
                       }}
                       />
                   </motion.li>)})
                   
                  }
                  </AnimatePresence>
         </motion.ul> }
         </AnimatePresence>
         
         <AnimatePresence initial={false} mode='popLayout'>
          {isLastQuestion && 
         <motion.div variants={variants} initial="hidden" animate='show' exit={{opacity: 0,scale:0.5, y:50}} className="flex h-[100px] items-center p-2 w-full gap-2 justify-between">
            <AnimatePresence initial={false} mode='popLayout'>
          {tryGuessing &&
            <motion.div variants={answersAnimate} exit={{opacity: 0,scale:0.5, y:50}} className=" flex items-center w-full gap-2 justify-between">
            <input type="text" className="bg-bg-secondary text-color-heading p-3 w-full basis-2/3 rounded-md bg-custom-black/30 border border-color-primary "/>
            <div className="w-full basis-1/3">
            <Button text="Cast" onClick={() => {}} />
            </div>
            </motion.div>
            }
            </AnimatePresence>
            
          </motion.div>
         }
         </AnimatePresence>
      </motion.div>
    </LayoutGroup>
    </motion.div>
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
