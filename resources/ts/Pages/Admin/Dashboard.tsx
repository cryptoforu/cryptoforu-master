import AppHead from '@/Components/AppHead';
import AdminLayout from '@/Layouts/AdminLayout';

const Dashboard = () => {
  return (
    <>
      <AppHead />
    </>
  );
};

// eslint-disable-next-line react/no-children-prop
Dashboard.layout = (page: string) => <AdminLayout children={page} />;
export default Dashboard;
