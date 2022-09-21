// form
import FormProvider from 'components/hook-form/FormProvider';
import RHFPasswordField from 'components/hook-form/RHFPasswordField';

// @mui
import { LoadingButton } from '@mui/lab';
import { CircularProgress, Stack } from '@mui/material';
// form
import { useForm } from 'react-hook-form';

import axios from 'axios';
import Iconify from 'components/Iconify';
import validator from 'validator';

interface ChangePasswordTypes {
  currentPassword: string;
  newPassword: string;
  reenterPassword: string;
}

export default function ChangePasswordForm({
  children,
}: {
  children: JSX.Element;
}) {
  const changePassDefaultValue: ChangePasswordTypes = {
    currentPassword: '',
    newPassword: '',
    reenterPassword: '',
  };

  const method = useForm({ defaultValues: changePassDefaultValue });

  const {
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting, isSubmitSuccessful },
  } = method;

  const submitHandler = async (formData: ChangePasswordTypes) => {
    if (formData.newPassword !== formData.reenterPassword) {
      const message = 'Password are not same';
      setError('newPassword', { message });
      setError('reenterPassword', { message }, { shouldFocus: true });
      return;
    }

    const { data } = await axios.patch('/api/user/password-reset', {
      newPassword: formData.newPassword,
      currentPassword: formData.currentPassword,
    });

    if (data.status === 403) {
      return setError('currentPassword', {
        message: data.message,
      });
    }

    reset();
  };

  return (
    <FormProvider methods={method} onSubmit={handleSubmit(submitHandler)}>
      <Stack spacing={2} direction="row">
        <RHFPasswordField
          name="currentPassword"
          label="Current password"
          variant="filled"
          rules={{
            required: "Current password can't be empty",
          }}
        />
        <RHFPasswordField
          name="newPassword"
          label="New password"
          variant="filled"
          rules={validator.password}
        />
        <RHFPasswordField
          name="reenterPassword"
          label="Re-enter password"
          variant="filled"
          rules={validator.password}
        />
      </Stack>

      <LoadingButton
        size="medium"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        startIcon={isSubmitSuccessful && <Iconify icon="ic:round-done" />}
        loadingIndicator={<CircularProgress color="inherit" size={16} />}
        sx={{ my: 5, mr: 3 }}
      >
        Change
      </LoadingButton>
      {children}
    </FormProvider>
  );
}
