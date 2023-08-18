import { motion } from 'framer-motion'

import { spinTransition } from '@/motion/transitions'

const Spinner = () => {
  return (
    <div className="relative mx-auto flex w-full max-w-none py-16">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative box-border h-[3rem] w-[3rem]">
          <motion.div
            className="absolute left-0 top-0 box-border block h-[3rem] w-[3rem] rounded-3xl border-[0.5rem] border-slate-500 border-t-emerald-400"
            animate={{ rotate: 360 }}
            transition={spinTransition}
          />
        </div>
      </div>
    </div>
  )
}
export default Spinner
