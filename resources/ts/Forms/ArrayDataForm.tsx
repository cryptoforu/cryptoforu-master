import { Button, HStack, VStack } from '@chakra-ui/react';
import { FieldArray, Form, Formik, FormikHelpers } from 'formik';
import { AnimatePresence } from 'framer-motion';
import { Fragment, useCallback } from 'react';

import {
  ChakraPond,
  CheckBoxField,
  Label,
  MarkDownEditor,
  SelectField,
  SwitchField,
  TagsInput,
  TextAreaField,
  TextField,
} from '@/Components/Elements/Forms';
import { MotionBox, notifyVariants } from '@/Motion';
import { useRoute } from '@/Providers/RouteProvider';
import { useFormBuilder } from '@/Store/useFormBuilder';

import FormWrapper from './FormWrapper';

interface IArrayFormProps {
  data_name: string;
  data_values: [
    {
      id: string;
      [x: string]: string | number | [];
    }
  ];
}

const ArrayDataForm = () => {
  const { initialValues: val, form_schema, clearForm } = useFormBuilder();
  const initialValues: IArrayFormProps = {
    data_name: '',
    data_values: [{ ...val }],
  };
  const { navigate, route } = useRoute();

  const handleSubmit = useCallback(
    (values: IArrayFormProps, action: FormikHelpers<IArrayFormProps>) => {
      navigate(
        route('admin:site.store'),
        { ...values },
        {
          forceFormData: true,
          method: 'post',
          onError: () => {
            action.setSubmitting(false);
          },
          onSuccess: () => {
            action.setSubmitting(false);
            action.resetForm();
          },
          onFinish: (visit) => {
            if (visit.completed) {
              clearForm();
            }
          },
        }
      );
    },
    [clearForm, navigate, route]
  );

  return (
    <FormWrapper title="" desc="">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <VStack spacing={4} align="stretch">
              <TextField name="data_name" label="Data Name" />
              <FieldArray name="data_values">
                {() => (
                  <VStack align="stretch" spacing={6}>
                    <AnimatePresence initial={false}>
                      {values.data_values.map((v, index) => (
                        <Fragment key={index}>
                          {Object.values(form_schema).map((value) => {
                            switch (value.type) {
                              case 'select':
                                return (
                                  <MotionBox
                                    key={value.label}
                                    variants={notifyVariants}
                                  >
                                    <SelectField
                                      key={value.label}
                                      name={`data_values.${index}.${value.name}`}
                                      value={v[value.name as string] as string}
                                      label={value.label}
                                      options={value.options}
                                    />
                                  </MotionBox>
                                );
                              case 'checkbox':
                                return (
                                  <MotionBox
                                    key={value.label}
                                    variants={notifyVariants}
                                  >
                                    <CheckBoxField
                                      key={value.label}
                                      name={`data_values.${index}.${value.name}`}
                                      label={value.label}
                                      value={v[value.name as string] as string}
                                    />
                                  </MotionBox>
                                );
                              case 'file':
                                return (
                                  <MotionBox
                                    key={value.name}
                                    variants={notifyVariants}
                                  >
                                    <Label
                                      key={value.name}
                                      name={`data_values.${index}.${value.name}`}
                                      label={value.label}
                                    >
                                      <ChakraPond
                                        name={`data_values.${index}.${value.name}`}
                                        onupdatefiles={(files) =>
                                          setFieldValue(
                                            value.name,
                                            files[0].file
                                          )
                                        }
                                      />
                                    </Label>
                                  </MotionBox>
                                );
                              case 'md':
                                return (
                                  <MotionBox
                                    key={value.name}
                                    variants={notifyVariants}
                                  >
                                    <MarkDownEditor
                                      key={value.name}
                                      name={`data_values.${index}.${value.name}`}
                                      value={v[value.name as string] as string}
                                      textareaProps={{
                                        name: value.name,
                                        onChange: (e) =>
                                          setFieldValue(
                                            value.name,
                                            e.target.value
                                          ),
                                      }}
                                    />
                                  </MotionBox>
                                );
                              case 'switch':
                                return (
                                  <MotionBox
                                    key={value.name}
                                    variants={notifyVariants}
                                  >
                                    <SwitchField
                                      key={value.name}
                                      name={`data_values.${index}.${value.name}`}
                                      label={value.label}
                                      value={v[value.name as string] as string}
                                    />
                                  </MotionBox>
                                );
                              case 'tags':
                                return (
                                  <MotionBox
                                    key={value.name}
                                    variants={notifyVariants}
                                  >
                                    <TagsInput
                                      key={value.name}
                                      name={`data_values.${index}.${value.name}`}
                                      label={value.name}
                                      items={value.options}
                                    />
                                  </MotionBox>
                                );
                              case 'textarea':
                                return (
                                  <MotionBox
                                    key={value.name}
                                    variants={notifyVariants}
                                  >
                                    <TextAreaField
                                      max={1000}
                                      key={value.name}
                                      name={`data_values.${index}.${value.name}`}
                                      label={value.label}
                                      value={v[value.name as string] as string}
                                    />
                                  </MotionBox>
                                );
                              case 'textfield':
                                return (
                                  <MotionBox
                                    key={value.name}
                                    variants={notifyVariants}
                                  >
                                    <TextField
                                      variant="main"
                                      key={value.name}
                                      name={`data_values.${index}.${value.name}`}
                                      label={value.label}
                                      value={v[value.name as string] as string}
                                    />
                                  </MotionBox>
                                );
                              default:
                                return (
                                  <MotionBox
                                    key={value.name}
                                    variants={notifyVariants}
                                  >
                                    <TextField
                                      key={value.name}
                                      name={`data_values.${index}.${value.name}`}
                                      label={value.label}
                                      value={v[value.name as string] as string}
                                    />
                                  </MotionBox>
                                );
                            }
                          })}
                        </Fragment>
                      ))}
                    </AnimatePresence>
                  </VStack>
                )}
              </FieldArray>
            </VStack>
            <HStack mt="8">
              <Button
                type="submit"
                isLoading={isSubmitting}
                loadingText="Processing"
              >
                Submit
              </Button>
              <Button
                type="button"
                onClick={() => clearForm()}
                colorScheme="red"
              >
                Clear
              </Button>
            </HStack>
          </Form>
        )}
      </Formik>
    </FormWrapper>
  );
};

export default ArrayDataForm;
