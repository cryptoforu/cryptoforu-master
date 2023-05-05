import { lazy } from 'react';
import pMinDelay from 'p-min-delay';
import AppHead from '@/Components/AppHead';
import { SettingsIcon, HamburgerIcon, DragHandleIcon } from '@chakra-ui/icons';
import AdminLayout from '@/Layouts/AdminLayout';
import PanelWrapper from '@/PageContainers/PanelWrapper';
import { SuspenseWrapper } from '@/Motion';
import type { Settings as S } from '@/types';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue as mode,
  Grid,
  GridItem,
  Card,
  CardBody,
  useMediaQuery,
  Box,
} from '@chakra-ui/react';
import { usePageForm, useEditing } from '@/Store/usePageSettings';
import { DynamicForm } from '@/Forms';
import FormProvider from '@/Store/useFormProvider';
const MenuContent = lazy(() =>
  pMinDelay(import(`@/PageContainers/Admin/Settings/MenuContent.js`), 500)
);

const PageHeader = lazy(() =>
  pMinDelay(import(`@/PageContainers/Admin/Settings/PageHeader.js`), 500)
);

const PageSelect = lazy(() =>
  pMinDelay(import('@/PageContainers/Admin/Settings/PageSelect.js'), 500)
);

const TabButton = lazy(() =>
  pMinDelay(import('@/PageContainers/Admin/Settings/TabButton.js'), 500)
);

const PageEdit = lazy(() =>
  pMinDelay(import('@/PageContainers/Admin/Settings/PageEdit.js'), 500)
);

const PageCard = lazy(() =>
  pMinDelay(import(`@/PageContainers/Admin/Settings/PageCard.js`), 500)
);

const Settings = ({ select }: S) => {
  const { values, page } = usePageForm();
  const { isEditing, setEditing } = useEditing();
  const [isLargerThan800] = useMediaQuery('(min-width: 1280px)', {
    ssr: true,
    fallback: false,
  });
  return (
    <SuspenseWrapper>
      <AppHead />
      <PanelWrapper>
        <Card variant={'containerCard'}>
          <CardBody p="0">
            <Tabs
              orientation={isLargerThan800 ? 'vertical' : 'horizontal'}
              position="relative"
              variant={isLargerThan800 ? 'primary' : 'line'}
              isLazy
              mx={{ base: '2', xl: 'none' }}
            >
              <Grid
                templateColumns={{ xl: 'repeat(12, 1fr)' }}
                templateRows={{
                  base: 'repeat(1, 1fr)',
                  xl: 'none',
                }}
              >
                <GridItem
                  colSpan={{ base: 0, xl: 3 }}
                  py="8"
                  borderRight={{ base: 'none', xl: '1px' }}
                  borderColor={{
                    base: 'none',
                    xl: mode('slate.100', 'slate.800'),
                  }}
                >
                  <TabList>
                    <Tab>
                      <TabButton
                        icon={SettingsIcon}
                        title="General Settings"
                        desc="Application General Settings"
                      />
                    </Tab>
                    <Tab>
                      <TabButton
                        icon={HamburgerIcon}
                        title="Menu Settings"
                        desc="Application Menus"
                      />
                    </Tab>
                    <Tab>
                      <TabButton
                        icon={DragHandleIcon}
                        title="Page Settings"
                        desc="Application Page Meta Data"
                      />
                    </Tab>
                  </TabList>
                </GridItem>
                <GridItem colSpan={{ base: 12, xl: 9 }}>
                  <SuspenseWrapper>
                    <TabPanels>
                      <TabPanel>
                        <PageHeader title="General Settings"></PageHeader>
                      </TabPanel>
                      <TabPanel>
                        <MenuContent />
                      </TabPanel>
                      <TabPanel>
                        <PageHeader title="Page Meta Settings">
                          <>
                            <PageEdit />
                            <PageSelect
                              admin={select.admin}
                              front={select.front}
                            />
                          </>
                        </PageHeader>

                        <Box w="full" mt="2">
                          {isEditing ? (
                            <FormProvider
                              initialValues={values.initialValues}
                              form_schema={values.form_schema}
                              form_route={values.form_route}
                              method="put"
                              options={{
                                preserveState: true,
                                preserveScroll: false,
                                only: [page],
                                onSuccess: () => {
                                  setEditing(false);
                                },
                                onError: (error) => {
                                  console.log(error);
                                },
                              }}
                            >
                              {' '}
                              <DynamicForm />{' '}
                            </FormProvider>
                          ) : (
                            <PageCard />
                          )}
                        </Box>
                      </TabPanel>
                    </TabPanels>
                  </SuspenseWrapper>
                </GridItem>
              </Grid>
            </Tabs>
          </CardBody>
        </Card>
      </PanelWrapper>
    </SuspenseWrapper>
  );
};
Settings.layout = (page: string) => <AdminLayout children={page} />;
export default Settings;
