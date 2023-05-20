export const notifyVariants = {
  initial: {
    opacity: 0,
    y: 50,
    scale: 0.3,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    transition: { duration: 0.2 },
  },
};

export const cardVariants = {
  hover: {
    y: -10,
    outline: '2.5px solid',
    outlineColor: '#34d399',
  },
  initial: {
    y: 0,
    outline: 'transparent',
  },
  exit: {
    transition: {
      duration: 0,
      delay: 0,
    },
  },
};

export const glowVariants = {
  hover: {
    opacity: 0.8,
    y: -10,
  },
  initial: {
    y: 0,
    opacity: 0,
  },
  exit: {
    transition: {
      duration: 0,
    },
  },
};

export const btnOutline = {
  hover: (outColor: string) => {
    return {
      scale: 1.02,
      outline: '2.5px solid',
      outlineColor: outColor ? outColor : '#34d399',
    };
  },
  initial: {
    scale: 1,
  },
  tap: {
    scale: 0.95,
  },
};

export const BtnHover = {
  hover: {
    scale: 1.1,
    boxShadow: '2px 2px 0 #10b981',
    border: '1px solid',
    borderColor: '#10b981',
  },
  initial: {
    scale: 1,
  },
};

export const sectionVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 2,
    },
  },
};

export const tabsVariants = {
  initial: (direction: number) => {
    return {
      opacity: 0,
      translateX: direction === 0 ? '-100%' : '100%',
      transition: {
        duration: 0.5,
      },
    };
  },
  animate: {
    opacity: 1,
    translateX: '0%',
    transition: {
      duration: 0.5,
    },
  },
  exit: (direction: number) => {
    return {
      opacity: 0,
      translateX: direction === 0 ? '100%' : '-100%',
      transition: {
        duration: 0,
      },
    };
  },
};
