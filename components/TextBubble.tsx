import { motion } from "framer-motion";
import React from "react";
import { TypeAnimation } from "react-type-animation";

interface Props {
  children?: React.ReactNode;
}

function TextBubble({ children }: Props) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: {
          delayChildren: 0.5,
        },
      }}
      transition={{ duration: 0.25, delay: 0.25 }}
      className="flex text-color-text bg-custom-black/20 rounded-xl py-6 px-4 mb-4 gap-2 font-k2d justify-between min-w-full"
    >
      <h3 className="self-start text-md text-color-heading min-w-[75px]">
        - Nimue
      </h3>
      <TypeAnimation
        sequence={[children as string]}
        className=" text-left w-4/5 "
        speed={75}
        cursor={false}
      />
    </motion.div>
  );
}

export default TextBubble;
