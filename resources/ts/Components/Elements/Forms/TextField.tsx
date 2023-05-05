import { Input } from '@chakra-ui/react';
import { useField } from 'formik';
import { Label } from './';
import type { FieldProps } from './FormTypes';

const TextField = ({ ...props }: FieldProps) => {
  const [field] = useField(props);
  return (
    <>
      <Label label={props.label} name={props.name} errors={props.errors}>
        <Input {...field} {...props} />
      </Label>
    </>
  );
};

export default TextField;
