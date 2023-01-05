// form

// @mui
import axios from 'axios';
import { useRouter } from 'next/router';
import FormProvider from 'packages/dashboard/components/hook-form/FormProvider';
import RHFCheckbox from 'packages/dashboard/components/hook-form/RHFCheckBox';
import RHFTextField from 'packages/dashboard/components/hook-form/RHFTextFiled';
// form
import { Button } from 'packages/dashboard/components';
import RHFPasswordField from 'packages/dashboard/components/hook-form/RHFPasswordField';
import { useForm } from 'react-hook-form';
interface SignInFormTypes {
  identifier: string;
  password: string;
  remember: boolean;
}

const SignInForm = () => {
  const router = useRouter();
  const defaultValues: SignInFormTypes = {
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

  const onSubmit = async (formData: SignInFormTypes) => {
    const { data: res } = await axios.post(
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

    res.status === 202 && router.push('/proxy-list');
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <RHFTextField
          classes="mb-3"
          name="identifier"
          placeholder="Email or username"
        />
        <RHFPasswordField
          classes="mb-3"
          name="password"
          placeholder="Password"
        />
        <RHFCheckbox name="remember" label="Remember me" />
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

export default SignInForm;
