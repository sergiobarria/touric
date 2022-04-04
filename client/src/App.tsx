import { BrowserRouter } from 'react-router-dom';

import Layout from './components/layout/Layout';
import Router from './routes';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Router />
      </Layout>
    </BrowserRouter>
  );
}
