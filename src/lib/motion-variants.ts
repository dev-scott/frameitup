export const buttonVariants = {
  initial: { scal: 1, opacity: 1 },
  hover: {
    scale: 1.05,
    opacity: 0.9,
    transition: { type: "spring", stiffness: 400, damping: 10 },
  },
};

export const cardVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.1, ease: "easeInOut" },
  },
};

export const divVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.1, ease: "easeInOut" },
  },
};

export const paragraphVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
};

export const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };