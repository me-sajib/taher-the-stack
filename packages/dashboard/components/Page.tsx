import { Box } from '@mui/material';
import Head from 'next/head';
import { forwardRef, RefObject } from 'react';

interface PageTypes {
  children: JSX.Element;
  title: string;
}

const Page = (
  { children, title }: PageTypes,
  ref: RefObject<HTMLDivElement>
) => (
  <>
    <Head>
      <title>{`${title} | Proxy Manager`}</title>
    </Head>

    <Box ref={ref}>{children}</Box>
  </>
);

export default forwardRef(Page);
