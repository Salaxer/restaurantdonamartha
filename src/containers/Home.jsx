import React from 'react';
import images_carousel from '../initialState'
// {images_carousel.images_carousel[0]}
import Slide from '../components/Slide.jsx'

const Home = () => {
  return (
    <>
    <section id="welcome" className="welcome">
      <div className="slider-container">
        <Slide images={images_carousel}/>
      </div>
    </section>
    <section className="main">
      {/* <!-- Facebook --> */}
      <div className="main__opinions">
        <div className="fb-page" data-href="https://web.facebook.com/Micheladas-Do%C3%B1a-Martha-101296578313615" data-tabs="timeline" data-width="500" data-height="70" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://web.facebook.com/Micheladas-Do%C3%B1a-Martha-101296578313615" className="fb-xfbml-parse-ignore"><a href="https://web.facebook.com/Micheladas-Do%C3%B1a-Martha-101296578313615">Micheladas Doña Martha</a></blockquote></div>
        <div data-colorscheme="dark" className="fb-comments" data-href="https://web.facebook.com/Micheladas-Do%C3%B1a-Martha-101296578313615/?ref=page_internal" data-numposts="1" data-width="100%"></div>
      </div>
      {/* <!-- Slide food --> */}
      <div className="main__discover">
        <div className="container-all">
          <div className="slidefood">
              <div className="item-slidefood">
                  <img src="https://cdn.pixabay.com/photo/2017/12/26/04/51/fish-and-chip-3039746_960_720.jpg"/>
              </div>
  
              <div className="item-slidefood">
                  <img src="https://cdn.pixabay.com/photo/2014/11/05/15/57/salmon-518032_960_720.jpg"/>
              </div>
  
              <div className="item-slidefood">
                  <img src="https://cdn.pixabay.com/photo/2015/04/08/13/13/food-712665_960_720.jpg"/>
              </div>
          </div>
        </div>
      </div>
      {/* <!-- Maps --> */}
      <div className="main__findus">
        <h1 className="main__findus--title">Encuentranos</h1>
        {/* <iframe className="main__findus--map" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15110.279083441268!2d-99.2102233!3d18.7727448!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xee1ce55e86f27d47!2sMicheladas%20Do%C3%B1a%20Martha!5e0!3m2!1ses-419!2smx!4v1605128421072!5m2!1ses-419!2smx" frameBorder="0" style="border:0;" allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>  */}
      </div>
    </section>
    </>
  );
};

export default Home;
