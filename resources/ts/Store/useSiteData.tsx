import { useMemo } from 'react';

import { ArrayDataForm, BuilderForm } from '@/Forms';

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
