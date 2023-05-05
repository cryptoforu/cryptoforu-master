import { PropsWithChildren } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { usePageProps } from '@/Hooks/useTypedPage';
import type { LabelProps } from './FormTypes';

const Label = ({ children, ...props }: PropsWithChildren<LabelProps>) => {
  const { errors } = usePageProps();
  return (
    <FormControl isInvalid={errors[props.name] !== undefined}>
      <FormLabel
        htmlFor={props.name}
        color={mode('slate.600', 'slate.400')}
        mb={3}
        size={'md'}
      >
        {props.label}
      </FormLabel>
      {children}
      <FormErrorMessage mt={3} size={'md'} color={mode('red.600', 'red.400')}>
        {errors[props.name] && errors[props.name]}
      </FormErrorMessage>
    </FormControl>
  );
};

export default Label;
