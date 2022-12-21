import ProxyList from 'packages/dashboard/components/ProxyList';
import DashboardLayout from 'packages/dashboard/layouts/dashboard';

export default function index() {
  return (
    <DashboardLayout>
      <ProxyList />
    </DashboardLayout>
  );
}
