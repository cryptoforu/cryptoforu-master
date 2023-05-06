import {
  SimpleGrid,
  Container,
  Box,
  Button,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  GridItem,
  useColorModeValue as mode,
  VStack,
  Stack,
  StackDivider,
  Alert,
  AlertIcon,
  HStack,
} from '@chakra-ui/react';
import { usePageProps } from '@/Hooks/useTypedPage';
import { ImageOverlay } from './';
import { m } from 'framer-motion';
import { useSelectedValues } from '@/Store/useMenuSelect';
import { LazyImage } from '@/Components/Elements/Content';
import type { LibraryCategory, LibraryData } from '@/Types/generated';
import { useHovered, useChecked, useDetails } from '@/Store/useLibraryStore';
import { AnimatedCheckIcon } from '@/Motion';
import { toHeadline } from '@/utils/toHeadline';
import { bytesToSize } from '@/utils/convertBytes';
import { ProseHeadings, ProsePa } from '@/Components/Elements/Typography';
import { Clipboard } from '@/Components/Elements/Forms';
interface ModalDetailsProps {
  values: LibraryData;
  toogleDetails: () => void;
  showingDetails: boolean;
}

const ModalDetails = ({
  values,
  toogleDetails,
  showingDetails,
}: ModalDetailsProps) => {
  return (
    <Modal
      isOpen={showingDetails}
      onClose={toogleDetails}
      isCentered
      size="5xl"
      scrollBehavior="inside"
    >
      <ModalOverlay
        bg="none"
        backdropFilter="auto"
        backdropInvert="80%"
        backdropBlur="2px"
      />
      <ModalContent>
        <ModalHeader>File Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SimpleGrid columns={{ base: 1, sm: 12 }} spacing={6}>
            <GridItem colSpan={{ sm: 4, lg: 5 }}>
              <LazyImage
                boxProps={{
                  rounded: 'md',
                  overflow: 'hidden',
                  bg: mode('gray.100', 'gray.900'),
                  __css: { aspectRatio: 2 / 3 },
                }}
                imgProps={{
                  src: `/img/cache/original/${values.file_name}`,
                  alt: '',
                  objectFit: 'cover',
                }}
              />
            </GridItem>
            <GridItem colSpan={{ sm: 8, lg: 7 }}>
              <Stack
                divider={
                  <StackDivider color={mode('emerald.100', 'slate.800')} />
                }
                spacing={'4'}
              >
                {Object.entries(values).map(([key, value]) => {
                  switch (key) {
                    case 'size':
                      return (
                        <VStack spacing={2} key={'size'} alignItems="start">
                          <ProseHeadings component="h3">
                            {toHeadline(key)}
                          </ProseHeadings>
                          <ProsePa>{bytesToSize(value as number)}</ProsePa>
                        </VStack>
                      );
                    case 'file_name':
                      return (
                        <VStack spacing={2} key={key} alignItems="start">
                          <ProseHeadings component="h3">
                            {toHeadline(key)}
                          </ProseHeadings>
                          <Clipboard copyVal={value as string} />
                        </VStack>
                      );
                    case 'conversions':
                      return (
                        <VStack spacing={2} key={key} alignItems="start">
                          <ProseHeadings component="h3">
                            {toHeadline(key)}
                          </ProseHeadings>
                          {Object.entries(
                            value as ModalDetailsProps['values']['conversions']
                          ).map(([key, val]) => (
                            <HStack spacing={2} width="full" key={key}>
                              <ProsePa>{key}</ProsePa>
                              <Clipboard copyVal={val as string} />
                            </HStack>
                          ))}
                        </VStack>
                      );
                    default:
                      return (
                        <VStack spacing={2} key={key} alignItems="start">
                          <ProseHeadings component="h3">
                            {toHeadline(key)}
                          </ProseHeadings>
                          <ProsePa>
                            <>{value}</>
                          </ProsePa>
                        </VStack>
                      );
                  }
                })}
              </Stack>
            </GridItem>
          </SimpleGrid>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={toogleDetails}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const ImageGrid = () => {
  const values = useSelectedValues<LibraryCategory>();
  const { isHovered, setHovered } = useHovered();
  const {
    values: val,
    toogleDetails,
    setValues,
    showingDetails,
  } = useDetails();
  const { errors } = usePageProps();
  const { isChecked, setSelected, selectAll } = useChecked();
  console.log(values);
  return (
    <Container variant="panel">
      <SimpleGrid columns={{ base: 2, sm: 3, lg: 4 }} spacing={10}>
        {values.media?.length > 0
          ? values.media.map((file) => (
              <Box
                as={m.div}
                onHoverStart={() => setHovered(file.id)}
                onHoverEnd={() => setHovered(0)}
                key={file.id}
              >
                <Box position="relative">
                  <LazyImage
                    boxProps={{
                      p: '2',
                      bg: 'gray.800',
                      height: '72',
                      overflow: 'hidden',
                      w: 'full',
                    }}
                    imgProps={{
                      src: `/img/cache/original/${file.file_name}`,
                      alt: '',
                      rounded: 'md',
                      width: 'full',
                      height: 'full',
                      objectFit: 'cover',
                    }}
                  />
                  {selectAll && (
                    <IconButton
                      position="absolute"
                      size="sm"
                      top={0}
                      left={0}
                      zIndex={10}
                      icon={
                        <AnimatedCheckIcon
                          isChecked={isChecked(file.id as number)}
                        />
                      }
                      aria-label="select"
                      onClick={() => setSelected(file.id as number)}
                      colorScheme="slate"
                      m="4"
                    />
                  )}
                  <ImageOverlay isHovered={isHovered(file.id)} id={file.id} />
                </Box>
                <>
                  {errors &&
                    Object.entries(errors).map(([key, val]) => (
                      <Alert status="error">
                        <AlertIcon />
                        {val}
                      </Alert>
                    ))}
                </>
                <Box mt="6">
                  <Button
                    width="100%"
                    onClick={() =>
                      setValues({
                        id: file.id,
                        file_name: file.file_name,
                        conversions: {
                          lg_name: file.conversions.lg_name,
                          md_name: file.conversions.md_name,
                          sm_name: file.conversions.sm_name,
                        },
                        mime_type: file.mime_type,
                        size: file.size,
                        width: file.width,
                        height: file.height,
                      })
                    }
                  >
                    View Details
                  </Button>
                </Box>
              </Box>
            ))
          : null}
      </SimpleGrid>
      <ModalDetails
        values={val}
        toogleDetails={toogleDetails}
        showingDetails={showingDetails}
      />
    </Container>
  );
};

export default ImageGrid;
