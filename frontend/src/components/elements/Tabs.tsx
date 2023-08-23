'use client'
import { Node, Orientation } from '@react-types/shared'
import { motion } from 'framer-motion'
import { Key, ReactNode, useRef } from 'react'
import {
  AriaTabListProps,
  AriaTabPanelProps,
  mergeProps,
  useTab,
  useTabList,
  useTabPanel,
} from 'react-aria'
import { TabListState, useTabListState } from 'react-stately'

import { MenuButton, MenuItem } from '@/components/elements/Menu'
import { cn } from '@/lib/utils'
import { tabsVariants } from '@/motion/variants'
import useTabsController from '@/store/controllers/useTabsController'
import { useTabs } from '@/store/useTabs'

import {
  tab,
  tabList,
  TabListStyleProps,
  tabPanels,
  TabPanelsStyleProps,
  TabStyleProps,
} from './variants/tab-variants'

interface ITabProps<T extends object> extends TabStyleProps {
  item: Node<T>
  state: TabListState<T>
  orientation?: Orientation
}

export function Tab<T extends object>({ item, state, ...props }: ITabProps<T>) {
  const { key, rendered } = item
  const tabRef = useRef(null)
  const { tabProps, isSelected } = useTab<T>({ key }, state, tabRef)
  const { variant = 'initial', tabVariant = 'underline' } = props
  const { isFocused, hoverProps } = useTabsController()
  return (
    <div
      {...mergeProps(tabProps, hoverProps)}
      id={key as string}
      ref={tabRef}
      className={cn(tab({ [variant]: [tabVariant] }))}
    >
      {rendered}
      {isSelected && (
        <motion.div
          className="absolute inset-x-4 -bottom-px h-1 rounded-full bg-emerald-400"
          layoutId={'underline'}
        />
      )}
      {isFocused(key as string) && (
        <motion.div
          transition={{
            layout: {
              duration: 0.2,
              ease: 'easeOut',
            },
          }}
          className={
            'absolute inset-0 rounded-md bg-slate-100 dark:bg-black/40'
          }
          layoutId={'highlight'}
        />
      )}
    </div>
  )
}

interface ITabPanelProps<T extends object>
  extends AriaTabPanelProps,
    TabPanelsStyleProps {
  state: TabListState<T>
}

export function TabPanel<T extends object>({
  state,
  ...props
}: ITabPanelProps<T>) {
  const panelRef = useRef(null)
  const { tabPanelProps } = useTabPanel<T>(props, state, panelRef)
  const { variant = '', panelsVariant } = props
  const direction = useTabs.use.direction()

  return (
    <div
      {...tabPanelProps}
      ref={panelRef}
      className={cn(tabPanels({ [variant]: [panelsVariant] }))}
    >
      <motion.div
        className={'-mx-5 flex'}
        variants={tabsVariants}
        initial={'initial'}
        animate={'animate'}
        exit={'exit'}
        custom={direction}
      >
        {state.selectedItem.props.children}
      </motion.div>
    </div>
  )
}

interface ITabsV2<T extends object>
  extends AriaTabListProps<T>,
    TabListStyleProps {
  tabVariant?: 'underline' | 'pill'
  tabPanelVariant?: 'withBg' | 'transparent'
}

type DataItem = {
  id: string
  key: Key
  label: string
  content: ReactNode
}
export default function Tabs<T extends object>(props: ITabsV2<T>) {
  const state = useTabListState<T>(props)
  const tabsRef = useRef(null)
  const { tabListProps } = useTabList<T>(props, state, tabsRef)
  const {
    tabPosition,
    variant = '',
    tabVariant = 'underline',
    tabPanelVariant = 'transparent',
  } = props
  const { setFocused } = useTabsController()

  return (
    <div className={'relative mt-20'}>
      <div className={'block lg:hidden'}>
        <MenuButton
          colorScheme={'secondary'}
          items={props.items as DataItem[]}
          disabled={props.isDisabled}
          label={state.selectedItem.rendered}
          onAction={props.onSelectionChange}
        >
          {(item) => (
            <MenuItem id={item.id} key={item.key}>
              {item.label}
            </MenuItem>
          )}
        </MenuButton>
      </div>
      <div
        {...tabListProps}
        ref={tabsRef}
        className={cn(tabList({ [variant]: [tabPosition] }))}
        onMouseLeave={() => setFocused(null)}
      >
        {Array.from(state.collection).map((item) => (
          <Tab
            key={item.key}
            item={item}
            state={state}
            orientation={props.orientation}
            tabVariant={tabVariant}
          />
        ))}
      </div>
      <TabPanel
        key={state.selectedItem?.key}
        state={state}
        panelsVariant={tabPanelVariant}
      />
    </div>
  )
}
