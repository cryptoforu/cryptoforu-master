import { Button, ButtonGroup } from '@chakra-ui/react';

import { ButtonLink } from '@/Components/Elements/Navigation';
import { useSelectAll } from '@/Store/useLibraryStore';
import { useMenuSelectContext } from '@/Store/useMenuSelect';
const SelectAll = () => {
  const { selected, toogleSelect, clearSelected } = useSelectAll();
  const current = useMenuSelectContext((state) => state.selected);
  return (
    <ButtonGroup gap={6}>
      {selected.length > 1 && (
        <ButtonLink
          to="admin-library.destroyMultiple"
          options={{
            method: 'delete',
            data: {
              selected: selected,
            },
            only: [current],
            preserveState: true,
            onSuccess: () => {
              clearSelected();
            },
          }}
          colorScheme="red"
        >
          Delete
        </ButtonLink>
      )}
      <Button onClick={() => toogleSelect()}>Select</Button>
    </ButtonGroup>
  );
};
export default SelectAll;
