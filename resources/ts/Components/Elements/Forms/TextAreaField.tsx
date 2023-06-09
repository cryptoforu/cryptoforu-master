import { Box, Flex, Progress, Spacer, Textarea } from '@chakra-ui/react';
import { useField } from 'formik';
import { useDeferredValue } from 'react';

import { ProseHeadings } from '../Typography';
import { Label } from './';
import type { FieldProps } from './FormTypes';

const TextAreaField = ({ ...props }: FieldProps) => {
  const [field] = useField(props);
  const defValue = useDeferredValue(field.value);
  const maxLength = (props?.max as number) || 180;

  return (
    <Label label={props.label} name={props.name} errors={props.errors}>
      <Flex
        direction="column"
        minWidth="max-content"
        alignItems="center"
        gap="2"
      >
        <Flex minWidth="100%" alignItems="center" gap="2">
          <Box width="80%">
            <Progress
              value={defValue?.length || 0}
              max={maxLength}
              size="md"
              rounded="lg"
              mx="20px"
              colorScheme={defValue?.length < 100 ? 'emerald' : 'red'}
            />
          </Box>
          <Spacer />
          <Box maxWidth="30%">
            <ProseHeadings component="h3">
              {defValue?.length} / {maxLength}{' '}
            </ProseHeadings>
          </Box>
        </Flex>
        <Flex w="full">
          <Textarea rows={8} maxLength={maxLength} {...field} {...props} />
        </Flex>
      </Flex>
    </Label>
  );
};

export default TextAreaField;
