import { ImageProps } from '@chakra-ui/react';

import ResponsiveImage from './ResponsiveImage';
type Variant = {
  [key: string]: {
    src: string;
    width?: number;
    height?: number;
    loading?: 'eager' | 'lazy';
  };
};

const logoVariants: Variant = {
  baseLogo: {
    src: '6456ab884b1f8Lg.png',
    width: 1000,
    height: 1000,
    loading: 'eager',
  },
  navLogo: {
    src: '6456ab8881f61Lg.png',
    width: 1080,
    height: 500,
    loading: 'eager',
  },
};

interface LogoProps extends ImageProps {
  variant?: 'baseLogo' | 'navLogo';
}

const Logo = ({ variant = 'baseLogo', ...rest }: LogoProps) => {
  return (
    <ResponsiveImage
      img_name={logoVariants[variant].src}
      loading={logoVariants[variant].loading}
      alt="Cryptoforu Learn and Earn Crypto"
      htmlHeight={logoVariants[variant].height}
      htmlWidth={logoVariants[variant].width}
      {...rest}
    />
  );
};

export default Logo;
