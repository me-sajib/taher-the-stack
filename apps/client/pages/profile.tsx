import { Container } from '@mui/system';
import { User } from '@prisma/client';
import Page from 'components/Page';
import DashboardLayout from 'layouts/dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from 'store/userSlice';
// React
import { useEffect, useState } from 'react';
import ChangePasswordForm from 'sections/profile/ChangePasswordForm';
import UserUpdateFrom from 'sections/profile/UserUpdateForm';
// redux
import { FormControlLabel, Switch } from '@mui/material';
import { AppThunkDispatch } from 'store';
import { fetchUserProfile } from 'store/thunks';

export default function Profile() {
  const profile: User = useSelector(getProfile);
  const asyncDispatch = useDispatch<AppThunkDispatch>();
  const [updatePassSwitch, setPasswordStatus] = useState(false);

  useEffect(() => {
    asyncDispatch(fetchUserProfile());
  }, [asyncDispatch, updatePassSwitch]);

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
      <Page title={profile.username}>
        <Container>
          {updatePassSwitch ? (
            <ChangePasswordForm>{ChangeUpdateSwitch}</ChangePasswordForm>
          ) : (
            <UserUpdateFrom>{ChangeUpdateSwitch}</UserUpdateFrom>
          )}
        </Container>
      </Page>
    </DashboardLayout>
  );
}
