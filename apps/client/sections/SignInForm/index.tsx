// form
import FormProvider from '@components/hook-form/FormProvider';
import RHFCheckbox from '@components/hook-form/RHFCheckBox';
import RHFTextField from '@components/hook-form/RHFTextFiled';
import Iconify from '@components/Iconify';
// @mui
import { LoadingButton } from '@mui/lab';
import { IconButton, InputAdornment, Link, Stack } from '@mui/material';
// react
import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';

import axios from 'axios';
import { useRouter } from 'next/router';
interface SignInFormTypes {
  email: string;
  password: string;
  remember: boolean;
}

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const defaultValues: SignInFormTypes = {
    email: '',
    password: '',
    remember: true,
  };
  const toggleShowPassword = () => setShowPassword(!showPassword);

  const methods = useForm({ defaultValues });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async ({ email, password }: SignInFormTypes) => {
    const { data: jwtToken } = await axios.post(
      'http://localhost:3333/api/auth/sign-in',
      {
        email,
        password,
      }
    );

    if (jwtToken.name) {
      return null;
    }

    localStorage.setItem('proxy-manager-token', jwtToken.access_token);

    router.push('/proxy-list');
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email or username" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={toggleShowPassword} edge="end">
                  <Iconify
                    icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <RHFCheckbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Sign in
      </LoadingButton>
    </FormProvider>
  );
};

export default SignInForm;
