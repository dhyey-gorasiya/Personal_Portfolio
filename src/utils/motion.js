export const transition = {
  duration: 0.7,
  ease: [0.22, 0.95, 0.36, 1],
};

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition,
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition },
};

export const staggerContainer = (stagger = 0.12, delayChildren = 0.1) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren, ...transition },
  },
});

export const hoverPop = {
  whileHover: { scale: 1.03, translateY: -2, transition },
  whileTap: { scale: 0.99 },
};

export const fadeInScale = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition },
};


