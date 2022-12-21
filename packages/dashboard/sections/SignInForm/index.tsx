// form

// @mui
import { Stack } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import FormProvider from 'packages/dashboard/components/hook-form/FormProvider';
import RHFCheckbox from 'packages/dashboard/components/hook-form/RHFCheckBox';
import RHFPasswordField from 'packages/dashboard/components/hook-form/RHFPasswordField';
import RHFTextField from 'packages/dashboard/components/hook-form/RHFTextFiled';
// form
import { useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

const Button = ({
  text,
  clickHandler,
  classes = '',
  icon = null,
  variant = 'blue',
  ...props
}) => {
  const variants = {
    blue: 'text-blue-600 hover:text-blue-900 hover:border-blue-900 ring-blue-100',
    red: 'text-red-600 hover:text-red-900 hover:border-red-900 ring-red-100',
    green:
      'text-green-600 hover:text-green-900 hover:border-green-900 ring-green-100'
  };
  return (
    <button
      type="button"
      onClick={clickHandler}
      className={twMerge(
        `px-2 py-1 inline-block rounded border text-sm font-medium text-black hover:bg-transparent focus:outline-none focus:ring ${
          variants[variant] ?? ''
        } ${classes}`.trim()
      )}
      {...props}
    >
      {icon}
      {text}
    </button>
  );
};

const Input = () => (
  <label
    htmlFor="UserEmail"
    className="relative block overflow-hidden rounded-md border border-gray-200 px-3 pt-3 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
  >
    <input
      type="email"
      id="UserEmail"
      placeholder="Email"
      className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
    />

    <span className="absolute left-3 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
      Email
    </span>
  </label>
);

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
      </Stack>

      {/* <LoadingButton
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Sign in
      </LoadingButton> */}
      <Button
        text={'Signup'}
        classes="text-xl"
        clickHandler={null}
      />
      <Input />
    </FormProvider>
  );
};

export default SignInForm;
