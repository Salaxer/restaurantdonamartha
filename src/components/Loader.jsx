import React from 'react';

import '../assets/styles/Loader.css';


const loader = () => {
    return (
      <div className="lds-grid">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    );
}

export default loader