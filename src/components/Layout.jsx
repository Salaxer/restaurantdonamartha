import React from 'react';
import Header from '../templates/Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="Main">
      <Header/>
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
