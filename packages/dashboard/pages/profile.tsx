import { Container } from '@mui/system';
import { User } from '@prisma/client';
import Page from 'packages/dashboard/components/Page';
import DashboardLayout from 'packages/dashboard/layouts/dashboard';
import { getUser } from 'packages/dashboard/store/userSlice';
import { useSelector } from 'react-redux';
// React
import ChangePasswordForm from 'packages/dashboard/sections/profile/ChangePasswordForm';
import UserUpdateFrom from 'packages/dashboard/sections/profile/UserUpdateForm';
import { useState } from 'react';
// redux
import {
  FormControlLabel,
  Switch
} from '@mui/material';

export default function Profile() {
  const profile: User =
    useSelector(getUser);
  const [
    updatePassSwitch,
    setPasswordStatus
  ] = useState(false);

  const togglePassStatus = () =>
    setPasswordStatus((prev) => !prev);

  const ChangeUpdateSwitch = (
    <FormControlLabel
      label="Change password"
      control={
        <Switch
          checked={updatePassSwitch}
          onChange={togglePassStatus}
        />
      }
    />
  );

  return (
    <DashboardLayout>
      {profile && (
        <Page title={profile.username}>
          <Container>
            {updatePassSwitch ? (
              <ChangePasswordForm>
                {ChangeUpdateSwitch}
              </ChangePasswordForm>
            ) : (
              <UserUpdateFrom>
                {ChangeUpdateSwitch}
              </UserUpdateFrom>
            )}
          </Container>
        </Page>
      )}
    </DashboardLayout>
  );
}
