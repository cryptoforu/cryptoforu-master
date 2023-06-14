import { Select } from '@chakra-ui/react';
import { useField } from 'formik';

import { Label } from './';
import type { FieldProps } from './FormTypes';

const SelectField = ({ ...props }: FieldProps) => {
  const [field] = useField(props);

  return (
    <Label label={props.label} name={props.name} errors={props.errors}>
      <Select {...field} {...props}>
        <>
          <option key={'def'} value={0}>
            None
          </option>
          {props.options?.map((option) => (
            <option key={option.name} value={option.id || option.name}>
              {option.name ? option.name : option.label}
            </option>
          ))}
        </>
      </Select>
    </Label>
  );
};

export default SelectField;
