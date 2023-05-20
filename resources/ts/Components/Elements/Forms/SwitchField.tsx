import { useField } from 'formik';
import { Label } from './';
import type { FieldProps } from './FormTypes';
import { Switch } from '@chakra-ui/react';

const SwitchField = ({ ...props }: FieldProps) => {
  const [field, meta, helpers] = useField(props.name);
  const { value } = meta;
  const { setValue } = helpers;
  return (
    <Label name={props.name} label={props.label} errors={props.errors}>
      <Switch isChecked={value} onChange={() => setValue(!value)} />
    </Label>
  );
};

export default SwitchField;
