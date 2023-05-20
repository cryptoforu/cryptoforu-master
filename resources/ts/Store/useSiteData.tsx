import { useMemo } from 'react';
import { BuilderForm, ArrayDataForm } from '@/Forms';

export const useCreateData = () => {
  const data = useMemo(
    () => [
      {
        label: 'Home',
        content: (
          <>
            <BuilderForm />
            <ArrayDataForm />
          </>
        ),
      },
    ],
    []
  );

  return data;
};
