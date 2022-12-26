// form
import FormProvider from 'packages/dashboard/components/hook-form/FormProvider';
import RHFCheckbox from 'packages/dashboard/components/hook-form/RHFCheckBox';
import RHFTextField from 'packages/dashboard/components/hook-form/RHFTextFiled';
// @mui
// form
import { useForm } from 'react-hook-form';

import axios from 'axios';
import { useRouter } from 'next/router';
import { Button } from 'packages/dashboard/components';
import validator from 'packages/dashboard/validator';

interface SignUpFormTypes {
  fullname: string;
  username: string;
  email: string;
  password: string;
  remember: boolean;
}

const SignUpForm = () => {
  const router = useRouter();
  const defaultValues: SignUpFormTypes =
    {
      fullname: '',
      username: '',
      email: '',
      password: '',
      remember: false
    };

  const methods = useForm({
    defaultValues
  });
  const {
    handleSubmit,
    setError,
    formState: { isSubmitting }
  } = methods;

  const onSubmit = async (
    formData: SignUpFormTypes
  ) => {
    try {
      const { data } = await axios.post(
        '/api/auth/sign-up',
        formData
      );

      if (data.status === 400) {
        if (data.messages) {
          return data.messages.forEach(
            (message: string) =>
              setError(
                message
                  .split(/\s/)
                  .at(
                    0
                  ) as keyof SignUpFormTypes,
                {
                  message
                }
              )
          );
        }
        return setError(
          data.message
            .split(/\s/)
            .at(0),
          {
            message: data.message
          }
        );
      }

      data.status === 202 &&
        router.push('/proxy-list');
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return (
    <FormProvider
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-4">
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
        <RHFTextField
          name="password"
          type="password"
          placeholder="Password"
          rules={validator.password}
        />
        <RHFCheckbox
          name="remember"
          label="Remember me"
        />
      </div>

      <Button
        type="submit"
        text="Sign in"
        conditionClasses={{
          'btn-loading': isSubmitting
        }}
      />
    </FormProvider>
  );
};

export default SignUpForm;
