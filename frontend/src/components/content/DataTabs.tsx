'use client'
import type { TabPanelProps, TabProps } from 'react-aria-components'
import { Collection, Tab, TabList, TabPanel, Tabs } from 'react-aria-components'
import { motion } from 'framer-motion'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Key, useState, useTransition } from 'react'
import { tabsVariants } from '@/motion/variants'
import { InternalLink } from '@/components/elements'
import { ArrowRightIcon } from '@heroicons/react/24/solid'
import bg from '@/images/bg-dark.webp'
import Image from 'next/image'
import { clsx } from 'clsx'
import { Route } from 'next'

const tabVariants = cva(
  'relative font-medium text-sm text-slate-700 dark:text-slate-300 focus:outline-none hover:text-emerald-600 dark:hover:text-emerald-400',
  {
    variants: {
      base: {
        underline: 'whitespace-nowrap py-4 px-1',
        pill: 'px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-900',
      },
      selected: {
        underline: 'absolute left-0 right-0 -bottom-px h-1 bg-emerald-400',
        pill: 'absolute inset-0 rounded-md bg-slate-100/50 dark:bg-black/50',
      },
    },
  }
)
const tabListVariants = {
  left: 'justify-start gap-x-6 max-w-2xl ml-12',
  center: 'max-w-2xl mx-auto justify-center gap-x-6 gap-y-4',
  full: 'max-w-max mx-auto justify-start gap-x-6 gap-y-4',
}
const panelClasses = {
  withBg:
    'relative mt-6 overflow-hidden rounded-2xl border border-slate-50 bg-slate-100/10 px-14 py-16 dark:border-slate-900/50 dark:bg-slate-950/50 xl:px-16',
  transparent: 'relative mt-6 px-12',
}

interface DataTabsProps extends VariantProps<typeof tabVariants>, TabProps {
  tabs: {
    id: string | number
    label: string
    content: TabPanelProps['children']
  }[]
  variant?: 'underline' | 'pill' | null | undefined
  withLink?: boolean
  listVariant: keyof typeof tabListVariants
  panelVariant?: keyof typeof panelClasses
  linkHref?: Route
}

const DataTabs = ({ tabs, ...props }: DataTabsProps) => {
  const {
    variant,
    base,
    selected,
    className,
    withLink,
    listVariant = 'left',
    panelVariant = 'withBg',
    linkHref,
  } = props
  const [[isSelected, direction], setSelected] = useState(['1', 1])
  const [isPending, startTransition] = useTransition()

  function onSelectionChange(key: Key) {
    startTransition(() => {
      setSelected([key as string, key > isSelected ? 0 : 1])
    })
  }

  return (
    <Tabs
      selectedKey={isSelected}
      onSelectionChange={onSelectionChange}
      className={'hidden lg:relative lg:mt-20 lg:block'}
    >
      <TabList
        className={clsx(
          'relative flex cursor-pointer flex-wrap border-b border-slate-200 dark:border-slate-900',
          tabListVariants[listVariant]
        )}
        aria-label={'Data Tabs'}
        items={tabs}
      >
        {(item) => (
          <Tab
            className={cn(tabVariants({ className, base: variant }))}
            aria-label="Tabs"
            id={item.id}
          >
            {({ isSelected }) => (
              <>
                {isSelected && (
                  <motion.div
                    layoutId={'underline'}
                    className={cn(
                      tabVariants({ className, selected: variant })
                    )}
                  />
                )}
                {item.label}
                {isPending && (
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="mr-3 inline h-4 w-4 animate-spin text-white"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                )}
              </>
            )}
          </Tab>
        )}
      </TabList>
      {withLink && linkHref && (
        <InternalLink
          href={linkHref}
          className={cn(
            tabVariants({
              className: 'absolute right-12 top-0 inline-flex',
              base: variant,
            })
          )}
        >
          Browse All{' '}
          <ArrowRightIcon
            className={'ml-2 inline-flex h-5 w-5 justify-center'}
          />
        </InternalLink>
      )}

      <div className={panelClasses[panelVariant]}>
        {panelVariant === 'withBg' && (
          <div
            className={
              'absolute inset-0 bg-gradient-to-r from-[#36b49f] to-[#DBFF75] opacity-40 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-[#36b49f]/30 dark:to-[#DBFF75]/30 dark:opacity-20'
            }
          >
            <Image src={bg} alt={''} className={'h-auto max-w-full'} />
          </div>
        )}

        <motion.div
          key={isSelected}
          initial={'initial'}
          animate={'animate'}
          exit={'exit'}
          variants={tabsVariants}
          custom={direction}
          className="-mx-5 flex"
        >
          <Collection items={tabs}>
            {(item) => <TabPanel>{item.content}</TabPanel>}
          </Collection>
        </motion.div>
      </div>
    </Tabs>
  )
}
export default DataTabs
