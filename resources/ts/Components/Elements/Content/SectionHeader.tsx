import { Box, BoxProps, Badge } from '@chakra-ui/react';
import { ProseHeadings, ProsePa, SpanText } from '../Typography';

const sizeVariant = {
  base: {
    heading: 'xxl',
    desc: 'md',
  },
  large: {
    heading: 'xxxl',
    desc: 'lg',
  },
};

export interface ISectionHeaderProps extends BoxProps {
  variant: keyof typeof sizeVariant;
  badgeLabel?: string;
  title: string;
  gradTitle: string;
  desc?: string;
}

const SectionHeader = ({
  variant = 'base',
  badgeLabel,
  title,
  gradTitle,
  desc,
  ...props
}: ISectionHeaderProps) => {
  return (
    <Box mx="auto" {...props}>
      {badgeLabel ? (
        <Badge
          variant="outline"
          colorScheme="emerald"
          rounded="full"
          px="6"
          py="2"
          size="lg"
        >
          {badgeLabel}
        </Badge>
      ) : null}

      <ProseHeadings
        component="h3"
        size={sizeVariant[variant].heading}
        letterSpacing="tight"
        mt="8"
      >
        {title}{' '}
        <SpanText variant="proseGradientEmerald"> {gradTitle} </SpanText>
      </ProseHeadings>
      {desc ? (
        <ProsePa size={sizeVariant[variant].desc} maxWidth="2xl" mx="auto">
          {desc}
        </ProsePa>
      ) : null}
    </Box>
  );
};
export default SectionHeader;
