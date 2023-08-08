'use client'
import { Heading, Text } from '@/components/typography'
import { ExternalLink, InternalLink } from '@/components/elements'
import { Route } from 'next'
import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import useHoverController from '@/store/controllers/useHoverController'
import AnimatedImage from '@/motion/AnimatedImage'

type SmallImageProps = {
  image: string
  label: string
  desc: string
  badge?: string
  link?: string
  href?: string
  children?: ReactNode | string
}

const SmallImageCard = (props: SmallImageProps) => {
  const { onHoverStart, onHoverEnd, hoveredIndex } = useHoverController()
  return (
    <motion.div
      onHoverStart={(e) => onHoverStart(props.label)}
      onHoverEnd={() => onHoverEnd()}
      className={'relative rounded-2xl px-3 py-2'}
    >
      <div
        className="relative flex aspect-[3/2] items-center justify-center rounded-2xl px-6 shadow-lg"
        style={{
          backgroundImage:
            'conic-gradient(from -49.8deg at 50% 50%, #34d399 0deg, #5EEAD4 59.07deg, #bef264 185.61deg, #34d399 284.23deg, #bef264 329.41deg, #34d399 360deg)',
        }}
      >
        <AnimatedImage
          src={props.image}
          alt={props.label}
          width={1024}
          height={1024}
          className={'rounded-lg object-cover shadow-lg'}
        />

        <div className="absolute bottom-2 left-2 flex items-center rounded-lg bg-black/30 px-1.5 py-0.5 text-sm text-white [@supports(backdrop-filter:blur(0))]:bg-white/10 [@supports(backdrop-filter:blur(0))]:backdrop-blur">
          <div className={'ml-2'}>{props.badge && props.badge}</div>
        </div>
      </div>
      <Heading as={'h3'} className={'mt-6'}>
        {props.link ? (
          <InternalLink href={props.link as Route}>{props.label}</InternalLink>
        ) : (
          <ExternalLink href={props.href as string}>{props.label}</ExternalLink>
        )}
      </Heading>
      <Text className={'mt-2 line-clamp-3'} variant={'secondary'}>
        {props.desc}
      </Text>
      {props.children}
    </motion.div>
  )
}
export default SmallImageCard
