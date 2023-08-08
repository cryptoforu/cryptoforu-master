import type { CheckboxProps } from '@chakra-ui/react';
import { Checkbox } from '@chakra-ui/react';
import { useField } from 'formik';

interface GroupProps extends CheckboxProps {
  items?: {
    id: number | string;
    name: string;
    [x: string]: number | string | undefined;
  }[];
  name: string;
}

const CheckBoxGroup = ({ ...props }: GroupProps) => {
  const [field, meta, helpers] = useField({
    name: props.name,
    type: 'checkbox',
  });
  const { setValue } = helpers;
  const { value } = meta;

  return (
    <>
      <Checkbox onChange={() => setValue(value)}>{props.value}</Checkbox>
    </>
  );
};
export default CheckBoxGroup;
