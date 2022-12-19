// form
import FormProvider from 'components/hook-form/FormProvider';
import RHFCheckbox from 'components/hook-form/RHFCheckBox';
import RHFTextField from 'components/hook-form/RHFTextFiled';
// @mui
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/material';
// form
import { useForm } from 'react-hook-form';

import axios from 'axios';
import RHFPasswordField from 'components/hook-form/RHFPasswordField';
import { useRouter } from 'next/router';
import validator from 'validator';

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
      <Stack spacing={3}>
        <RHFTextField
          name="fullname"
          type="text"
          label="Full name"
          rules={validator.fullname}
        />
        <RHFTextField
          type="email"
          name="email"
          label="Email"
          rules={validator.email}
        />
        <RHFTextField
          name="username"
          type="text"
          label="username"
          rules={validator.username}
        />

        <RHFPasswordField
          rules={validator.password}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <RHFCheckbox
          name="remember"
          label="Remember me"
        />
      </Stack>

      <LoadingButton
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Sign up
      </LoadingButton>
    </FormProvider>
  );
};

export default SignUpForm;
