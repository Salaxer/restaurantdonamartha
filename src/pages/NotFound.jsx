import React from 'react';
import MediaQueryInfo from '../utils/MediaQuery';
import '../assets/styles/notFound.css';

const NotFound = () => {
  return(
    // <MediaQueryInfo></MediaQueryInfo>
    <>
      <div className="viewPage">
        <h1>404</h1>
        <h3>Pagina no encontrada</h3>
      </div>
    </>
  );
};

export default NotFound;
