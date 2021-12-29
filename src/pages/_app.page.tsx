import { ApolloProvider } from '@apollo/client';
import client from '~lib/api/client';
import type { FC } from 'react';
import type { AppProps } from 'next/app';
import '~styles/globals.scss';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>
);

export default App;
