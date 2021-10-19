import React from 'react';
import Header from '../templates/Header';
import Footer from '../templates/Footer';

const Layout = ({ children }) => {
  return (
    <div className="all">
      <Header/>
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
