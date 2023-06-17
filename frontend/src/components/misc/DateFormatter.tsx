'use client'

import { useDateFormatter } from '@react-aria/i18n'

export const DateFormatter = ({ date }: { date?: string }) => {
  let formatter = useDateFormatter()
  return (
    <>
      {date ? formatter.format(new Date(date)) : formatter.format(new Date())}
    </>
  )
}
