import { motion } from "framer-motion";
import React from "react";

import TextBubble from "../components/TextBubble";
import TextGroup from "../components/TextGroup";

function test() {
  const questions = [
    {
      id: 0,
      question:
        "Greetings sorceress, My name is Nimue. I am a blood sorceress trapped in this device and you’ve entered my domain.",
    },
    {
      id: 1,
      question:
        "In order to free me and acquire this domain you must prove your worth. Are you ready to challenge me ?",
    },
  ];

  return (
    <div className="bg-bg-primary h-screen w-screen flex flex-col px-4  items-start justify-center">
      <motion.h1
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="text-[calc(100vw/10)] mb-4 font-k2d text-color-heading "
      >
        Encounter
      </motion.h1>
      <TextGroup questions={questions} />
    </div>
  );
}

export default test;
