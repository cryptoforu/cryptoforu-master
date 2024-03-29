import {
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';

import { LibraryModal } from '@/Components/Elements/Content';
import {
  ChakraPond,
  CheckBoxField,
  Label,
  MarkDownEditor,
  SelectField,
  SwitchField,
  TextAreaField,
  TextField,
} from '@/Components/Elements/Forms';
import { usePageProps } from '@/Hooks/useTypedPage';
import { useFormContext } from '@/Store/useFormProvider';
import { LibraryData } from '@/Types/generated';

import FormWrapper from './FormWrapper';

const DynamicForm = () => {
  const { initialValues, form_schema, handleSubmit, withButton, form_id } =
    useFormContext();
  const { media } = usePageProps<LibraryData[]>();
  return (
    <FormWrapper title="" desc="">
      <Formik
        enableReinitialize
        initialValues={{ ...initialValues }}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form id={form_id}>
            <VStack spacing={'4'}>
              {Object.values(form_schema).map((value) => {
                switch (value.type) {
                  case 'select':
                    return (
                      <SelectField
                        key={value.label}
                        name={value.name}
                        label={value.label}
                        options={value.options}
                      />
                    );
                  case 'checkbox':
                    return (
                      <CheckBoxField
                        key={value.label}
                        name={value.name}
                        label={value.label}
                      />
                    );
                  case 'file':
                    return (
                      <Flex direction={'column'} gap={'4'} w={'full'}>
                        <Label
                          key={value.name}
                          name={value.name}
                          label={value.label}
                        >
                          <ChakraPond
                            name={value.name}
                            onupdatefiles={(files) =>
                              setFieldValue(value.name, files[0].file)
                            }
                          />
                        </Label>
                        {media && (
                          <LibraryModal images={media} value={value.name} />
                        )}
                      </Flex>
                    );
                  case 'md':
                    return (
                      <MarkDownEditor
                        key={value.name}
                        name={value.name}
                        value={values[value.name as keyof typeof initialValues]}
                        textareaProps={{
                          name: value.name,
                          onChange: (e) =>
                            setFieldValue(value.name, e.target.value),
                        }}
                      />
                    );
                  case 'switch':
                    return (
                      <SwitchField
                        key={value.name}
                        name={value.name}
                        label={value.label}
                        value={values[value.name as keyof typeof initialValues]}
                      />
                    );
                  case 'tags':
                    return (
                      <CheckboxGroup key={value.name}>
                        <Stack
                          direction={['column', 'row']}
                          flexWrap={'wrap'}
                          gap={6}
                        >
                          {value.options?.map((tag) => (
                            <Checkbox
                              key={tag.id}
                              name={value.name}
                              type={'checkbox'}
                              value={
                                values[value.id as keyof typeof initialValues]
                              }
                              onChange={() =>
                                (
                                  values[
                                    value.name as keyof typeof initialValues
                                  ] as unknown as number[]
                                ).push(tag.id as number)
                              }
                            >
                              {tag.name}
                            </Checkbox>
                          ))}
                        </Stack>
                      </CheckboxGroup>
                    );
                  case 'textarea':
                    return (
                      <TextAreaField
                        key={value.name}
                        name={value.name}
                        label={value.label}
                      />
                    );
                  case 'textfield':
                    return (
                      <TextField
                        key={value.name}
                        name={value.name}
                        label={value.label}
                      />
                    );
                  default:
                    return (
                      <TextField
                        key={value.name}
                        name={value.name}
                        label={value.label}
                      />
                    );
                }
              })}
            </VStack>
            <VStack mt="8" width="100%">
              {withButton && (
                <Button
                  type="submit"
                  colorScheme={'emerald'}
                  isLoading={isSubmitting}
                  loadingText="Processing"
                  fontWeight="500"
                  w="100%"
                  h="50"
                  mb="24px"
                >
                  Submit
                </Button>
              )}
            </VStack>
          </Form>
        )}
      </Formik>
    </FormWrapper>
  );
};

export default DynamicForm;
