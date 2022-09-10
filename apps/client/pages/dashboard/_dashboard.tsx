import { AppProps } from 'next/app';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <main className="app-dashboard">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
