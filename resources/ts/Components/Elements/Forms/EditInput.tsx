import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import {
  ButtonGroup,
  Flex,
  IconButton,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

import {
  useEditId,
  useInputValues,
  useIsEditing,
  useSetInput,
} from '@/Store/useEditInputStore';
import type { EditMenuProps } from '@/types';

import { LazyImage } from '../Content';
import { ButtonLink } from '../Navigation';

function InputControls({ index }: EditMenuProps) {
  const setInput = useSetInput();
  const isEditing = useIsEditing(index);
  const values = useInputValues();
  const id = useEditId();

  return isEditing ? (
    <ButtonGroup justifyContent="center" size="sm">
      <IconButton
        as={ButtonLink}
        aria-label="check"
        icon={<CheckIcon />}
        to="admin:settings:menu"
        routeParams={false}
        params={id}
        data={{ ...values, _method: 'put' }}
        options={{
          method: 'post',
          forceFormData: true,
          preserveScroll: true,
          preserveState: true,
          onSuccess: () => {
            setInput(0);
          },
        }}
      />
      <IconButton
        aria-label="close"
        icon={<CloseIcon />}
        onClick={() => setInput(index)}
      />
    </ButtonGroup>
  ) : (
    <Flex justifyContent="center">
      <IconButton
        aria-label="edit"
        size="sm"
        icon={<EditIcon />}
        onClick={() => setInput(index)}
      />
    </Flex>
  );
}

const EditInput = ({
  children,
  index,
  ...props
}: PropsWithChildren<EditMenuProps>) => {
  const isEditing = useIsEditing(index);
  return (
    <Flex
      justifyContent={'space-between'}
      flexDirection={'row'}
      width="100%"
      gap={'4'}
      color={mode('slate.600', 'slate.400')}
      fontSize="md"
      fontWeight="bold"
      align={'center'}
    >
      <Flex width={'90%'}>
        {isEditing ? (
          <>{children}</>
        ) : (
          <>
            {props.name === 'icon' ? (
              <LazyImage
                imgProps={{
                  w: '6',
                  h: '6',
                  img_name: props.defaultValue
                    ? props.defaultValue
                    : '/placeholder/40/40',
                }}
              />
            ) : (
              <Text>{props.defaultValue}</Text>
            )}
          </>
        )}
      </Flex>
      <Flex direction={'row'}>
        <InputControls index={index} />
      </Flex>
    </Flex>
  );
};

export default EditInput;
