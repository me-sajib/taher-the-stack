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
import { useRouter } from 'next/router';
import RHFPasswordField from 'components/RHFPasswordField';

interface SignUpFormTypes {
  fullname: string;
  username: string;
  email: string;
  password: string;
}

const SignUpForm = () => {
  const router = useRouter();
  const defaultValues: SignUpFormTypes = {
    fullname: '',
    username: '',
    email: '',
    password: '',
  };

  const methods = useForm({ defaultValues });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (formData: SignUpFormTypes) => {
    try {
      await axios.post('/api/auth/sign-up', formData);
      router.push('/proxy-list');
    } catch (e) {
      console.log(e.message);
      return null;
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="fullname" type="text" label="Full name" />
        <RHFTextField type="email" name="email" label="Email" />
        <RHFTextField name="username" type="text" label="username" />

        <RHFPasswordField />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <RHFCheckbox name="remember" label="Remember me" />
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
