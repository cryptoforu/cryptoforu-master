import {
  chakra,
  Flex,
  Stack,
  useCheckbox,
  useCheckboxGroup,
  UseCheckboxProps,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { useFormikContext } from 'formik';
import { useEffect } from 'react';

import { ProsePa } from '../Typography';
import { Label } from './';
import type { LabelProps as L } from './FormTypes';

type LabelProps = UseCheckboxProps & {
  label: string;
};

const Tags = ({ label, ...props }: LabelProps) => {
  const { getCheckboxProps, getInputProps, getLabelProps, htmlProps } =
    useCheckbox(props);
  return (
    <chakra.label
      display="flex"
      flexDirection="row"
      alignItems="center"
      gridColumnGap={2}
      maxW="40"
      bg="green.50"
      border="1px solid"
      borderColor="green.500"
      rounded="lg"
      px={3}
      py={1}
      cursor="pointer"
      {...htmlProps}
    >
      <input {...getInputProps()} hidden />
      <Flex
        alignItems="center"
        justifyContent="center"
        border="2px solid"
        borderColor="green.500"
        w={4}
        h={4}
        {...getCheckboxProps()}
      />
      <ProsePa {...getLabelProps()}>{label}</ProsePa>
    </chakra.label>
  );
};

interface ItemProps {
  id?: string | number;
  name: string;
}

interface CheckBoxData<T> extends UseCheckboxProps {
  items?: Array<T>;
  label: string;
}

function TagsInput<T extends ItemProps>({
  items,
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
          {items?.map((tag) => (
            <Tags
              key={tag.id}
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
