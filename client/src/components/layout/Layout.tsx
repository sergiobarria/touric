import React from 'react';

import Header from './Header';
import Footer from './Footer';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className='flex flex-col min-h-screen bg-gray-100'>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
