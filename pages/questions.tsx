import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { AnimatedHeader } from "../components/AnimatedHeader";

function test() {
  return (
    <div className="bg-bg-primary h-screen w-screen flex items-center justify-center">
      <AnimatedHeader />
    </div>
  );
}

export default test;
