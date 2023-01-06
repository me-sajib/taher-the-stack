// form
import FormProvider from 'packages/proxy-dashboard/components/hook-form/FormProvider';
// import RHFPasswordField from 'packages/dashboard/components/hook-form/RHFPasswordField';
// form
import { useForm } from 'react-hook-form';

import axios from 'axios';
import clsx from 'clsx';
import { Button } from 'packages/proxy-dashboard/components';
import RHFPasswordField from 'packages/proxy-dashboard/components/hook-form/RHFPasswordField';
import validator from 'packages/proxy-dashboard/validator';

interface ChangePasswordTypes {
  currentPassword: string;
  newPassword: string;
  reenterPassword: string;
}

export default function ChangePasswordForm() {
  const changePassDefaultValue: ChangePasswordTypes = {
    currentPassword: '',
    newPassword: '',
    reenterPassword: ''
  };

  const method = useForm({
    defaultValues: changePassDefaultValue
  });

  const {
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting }
  } = method;

  const submitHandler = async (formData: ChangePasswordTypes) => {
    if (formData.newPassword !== formData.reenterPassword) {
      const message = 'Password are not same';
      setError('newPassword', {
        message
      });
      setError('reenterPassword', { message }, { shouldFocus: true });
      return;
    }

    const { data } = await axios.patch('/api/user/password-reset', {
      newPassword: formData.newPassword,
      currentPassword: formData.currentPassword
    });

    if (data.status === 403) {
      return setError('currentPassword', {
        message: data.message
      });
    }

    reset();
  };

  return (
    <FormProvider
      methods={method}
      onSubmit={handleSubmit(submitHandler)}
    >
      <div className="flex gap-3">
        <RHFPasswordField
          name="currentPassword"
          placeholder="Current password"
          rules={validator.password}
        />
        <RHFPasswordField
          name="newPassword"
          placeholder="New password"
          rules={validator.password}
        />
        <RHFPasswordField
          name="reenterPassword"
          placeholder="Confirm password"
          rules={validator.password}
        />
      </div>

      <Button
        type="submit"
        text="Change"
        classes={clsx('mt-3', {
          'btn-loading': isSubmitting
        })}
      />
    </FormProvider>
  );
}
