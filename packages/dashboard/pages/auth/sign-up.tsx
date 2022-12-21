import { Typography } from '@mui/material';
import Auth from 'packages/dashboard/layouts/auth/Auth';
import SignUpForm from 'packages/dashboard/sections/SignUpForm';

export default function SignUpPage() {
  return (
    <Auth
      title="Sign up"
      sideTitle="Manage proxies more effectively with zero hassle"
      redirect={{
        path: 'sign-in',
        title:
          'Already have an account?',
        placeholder: 'Sign in'
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
      >
        Get started absolutely free.
      </Typography>

      <Typography
        sx={{
          color: 'text.secondary',
          mb: 5
        }}
      >
        Free forever. No credit card
        needed.
      </Typography>

      <SignUpForm />
    </Auth>
  );
}
