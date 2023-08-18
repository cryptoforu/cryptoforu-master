import { useMemo } from 'react'

import { useUpdateEffect } from '@/hooks/useUpdateEffect'
import useTheme from '@/store/useThemeStore'

export const useThemeController = () => {
  const [theme, setTheme] = useTheme((state) => [state.theme, state.setTheme])
  const initTheme = useTheme.use.initTheme()
  useUpdateEffect(() => {
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme)
    } else {
      initTheme()
    }
  }, [initTheme, theme])
  return setTheme
}

export const useIconPaths = () => useTheme.use.getPath()

export const useAppLogo = () => {
  const nav = useTheme.use.getNavLogo()
  const base = useTheme.use.getBaseLogo()

  return useMemo(
    () => ({
      nav_logo: nav(),
      base_logo: base(),
    }),
    [base, nav]
  )
}
