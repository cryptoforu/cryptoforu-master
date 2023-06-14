import { create } from 'zustand'
import { shallow } from 'zustand/shallow'
import { useEffect } from 'react'

type ThemeProps = 'light' | 'dark'

type ThemeState = {
  theme: ThemeProps
  paths: {
    [x: string]: string
  }
}

type ThemeActions = {
  setTheme: () => void
  initTheme: () => void
  getPath: () => string
}

interface ThemeStore extends ThemeState, ThemeActions {}

const useThemeStore = create<ThemeStore>()((set, get) => ({
  theme: 'dark',
  paths: {
    dark: 'M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z',
    light:
      'M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z',
  },
  setTheme: () =>
    set((state) => ({
      theme: state.theme === 'dark' ? 'light' : 'dark',
    })),
  initTheme: () =>
    set((state) => ({
      theme: document.documentElement.getAttribute('data-theme') as ThemeProps,
    })),
  getPath: () => {
    const paths = get().paths
    const theme = get().theme
    return paths[theme]
  },
}))

export const useTheme = () => {
  const [theme, setTheme] = useThemeStore(
    (state) => [state.theme, state.setTheme],
    shallow
  )
  const initTheme = useThemeStore((state) => state.initTheme)
  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute('data-theme', theme)
    } else {
      initTheme()
    }
  }, [initTheme, theme])
  return setTheme
}
export const useIconPaths = () => useThemeStore((state) => state.getPath)
export const useCurrentTheme = () => useThemeStore((state) => state.theme)
