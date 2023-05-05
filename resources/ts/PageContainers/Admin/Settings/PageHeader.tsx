import {
  useMultiStyleConfig,
  ThemingProps,
  HTMLChakraProps,
  Box,
  HStack,
} from '@chakra-ui/react';
import { ProseHeadings } from '@/Components/Elements/Typography';
interface PageHeaderProps extends ThemingProps, HTMLChakraProps<'div'> {
  title: string;
}

const PageHeader = ({ ...props }: PageHeaderProps) => {
  const { size, variant, title, children, ...rest } = props;
  const styles = useMultiStyleConfig('SettingsContent', { size, variant });

  return (
    <Box __css={styles.header} {...rest}>
      <Box>
        <ProseHeadings component="h3">{title}</ProseHeadings>
      </Box>
      <HStack spacing="3">{children}</HStack>
    </Box>
  );
};

export default PageHeader;
