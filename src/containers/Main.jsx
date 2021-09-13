import React from 'react';
import '../assets/styles/main.css'
import Fb_opinions from '../components/Fb_opinios';
import Discover from '../components/Discover';

const Main = () => {
  return (
    <section className="main">
        {/* <!-- Facebook --> */}
        <Fb_opinions/>
        {/* <!-- Slide food --> */}
        <Discover></Discover>
        {/* <!-- Maps --> */}
        <div className="main__findus">
        <h1 className="main__findus--title">Encuentranos</h1>
        {/* <iframe className="main__findus--map" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15110.279083441268!2d-99.2102233!3d18.7727448!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xee1ce55e86f27d47!2sMicheladas%20Do%C3%B1a%20Martha!5e0!3m2!1ses-419!2smx!4v1605128421072!5m2!1ses-419!2smx" frameBorder="0" style="border:0;" allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>  */}
        </div>
    </section>
  );
};

export default Main;
