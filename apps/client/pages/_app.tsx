import { BaseOptionChartStyle } from '@components/chart/BaseChartStyle';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { wrapper } from 'store';
import ThemeProvider from '../theme/';
import DashboardLayout from './dashboard';
import './styles.css';

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // router.push('/dashboard');
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <ThemeProvider>
        <BaseOptionChartStyle />
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      </ThemeProvider>
    </>
  );
}

export default wrapper.withRedux(App);
