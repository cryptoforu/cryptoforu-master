'use client'
import { useAnimate } from 'framer-motion'
import { useEffect } from 'react'
import { Section } from '@/components/wrappers'

const LoadingSection = () => {
  const [scope, animate] = useAnimate()
  useEffect(() => {
    if (scope.current) {
      animate(
        scope.current,
        { height: 'auto', opacity: 1 },
        { delay: 0.5, duration: 0.5 }
      )
    }
  }, [animate, scope])
  return (
    <Section ref={scope} id={'loading'} ariaLabel={'Loading'}>
      <div
        className={
          'flex h-screen w-full animate-pulse items-center justify-center rounded-lg bg-slate-300 dark:bg-slate-900'
        }
      >
        <div className={'h-[600px]'} />
      </div>
    </Section>
  )
}
export default LoadingSection
