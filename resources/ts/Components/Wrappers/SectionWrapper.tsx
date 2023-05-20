import { Suspense, useCallback, PropsWithChildren } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  Skeleton,
  Box,
  AbsoluteCenter,
  BoxProps,
  Button,
} from '@chakra-ui/react';
import { ProseHeadings } from '../Elements/Typography';
import { useErrorBoundary, ErrorBoundary } from 'react-error-boundary';
import { router } from '@inertiajs/react';
import { useSectionContext } from '@/Providers';

function Wrapper({ children }: PropsWithChildren) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      position="relative"
      width="100%"
      height="auto"
      py={{ base: '20', sm: '24' }}
    >
      <AbsoluteCenter axis="both">{children}</AbsoluteCenter>
    </Box>
  );
}

function ErrorFallback() {
  const { resetBoundary } = useErrorBoundary();
  const onRefresh = useCallback(() => {
    router.reload({
      preserveScroll: true,
      preserveState: false,
      replace: true,
    });
    resetBoundary();
  }, [resetBoundary]);
  return (
    <Wrapper>
      <ProseHeadings component="h1" size="xxl">
        Something went wrong, Try Refreshing!
      </ProseHeadings>
      <Box mt="8">
        <Button variant="primaryBtn" onClick={() => onRefresh()}>
          Refresh
        </Button>
      </Box>
    </Wrapper>
  );
}

const SectionWrapper = ({ children, ...rest }: PropsWithChildren<BoxProps>) => {
  const { isLazy, label, sectionId, isLoaded } = useSectionContext();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  if (isLazy) {
    return (
      <Box
        ref={ref}
        aria-label={label}
        id={sectionId}
        position="relative"
        {...rest}
      >
        {inView && (
          <Suspense
            fallback={
              <Skeleton
                minHeight="70vh"
                maxWidth="5xl"
                mx="auto"
                py="16"
                isLoaded={isLoaded}
                fadeDuration={4}
              />
            }
          >
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              {children}
            </ErrorBoundary>
          </Suspense>
        )}
      </Box>
    );
  } else {
    return (
      <Box aria-label={label} id={sectionId} {...rest}>
        {children}
      </Box>
    );
  }
};
export default SectionWrapper;
