import { User } from '@prisma/client';
import {
  cleanUserErrors,
  getUser,
  getUserErrors
} from 'packages/proxy-dashboard/store/userSlice';
import { useDispatch, useSelector } from 'react-redux';

// form
import FormProvider from 'packages/proxy-dashboard/components/hook-form/FormProvider';
import RHFTextField from 'packages/proxy-dashboard/components/hook-form/RHFTextFiled';

// @mui
import { Button } from '../../components';
// form
import { useForm } from 'react-hook-form';

import clsx from 'clsx';
import { AppThunkDispatch } from 'packages/proxy-dashboard/store';
import { editUser } from 'packages/proxy-dashboard/store/thunks';
import validator from 'packages/proxy-dashboard/validator';
import { useEffect } from 'react';

interface ProfileDataTypes {
  fullname: string;
  username: string;
  email: string;
}

export default function UserUpdateFrom() {
  const profile: User = useSelector(getUser);
  const userErrors = useSelector(getUserErrors);
  const asyncDispatch = useDispatch<AppThunkDispatch>();
  const syncDispatch = useDispatch();

  const userInfoDefaultValues: ProfileDataTypes = {
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
    formState: { isSubmitting }
  } = method;

  useEffect(() => {
    userErrors.forEach((error) => {
      console.log({ userError: error });
      const [propName] = error.message.split(/\s/);

      setError(propName as keyof ProfileDataTypes, {
        message: error.message
      });
    });
  }, [userErrors.length]);

  const submitHandler = async (formData: ProfileDataTypes) => {
    syncDispatch(cleanUserErrors());

    const updatedData = {
      username: formData.username,
      fullname: formData.fullname,
      email: formData.email
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

    asyncDispatch(editUser(filteredData));
    reset(filteredData);
  };

  return (
    <FormProvider
      methods={method}
      onSubmit={handleSubmit(submitHandler)}
    >
      <div className="flex gap-3">
        <RHFTextField
          name="fullname"
          type="text"
          placeholder="Full name"
          rules={validator.fullname}
        />
        <RHFTextField
          type="email"
          name="email"
          placeholder="Email"
          rules={validator.email}
        />
        <RHFTextField
          name="username"
          type="text"
          placeholder="username"
          rules={validator.username}
        />
      </div>

      <Button
        type="submit"
        text="Update"
        classes={clsx('mt-3', {
          'btn-loading': isSubmitting
        })}
      />
    </FormProvider>
  );
}
