import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

function Countdown({ number}: { number: number }) {
  const [timeLeft, setTimeLeft] = useState(number);

  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <motion.div
      initial={{ opacity: 0, position: "absolute", y: 100 }}
      animate={{ opacity: 1, position: "initial", y: 0 }}
      transition={{ duration: 0.5 }}
      className="px-4 text-4xl text-color-primary font-k2d font-light"
    >
      {timeLeft}
    </motion.div>
  );
}

export default Countdown;
