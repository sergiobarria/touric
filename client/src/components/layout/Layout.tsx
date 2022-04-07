import React from 'react';

import { Header } from './Header';
import { Footer } from './Footer';

interface Props {
  children: React.ReactNode;
}

/**
 * This component renders the application main layout:
 * header and footer.
 */
export function Layout({ children }: Props) {
  return (
    <div className='flex flex-col min-h-screen bg-gray-100'>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
