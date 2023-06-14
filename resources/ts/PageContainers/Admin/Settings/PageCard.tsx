import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  IconButton,
  Stack,
  StackDivider,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { Fragment, PropsWithChildren } from 'react';

import { LazyImage } from '@/Components/Elements/Content';
import { ButtonLink } from '@/Components/Elements/Navigation';
import { usePageForm } from '@/Store/usePageSettings';
import { toHeadline } from '@/utils/toHeadline';
const PageCard = ({ children }: PropsWithChildren) => {
  return (
    <Card variant={'primary'}>
      <CardBody>
        <Stack
          divider={<StackDivider color={mode('emerald.100', 'slate.800')} />}
          spacing={'4'}
        >
          {children}
        </Stack>
      </CardBody>
    </Card>
  );
};

type CardText = {
  label: string;
  desc?: string;
  image?: string;
};

PageCard.Text = function PageCardText({ label, desc }: CardText) {
  return (
    <Box>
      <Heading size="lg" textTransform={'capitalize'}>
        {toHeadline(label)}
      </Heading>
      <Text color={mode('slate.600', 'slate.400')} pt="2" fontSize={'xl'}>
        {desc}
      </Text>
    </Box>
  );
};

PageCard.Image = function PageCardImage({ label, image }: CardText) {
  return (
    <Flex flexDirection={'column'} gap="4">
      <Heading size="lg">{toHeadline(label)}</Heading>

      <LazyImage
        imgProps={{
          img_name: image as string,
          alt: '',
          objectFit: 'cover',
        }}
        boxProps={{ rounded: 'lg', maxWidth: '300px', mx: 'auto' }}
      />
    </Flex>
  );
};

function Delete({ id }: { id?: string }) {
  const { setPage } = usePageForm();
  return (
    <Box position="absolute" right="2" top="-2" py="4">
      <ButtonLink
        as={IconButton}
        icon={<DeleteIcon />}
        size="sm"
        colorScheme="red"
        to="admin-settings.destroy"
        params={id}
        options={{
          method: 'delete',
          data: { delete: 'delete_page' },
          preserveScroll: true,
          preserveState: true,
          replace: true,
          onSuccess: () => {
            setPage('dashboard');
          },
          only: ['dashboard'],
        }}
      />
    </Box>
  );
}

const PageMetaData = () => {
  const { values } = usePageForm();
  return (
    <PageCard>
      <Delete id={values.initialValues.page_name} />
      {Object.entries(values.initialValues).map(([key, value]) => (
        <Fragment key={key}>
          {typeof value === 'string' && value.startsWith('http') ? (
            <PageCard.Image label={key} image={value} />
          ) : (
            typeof value === 'string' && (
              <PageCard.Text label={key} desc={value as string} />
            )
          )}
        </Fragment>
      ))}
    </PageCard>
  );
};

export default PageMetaData;
