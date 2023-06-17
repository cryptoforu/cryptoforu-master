export const btnOutline = {
  hover: (outColor: string) => {
    return {
      scale: 1.02,
      outline: `2.5px solid ${outColor}`,
      outlineOffset: '1.5px',
    }
  },
  initial: {
    scale: 1,
  },
  tap: {
    scale: 0.95,
  },
}
export const slideVariants = {
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
export const priceVariant = {
  current: (price: string) => {
    return {
      color: '',
    }
  },
}
