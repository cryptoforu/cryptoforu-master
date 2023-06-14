import { Input } from '@chakra-ui/react';

import { EditInput } from '@/Components/Elements/Forms';
import { ChakraPond } from '@/Components/Elements/Forms';
import { useInputChange, useSetFile } from '@/Store/useEditInputStore';
import type { EditMenuProps } from '@/types';

const EditMenu = ({ ...props }: EditMenuProps) => {
  const handleInputChange = useInputChange();
  const setFile = useSetFile();
  return props.name === 'icon' ? (
    <EditInput
      name="icon"
      index={props.index}
      defaultValue={props.defaultValue}
    >
      <ChakraPond
        name="icon"
        onupdatefiles={(file) =>
          setFile(file, 'icon', props.id as string | number)
        }
      />
    </EditInput>
  ) : (
    <EditInput index={props.index} defaultValue={props.defaultValue}>
      <Input onChange={handleInputChange} {...props} />
    </EditInput>
  );
};

export default EditMenu;
