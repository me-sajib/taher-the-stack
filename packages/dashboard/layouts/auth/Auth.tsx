// @mui
import {
  Card,
  Container,
  Link,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
// hooks
import useResponsive from 'packages/dashboard/hooks/useResponsive';
// components
import { useRouter } from 'next/router';
import Page from 'packages/dashboard/components/Page';
// sections

// ----------------------------------------------------------------------

const RootStyle = styled('div')(
  ({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  })
);

const HeaderStyle = styled('header')(
  ({ theme }) => ({
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
      padding: theme.spacing(7, 5, 0, 7)
    }
  })
);

const SectionStyle = styled(Card)(
  ({ theme }) => ({
    width: '100%',
    maxWidth: 464,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(2, 0, 2, 2)
  })
);

const ContentStyle = styled('div')(
  ({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0)
  })
);

const LinkStyle = styled('span')(
  () => ({
    cursor: 'pointer'
  })
);

// ----------------------------------------------------------------------

interface AuthPropTypes {
  title: string;
  redirect: {
    path: string;
    title: string;
    placeholder: string;
  };
  sideTitle: string;
  children: JSX.Element[];
}

export default function Index({
  title,
  redirect,
  sideTitle,
  children
}: AuthPropTypes) {
  const router = useRouter();
  const smUp = useResponsive(
    'up',
    'sm'
  );
  const mdUp = useResponsive(
    'up',
    'md'
  );

  const redirectHandler = () => {
    router.push(redirect.path);
  };

  return (
    <Page title={title}>
      <RootStyle>
        <HeaderStyle>
          {smUp && (
            <Typography
              variant="body2"
              sx={{ mt: { md: -2 } }}
            >
              {redirect.title} {''}
              <LinkStyle>
                <Link
                  variant="subtitle2"
                  onClick={
                    redirectHandler
                  }
                >
                  {redirect.placeholder}
                </Link>
              </LinkStyle>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography
              variant="h3"
              sx={{
                px: 5,
                mt: 10,
                mb: 5
              }}
            >
              {sideTitle}
            </Typography>
          </SectionStyle>
        )}

        <Container>
          <ContentStyle>
            {children}

            {!smUp && (
              <Typography
                variant="body2"
                sx={{
                  mt: 3,
                  textAlign: 'center'
                }}
              >
                {redirect.title} {''}
                <LinkStyle>
                  <Link
                    variant="subtitle2"
                    onClick={
                      redirectHandler
                    }
                  >
                    {
                      redirect.placeholder
                    }
                  </Link>
                </LinkStyle>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
