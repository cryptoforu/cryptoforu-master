import {
  AspectRatio,
  Button,
  GridItem,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  useColorModeValue as mode,
  useDisclosure,
} from '@chakra-ui/react';
import { useFormikContext } from 'formik';

import type { LibraryData } from '@/Types/generated';

const LibraryModal = ({
  images,
  value,
}: {
  images: LibraryData[];
  value: string;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setFieldValue } = useFormikContext();
  function onSelect(image: string) {
    setFieldValue(value, image);
    setTimeout(() => {
      onClose();
    }, 500);
  }
  return (
    <>
      <Button onClick={onOpen}>Select From Library</Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="6xl"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg={mode('slate.200', 'slate.950')}>
            Media Library
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} gap={6}>
              {images.map((image) => (
                <GridItem key={image.id}>
                  <AspectRatio ratio={4 / 3} maxW={'sm'}>
                    <Image
                      src={`/api/img/cache/lg/${image.file_name}`}
                      alt={image.file_name}
                      maxW={'full'}
                      h={'auto'}
                      objectFit={'cover'}
                      rounded={'md'}
                      borderColor={mode('slate.100', 'slate.900')}
                    />
                  </AspectRatio>
                  <Button
                    mt={6}
                    w={'full'}
                    colorScheme={'emerald'}
                    onClick={() => onSelect(image.file_name)}
                  >
                    Select
                  </Button>
                </GridItem>
              ))}
            </SimpleGrid>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default LibraryModal;
