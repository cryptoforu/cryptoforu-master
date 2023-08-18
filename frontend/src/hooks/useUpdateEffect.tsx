import { DependencyList, EffectCallback, useEffect } from 'react'

import { useFirstRender } from '@/hooks/useFirstRender'

export function useUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
  const isFirst = useFirstRender()

  useEffect(() => {
    if (!isFirst) {
      return effect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
