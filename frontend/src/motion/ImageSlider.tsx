import { clsx } from 'clsx'
import { AnimatePresence, motion, wrap } from 'framer-motion'
import { ReactNode } from 'react'

import LazyImage from '@/components/elements/LazyImage'
import { Text } from '@/components/typography'
import { hoverVariants, slideVariants } from '@/motion/variants'
import useImageSliderController from '@/store/controllers/useImageSliderController'
import { useImageSliderContext } from '@/store/useImageSliderStore'

const swipeConfidenceThreshold = 10000

const MotionImage = motion(LazyImage)

const ImageSlider = ({ className }: { className: string }) => {
  const { page, direction, swipePower, paginate } = useImageSliderController()
  const sliderData = useImageSliderContext((state) => state.sliderData)
  const imageIndex = wrap(0, sliderData.images.length, page)
  return (
    <>
      <AnimatePresence initial={false} custom={direction}>
        <MotionImage
          key={page}
          src={sliderData.images[imageIndex]}
          width={1000}
          height={1000}
          alt={''}
          className={className}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          // @ts-ignore
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x)

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1)
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1)
            }
          }}
        />
        <div
          className={
            'absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4'
          }
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 z-10 flex h-24 items-center justify-center gap-2 p-2"
          >
            {[0, 1, 2].map((_, index) => (
              <span
                key={index}
                className={clsx(
                  'h-2 w-6 rounded-full',
                  index === imageIndex
                    ? 'bg-slate-200 dark:bg-gray-900'
                    : 'bg-slate-300 dark:bg-gray-700'
                )}
              />
            ))}
          </div>
        </div>
      </AnimatePresence>
    </>
  )
}
export default ImageSlider

export const SliderContainer = ({
  containerClass,
  children,
}: {
  containerClass: string
  children: ReactNode
}) => {
  const { hoverProps, isHovered, page } = useImageSliderController()
  const sliderData = useImageSliderContext((state) => state.sliderData)
  const title = sliderData.title as string[]
  const titleIndex = wrap(0, title.length, page)
  return (
    <div className={containerClass} {...hoverProps}>
      {children}
      <AnimatePresence initial={false}>
        <motion.div
          key={page}
          className={
            'absolute bottom-0 left-0 z-10 w-full max-w-2xl bg-primary-white object-cover dark:bg-primary-dark'
          }
          initial={'initial'}
          animate={isHovered ? 'hover' : 'initial'}
          variants={hoverVariants}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className={'flex flex-col items-start justify-start p-2'}>
            <Text size={'lg'} variant={'darker'}>
              {title[titleIndex]}
            </Text>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
