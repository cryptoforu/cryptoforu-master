import { useField } from 'formik';
import { Label } from './';
import type { FieldProps } from './FormTypes';
import { Switch } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

interface SwitchProps extends FieldProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SwitchField = ({ ...props }: SwitchProps) => {
  const [field] = useField(props);

  return (
    <Label name={props.name} label={props.label} errors={props.errors}>
      <Switch {...field} {...props} />
    </Label>
  );
};

export default SwitchField;
