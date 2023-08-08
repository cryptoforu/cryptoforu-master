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
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }
  },
}
export const priceVariant = {
  current: (price: string) => {
    return {
      color: '',
    }
  },
}
export const tabsVariants = {
  initial: (direction: number) => {
    return {
      opacity: 0,
      translateX: direction === 0 ? '-100%' : '100%',
      transition: {
        duration: 0.5,
      },
    }
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
