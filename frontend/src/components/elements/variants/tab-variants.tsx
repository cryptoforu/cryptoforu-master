import { cva, VariantProps } from 'class-variance-authority'

export const tab = cva(
  'relative text-sm font-medium text-slate-700 focus:outline-none dark:text-slate-300',
  {
    variants: {
      initial: {
        underline:
          'z-10 whitespace-nowrap px-3 py-2.5 hover:text-slate-950 dark:hover:text-white',
        pill: 'rounded-md px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-900',
      },
      selected: {
        underline: 'absolute inset-x-0 -bottom-px h-1 bg-emerald-400',
        pill: 'absolute inset-0 rounded-md bg-slate-100/50 dark:bg-black/50',
      },
    },
    defaultVariants: {
      initial: 'underline',
    },
  }
)
type TabVariants = 'underline' | 'pill'

export interface TabStyleProps extends VariantProps<typeof tab> {
  tabVariant?: TabVariants
  variant?: keyof VariantProps<typeof tab>
}

export const tabList = cva(
  'relative hidden cursor-pointer flex-wrap border-b border-slate-200 dark:border-slate-900 lg:flex',
  {
    variants: {
      horizontal: {
        left: 'ml-12 max-w-2xl justify-start gap-x-6',
        center: 'mx-auto max-w-2xl justify-center gap-x-6 gap-y-4',
        full: 'mx-auto max-w-max justify-start gap-x-6 gap-y-4',
      },
      vertical: {
        left: 'ml-12 max-w-2xl flex-col justify-start gap-x-6',
        center: 'mx-auto max-w-2xl flex-col justify-center gap-x-6 gap-y-4',
        full: 'mx-auto max-w-max flex-col justify-start gap-x-6 gap-y-4',
      },
    },
    defaultVariants: {
      horizontal: 'left',
    },
  }
)
type ListVariants = 'left' | 'center' | 'full'

export interface TabListStyleProps extends VariantProps<typeof tabList> {
  tabPosition?: ListVariants
  variant?: keyof VariantProps<typeof tabList>
}

export const tabPanels = cva('', {
  variants: {
    initial: {
      withBg:
        'relative mt-6 overflow-hidden rounded-2xl border border-slate-50 bg-slate-100/10 px-14 py-16 dark:border-slate-900/50 dark:bg-slate-950/50 xl:px-16',
      transparent: 'relative mt-6 px-12',
    },
  },
  defaultVariants: {
    initial: 'transparent',
  },
})

type TabPanelsVariant = 'withBg' | 'transparent'

export interface TabPanelsStyleProps extends VariantProps<typeof tabPanels> {
  panelsVariant?: TabPanelsVariant
  variant?: keyof VariantProps<typeof tabPanels>
}
