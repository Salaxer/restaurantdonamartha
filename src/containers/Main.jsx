import React, { useEffect, useState } from 'react';
import '../assets/styles/main.css'
import Fb_opinions from '../components/Fb_opinios';
import Discover from '../components/Discover';
import Find_us from '../components/Find_us';


const Main = () => {


  useEffect(()=>{
    const sizeImage = document.getElementById('welcome');
    document.getElementById("main").style.marginTop = `${sizeImage.clientHeight + 75}px`;
  })

  return (
    <section id="main" className="main">
        {/* <!-- Facebook --> */}
        <Fb_opinions/>
        {/* <!-- Slide food --> */}
        <Discover></Discover>
        {/* <!-- Maps --> */}
        <Find_us></Find_us>
    </section>
  );
};

export default Main;
