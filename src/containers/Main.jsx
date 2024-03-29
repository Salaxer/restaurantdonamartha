import React, { useEffect, useState } from 'react';
import '../assets/styles/main.css'
import Fb_opinions from '../components/Fb_opinios';
import Discover from '../components/Discover';
import Greeting from '../components/Greeting'
import MenuFood from '../components/MenuFood';

const Main = () => {


  return (
    <section id="main" className="main">
        <Greeting/>
        {/* <!-- Slide food --> */}
        <Discover></Discover>
        {/* <!-- Facebook --> */}
        <Fb_opinions/>
        {/* <!-- little Menu --> */}
        <MenuFood/>
    </section>
  );
};

export default Main;
