import { Hide, Show } from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import { BtnLink } from '@/Components/Elements/Navigation';
import type { AdminNavigation as A } from '@/Types/generated';
import { usePageProps } from '@/Hooks/useTypedPage';

const AdminNavigation = () => {
  const { navigation } = usePageProps<A>();

  if (navigation === undefined) {
    return <></>;
  }

  return (
    <>
      {navigation?.parents ? (
        <BtnLink
          key={navigation.route}
          variant="gradLime"
          to={navigation?.parents?.route as string}
          aria-label="navigation"
        >
          <Hide below="sm">{navigation?.parents?.label}</Hide>
          <Show below="sm">
            <SettingsIcon w={6} h={6} />
          </Show>
        </BtnLink>
      ) : (
        navigation.childs?.map((child) => (
          <BtnLink
            key={child.label}
            variant="gradLime"
            to={child?.route as string}
            size={'sm'}
            aria-label="navigation"
          >
            <Hide below="sm">{child.label}</Hide>
            <Show below="sm">
              <SettingsIcon w={6} h={6} />
            </Show>
          </BtnLink>
        ))
      )}
    </>
  );
};

export default AdminNavigation;
