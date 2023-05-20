import {
  Flex,
  Box,
  HStack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Card,
  CardBody,
} from '@chakra-ui/react';
import { AvatarButton } from '@/Components/Elements/Content';
import { ProfileDropDown, ThemeSwitcher, AdminNavigation } from './index';
import { NavLink } from '@/Components/Elements/Navigation';
import { usePageProps } from '@/Hooks/useTypedPage';
import type { Auth } from '@/types';
import type { AdminNavigation as A } from '../../Types/generated';
interface AdminNavProps {
  auth: Auth;
  navigation: A;
}

const AdminNav = () => {
  const { auth, navigation } = usePageProps<AdminNavProps>();
  return (
    <Card variant={'containerCard'} bg="slateAlpha.900">
      <CardBody>
        <Flex justify="space-between" align="center" w="full">
          <Box mb={{ sm: '8px', md: '0px' }}>
            <NavLink to={'admin.dashboard'} fontWeight={'bold'} fontSize={'lg'}>
              Dashboard
            </NavLink>
            {navigation && navigation?.parents ? (
              <Breadcrumb>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    as={NavLink}
                    to={navigation?.route as string}
                    routeParams={true}
                  >
                    {navigation?.parents.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink
                    as={NavLink}
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
                    as={NavLink}
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
              avatar="/img/cache/original/notification.png"
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
