import { Hide, Show } from '@chakra-ui/react';
import { SettingsIcon } from '@chakra-ui/icons';
import {
  PrimaryButton,
  SecondaryButton,
} from '@/Components/Elements/Navigation';
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
        <PrimaryButton
          key={navigation.route}
          to={navigation?.parents?.route as string}
          aria-label="navigation"
        >
          <Hide below="sm">{navigation?.parents?.label}</Hide>
          <Show below="sm">
            <SettingsIcon w={6} h={6} />
          </Show>
        </PrimaryButton>
      ) : (
        navigation.childs?.map((child) => (
          <SecondaryButton
            key={child.label}
            to={child?.route as string}
            aria-label="navigation"
          >
            <Hide below="sm">{child.label}</Hide>
            <Show below="sm">
              <SettingsIcon w={6} h={6} />
            </Show>
          </SecondaryButton>
        ))
      )}
    </>
  );
};

export default AdminNavigation;
