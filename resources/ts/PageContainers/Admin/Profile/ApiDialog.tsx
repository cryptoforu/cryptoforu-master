import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { router } from '@inertiajs/react';
import { useEffect, useRef } from 'react';

import { Clipboard } from '@/Components/Elements/Forms';
import { usePageProps } from '@/Hooks/useTypedPage';

const ApiDialog = () => {
  const cancelRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { token } = usePageProps<string | null>();
  useEffect(() => {
    function onSucces() {
      if (token !== null) {
        onOpen();
      }
    }

    onSucces();
    router.on('success', onSucces);
    return router.on('success', onSucces);
  }, [onOpen, token]);
  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}
      isCentered={true}
      size={'2xl'}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Api Key
          </AlertDialogHeader>

          <AlertDialogBody display={'flex'} flexDirection={'column'} gap={'4'}>
            <Text size={'lg'} fontWeight={'bold'}>
              This is Your Generated Token. Please write down and keep it safe.
              After you close this dialog you will not see it again!
            </Text>

            <Clipboard copyVal={token as string} />
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} colorScheme="red" onClick={onClose} ml={3}>
              Close
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
export default ApiDialog;
