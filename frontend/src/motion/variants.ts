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
