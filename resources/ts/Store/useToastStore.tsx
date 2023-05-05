import { useCallback, useEffect, useRef } from 'react';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { ToastId, useToast as useChakraToast } from '@chakra-ui/react';
import useTypedPage from '@/Hooks/useTypedPage';
import type { UseToastOptions } from '@chakra-ui/react';
interface ToastState {
  isToastOpen?: boolean;
  status: UseToastOptions['status'];
  message?: string;
  setToast: (status: string, message?: string) => void;
  setOpen: (payload: boolean) => void;
}

const useToast = create<ToastState>()(
  immer((set) => ({
    isToastOpen: false,
    status: undefined,
    message: '',
    setToast: (status, message) =>
      set((state) => {
        state.status = status as UseToastOptions['status'];
        state.message = message;
      }),
    setOpen: (payload) =>
      set((state) => {
        state.isToastOpen = payload;
      }),
  }))
);

export const useToastOpen = () => useToast((state) => state.isToastOpen);
export const useToastStatus = () => useToast((state) => state.status);
export const useToastMessage = () => useToast((state) => state.message);
export const useToastAction = () => useToast((state) => state.setToast);
export const useSetToastOpen = () => useToast((state) => state.setOpen);
const useToastStore = () => {
  const { flash } = useTypedPage().props;
  const { success, errors } = flash;
  const setToast = useToastAction();
  const setOpen = useSetToastOpen();
  const message = useToastMessage();
  const status = useToastStatus();
  const isToastOpen = useToastOpen();

  const handleToast = useCallback(() => {
    if (success) {
      setToast('success', success);
      setOpen(true);
    } else if (errors) {
      setToast('error', errors);
      setOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, errors]);
  useEffect(() => {
    if (!flash) {
      return;
    }
    handleToast();
  }, [flash, handleToast]);
  const toast = useChakraToast();
  const toastRef = useRef<ToastId>();

  function close() {
    if (toastRef.current) {
      toast.close(toastRef.current);
      setOpen(false);
    }
  }
  useEffect(() => {
    if (!isToastOpen) {
      return;
    }
    if (isToastOpen) {
      toastRef.current = toast({
        title: status === 'success' ? 'Success' : 'Error',
        description: message,
        status: status,
        position: 'top',
        variant: 'left-accent',
        isClosable: true,
      });
    }
    const timeoutId = setTimeout(() => {
      close();
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isToastOpen]);
};

export default useToastStore;
