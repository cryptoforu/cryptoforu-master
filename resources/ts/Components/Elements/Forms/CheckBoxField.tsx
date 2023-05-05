import { useField } from 'formik';
import { Label } from './';
import type { FieldProps } from './FormTypes';
import { Checkbox } from '@chakra-ui/react';

const CheckBoxField = ({ ...props }: FieldProps) => {
  const [field] = useField({ name: props.name, type: 'checkbox' });

  return (
    <Label name={props.name} label={props.label} errors={props.errors}>
      <Checkbox colorScheme="emerald" size="md" {...field} {...props} />
    </Label>
  );
};

export default CheckBoxField;
