import {
  Box,
  chakra,
  Flex,
  Text,
  useCheckbox,
  UseCheckboxProps,
} from '@chakra-ui/react';
import { useField } from 'formik';

import type { FieldProps } from './FormTypes';

type CheckProps = FieldProps & UseCheckboxProps;

const CheckBoxField = ({ ...props }: CheckProps) => {
  const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } =
    useCheckbox(props);
  const [{ ...field }] = useField({
    name: props.name,
    type: 'checkbox',
    checked: state.isChecked,
  });

  return (
    <chakra.label
      display="flex"
      flexDirection="row"
      alignItems="center"
      gridColumnGap={2}
      maxW="36"
      {...htmlProps}
    >
      <input {...getInputProps({ ...field })} hidden />
      <Flex
        alignItems="center"
        justifyContent="center"
        border="2px solid"
        borderColor="green.500"
        w={4}
        h={4}
        {...getCheckboxProps()}
      >
        {state.isChecked && <Box w={2} h={2} bg="green.500" />}
      </Flex>
      <Text color="gray.700" {...getLabelProps()}>
        {props.label}
      </Text>
    </chakra.label>
  );
};

export default CheckBoxField;
