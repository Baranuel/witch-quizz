import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { AnimatedHeader } from "../components/AnimatedHeader";
import TextBubble from "../components/TextBubble";

function test() {
  const variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 1.5,
      },
    },
  };

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
      <motion.div variants={variants} animate={"visible"}>
        <TextBubble>
          Greetings sorceress, My name is Nimue. I am a blood sorceress trapped
          in this device and you’ve entered my domain.
        </TextBubble>
      </motion.div>
    </div>
  );
}

export default test;
