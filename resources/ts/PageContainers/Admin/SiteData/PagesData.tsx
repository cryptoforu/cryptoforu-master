import { CloseIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Button, ButtonGroup, Flex } from '@chakra-ui/react';

import { LazyImage } from '@/Components/Elements/Content';
import { ButtonLink } from '@/Components/Elements/Navigation';
import { ProseHeadings, ProsePa } from '@/Components/Elements/Typography';
import {
  useInputValues,
  useIsEditing,
  useSetInput,
  useSetValues,
} from '@/Store/useEditInputStore';
import { useSelectedValues } from '@/Store/useMenuSelect';
import { toHeadline } from '@/utils/toHeadline';

import PageHeader from '../Settings/PageHeader';
import SettingsContent, {
  SettingsBody,
  SettingsRow,
  SettingsRowBody,
} from '../SettingsContent';

type SiteData<T> = {
  data_name: string;
  data_values: T;
};

export interface IPagesDataProps {
  hero: {
    id: string;
    title: string;
    description: string;
  }[];
  features: {
    id: string;
    name: string;
    image: string;
    link: string;
    description: string;
  }[];
}

function Editing({ id, payload }: { id: string | number; payload: object }) {
  const isEditing = useIsEditing(id);
  const values = useInputValues();
  const setInput = useSetInput();
  const setValues = useSetValues();
  return isEditing ? (
    <ButtonGroup gap={4} size="sm">
      <Button type="button" colorScheme="emerald">
        <EditIcon />
      </Button>
      <ButtonLink
        colorScheme="red"
        to="admin:site.delete"
        data={{ ...values }}
        options={{
          method: 'post',
          forceFormData: true,
          preserveScroll: true,
          preserveState: true,
          onSuccess: () => {
            setInput(0);
          },
        }}
      >
        <DeleteIcon />
      </ButtonLink>
      <Button onClick={() => setInput(0)}>
        <CloseIcon />
      </Button>
    </ButtonGroup>
  ) : (
    <Button
      variant="primaryBtn"
      onClick={() => {
        setInput(id);
        setValues(payload);
      }}
    >
      Edit
    </Button>
  );
}

const PagesData = () => {
  const values = useSelectedValues<SiteData<IPagesDataProps>>();
  return (
    <SettingsContent>
      {Object.entries(values.data_values).map(([key]) => (
        <>
          <PageHeader title={toHeadline(key)}>
            <ProsePa>{toHeadline(values.data_name)} Public Data</ProsePa>
          </PageHeader>
          <SettingsBody>
            {values.data_values[key as keyof IPagesDataProps].map(
              (h, hIndex) => (
                <SettingsRowBody key={hIndex} position="relative">
                  <Flex position="absolute" right="2" top="2" py="4">
                    <Editing
                      id={h.id}
                      payload={{
                        data_name: values.data_name,
                        key: key,
                        id: h.id,
                      }}
                    />
                  </Flex>
                  {Object.entries(h).map(([key, data]) => (
                    <SettingsRow key={key}>
                      <ProseHeadings component="h4">
                        {toHeadline(key)}
                      </ProseHeadings>
                      {key === 'image' ? (
                        <LazyImage
                          boxProps={{ w: '100px', h: '100px' }}
                          imgProps={{
                            img_name: data as string,
                            alt: '',
                          }}
                        />
                      ) : (
                        <ProsePa>{(data as string).slice(0, 40)}</ProsePa>
                      )}
                    </SettingsRow>
                  ))}
                </SettingsRowBody>
              )
            )}
          </SettingsBody>
        </>
      ))}
    </SettingsContent>
  );
};

export default PagesData;
