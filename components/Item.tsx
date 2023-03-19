import { motion } from "framer-motion";
import React from "react";

function Item() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show">
      <motion.li variants={item}>Hello</motion.li>
      <motion.li variants={item}>Hello</motion.li>
      <motion.li variants={item}>Hello</motion.li>
    </motion.div>
  );
}

export default Item;
