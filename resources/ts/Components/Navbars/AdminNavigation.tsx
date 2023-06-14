import { SettingsIcon } from '@chakra-ui/icons';
import { Hide, Show } from '@chakra-ui/react';

import { ButtonLink } from '@/Components/Elements/Navigation';
import { usePageProps } from '@/Hooks/useTypedPage';
import type { AdminNavigation as A } from '@/Types/generated';

const AdminNavigation = () => {
  const { navigation } = usePageProps<A>();

  if (navigation === undefined) {
    return <></>;
  }

  return (
    <>
      {navigation?.parents ? (
        <ButtonLink
          variant="primary"
          key={navigation.route}
          to={navigation?.parents?.route as string}
          aria-label="navigation"
        >
          <Hide below="sm">{navigation?.parents?.label}</Hide>
          <Show below="sm">
            <SettingsIcon w={6} h={6} />
          </Show>
        </ButtonLink>
      ) : (
        navigation.childs?.map((child) => (
          <ButtonLink
            variant="secondary"
            key={child.label}
            to={child?.route as string}
            aria-label="navigation"
          >
            <Hide below="sm">{child.label}</Hide>
            <Show below="sm">
              <SettingsIcon w={6} h={6} />
            </Show>
          </ButtonLink>
        ))
      )}
    </>
  );
};

export default AdminNavigation;
