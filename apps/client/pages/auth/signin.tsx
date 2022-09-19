// @mui
import { Card, Container, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// hooks
import useResponsive from 'hooks/useResponsive';
// components
import Page from 'components/Page';
import { useRouter } from 'next/router';
// sections
import SignInForm from 'sections/SignInForm';

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

const LinkStyle = styled('a')(() => ({
  cursor: 'pointer',
}));

const Index = () => {
  const router = useRouter();
  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  const signUpHandler = () => {
    router.push('/auth/signup');
  };

  return (
    <Page title="Sign in">
      <RootStyle>
        <HeaderStyle>
          {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              Don’t have an account? {''}
              <LinkStyle>
                <Link variant="subtitle2" onClick={signUpHandler}>
                  Get started
                </Link>
              </LinkStyle>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
          </SectionStyle>
        )}

        <Container maxWidth="sm">
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Sign in
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 5 }}>
              Enter your details below.
            </Typography>

            <SignInForm />

            {!smUp && (
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don’t have an account?{' '}
                <LinkStyle>
                  <Link variant="subtitle2" onClick={signUpHandler}>
                    Get started
                  </Link>
                </LinkStyle>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
};

export default Index;
