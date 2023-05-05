import {
  Box,
  chakra,
  Stack,
  useColorModeValue as mode,
  useCheckbox,
  useCheckboxGroup,
  UseCheckboxProps,
  ThemingProps,
} from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { useMultiStyleConfig } from '@chakra-ui/react';
import { Label } from './';
import type { LabelProps as L } from './FormTypes';

type LabelProps = UseCheckboxProps &
  ThemingProps & {
    label: string;
  };

const Tags = ({ label, ...props }: LabelProps) => {
  const { size, variant } = props;

  const styles = useMultiStyleConfig('TagsInput', { size, variant });
  const { getCheckboxProps, getInputProps, getLabelProps, htmlProps } =
    useCheckbox(props);
  return (
    <chakra.label __css={styles.container} {...htmlProps}>
      <input {...getInputProps()} hidden />
      <Box __css={styles.control} {...getCheckboxProps()} />
      <Box __css={styles.label} {...getLabelProps()}>
        {label}
      </Box>
    </chakra.label>
  );
};

interface ItemProps {
  id: string | number;
  name: string;
}

interface CheckBoxData<T> extends UseCheckboxProps {
  items?: Array<T>;
  label: string;
}

function TagsInput<T extends ItemProps>({
  items,
  label,
  ...props
}: CheckBoxData<T> & L) {
  const { value, getCheckboxProps } = useCheckboxGroup();
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    setFieldValue('tags', value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Label name={props.name as string} errors={props.errors}>
      <Stack
        display={'flex'}
        flexDirection={'row'}
        flexWrap={'wrap'}
        width="100%"
        p="4"
        border="1px solid"
        borderColor={mode('slate.100', 'slate.800')}
        borderRadius="20px"
        gap="4"
      >
        <>
          {items?.map((tag, index) => (
            <Tags
              key={tag.id}
              label={tag.name}
              {...getCheckboxProps({ value: tag.id })}
              {...props}
            />
          ))}
        </>
      </Stack>
    </Label>
  );
}

export default TagsInput;
