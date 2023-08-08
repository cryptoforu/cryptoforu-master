import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useForm } from '@inertiajs/react';
import { FormEvent, useEffect } from 'react';
import route from 'ziggy-js';

import usePrevious from '@/Hooks/usePrevious';
import useFormArray from '@/Store/useFormArray';

const FormArray = () => {
  const [data, handleChange] = useFormArray((state) => [
    state.data,
    state.handleChange,
  ]);
  const [addFields, removeFields] = useFormArray((state) => [
    state.addFields,
    state.removeFields,
  ]);
  const {
    data: initial,
    setData,
    post,
  } = useForm({
    data_name: '',
    data_values: [...data],
  });

  console.log(data, initial);
  const prev = usePrevious(data);
  useEffect(() => {
    if (prev) {
      setData('data_values', data);
    }
  }, [data]);

  function submit(e: FormEvent) {
    e.preventDefault();
    post(route('admin:site.store'));
  }

  return (
    <Flex
      maxW={{ base: '100%' }}
      w="100%"
      mx={{ base: 'auto', lg: '0px' }}
      px={{ base: '25px', md: '0px' }}
      direction="column"
    >
      <Box
        px={{
          base: '4',
        }}
        maxWidth="full"
      >
        <form onSubmit={submit}>
          <VStack align={'stretch'} spacing={4}>
            <FormControl>
              <FormLabel>Data Name</FormLabel>
              <Input
                type={'text'}
                name={'data_name'}
                value={initial.data_name}
                onChange={(e) => setData('data_name', e.target.value)}
              />
            </FormControl>
            {data.map((values, index) => (
              <Flex
                key={index}
                direction={'row'}
                gap={4}
                align={'center'}
                justify={'center'}
              >
                <FormControl>
                  <FormLabel>Key</FormLabel>
                  <Input
                    type={'text'}
                    name={'key'}
                    value={values.key}
                    onChange={(e) => handleChange(index, e)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Value</FormLabel>
                  <Textarea
                    name={'value'}
                    value={values.value}
                    onChange={(e) => handleChange(index, e)}
                    resize={'vertical'}
                    size={'lg'}
                  />
                </FormControl>
                <Button colorScheme={'red'} onClick={() => removeFields(index)}>
                  Remove
                </Button>
              </Flex>
            ))}
            <Flex mt={4} gap={4}>
              <Button colorScheme={'teal'} onClick={() => addFields()}>
                Add Fields
              </Button>
              <Button type={'submit'} colorScheme={'blue'}>
                Submit
              </Button>
            </Flex>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};
export default FormArray;
