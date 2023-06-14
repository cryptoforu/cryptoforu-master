import {
  Box,
  BoxProps,
  forwardRef,
  useColorModeValue,
  useMergeRefs,
} from '@chakra-ui/react';
import { cubicBezier, useAnimate } from 'framer-motion';
import { useEffect, useState } from 'react';

import { ResponsiveImage } from './';
import type { IResponsiveImage } from './ResponsiveImage';

export interface IImageProps {
  imgProps: IResponsiveImage;
  boxProps?: BoxProps;
}

const LazyImage = forwardRef(({ imgProps, boxProps }: IImageProps, ref) => {
  const [scope, animate] = useAnimate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const handleLoad = () => {
    setImageLoaded(true);
  };
  const bg = useColorModeValue('slate.400', 'slate.700');
  const background = imageLoaded ? 'transparent' : bg;
  useEffect(() => {
    scope.current && !imageLoaded
      ? animate(
          scope.current,
          {
            opacity: [0.5, 1, 0.5],
          },
          {
            duration: 1.4,
            ease: cubicBezier(0.4, 0, 0.6, 1),
            repeat: Infinity,
          }
        )
      : animate(
          scope.current,
          {
            opacity: 1,
          },
          {
            duration: 1.5,
          }
        );
    imageLoaded && animate('img', { opacity: 1 }, { duration: 1.5 });
  }, [animate, imageLoaded, scope]);
  const refs = useMergeRefs(scope, ref);
  return (
    <Box
      ref={refs}
      position="relative"
      bg={background}
      overflow="hidden"
      rounded="md"
      {...boxProps}
    >
      <ResponsiveImage
        style={{ opacity: 0 }}
        onLoad={handleLoad}
        loading="lazy"
        {...imgProps}
      />
    </Box>
  );
});

export default LazyImage;
