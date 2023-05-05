import { Flex, Stack, Spacer } from '@chakra-ui/react';
import { ProseHeadings, ProsePa } from '@/Components/Elements/Typography';
import { Separator } from '@/Components/Elements/Content';
import { PropsWithChildren } from 'react';

interface ActionHeaderProps extends PropsWithChildren {
  title: string;
  desc?: string;
}

const ActionHeader = ({ title, desc, children }: ActionHeaderProps) => {
  return (
    <>
      <Flex maxWidth="7xl" mx="auto" gap="2" align="center">
        <Stack direction="column" gap="2" p="2">
          <ProseHeadings component="h2">{title}</ProseHeadings>
          <ProsePa>{desc}</ProsePa>
        </Stack>
        <Spacer />
        {children}
      </Flex>
      <Flex minWidth="max-content" alignItems="center" p="4">
        <Separator />
      </Flex>
    </>
  );
};

export default ActionHeader;
