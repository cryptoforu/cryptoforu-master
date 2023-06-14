import { Box, Flex } from '@chakra-ui/react';
import { FieldArray } from 'formik';

import { CheckBoxField } from '@/Components/Elements/Forms/index';

interface GroupProps {
  items?: {
    id: number | string;
    name: string;
    [x: string]: number | string | undefined;
  }[];
  name: string;
}

const CheckBoxGroup = ({ items, name }: GroupProps) => {
  return (
    <FieldArray
      name={name}
      render={(arrayHelpers) => (
        <Box maxWidth={'full'}>
          <Flex wrap={'wrap'} width={'full'} justifyItems={'center'}>
            {items?.map((item, index) => (
              <Box key={index}>
                <CheckBoxField
                  name={`items[${index}].name`}
                  label={item.name}
                  onChange={() => arrayHelpers.push({ id: item.id })}
                />
              </Box>
            ))}
          </Flex>
        </Box>
      )}
    />
  );
};
export default CheckBoxGroup;
