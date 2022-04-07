import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import { Layout } from './components/layout/Layout';
import Router from './routes';
import { apolloClient } from './lib/apolloClient';

export default function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Router />
        </Layout>
      </ApolloProvider>
    </BrowserRouter>
  );
}
