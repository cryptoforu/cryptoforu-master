import { Img, ImgProps } from '@chakra-ui/react';

export type ResponsiveWidth = {
  sm: number;
  md: number;
  lg: number;
};

export type IResponsiveImage = {
  variant?: 'internal' | 'external';
  img_name: string;
  query?: ResponsiveWidth;
  quality?: number;
} & ImgProps;

export interface IimageVariants {
  [x: string]: (props: IResponsiveImage) => {
    src: string;
    srcSet?: string;
    sizes?: string;
  };
}

const imageVariants: IimageVariants = {
  internal: ({
    img_name,
    query,
    quality,
  }: Pick<IResponsiveImage, 'img_name' | 'quality' | 'query'>) => {
    return {
      src: `/api/img/cache/pngsm/${img_name}?w=${query?.sm}&q=${quality}`,
      srcSet: `/api/img/cache/pngsm/${img_name}?w=${query?.sm}&q=${quality} ${query?.sm}w, /api/img/cache/pngmd/${img_name}?w=${query?.md}&q=${quality} ${query?.md}w, /api/img/cache/pnglg/${img_name}?w=${query?.lg}&q=${quality} ${query?.lg}w`,
      sizes: '(max-width: 30em) 33vw, (max-width: 48em) 50vw, 100vw',
    };
  },
  external: ({ img_name }: Pick<IResponsiveImage, 'img_name'>) => {
    return {
      src: img_name,
    };
  },
};

const ResponsiveImage = ({
  variant = 'internal',
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
      src={imageVariants[variant]({ img_name, query, quality }).src}
      srcSet={imageVariants[variant]({ img_name, query, quality }).srcSet}
      sizes={imageVariants[variant]({ img_name, query, quality }).sizes}
      {...props}
    />
  );
};

export default ResponsiveImage;
ResponsiveImage.imageVariants = imageVariants;
