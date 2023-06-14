import { Grid, useColorModeValue } from '@chakra-ui/react';

import AppHead from '@/Components/AppHead';
import avatar from '@/images/og_image.png';
import AdminLayout from '@/Layouts/AdminLayout';
import ApiDialog from '@/PageContainers/Admin/Profile/ApiDialog';
import ApiForm from '@/PageContainers/Admin/Profile/ApiForm';
import Header from '@/PageContainers/Admin/Profile/Header';
import ProfileInfo from '@/PageContainers/Admin/Profile/ProfileInfo';
import type { Profile as User } from '@/types';

const Profile = ({ auth, social }: User) => {
  const bgProfile = useColorModeValue(
    'hsla(0,0%,100%,.8)',
    'linear-gradient(112.83deg, rgba(2,6,23,0.95) 0%, rgba(0, 4, 15, 0) 110.84%)'
  );
  return (
    <>
      <Header
        backgroundProfile={bgProfile}
        avatarImage={avatar}
        name={auth?.user?.name}
        email={auth.user?.email}
      />
      <Grid templateColumns={{ sm: '1fr', xl: 'repeat(3, 1fr)' }} gap="22px">
        <ProfileInfo
          title={'Profile Information'}
          social={social}
          name={auth.user?.name}
          email={auth.user?.email}
        />
        <ApiForm />
        <ApiDialog />
      </Grid>
      <AppHead />
    </>
  );
};

// eslint-disable-next-line react/no-children-prop
Profile.layout = (page: string) => <AdminLayout children={page} />;
export default Profile;
