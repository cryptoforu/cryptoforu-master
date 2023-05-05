import { Formik, Form } from 'formik';
import {
  TextField,
  TextAreaField,
  SelectField,
  MarkDownEditor,
  TagsInput,
  SwitchField,
  CheckBoxField,
  ChakraPond,
} from '@/Components/Elements/Forms';
import { useFormContext } from '@/Store/useFormProvider';
import FormWrapper from './FormWrapper';
import { VStack, Button } from '@chakra-ui/react';
import { Label } from '@/Components/Elements/Forms';
const DynamicForm = () => {
  const { initialValues, form_schema, handleSubmit, withButton, form_id } =
    useFormContext();
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
                        onChange={(e) =>
                          setFieldValue(value.name, e.target.value)
                        }
                      />
                    );
                  case 'tags':
                    return (
                      <TagsInput
                        key={value.name}
                        name={value.name}
                        label={value.name}
                        items={value.options}
                      />
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
                  variant={'gradLime'}
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
