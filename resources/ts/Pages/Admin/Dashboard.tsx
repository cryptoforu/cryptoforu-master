import AppHead from '@/Components/AppHead';
import AdminLayout from '@/Layouts/AdminLayout';
const Dashboard = () => {
  return (
    <>
      <AppHead />
    </>
  );
};

Dashboard.layout = (page: string) => <AdminLayout children={page} />;
export default Dashboard;
