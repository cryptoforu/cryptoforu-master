import { useSelectedValues } from '@/Store/useMenuSelect';
import type { SiteData, HeroData, FeaturesData } from '@/Types/generated';
import { Flex, Button, ButtonGroup } from '@chakra-ui/react';
import SettingsContent, {
  SettingsBody,
  SettingsRow,
  SettingsRowBody,
} from '../SettingsContent';
import PageHeader from '../Settings/PageHeader';
import { BtnLink } from '@/Components/Elements/Navigation';
import {
  useInputValues,
  useSetInput,
  useIsEditing,
  useSetValues,
} from '@/Store/useEditInputStore';
import { toHeadline } from '@/utils/toHeadline';
import { ProseHeadings, ProsePa } from '@/Components/Elements/Typography';
import { LazyImage } from '@/Components/Elements/Content';
import { EditIcon, DeleteIcon, CloseIcon } from '@chakra-ui/icons';
export interface IPagesDataProps {
  hero: HeroData[];
  features: FeaturesData[];
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
      <BtnLink
        component={Button}
        colorScheme="red"
        to="site.delete"
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
      </BtnLink>
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
                    <SettingsRow>
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
