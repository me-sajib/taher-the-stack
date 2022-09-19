import { Container } from '@mui/system';
import { User } from '@prisma/client';
import Page from 'components/Page';
import DashboardLayout from 'layouts/dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from 'store/userSlice';

// form
import FormProvider from 'components/hook-form/FormProvider';
import RHFPasswordField from 'components/hook-form/RHFPasswordField';
import RHFTextField from 'components/hook-form/RHFTextFiled';

// @mui
import { LoadingButton } from '@mui/lab';
import { FormControlLabel, Stack, Switch } from '@mui/material';
// form
import { useForm } from 'react-hook-form';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { AppThunkDispatch } from 'store';
import { fetchUserProfile } from 'store/thunks';
interface ProfileDataTypes {
  fullname: string;
  username: string;
  email: string;
  currentPassword: string;
  newPassWord: string;
  reenterPassword: string;
}

export default function Profile() {
  const profile: User = useSelector(getProfile);
  const asyncDispatch = useDispatch<AppThunkDispatch>();
  const [isUpdatePassword, setPasswordStatus] = useState(false);

  useEffect(() => {
    asyncDispatch(fetchUserProfile());
  }, [asyncDispatch]);

  const defaultValues: ProfileDataTypes = {
    fullname: profile.fullname,
    username: profile.username,
    email: profile.email,
    currentPassword: '',
    newPassWord: '',
    reenterPassword: '',
  };
  const methods = useForm({ defaultValues });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const togglePassStatus = () => setPasswordStatus((prev) => !prev);

  const onSubmit = async (formData: ProfileDataTypes) => {
    try {
      const updatedData = {
        username: formData.username,
        fullname: formData.fullname,
        email: formData.email,
      };

      const filteredData = Object.entries(updatedData).reduce(
        (acc, [key, value]) => {
          if (profile[key] !== value) {
            acc[key] = value;
          }
          return acc;
        },
        {}
      );

      await axios.patch('/api/user/update', filteredData);
    } catch (e) {
      console.log(e.message);
      return null;
    }
  };

  return (
    <DashboardLayout>
      <Page title={profile.username}>
        <Container>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} direction="row">
              <RHFTextField
                variant="filled"
                name="fullname"
                type="text"
                label="Full name"
              />
              <RHFTextField
                variant="filled"
                type="email"
                name="email"
                label="Email"
              />
              <RHFTextField
                variant="filled"
                name="username"
                type="text"
                label="username"
              />
            </Stack>

            {isUpdatePassword && (
              <Stack spacing={2} sx={{ mt: 5 }} direction="row">
                <RHFPasswordField
                  name="currentPassword"
                  label="Current password"
                  variant="filled"
                />
                <RHFPasswordField
                  name="newPassword"
                  label="New password"
                  variant="filled"
                />
                <RHFPasswordField
                  name="reenterPassword"
                  label="Re-enter password"
                  variant="filled"
                />
              </Stack>
            )}

            <LoadingButton
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{ my: 5, mr: 3 }}
            >
              Update
            </LoadingButton>

            <FormControlLabel
              label="Change password"
              control={
                <Switch
                  checked={isUpdatePassword}
                  onChange={togglePassStatus}
                />
              }
            />
          </FormProvider>
        </Container>
      </Page>
    </DashboardLayout>
  );
}
