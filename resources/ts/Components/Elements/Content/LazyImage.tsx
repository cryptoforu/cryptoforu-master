import {
  Img,
  ImgProps,
  Box,
  BoxProps,
  forwardRef,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAnimate, cubicBezier } from 'framer-motion';

export interface IImageProps {
  imgProps: ImgProps;
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
  return (
    <Box
      ref={scope}
      position="relative"
      bg={background}
      overflow="hidden"
      rounded="md"
      {...boxProps}
    >
      <Img
        ref={ref}
        maxWidth="100%"
        inlineSize="auto"
        blockSize="auto"
        style={{ opacity: 0 }}
        onLoad={handleLoad}
        {...imgProps}
      />
    </Box>
  );
});

export default LazyImage;
