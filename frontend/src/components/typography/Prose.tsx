import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { clsx } from 'clsx'

interface ProseProps {
  content: string
  className?: string
}

const Prose = ({ content, className }: ProseProps) => {
  const proseClass = clsx(
    'prose prose-slate max-w-none dark:prose-invert dark:text-slate-400',
    // headings
    'prose-headings:font-normal',
    // lead
    'prose-lead:text-slate-500 dark:prose-lead:text-slate-400',
    // links
    'prose-a:font-semibold dark:prose-a:text-emerald-400',
    // link underline
    'prose-a:no-underline prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,theme(colors.emerald.300))] hover:prose-a:[--tw-prose-underline-size:6px] dark:[--tw-prose-background:theme(colors.slate.900)] dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.emerald.800))] dark:hover:prose-a:[--tw-prose-underline-size:6px]',
    // pre
    'prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:shadow-lg dark:prose-pre:bg-slate-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-slate-300/10',
    // hr
    'dark:prose-hr:border-slate-800',
    className
  )
  return (
    <article className={proseClass}>
      {/* eslint-disable-next-line react/no-children-prop */}
      <ReactMarkdown children={content} remarkPlugins={[remarkGfm]} />
    </article>
  )
}
export default Prose
