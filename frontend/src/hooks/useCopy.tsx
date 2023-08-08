'use client'
import { useCallback, useState } from 'react'
import { useUpdateEffect } from '@/hooks/useUpdateEffect'

type CopiedValue = string | null
type CopyFn = (text: string) => Promise<boolean> // Return success

export function useCopyToClipboard(): [CopiedValue, CopyFn, boolean] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null)
  const [status, setStatus] = useState(false)

  const onStatusChange = useCallback(() => {
    if (status) {
      setTimeout(() => setStatus(false), 1000)
    }
  }, [status])
  useUpdateEffect(() => {
    onStatusChange()
  }, [onStatusChange])
  const copy: CopyFn = async (text) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported')
      return false
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)
      setStatus(true)
      return true
    } catch (error) {
      console.warn('Copy failed', error)
      setCopiedText(null)
      return false
    }
  }

  return [copiedText, copy, status]
}
