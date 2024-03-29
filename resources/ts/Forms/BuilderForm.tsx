import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react';

import { useFormBuilder, useInitial } from '@/Store/useFormBuilder';

import { FormWrapper } from './';

const FormBuilder = () => {
  const { handleAdd } = useFormBuilder();
  const { initial, handleChange } = useInitial();
  return (
    <>
      <FormWrapper title="Form Builder" desc="Add New Form">
        <VStack spacing={4}>
          <HStack spacing={2}>
            <FormControl>
              <FormLabel>Key</FormLabel>
              <Input name="key" value={initial.key} onChange={handleChange} />
            </FormControl>
            <FormControl>
              <FormLabel>Value</FormLabel>
              <Input
                type="text"
                name="value"
                value={initial.value}
                onChange={handleChange}
              />
            </FormControl>
          </HStack>
          <HStack mt="2" spacing="2">
            <FormControl>
              <FormLabel>Type of Input Field</FormLabel>
              <Select name="type" onChange={handleChange}>
                {[
                  'textfield',
                  'textarea',
                  'file',
                  'switch',
                  'select',
                  'checkbox',
                  'md',
                ].map((value, index) => (
                  <option key={index} value={value}>
                    {value}
                  </option>
                ))}
              </Select>
            </FormControl>
          </HStack>
        </VStack>
        <VStack mt="8">
          <Button
            variant="submitBtn"
            onClick={() =>
              handleAdd(initial.key, initial.value, {
                label: initial.key,
                name: initial.key,
                type: initial.type,
              })
            }
          >
            Add Field
          </Button>
        </VStack>
      </FormWrapper>
    </>
  );
};
export default FormBuilder;
