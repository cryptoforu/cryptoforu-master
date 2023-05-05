import { useEffect } from 'react';
import { useAnimate } from 'framer-motion';
import { Box, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { BtnLink } from '@/Components/Elements/Navigation';
import { useMenuSelectContext } from '@/Store/useMenuSelect';
interface OverlayProps {
  isHovered: boolean;
  id: string | number;
}

const ImageOverlay = ({ isHovered, id }: OverlayProps) => {
  const selected = useMenuSelectContext((state) => state.selected);
  const [scope, animate] = useAnimate();
  useEffect(() => {
    scope.current && isHovered
      ? animate(
          scope.current,
          {
            height: '100%',
            opacity: 0.5,
            backgroundColor: '#020617',
          },
          {
            duration: 1,
            type: 'spring',
            ease: 'easeInOut',
            bounce: 0,
          }
        )
      : animate(
          scope.current,
          {
            height: '0',
            opacity: 0,
            bottom: 0,
          },
          {
            duration: 1,
            type: 'spring',
            ease: 'easeInOut',
            bounce: 0,
          }
        );
  }, [animate, isHovered, scope]);

  return (
    <Box
      position="absolute"
      insetX={0}
      top={0}
      display="flex"
      height="72"
      overflow="hidden"
      rounded="md"
      p="4"
    >
      <Box
        ref={scope}
        position="absolute"
        insetX={0}
        display="flex"
        alignItems="start"
        justifyContent="end"
        key={id}
      >
        <BtnLink
          as={IconButton}
          icon={<DeleteIcon />}
          colorScheme="red"
          to="admin-library.destroy"
          params={id}
          options={{
            method: 'delete',
            only: [selected],
            preserveScroll: true,
            preserveState: true,
          }}
          m="4"
        />
      </Box>
    </Box>
  );
};
export default ImageOverlay;
