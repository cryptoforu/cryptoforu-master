import {
  createContext,
  useContext,
  useCallback,
  PropsWithChildren,
} from 'react';
import { FormData } from '../Types/generated';
import useRouter from '@/Hooks/useRouter';
import type { FormikHelpers } from 'formik';
import { Method, VisitOptions } from '@inertiajs/core';
type FormID = {
  id: string;
};

type Options = {
  id: string | number;
  name: string;
  value?: string;
};

type FormContextData<FormItem extends FormID> = {
  initialValues: FormItem;
  form_schema: {
    [Property in keyof FormItem]: FormData<Options>;
  };
  form_route: string;
  handleSubmit: (values: FormItem, action: FormikHelpers<FormItem>) => void;
  withButton?: boolean;
  form_id?: string;
};

const FormContext = createContext<FormContextData<FormID> | null>(null);

type FormProviderProps<FormItem extends FormID> = {
  initialValues: FormItem;
  form_schema: {
    [Property in keyof FormItem]: FormData<Options>;
  };
  form_route: string;
  method?: Method;
  withButton?: boolean;
  form_id?: string;
  options?: VisitOptions;
};

function FormProvider<FormItem extends FormID>({
  children,
  initialValues,
  form_route,
  form_schema,
  method,
  withButton = true,
  form_id,
  options,
}: PropsWithChildren<FormProviderProps<FormItem>>) {
  const submit = useRouter();

  const handleSubmit: FormContextData<FormID>['handleSubmit'] = useCallback(
    (values, action) => {
      submit(form_route, 'post', {
        data: method ? { _method: method, ...values } : values,
        forceFormData: true,
        onError: () => {
          action.setSubmitting(false);
        },
        onSuccess: () => {
          action.setSubmitting(false);
          action.resetForm();
        },
        ...options,
      });
    },
    [form_route, method, options, submit]
  );
  return (
    <FormContext.Provider
      value={{
        initialValues,
        form_route,
        form_schema,
        handleSubmit,
        withButton,
        form_id,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext<FormItem extends FormID>() {
  const context = useContext<FormContextData<FormItem>>(
    FormContext as unknown as React.Context<FormContextData<FormItem>>
  );
  if (!context) {
    throw new Error('useMyContext must be used under MyContextProvider');
  }
  return context;
}

export default FormProvider;
