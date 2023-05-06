import { Img, ImageProps } from '@chakra-ui/react';

type Variant = {
  [key: string]: {
    src: string;
    srcset?: string;
    sizes?: string;
    width?: number;
    height?: number;
  };
};

const logoVariants: Variant = {
  baseLogo: {
    src: '/img/cache/original/6456ab884b1f8Lg.png',
    srcset:
      '/img/cache/original/6456ab884b301Sm.png 300w, /img/cache/original/6456ab884b283Md.png 600w, /img/cache/original/6456ab884b1f8Lg.png 1200w',
    sizes: '(min-width: 66em) 33vw, (min-width: 44em) 50vw, 100vw',
    width: 1000,
    height: 1000,
  },
  navLogo: {
    src: '/img/cache/original/6456ab8881f61Lg.png',
    srcset:
      '/img/cache/original/6456ab88820f3Sm.png 300w, /img/cache/original/6456ab8882010Md.png 600w, /img/cache/original/6456ab8881f61Lg.png 1200w',
    sizes: '(min-width: 66em) 33vw, (min-width: 44em) 50vw, 100vw',
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
      srcSet={logoVariants[variant].srcset}
      sizes={logoVariants[variant].sizes}
    />
  );
};

export default Logo;
