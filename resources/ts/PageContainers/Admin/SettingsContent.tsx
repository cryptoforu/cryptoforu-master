import {
  Box,
  BoxProps,
  createStylesContext,
  ThemingProps,
  useMultiStyleConfig,
} from '@chakra-ui/react';

export const [StylesProvider, useStyles] =
  createStylesContext('SettingsContent');

export interface SettingsContentProps extends BoxProps, ThemingProps {}

export default function SettingsContent(props: SettingsContentProps) {
  const { size, variant, children, ...rest } = props;
  const styles = useMultiStyleConfig('SettingsContent', { size, variant });
  return (
    <Box __css={styles.container} {...rest}>
      <StylesProvider value={styles}>{children}</StylesProvider>
    </Box>
  );
}

export function SettingsBody(props: SettingsContentProps) {
  const styles = useStyles();
  return <Box __css={styles.body} {...props} />;
}

export function SettingsRowBody(props: SettingsContentProps) {
  const styles = useStyles();
  return <Box __css={styles.rowbody} {...props} />;
}

export function SettingsRow(props: SettingsContentProps) {
  const styles = useStyles();
  return <Box __css={styles.row} {...props} />;
}
