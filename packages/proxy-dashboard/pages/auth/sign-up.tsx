import Auth from 'packages/proxy-dashboard/layouts/auth/Auth';
import SignUpForm from 'packages/proxy-dashboard/sections/SignUpForm';

export default function SignUpPage() {
  return (
    <Auth
      title="Sign up"
      sideTitle="Manage proxies more effectively with zero hassle"
      redirect={{
        path: 'sign-in',
        title: 'Already have an account?',
        placeholder: 'Sign in'
      }}
      form={{
        title: 'Get started absolutely free.',
        subTitle: 'Free forever. No credit card needed.'
      }}
    >
      <SignUpForm />
    </Auth>
  );
}
