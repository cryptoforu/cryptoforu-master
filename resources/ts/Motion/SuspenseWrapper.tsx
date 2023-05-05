import { Suspense, PropsWithChildren, useCallback } from 'react';
import {
  Skeleton,
  Spinner,
  Box,
  AbsoluteCenter,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import { useErrorBoundary, ErrorBoundary } from 'react-error-boundary';
import { router } from '@inertiajs/react';

interface WrapperProps extends PropsWithChildren {
  def?: keyof typeof defProps;
}

const defProps = {
  skeleteon: {
    height: '400px',
    startColor: 'slate.800',
    endColor: 'slate.950',
    rounded: 'lg',
    speed: 0.4,
  },
  spinner: {
    thickness: '4px',
    speed: '0.65s',
    emptyColor: 'slate.950',
    color: 'emerald.500',
    size: 'xl',
  },
};

function ErrorFall() {
  const { resetBoundary } = useErrorBoundary();
  const onAction = useCallback(() => {
    router.reload();
    resetBoundary();
  }, [resetBoundary]);
  return (
    <Box display="flex" position="relative" width="100%" height="auto">
      <AbsoluteCenter axis="both" p="8">
        <Alert
          status="error"
          variant="top-accent"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Ooops, something went wrong
          </AlertTitle>
        </Alert>
        <Box display="flex" p="4" alignContent="center" justifyItems="center">
          <Button colorScheme="red" onClick={() => onAction()}>
            Refresh
          </Button>
        </Box>
      </AbsoluteCenter>
    </Box>
  );
}

const SuspenseWrapper = ({ children, def = 'skeleteon' }: WrapperProps) => {
  if (def === 'skeleteon') {
    return (
      <Suspense fallback={<Skeleton {...defProps.skeleteon} />}>
        <ErrorBoundary FallbackComponent={ErrorFall}>{children}</ErrorBoundary>
      </Suspense>
    );
  }
  return (
    <Suspense fallback={<Spinner {...defProps.spinner} />}>
      <ErrorBoundary FallbackComponent={ErrorFall}>{children}</ErrorBoundary>
    </Suspense>
  );
};

export default SuspenseWrapper;
