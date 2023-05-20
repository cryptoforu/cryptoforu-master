import { Img, ImgProps } from '@chakra-ui/react';

export type ResponsiveWidth = {
  sm: number;
  md: number;
  lg: number;
};

export type IResponsiveImage = {
  img_name: string;
  query?: ResponsiveWidth;
  quality?: number;
} & ImgProps;

const ResponsiveImage = ({
  img_name,
  query = {
    sm: 300,
    md: 600,
    lg: 1200,
  },
  quality = 100,
  ...props
}: IResponsiveImage) => {
  return (
    <Img
      maxWidth="100%"
      inlineSize="auto"
      blockSize="auto"
      src={`/img/cache/pngsm/${img_name}?w=${query.sm}&&q=${quality}`}
      srcSet={`/img/cache/pngsm/${img_name}?w=${query.sm}&&q=${quality} ${query.sm}w, /img/cache/pngmd/${img_name}?w=${query.md}&&q=${quality} ${query.md}w, /img/cache/pnglg/${img_name}?w=${query.lg}&&q=${quality} ${query.lg}w`}
      sizes="(max-width: 30em) 33vw, (max-width: 48em) 50vw, 100vw"
      {...props}
    />
  );
};

export default ResponsiveImage;
