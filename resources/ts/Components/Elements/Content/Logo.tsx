import { ImageProps, useColorModeValue } from '@chakra-ui/react';

import ResponsiveImage from './ResponsiveImage';

type Variant = {
  [key: string]: {
    src: string;
    dark: string;
    light: string;
    width?: number;
    height?: number;
    loading?: 'eager' | 'lazy';
  };
};

const logoVariants: Variant = {
  baseLogo: {
    src: '6456ab884b1f8Lg.png',
    dark: 'vertical_trimmed_white_full.webp',
    light: 'vertical_trimmed_full.webp',
    width: 1000,
    height: 1000,
    loading: 'eager',
  },
  navLogo: {
    src: 'horizontal_white.webp',
    dark: 'horizontal_white.webp',
    light: 'horizontal_dark.webp',
    width: 1080,
    height: 500,
    loading: 'eager',
  },
};

interface LogoProps extends ImageProps {
  variant?: 'baseLogo' | 'navLogo';
}

const Logo = ({ variant = 'baseLogo', ...rest }: LogoProps) => {
  const logo = useColorModeValue(
    logoVariants[variant].light,
    logoVariants[variant].dark
  );
  return (
    <ResponsiveImage
      img_name={logo}
      loading={logoVariants[variant].loading}
      alt="Cryptoforu Learn and Earn Crypto"
      htmlHeight={logoVariants[variant].height}
      htmlWidth={logoVariants[variant].width}
      {...rest}
    />
  );
};

export default Logo;
