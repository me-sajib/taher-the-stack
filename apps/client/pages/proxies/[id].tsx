import Proxies from '@components/Proxies';
import DashboardLayout from '@layouts/dashboard';
import { useRouter } from 'next/router';

export default function Proxy() {
  const router = useRouter();

  return (
    <DashboardLayout>
      <Proxies id={router.query.id} />
    </DashboardLayout>
  );
}
