import { cva, VariantProps } from 'class-variance-authority'

export const card = cva('relative', {
  variants: {
    variant: {
      filledGray:
        'rounded-xl border border-gray-200 bg-white shadow dark:border-gray-900 dark:bg-gray-950',
      filledSlate:
        'rounded-xl border border-slate-200 bg-slate-100 shadow dark:border-slate-700 dark:bg-slate-900',
      outlineGray:
        'group rounded-xl border border-gray-200 dark:border-gray-900/50',
      outlineSlate:
        'rounded-xl border border-slate-200 dark:border-slate-900/50',
      article: 'flex flex-col items-start justify-between',
      transparent: 'rounded-2xl',
    },
    size: {
      sm: 'max-w-sm p-4',
      md: 'max-w-md p-6',
      lg: 'px-3 py-2',
      xl: 'max-w-xl p-4',
      prose: 'max-w-prose',
      none: '',
    },
  },
  defaultVariants: {
    variant: 'outlineSlate',
    size: 'sm',
  },
})

export type CardVariants = {} & VariantProps<typeof card>

export const cardHeader = cva('relative', {
  variants: {
    variant: {
      centered: 'flex items-center justify-center',
      secondary: 'flex aspect-[3/2] items-center justify-center',
      article: 'flex items-center',
      paper: 'border-b border-b-cyan-100 dark:border-b-slate-900',
    },
    size: {
      sm: 'p-2 xl:p-3',
      md: 'p-3 xl:p-4',
      article: 'gap-x-4',
    },
  },
})

export type CardHeaderVariants = {} & VariantProps<typeof cardHeader>

export const cardBody = cva('relative', {
  variants: {
    variant: {
      centered: 'flex items-center justify-center',
      start: 'flex flex-col items-start justify-start',
      secondary: 'overflow-hidden rounded-xl',
      article: 'group',
    },
    size: {
      sm: 'gap-4 p-2 xl:p-4',
      md: 'gap-6 p-4',
      none: '',
    },
  },
  defaultVariants: {
    variant: 'centered',
  },
})

export type CardBodyVariants = {} & VariantProps<typeof cardBody>

export const cardLink = cva('', {
  variants: {
    variant: {
      overlay: 'absolute inset-0 z-50 overflow-hidden',
      hoverBorder:
        'absolute -inset-px z-50 rounded-xl border-2 border-transparent opacity-0 transition-all duration-500 ease-linear [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.emerald.50)),var(--quick-links-hover-bg,theme(colors.emerald.50)))_padding-box,linear-gradient(to_top,theme(colors.green.400),theme(colors.teal.400),theme(colors.emerald.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.950)]',
      title: '',
      badge:
        'relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 dark:bg-slate-900 dark:text-gray-400 dark:hover:bg-slate-800',
    },
  },
  defaultVariants: {
    variant: 'hoverBorder',
  },
})

export type CardLinkVariants = {} & VariantProps<typeof cardLink>

export const cardImage = cva('relative', {
  variants: {
    variant: {
      primary: 'rounded-lg shadow-lg',
      secondary: 'rounded-2xl shadow-xl',
    },
    size: {
      sm: 'h-60 w-full',
      md: 'h-72',
      auto: 'h-auto',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})
export type CardImageVariants = {} & VariantProps<typeof cardImage>

export const cardFooter = cva('', {
  variants: {
    variant: {
      primary: 'flex w-full items-center justify-between',
      secondary: 'relative mt-8 flex items-center justify-start',
    },
    border: {
      slate: 'border-t border-t-cyan-50 dark:border-t-slate-900',
      none: '',
    },
    size: {
      sm: 'gap-x-4 px-4',
      md: 'gap-6 p-4',
      article: 'gap-x-4',
    },
  },
  defaultVariants: {
    variant: 'primary',
    border: 'none',
  },
})

export type CardFooterVariants = {} & VariantProps<typeof cardFooter>

export const cardAnimations = {
  primary: {
    hover: {
      backgroundColor: 'rgb(15 23 42 / 0.5)',
      outline: 'solid 1.5px #34d399',
      y: -10,
    },
    initial: {
      outline: 'solid 1.5px transparent',
      y: 0,
    },
  },
  article: {
    hover: {
      backgroundColor: 'rgb(30 41 59 / 0.5)',
      backgroundOpacity: 1,
      borderRadius: '12px',
      scale: 1.05,
    },
    initial: {
      backgroundColor: 'rgb(30 41 59 / 0)',
      backgroundOpacity: 0,
      scale: 0.95,
    },
  },
  secondary: {
    hover: {
      border: 'solid 2.5px #14b8a6',
      padding: '8px',
      borderRadius: '12px',
      scale: 1.05,
    },
    initial: {
      border: 'solid 2.5px transparent',
      padding: '0',
      borderRadius: '12px',
      scale: 1,
    },
  },
}
