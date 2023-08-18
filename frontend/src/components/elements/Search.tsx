'use client'
import { DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline/index.js'
import React, { useRef } from 'react'
import { AriaSearchFieldProps, useSearchField } from 'react-aria'
import { useSearchFieldState } from 'react-stately'

export default function Search(props: AriaSearchFieldProps) {
  const { label } = props
  const state = useSearchFieldState(props)
  const ref = useRef(null)
  const { labelProps, inputProps } = useSearchField(props, state, ref)
  return (
    <div>
      <label {...labelProps}>{label}</label>
      <div className={'relative mt-1 flex items-center'}>
        <DocumentMagnifyingGlassIcon className="pointer-events-none absolute inset-y-0 right-3 h-full w-4 text-slate-400 group-focus-within:text-emerald-500 dark:text-slate-700 dark:group-focus-within:text-slate-400" />
        <input
          {...inputProps}
          ref={ref}
          placeholder={'Search...'}
          className="block w-full appearance-none rounded-lg bg-white px-2 py-3 text-slate-900 transition-all duration-500 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600 dark:border-slate-900/50 dark:bg-slate-900/90 dark:text-white dark:placeholder:text-slate-700 dark:focus:ring-emerald-400 sm:text-sm"
        />
      </div>
    </div>
  )
}
