import { AppProps } from 'next/app';
import Head from 'next/head';
import { wrapper } from 'packages/dashboard/store';
import ThemeProvider from '../theme/';
import './styles.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/rippleui/dist/css/styles.css"
        />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default wrapper.withRedux(App);
