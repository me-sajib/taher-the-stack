import { User } from '@prisma/client';
import Page from 'packages/proxy-dashboard/components/Page';
import DashboardLayout from 'packages/proxy-dashboard/layouts/dashboard';
import { getUser } from 'packages/proxy-dashboard/store/userSlice';
import { useSelector } from 'react-redux';
// React
import ChangePasswordForm from 'packages/proxy-dashboard/sections/profile/ChangePasswordForm';
import UserUpdateFrom from 'packages/proxy-dashboard/sections/profile/UserUpdateForm';
import { Container } from '../components';

export default function Profile() {
  const profile: User = useSelector(getUser);

  return (
    <DashboardLayout>
      {profile && (
        <Page title={profile.username}>
          <Container>
            <h2 className="text-black text-2xl pb-2 font-semibold border-b-2 mb-4">
              Update Profile Info
            </h2>
            <UserUpdateFrom />

            <h2 className="text-black text-2xl mt-10 pb-2 font-semibold border-b-2 mb-4">
              Change Password
            </h2>
            <ChangePasswordForm />
          </Container>
        </Page>
      )}
    </DashboardLayout>
  );
}
