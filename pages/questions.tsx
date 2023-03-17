import { AnimatePresence, motion } from "framer-motion";
import React from "react";

function test() {
  return (
    <div className="bg-bg-primary">
      <AnimatePresence mode="wait">
        <motion.div
          className="bg-bg-primary h-screen w-screen flex items-center justify-center"
          initial={{ opacity: 1, translateY: -100 }}
          animate={{ opacity: 1, translateY: 0, transition: { duration: 1 } }}
        >
          test
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default test;
