import Image, { ImageProps } from 'next/image'
import nav_logo from '@/images/nav_logo.webp'
import base_logo from '@/images/logo_gr.webp'

interface IAppLogoProps extends Partial<ImageProps> {
  variant?: 'nav_logo' | 'base_logo'
}

const logo_variants = {
  nav_logo: {
    src: nav_logo,
    alt: 'Cryptoforu Navigation Logo',
  },
  base_logo: {
    src: base_logo,
    alt: 'Cryptoforu Logo',
  },
}

const AppLogo = (props: IAppLogoProps) => {
  const { variant = 'base_logo', ...rest } = props
  return (
    <Image
      src={logo_variants[variant].src}
      alt={logo_variants[variant].alt}
      {...props}
    />
  )
}
export default AppLogo
