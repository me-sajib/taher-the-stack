// form
import FormProvider from 'components/hook-form/FormProvider';
import RHFCheckbox from 'components/hook-form/RHFCheckBox';
import RHFTextField from 'components/hook-form/RHFTextFiled';
// @mui
import { LoadingButton } from '@mui/lab';
import {
  Link,
  Stack
} from '@mui/material';
// form
import { useForm } from 'react-hook-form';

import axios from 'axios';
import RHFPasswordField from 'components/hook-form/RHFPasswordField';
import { useRouter } from 'next/router';

interface SignInFormTypes {
  identifier: string;
  password: string;
  remember: boolean;
}

const SignInForm = () => {
  const router = useRouter();
  const defaultValues: SignInFormTypes =
    {
      identifier: '',
      password: '',
      remember: true
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
    formData: SignInFormTypes
  ) => {
    const { data: res } =
      await axios.post(
        '/api/auth/sign-in',
        formData
      );

    if (res.status === 403) {
      setError('identifier', {
        message: res.message
      });
      setError('password', {
        message: res.message
      });
    }

    res.status === 202 &&
      router.push('/proxy-list');
  };

  return (
    <FormProvider
      methods={methods}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack spacing={3}>
        <RHFTextField
          name="identifier"
          label="Email or username"
        />

        <RHFPasswordField />
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
        <Link
          variant="subtitle2"
          underline="hover"
        >
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
