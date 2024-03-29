'use client'

import { useDateFormatter } from 'react-aria'

export const DateFormatter = ({ date }: { date?: string }) => {
  const formatter = useDateFormatter({
    dateStyle: 'full',
  })
  return (
    <>
      {date ? formatter.format(new Date(date)) : formatter.format(new Date())}
    </>
  )
}
