import { motion } from "framer-motion";
import React from "react";
import Text from "./Text";

import LinkComponent from "./LinkComponent";

interface Props {
  entered: boolean;
  setEntered: (entered: boolean) => void;
}

function EntryScreen({ entered, setEntered }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, translateX: 0 }}
      className="flex flex-col items-center justify-center h-screen w-screen bg-bg-primary px-4"
    >
      <h1 className="text-[calc(100vw/10)] mb-6 font-k2d text-color-heading ">
        Welcome sorceress
      </h1>
      <Text>
        Please be aware that you are entering the domain of a powerful and
        vengeful witch, who is deeply resentful due to being trapped by a spell.
        It is advised that you proceed with caution.
      </Text>
      <LinkComponent
        href="questions"
        text="Enter"
        onClick={() => {
          setEntered(true);
        }}
      />
    </motion.div>
  );
}

export default EntryScreen;
