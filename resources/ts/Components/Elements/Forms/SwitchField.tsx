import { Switch } from '@chakra-ui/react';
import { useField } from 'formik';

import { Label } from './';
import type { FieldProps } from './FormTypes';

const SwitchField = ({ ...props }: FieldProps) => {
  const [, meta, helpers] = useField(props.name);
  const { value } = meta;
  const { setValue } = helpers;
  return (
    <Label name={props.name} label={props.label} errors={props.errors}>
      <Switch isChecked={value} onChange={() => setValue(!value)} />
    </Label>
  );
};

export default SwitchField;
