export const variants = {
  hidden: { opacity: 0, scale: 0.5 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { staggerChildren: 1, delayChildren: 0.3,},
  },
};

export const textBubbleAnimate = {
  hidden: { opacity: 0, scale: 0.5 },
  show: { opacity: 1, scale: 1 },
};

export const answersAnimate = {
  hidden: { opacity: 0, scale: 0.5, y: 50 },
  show: { opacity: 1, scale: 1, y: 0 },
}
