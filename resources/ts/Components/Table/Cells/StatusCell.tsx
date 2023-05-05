import {
  Td,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import useRouter from '@/Hooks/useRouter';

type StatusProps = 'DRAFT' | 'PUBLISHED' | 'PREVIEW' | 'ARCHIVED';

interface Status {
  status: string;
  color: string;
  options: {
    route: string;
    values: StatusProps[];
  };
}

const StatusCell = ({ status, options, color }: Status) => {
  const navigate = useRouter();
  return (
    <Td>
      <Menu>
        <MenuButton
          as={Button}
          size="sm"
          colorScheme={color}
          rightIcon={<ChevronDownIcon />}
        >
          {status}
        </MenuButton>
        <MenuList>
          {options.values.map((option, index) => (
            <MenuItem
              key={index}
              onClick={() =>
                navigate(options.route, 'post', {
                  data: {
                    _method: 'put',
                    status: option,
                  },
                })
              }
            >
              {option}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Td>
  );
};

export default StatusCell;
