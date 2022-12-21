import { User } from '@prisma/client';
import {
  cleanUserErrors,
  getUser,
  getUserErrors
} from 'packages/dashboard/store/userSlice';
import {
  useDispatch,
  useSelector
} from 'react-redux';

// form
import FormProvider from 'packages/dashboard/components/hook-form/FormProvider';
import RHFTextField from 'packages/dashboard/components/hook-form/RHFTextFiled';

// @mui
import { LoadingButton } from '@mui/lab';
import {
  CircularProgress,
  Stack
} from '@mui/material';
// form
import { useForm } from 'react-hook-form';

import Iconify from 'packages/dashboard/components/Iconify';
import { AppThunkDispatch } from 'packages/dashboard/store';
import { editUser } from 'packages/dashboard/store/thunks';
import validator from 'packages/dashboard/validator';
import { useEffect } from 'react';

interface ProfileDataTypes {
  fullname: string;
  username: string;
  email: string;
}

export default function UserUpdateFrom({
  children
}: {
  children: JSX.Element;
}) {
  const profile: User =
    useSelector(getUser);
  const userErrors = useSelector(
    getUserErrors
  );
  const asyncDispatch =
    useDispatch<AppThunkDispatch>();
  const syncDispatch = useDispatch();

  const userInfoDefaultValues: ProfileDataTypes =
    {
      fullname: profile.fullname,
      username: profile.username,
      email: profile.email
    };

  const method = useForm({
    defaultValues: userInfoDefaultValues
  });

  const {
    handleSubmit,
    setError,
    reset,
    formState: {
      isSubmitting,
      isSubmitSuccessful,
      errors
    }
  } = method;

  useEffect(() => {
    userErrors.forEach((error) => {
      console.log({ userError: error });
      const [propName] =
        error.message.split(/\s/);

      setError(
        propName as keyof ProfileDataTypes,
        {
          message: error.message
        }
      );
    });
  }, [userErrors.length]);

  const submitHandler = async (
    formData: ProfileDataTypes
  ) => {
    syncDispatch(cleanUserErrors());

    const updatedData = {
      username: formData.username,
      fullname: formData.fullname,
      email: formData.email
    };

    const filteredData = Object.entries(
      updatedData
    ).reduce((acc, [key, value]) => {
      if (profile[key] !== value) {
        acc[key] = value;
      }
      return acc;
    }, {});

    asyncDispatch(
      editUser(filteredData)
    );
    reset(filteredData);
  };

  return (
    <FormProvider
      methods={method}
      onSubmit={handleSubmit(
        submitHandler
      )}
    >
      <Stack
        spacing={3}
        direction="row"
      >
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
        loadingIndicator={
          <CircularProgress
            color="inherit"
            size={16}
          />
        }
        startIcon={
          isSubmitSuccessful &&
          !Object.keys(errors)
            .length && (
            <Iconify icon="ic:round-done" />
          )
        }
        sx={{ my: 5, mr: 3 }}
      >
        Update
      </LoadingButton>
      {children}
    </FormProvider>
  );
}
