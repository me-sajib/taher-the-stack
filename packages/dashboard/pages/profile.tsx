import { Container } from '@mui/system';
import { User } from '@prisma/client';
import Page from 'components/Page';
import DashboardLayout from 'layouts/dashboard';
import { useSelector } from 'react-redux';
import { getUser } from 'store/userSlice';
// React
import { useState } from 'react';
import ChangePasswordForm from 'sections/profile/ChangePasswordForm';
import UserUpdateFrom from 'sections/profile/UserUpdateForm';
// redux
import { FormControlLabel, Switch } from '@mui/material';

export default function Profile() {
  const profile: User = useSelector(getUser);
  const [updatePassSwitch, setPasswordStatus] = useState(false);

  const togglePassStatus = () => setPasswordStatus((prev) => !prev);

  const ChangeUpdateSwitch = (
    <FormControlLabel
      label="Change password"
      control={
        <Switch checked={updatePassSwitch} onChange={togglePassStatus} />
      }
    />
  );

  return (
    <DashboardLayout>
      {profile && (
        <Page title={profile.username}>
          <Container>
            {updatePassSwitch ? (
              <ChangePasswordForm>{ChangeUpdateSwitch}</ChangePasswordForm>
            ) : (
              <UserUpdateFrom>{ChangeUpdateSwitch}</UserUpdateFrom>
            )}
          </Container>
        </Page>
      )}
    </DashboardLayout>
  );
}
