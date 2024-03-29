import Auth from 'packages/proxy-dashboard/layouts/auth/Auth';
import SignInForm from 'packages/proxy-dashboard/sections/SignInForm';

export default function SingInPage() {
  return (
    <Auth
      title="Sign in"
      sideTitle="Hi, welcome back"
      redirect={{
        path: 'sign-up',
        title: "Don't have an account?",
        placeholder: 'Sign up'
      }}
      form={{
        title: 'Sign in',
        subTitle: 'Enter your credentials below.'
      }}
    >
      <SignInForm />
    </Auth>
  );
}
