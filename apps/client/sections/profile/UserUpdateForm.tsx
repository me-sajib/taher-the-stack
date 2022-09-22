import { User } from '@prisma/client';
import { useSelector } from 'react-redux';
import { getUser } from 'store/userSlice';

// form
import FormProvider from 'components/hook-form/FormProvider';
import RHFTextField from 'components/hook-form/RHFTextFiled';

// @mui
import { LoadingButton } from '@mui/lab';
import { CircularProgress, Stack } from '@mui/material';
// form
import { useForm } from 'react-hook-form';

import axios from 'axios';
import Iconify from 'components/Iconify';
import validator from 'validator';

interface ProfileDataTypes {
  fullname: string;
  username: string;
  email: string;
}

export default function UserUpdateFrom({
  children,
}: {
  children: JSX.Element;
}) {
  const profile: User = useSelector(getUser);

  const userInfoDefaultValues: ProfileDataTypes = {
    fullname: profile.fullname,
    username: profile.username,
    email: profile.email,
  };

  const method = useForm({ defaultValues: userInfoDefaultValues });

  const {
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting, isSubmitSuccessful },
  } = method;

  const submitHandler = async (formData: ProfileDataTypes) => {
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

    const { data } = await axios.patch('/api/user/update', filteredData);

    switch (data.status) {
      case 403: {
        if (data.messages)
          return data.messages.forEach((errorMessage) => {
            const [propName] = errorMessage.split(/\s/);

            setError(propName, {
              message: errorMessage,
            });
          });
      }
      // eslint-disable-next-line no-fallthrough
      case 400: {
        setError(data.message.split(/\s/).at(0), {
          message: data.message,
        });
      }
    }
    reset(data);
  };

  return (
    <FormProvider methods={method} onSubmit={handleSubmit(submitHandler)}>
      <Stack spacing={3} direction="row">
        <RHFTextField
          variant="filled"
          name="fullname"
          type="text"
          label="Full name"
          rules={validator.fullname}
        />
        <RHFTextField
          variant="filled"
          type="email"
          name="email"
          label="Email"
          rules={validator.email}
        />
        <RHFTextField
          variant="filled"
          name="username"
          type="text"
          label="username"
          rules={validator.username}
        />
      </Stack>

      <LoadingButton
        size="medium"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        loadingIndicator={<CircularProgress color="inherit" size={16} />}
        startIcon={isSubmitSuccessful && <Iconify icon="ic:round-done" />}
        sx={{ my: 5, mr: 3 }}
      >
        Update
      </LoadingButton>
      {children}
    </FormProvider>
  );
}
