import ProxyList from '@components/ProxyList';
import DashboardLayout from '@layouts/dashboard';

export default function index() {
  return (
    <DashboardLayout>
      <ProxyList />
    </DashboardLayout>
  );
}
