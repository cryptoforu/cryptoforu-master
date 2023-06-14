'use client'
import Link from 'next/link'
import Image from 'next/image'
import GridPattern from '@/components/patterns/GridPattern'
import {
  motion,
  MotionValue,
  useMotionTemplate,
  useMotionValue,
} from 'framer-motion'
import type { Features } from '@/types/shared-types'
import { MouseEvent } from 'react'
import { Heading } from '@/components/typography'

function CardIcon({ icon, alt }: { icon: string; alt: string }) {
  return (
    <div
      className={
        'flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/5 ring-1 ring-slate-900/25 backdrop-blur-[2px] transition duration-300 group-hover:bg-white/50 group-hover:ring-slate-900/25 dark:bg-white/10 dark:ring-white/20 dark:group-hover:bg-emerald-300/10 dark:group-hover:ring-emerald-400'
      }
    >
      <Image
        src={icon}
        alt={alt}
        className={
          'h-10 w-10 fill-slate-700/10 stroke-slate-700 transition-colors duration-300 group-hover:stroke-slate-900 dark:fill-white/10 dark:stroke-slate-400 dark:group-hover:fill-emerald-300/10 dark:group-hover:stroke-emerald-400'
        }
        width={40}
        height={40}
      />
    </div>
  )
}

type PatternProps = {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  pattern: {
    squares: [x: number, y: number][]
    y: string
  }
}

const CardPattern = ({ mouseX, mouseY, ...gridProps }: PatternProps) => {
  let maskImage = useMotionTemplate`radial-gradient(180px at ${mouseX}px ${mouseY}px, white, transparent)`
  let style = { maskImage, WebkitMaskImage: maskImage }
  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50">
        <GridPattern
          width={72}
          height={56}
          x="50%"
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/[0.02] stroke-black/5 dark:fill-white/5 dark:stroke-white/2.5"
          {...gridProps.pattern}
        />
      </div>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#D7EDEA] to-[#F4FBDF] opacity-0 transition duration-300 group-hover:opacity-100 dark:from-[#202D2E] dark:to-[#303428]"
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-100"
        style={style}
      >
        <GridPattern
          width={72}
          height={56}
          x="50%"
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/50 stroke-black/70 dark:fill-white/2.5 dark:stroke-white/10"
          {...gridProps.pattern}
        />
      </motion.div>
    </div>
  )
}

const HoverCard = ({ name, link, image, description }: Features) => {
  let mouseX = useMotionValue(0)
  let mouseY = useMotionValue(0)

  function onMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: MouseEvent<HTMLDivElement>) {
    let { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      key={link}
      onMouseMove={onMouseMove}
      className="group relative flex rounded-2xl bg-slate-50 transition-shadow hover:shadow-md hover:shadow-slate-900/5 dark:bg-white/2.5 dark:hover:shadow-black/5"
    >
      <CardPattern
        pattern={{
          y: '16',
          squares: [
            [0, 1],
            [1, 3],
          ],
        }}
        mouseX={mouseX}
        mouseY={mouseY}
      />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-slate-900/7.5 group-hover:ring-slate-900/10 dark:ring-white/10 dark:group-hover:ring-white/20" />
      <div className="relative rounded-2xl px-4 pb-4 pt-8">
        <CardIcon icon={image} alt={name} />
        <Heading as={'h3'} size={'lg'} className="mt-4">
          <Link href="">
            <span className="absolute inset-0 rounded-2xl" />
            {name}
          </Link>
        </Heading>

        {description}
      </div>
    </div>
  )
}
export default HoverCard
