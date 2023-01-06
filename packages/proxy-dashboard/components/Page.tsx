import Head from 'next/head';

interface PageTypes {
  children: JSX.Element | JSX.Element[];
  title: string;
}

const Page = ({ children, title }: PageTypes) => (
  <>
    <Head>
      <title>{`${title} | Proxy Manager`}</title>
    </Head>

    {children}
  </>
);

export default Page;
