import { Img, ImageProps } from '@chakra-ui/react';

type Variant = {
  [key: string]: {
    src: string;
    width?: number;
    height?: number;
  };
};

const logoVariants: Variant = {
  baseLogo: {
    src: '/img/cache/original/logo.png',
    width: 1000,
    height: 1000,
  },
  navLogo: {
    src: '/img/cache/original/navlogo.png',
    width: 1080,
    height: 500,
  },
};

interface LogoProps extends ImageProps {
  variant?: keyof typeof logoVariants;
  lazy: boolean;
  alt: string;
}

const Logo = ({ variant = 'baseLogo', lazy, alt }: LogoProps) => {
  return (
    <Img
      src={logoVariants[variant].src}
      loading={lazy ? 'lazy' : 'eager'}
      alt={alt}
    />
  );
};

export default Logo;
