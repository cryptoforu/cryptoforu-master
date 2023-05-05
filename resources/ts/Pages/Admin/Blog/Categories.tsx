import { Suspense, lazy } from 'react';
import pMinDelay from 'p-min-delay';
import AppHead from '@/Components/AppHead';
import AdminLayout from '@/Layouts/AdminLayout';
import { Container } from '@chakra-ui/react';
import PanelWrapper from '@/PageContainers/PanelWrapper';
import {
  useCategory,
  useDrawerState,
  useCloseDrawer,
} from '@/Store/useCategories';
import FormProvider from '@/Store/useFormProvider';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Box,
} from '@chakra-ui/react';
import { Method } from '@inertiajs/core';

const CategoriesTable = lazy(() =>
  pMinDelay(import(`@/Components/Table/TablesData/CategoriesTable.js`), 500)
);

const DynamicForm = lazy(() =>
  pMinDelay(import(`@/Forms/DynamicForm.js`), 1000)
);
const Categories = () => {
  const { values, selectCategory, label, isPending, method, category } =
    useCategory();
  const isDrawerOpen = useDrawerState();
  const closeDrawer = useCloseDrawer();
  return (
    <>
      <AppHead />

      <Suspense fallback={<></>}>
        <PanelWrapper>
          <Container maxWidth="5xl" position={'relative'}>
            <Box position="absolute" top="6" right="10" zIndex="10">
              <Button
                isLoading={isPending}
                onClick={() => selectCategory('category_form')}
              >
                {' '}
                Add New category{' '}
              </Button>
            </Box>
            <CategoriesTable />
          </Container>
          <FormProvider
            initialValues={values.initialValues}
            form_schema={values.form_schema}
            form_route={values.form_route}
            method={method as Method}
            withButton={false}
            form_id={category}
            options={{
              only: [category],
              replace: true,
              preserveState: false,
            }}
          >
            <Drawer
              size="md"
              colorScheme="slate"
              isOpen={isDrawerOpen}
              placement="right"
              onClose={closeDrawer}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>{label}</DrawerHeader>

                <DrawerBody>
                  <DynamicForm />
                </DrawerBody>

                <DrawerFooter>
                  <Button variant="outline" mr={3} onClick={closeDrawer}>
                    Cancel
                  </Button>
                  <Button type="submit" form={category} colorScheme="blue">
                    Save
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </FormProvider>
        </PanelWrapper>
      </Suspense>
    </>
  );
};
Categories.layout = (page: string) => <AdminLayout children={page} />;
export default Categories;
