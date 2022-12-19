import { BaseOptionChartStyle } from 'components/chart/BaseChartStyle';
import { AppProps } from 'next/app';
import { wrapper } from 'store';
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
