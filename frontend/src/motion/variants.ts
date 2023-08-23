// noinspection JSUnusedGlobalSymbols

export const hoverVariants = {
  initial: {
    opacity: 0.7,
    height: 50,
  },
  hover: {
    opacity: 0.8,
    height: 100,
  },
}
export const slideVariants = {
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
}

export const tabsVariants = {
  initial: () => {
    return {
      opacity: 0,
      y: 50,
    }
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeIn',
    },
  },
  exit: () => {
    return {
      opacity: 0,
      y: 50,
      transition: {
        duration: 0.1,
      },
    }
  },
}

export const staggerContainerVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.6,
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
}

export const titleVariant = {
  show: {
    y: 0,
    opacity: 1,
  },
  hidden: {
    y: -20,
    opacity: 0,
  },
}

export const underlayVariants = {
  hidden: {
    opacity: 0,
    backdropBlur: '0px',
  },
  show: {
    opacity: 1,
    backdropBlur: '8px',
    transition: {
      duration: 0.6,
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    backdropBlur: '0px',
  },
}

export const modalVariants = {
  hidden: {
    opacity: 0,
    y: -50,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: 'easeIn',
      duration: 0.6,
    },
  },
  exit: {
    opacity: 0,
    y: -50,
  },
}

const liVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
}

const ulVariants = {
  open: {
    clipPath: 'inset(0% 0% 0% 0% round 10px)',
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
  },
  closed: {
    clipPath: 'inset(10% 50% 90% 50% round 10px)',
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.3,
    },
  },
}

export { liVariants, ulVariants }
