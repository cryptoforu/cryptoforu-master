import { Button, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { memo, useMemo } from 'react';
import { FilePondProps } from 'react-filepond';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { ChakraPond, Label, SelectField } from '@/Components/Elements/Forms';
import { FormWrapper } from '@/Forms';
import { usePageProps } from '@/Hooks/useTypedPage';
import { useRoute } from '@/Providers/RouteProvider';
import { useDetails } from '@/Store/useLibraryStore';
import { useMenuSelectContext } from '@/Store/useMenuSelect';
import type { LibraryCategory, LibraryData } from '@/Types/generated';

type LibraryFormState = {
  single: {
    file: FilePondProps['name'] | null;
    library_category_id: number;
  };
  multiple: {
    file: FilePondProps['name'][];
    library_category_id: number;
  };
  update: {
    _method: string;
    file: FilePondProps['name'] | null;
  };
};

type LibraryFormAction = {
  getForm: (index: keyof LibraryFormState) => LibraryFormState[typeof index];
};

interface LibraryFormStore extends LibraryFormState, LibraryFormAction {}

const useLibraryFormStore = create<LibraryFormStore>()(
  immer((_set, get) => ({
    single: {
      file: null,
      library_category_id: 0,
    },
    multiple: {
      file: [],
      library_category_id: 0,
    },
    update: {
      _method: 'put',
      file: null,
    },
    getForm: (index) => {
      const data = get()[index];
      return data;
    },
  }))
);
export const UpdateForm = memo(function UpdateForm({
  id,
  setEditing,
  data,
}: {
  id: string | number;
  setEditing: () => void;
  data: LibraryData;
}) {
  const form = useLibraryFormStore((state) => state.update);
  const { navigate: submit, route } = useRoute();
  const selected = useMenuSelectContext((state) => state.selected);
  const { setValues } = useDetails();
  return (
    <Formik
      initialValues={form}
      onSubmit={(values, formikHelpers) => {
        submit(
          route('admin.library.update', id),
          { ...values },
          {
            method: 'post',
            only: [selected],
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
              formikHelpers.setSubmitting(false);
              setEditing();
              setValues(data);
            },
          }
        );
      }}
    >
      {({ setFieldValue, isSubmitting }) => (
        <Form>
          <Label name="file" label="Files">
            <ChakraPond
              name="file"
              allowMultiple={false}
              onupdatefiles={(files) => setFieldValue('file', files[0].file)}
            />
          </Label>
          <VStack mt="8">
            <Button
              type="submit"
              colorScheme={'emerald'}
              isDisabled={isSubmitting}
              isLoading={isSubmitting}
              loadingText="Uploading"
              width="full"
            >
              Update
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
});

function Multiple({
  categories,
  variant,
  title,
  desc,
}: {
  categories: LibraryCategory[];
  variant: 'single' | 'multiple';
  title: string;
  desc: string;
}) {
  const getForm = useLibraryFormStore((state) => state.getForm);
  const initialValues = getForm(variant);
  const { navigate: submit, route } = useRoute();

  return (
    <FormWrapper title={title} desc={desc}>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={(values, action) => {
          submit(
            route('admin.library.store'),
            { ...values },
            {
              method: 'post',
              forceFormData: true,
              preserveScroll: true,
              onSuccess: () => {
                action.resetForm();
                action.setSubmitting(false);
              },
              onError: () => {
                action.setSubmitting(false);
              },
              onCancel: () => {
                action.setSubmitting(false);
              },
            }
          );
        }}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form>
            <VStack spacing={4}>
              <SelectField
                name="library_category_id"
                label="Library Collection"
                options={categories}
              />
              <Label name="file" label="Files">
                <ChakraPond
                  name="file"
                  allowMultiple={variant === 'single' ? false : true}
                  maxFiles={variant === 'single' ? 1 : 4}
                  onupdatefiles={(fileitem) =>
                    setFieldValue(
                      'file',
                      fileitem.map((item) => item.file)
                    )
                  }
                />
              </Label>
            </VStack>
            <VStack mt="8">
              <Button
                type="submit"
                variant="primaryBtn"
                isDisabled={isSubmitting}
                isLoading={isSubmitting}
                loadingText="Uploading"
                width="full"
              >
                Upload
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </FormWrapper>
  );
}

export const useLibraryForms = () => {
  const { categories } = usePageProps<LibraryCategory[]>();
  const data = useMemo(
    () => [
      {
        label: 'Upload Single',
        content: (
          <Multiple
            categories={categories}
            variant="single"
            title="Upload Single File"
            desc="Add New File To The Library"
          />
        ),
      },
      {
        label: 'Upload Multiple',
        content: (
          <Multiple
            categories={categories}
            variant="multiple"
            title="Upload Multiple"
            desc="Add Multiple Files. Max allowed 4."
          />
        ),
      },
    ],
    [categories]
  );

  return data;
};
