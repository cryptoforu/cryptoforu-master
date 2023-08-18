'use client'
import Image, { ImageProps } from 'next/image'

import { useAppLogo } from '@/store/controllers/useThemeController'

interface IAppLogoProps extends Partial<ImageProps> {
  variant?: 'nav_logo' | 'base_logo'
}

const AppLogo = (props: IAppLogoProps) => {
  const { nav_logo, base_logo } = useAppLogo()
  const logo = {
    nav_logo: nav_logo,
    base_logo: base_logo,
  }
  const { variant = 'base_logo', ...rest } = props
  return (
    <Image
      src={logo[variant]}
      alt={'Cryptoforu Learn and earn Crypto'}
      {...rest}
    />
  )
}
export default AppLogo
