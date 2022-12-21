import { AppProps } from 'next/app';
import { BaseOptionChartStyle } from 'packages/dashboard/components/chart/BaseChartStyle';
import { wrapper } from 'packages/dashboard/store';
import ThemeProvider from '../theme/';
import './styles.css';

function App({
  Component,
  pageProps
}: AppProps) {
  return (
    <ThemeProvider>
      <BaseOptionChartStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default wrapper.withRedux(App);
