import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  Skeleton,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import pMinDelay from 'p-min-delay';
import { lazy, Suspense } from 'react';

import AppHead from '@/Components/AppHead';
import { ProseHeadings } from '@/Components/Elements/Typography';
import AdminLayout from '@/Layouts/AdminLayout';
import PanelWrapper from '@/PageContainers/PanelWrapper';
import FormProvider from '@/Store/useFormProvider';
import type { FormData } from '@/Types/generated';

const DynamicForm = lazy(() =>
  pMinDelay(import(`@/Forms/DynamicForm.js`), 1000)
);

type OptionsProps = {
  id: string | number;
  name: string;
  label?: string;
};

interface CreateSettingsProps {
  form: {
    initialValues: {
      id: 'create_page_form';
    };
    form_route: string;
    form_schema: {
      id: FormData<OptionsProps>;
    };
  };
  menu_form: {
    initialValues: {
      id: 'create_menu_form';
    };
    form_route: string;
    form_schema: {
      id: FormData<OptionsProps>;
    };
  };
}

const CreateSettings = (props: CreateSettingsProps) => {
  const { form, menu_form } = props;
  return (
    <>
      <AppHead />
      <PanelWrapper>
        <Card variant={'containerCard'}>
          <CardBody p="0">
            <Tabs orientation="vertical" position="relative" isLazy>
              <Grid templateColumns={{ lg: 'repeat(12, 1fr)' }} minW={'full'}>
                <GridItem
                  colSpan={3}
                  py="8"
                  borderRight={'1px'}
                  borderColor={mode('slate.100', 'slate.800')}
                >
                  <TabList>
                    <Tab
                      _hover={{ bg: mode('emerald.100', 'slateAlpha.500') }}
                      _selected={{
                        bg: mode('emerald.100', 'slateAlpha.500'),
                        borderLeft: '2.5px solid teal',
                      }}
                      textAlign={'left'}
                      minWidth={'full'}
                      display={'flex'}
                      justifyContent={'start'}
                    >
                      Menu Settings
                    </Tab>
                    <Tab
                      _hover={{ bg: mode('emerald.100', 'slateAlpha.500') }}
                      _selected={{
                        bg: mode('emerald.100', 'slateAlpha.500'),
                        borderLeft: '2.5px solid teal',
                      }}
                      textAlign={'left'}
                      minWidth={'full'}
                      display={'flex'}
                      justifyContent={'start'}
                    >
                      Page Meta Data
                    </Tab>
                  </TabList>
                  <TabIndicator />
                </GridItem>

                <GridItem colSpan={9} py="8">
                  <TabPanels>
                    <TabPanel>
                      <Suspense fallback={<Skeleton />}>
                        <CardHeader display="flex">
                          <ProseHeadings component="h4" size="xl">
                            Add New Menu Item
                          </ProseHeadings>
                        </CardHeader>
                        <Box
                          p="4"
                          bg={mode('slate.200', 'slate.950')}
                          my="4"
                          rounded="lg"
                        >
                          <FormProvider
                            initialValues={menu_form.initialValues}
                            form_schema={menu_form.form_schema}
                            form_route={menu_form.form_route}
                          >
                            <DynamicForm />
                          </FormProvider>
                        </Box>
                      </Suspense>
                    </TabPanel>
                    <TabPanel>
                      <CardHeader display="flex">
                        <ProseHeadings component="h4" size="xl">
                          Add New Page Meta Data
                        </ProseHeadings>
                      </CardHeader>
                      <Box
                        p="4"
                        bg={mode('slate.200', 'slate.950')}
                        my="4"
                        rounded="lg"
                      >
                        <FormProvider
                          initialValues={form.initialValues}
                          form_schema={form.form_schema}
                          form_route={form.form_route}
                        >
                          <DynamicForm />
                        </FormProvider>
                      </Box>
                    </TabPanel>
                  </TabPanels>
                </GridItem>
              </Grid>
            </Tabs>
          </CardBody>
        </Card>
      </PanelWrapper>
    </>
  );
};
// eslint-disable-next-line react/no-children-prop
CreateSettings.layout = (page: string) => <AdminLayout children={page} />;
export default CreateSettings;
