// @mui
import { Box, Button, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import { useRouter } from 'next/router';
import Page from 'packages/proxy-dashboard/components/Page';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Page404() {
  const router = useRouter();

  return (
    <Page title="404 Page Not Found">
      <Container>
        <ContentStyle
          sx={{
            textAlign: 'center',
            alignItems: 'center'
          }}
        >
          <Typography variant="h3" paragraph>
            Sorry, page not found!
          </Typography>

          <Typography
            sx={{
              color: 'text.secondary'
            }}
          >
            Sorry, we couldn’t find the page you’re looking for.
            Perhaps you’ve mistyped the URL? Be sure to check your
            spelling.
          </Typography>

          <Box
            component="img"
            src="/illustrations/illustration_404.svg"
            sx={{
              height: 260,
              mx: 'auto',
              my: { xs: 5, sm: 10 }
            }}
          />

          <Button
            size="large"
            variant="contained"
            onClick={() => router.push('/')}
          >
            Go to Home
          </Button>
        </ContentStyle>
      </Container>
    </Page>
  );
}
