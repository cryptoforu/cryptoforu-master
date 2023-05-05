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
import type { PageMeta } from '../../Types/generated';
interface AdminNavProps {
  auth: Auth;
  meta: PageMeta;
}

const AdminNav = () => {
  const { auth, meta: breadcumb } = usePageProps<AdminNavProps>();
  return (
    <Card variant={'containerCard'}>
      <CardBody>
        <Flex justify="space-between" align="center" w="full">
          <Box mb={{ sm: '8px', md: '0px' }}>
            {breadcumb && breadcumb?.parents ? (
              <Breadcrumb>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    as={NavLink}
                    to={breadcumb?.route as string}
                    routeParams={true}
                  >
                    {breadcumb?.parents.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink
                    as={NavLink}
                    to={breadcumb?.route as string}
                    routeParams={true}
                  >
                    {breadcumb?.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            ) : (
              <Breadcrumb>
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink
                    as={NavLink}
                    to={breadcumb?.route as string}
                    routeParams={true}
                  >
                    {breadcumb?.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            )}

            <NavLink
              to={breadcumb?.route as string}
              routeParams={true}
              fontWeight={'bold'}
              fontSize={'lg'}
            >
              {breadcumb?.label}
            </NavLink>
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
