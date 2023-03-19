import { motion, LayoutGroup } from "framer-motion";
import { InferGetServerSidePropsType } from "next";
import React, { useEffect, useRef } from "react";
import TextGroup from "../components/TextGroup";
import { getQuestions } from "../fetch-data";

function Questions({
  _questions,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const ref = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    if (ref.current === null) return;
    setInterval(() => (ref.current.scrollTop = ref.current.scrollHeight), 100);
  }, [ref]);

  const questions = [
    {
      id: 0,
      question:
        "Greetings sorceress, My name is Nimue. I am a crimson witch trapped in this device and you’ve entered my domain.",
    },
    {
      id: 1,
      question:
        "In order to free me and acquire this domain you must prove your worth. Are you ready to challenge me ?",
    },
    {
      id: 2,
      question:
        "In order to free me and acquire this domain you must prove your worth. Are you ready to challenge me ?",
    },
    {
      id: 3,
      question:
        "In order to free me and acquire this domain you must prove your worth. Are you ready to challenge me ?",
    },
    {
      id: 4,
      question:
        "In order to free me and acquire this domain you must prove your worth. Are you ready to challenge me ?",
    },
    {
      id: 5,
      question:
        "In order to free me and acquire this domain you must prove your worth. Are you ready to challenge me ?",
    },
    {
      id: 6,
      question:
        "In order to free me and acquire this domain you must prove your worth. Are you ready to challenge me ?",
    },
    {
      id: 7,
      question:
        "In order to free me and acquire this domain you must prove your worth. Are you ready to challenge me ?",
    },
  ];

  return (
    <LayoutGroup>
      <motion.div className="bg-bg-primary min-h-screen w-screen flex flex-col   items-start justify-center">
        <motion.h1
          layout
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="text-[calc(100vw/10)] mb-4 px-4 font-k2d text-color-heading "
        >
          Encounter
        </motion.h1>

        <TextGroup questions={questions} />

        <div>answers</div>
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
