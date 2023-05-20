import {
  useMultiStyleConfig,
  createStylesContext,
  Box,
  BoxProps,
  ThemingProps,
  Flex,
  Badge,
} from '@chakra-ui/react';
import { LazyImage } from './';
import { ProseHeadings, MarkDown } from '../Typography';
import { NavLink } from '../Navigation';
import { ArrowRightIcon } from '@chakra-ui/icons';
export const [StylesProvider, useStyles] = createStylesContext('PaperCard');

export interface PaperCardProps {
  title: string;
  description: string;
  bgImage: string;
  slug: string;
  badge?: string;
  badgeColor: string;
}

export interface PaperProps extends BoxProps, ThemingProps {}

function Pcard(props: PaperProps) {
  const { size, variant, children, ...rest } = props;
  const styles = useMultiStyleConfig('PaperCard', { size, variant });
  return (
    <Box __css={styles.pcard} {...rest}>
      <StylesProvider value={styles}>{children}</StylesProvider>
    </Box>
  );
}

function Pimage(props: PaperProps) {
  const styles = useStyles();
  return <Box __css={styles.pimage} {...props} />;
}

function Pbody(props: PaperProps) {
  const styles = useStyles();
  return <Box __css={styles.pbody} {...props} />;
}

function Pfooter(props: PaperProps) {
  const styles = useStyles();
  return <Box __css={styles.pfooter} {...props} />;
}

const PaperCard = ({ ...props }: PaperCardProps) => {
  const {
    title,
    bgImage,
    slug,
    description,
    badge = 'New',
    badgeColor,
  } = props;
  return (
    <Pcard as="article">
      <Pimage>
        <LazyImage
          boxProps={{
            width: 'full',
            height: 'full',
          }}
          imgProps={{
            alt: title,
            objectFit: 'cover',
            maxWidth: 'full',
            height: 'auto',
            img_name: bgImage,
          }}
        />
      </Pimage>
      <Pbody>
        <Box px="2" py="2">
          <Badge colorScheme={badgeColor}>{badge}</Badge>
        </Box>
        <ProseHeadings
          component="h3"
          size="lg"
          variant="proseGradientEmerald"
          noOfLines={1}
        >
          {title}
        </ProseHeadings>
        <MarkDown content={description} noOfLines={3} />
      </Pbody>
      <Pfooter>
        <Flex
          p={4}
          alignItems="center"
          justifyContent={'space-between'}
          roundedBottom={'sm'}
          cursor={'pointer'}
          w="full"
        >
          <NavLink to={slug as string}>View More</NavLink>
          <ArrowRightIcon />
        </Flex>
      </Pfooter>
    </Pcard>
  );
};
export default PaperCard;
