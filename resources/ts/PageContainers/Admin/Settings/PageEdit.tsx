import { CloseIcon, EditIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { useTransition } from 'react';

import { useEditing } from '@/Store/usePageSettings';

const PageEdit = () => {
  const [isPending, startTransition] = useTransition();
  const { isEditing, setEditing } = useEditing();

  return isEditing ? (
    <Button
      colorScheme="red"
      rightIcon={<CloseIcon />}
      onClick={() => {
        startTransition(() => {
          setEditing(false);
        });
      }}
      isLoading={isPending}
    >
      {' '}
      Cancel{' '}
    </Button>
  ) : (
    <Button
      rightIcon={<EditIcon />}
      onClick={() => {
        startTransition(() => {
          setEditing(true);
        });
      }}
      isLoading={isPending}
    >
      {' '}
      Edit{' '}
    </Button>
  );
};

export default PageEdit;
