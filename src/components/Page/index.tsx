import Head from 'next/head';
import NavBar from '~components/NavBar';
import type { FC } from 'react';

const Page: FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>Minurl | Minimal URL minifier</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💎</text></svg>"
        />
      </Head>
      <div className="flex flex-col px-4 mx-auto min-h-screen max-w-screen-sm">
        <NavBar />
        {children}
      </div>
    </>
  );
};

export default Page;
