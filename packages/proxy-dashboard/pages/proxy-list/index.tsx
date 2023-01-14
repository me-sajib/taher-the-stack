import ProxyList from 'packages/proxy-dashboard/components/ProxyList';
import DashboardLayout from 'packages/proxy-dashboard/layouts/dashboard';

export default function index() {
  return (
    <DashboardLayout>
      <ProxyList />
    </DashboardLayout>
  );
}
