import { Typography } from '@mui/material';
import React from 'react';
import Auth from '../../layouts/auth/Auth';
import SignInForm from '../../sections/SignInForm';

export default function SingInPage() {
  return (
    <Auth
      title="Sign in"
      sideTitle="Hi, welcome back"
      redirect={{
        path: 'sign-up',
        title: "Don't have an account?",
        placeholder: 'Sign up',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Sign in
      </Typography>

      <Typography sx={{ color: 'text.secondary', mb: 5 }}>
        Enter your details below.
      </Typography>

      <SignInForm />
    </Auth>
  );
}
