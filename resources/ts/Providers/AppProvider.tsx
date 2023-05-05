import { PropsWithChildren, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
  Box,
  AbsoluteCenter,
  Heading,
  Button,
  Spinner,
} from '@chakra-ui/react';

const FallbackWrapper = ({ children }: PropsWithChildren) => {
  return (
    <Box position="relative" height="100vh" width="100vw">
      <AbsoluteCenter axis="both">{children}</AbsoluteCenter>
    </Box>
  );
};

const ErrorFallback = () => {
  return (
    <FallbackWrapper>
      <Heading colorScheme="red" as="h1">
        Ooops, something went wrong
      </Heading>
      <Button
        variant="gradLime"
        onClick={() => window.location.assign(window.location.origin)}
      >
        Refresh
      </Button>
    </FallbackWrapper>
  );
};

const SuspenseFallback = () => {
  return (
    <FallbackWrapper>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="slate.950"
        color="emerald.500"
        size="xl"
      />
    </FallbackWrapper>
  );
};

const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {children}
      </ErrorBoundary>
    </Suspense>
  );
};

export default AppProvider;
