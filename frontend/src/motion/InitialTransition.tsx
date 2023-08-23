// noinspection JSUnusedGlobalSymbols

'use client'
import { motion } from 'framer-motion'

import AppLogo from '@/components/AppLogo'

const containerVariants = {
  initial: {
    opacity: 1,
    height: '100vh',
    bottom: 0,
  },
  animate: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1],
    },
    transitionEnd: { display: 'none' },
  },
}
const logoContainer = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 0,
    transition: {
      duration: 0.3,
      when: 'afterChildren',
    },
  },
}
const logoVariants = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 0,
    transition: {
      duration: 1.5,
      ease: [0.87, 0, 0.13, 1],
    },
  },
}

const InitialTransition = () => {
  return (
    <motion.div className="flex max-h-screen w-full">
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={containerVariants}
        className="absolute z-50 flex w-full items-center justify-center backdrop-blur"
      >
        <motion.div
          variants={logoContainer}
          aria-hidden="true"
          className="absolute inset-0 flex h-full items-center"
        >
          <div
            aria-hidden="true"
            className="m-auto h-56 w-56 rounded-full bg-gradient-to-r from-cyan-400 via-emerald-500 to-teal-600 blur-xl md:h-[30rem] md:w-[30rem] md:blur-3xl"
          ></div>
        </motion.div>

        <div
          aria-hidden="true"
          className="absolute inset-0 h-full w-full bg-white opacity-90 dark:bg-[#020314]"
        ></div>

        <motion.div
          variants={logoVariants}
          className="flex w-full max-w-md pl-4 pt-4"
        >
          <AppLogo variant={'base_logo'} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default InitialTransition
