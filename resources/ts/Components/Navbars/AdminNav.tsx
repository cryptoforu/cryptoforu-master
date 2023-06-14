import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Card,
  CardBody,
  Flex,
  HStack,
} from '@chakra-ui/react';

import { AvatarButton } from '@/Components/Elements/Content';
import { NavigationLink } from '@/Components/Elements/Navigation';
import { usePageProps } from '@/Hooks/useTypedPage';
import type { Auth } from '@/types';

import type { AdminNavigation as A } from '../../Types/generated';
import { AdminNavigation, ProfileDropDown, ThemeSwitcher } from './index';

interface AdminNavProps {
  auth: Auth;
  navigation: A;
}

const AdminNav = () => {
  const { auth, navigation } = usePageProps<AdminNavProps>();
  return (
    <Card bg="slateAlpha.900" mt="4" mr="2">
      <CardBody>
        <Flex justify="space-between" align="center" w="full">
          <Box mb={{ sm: '8px', md: '0px' }}>
            <NavigationLink
              to={'admin.dashboard'}
              fontWeight={'bold'}
              fontSize={'lg'}
              variant="colored"
            >
              Dashboard
            </NavigationLink>
            {navigation && navigation?.parents ? (
              <Breadcrumb>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    as={NavigationLink}
                    to={navigation?.route as string}
                    routeParams={true}
                  >
                    {navigation?.parents.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink
                    as={NavigationLink}
                    to={navigation?.route as string}
                    routeParams={true}
                  >
                    {navigation?.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            ) : (
              <Breadcrumb>
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink
                    as={NavigationLink}
                    to={navigation?.route as string}
                    routeParams={true}
                  >
                    {navigation?.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            )}
          </Box>
          <HStack spacing="3">
            <AdminNavigation />

            <ThemeSwitcher />
            <AvatarButton
              avatar="/api/img/cache/original/notification.png"
              name="Admin Notifications"
              notify="2"
            />
            <ProfileDropDown auth={auth} />
          </HStack>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default AdminNav;
