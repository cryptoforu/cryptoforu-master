import useTheme from '@/store/useThemeStore'
import { shallow } from 'zustand/shallow'
import { useUpdateEffect } from '@/hooks/useUpdateEffect'
import { useMemo } from 'react'

export const useThemeController = () => {
  const [theme, setTheme] = useTheme(
    (state) => [state.theme, state.setTheme],
    shallow
  )
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
export const useCurrentTheme = () => useTheme.use.theme()

export const useDarkMode = () => {
  return useTheme.use.theme() === 'dark'
}

export const useAppLogo = () => {
  const theme = useTheme.use.theme()
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
