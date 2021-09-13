import React from 'react';
import images_carousel from '../initialState';
// {images_carousel.images_carousel[0]}
import Welcome from '../containers/Welcome.jsx';
import Main from '../containers/Main.jsx';

const Home = () => {
  return (
    <>
    <Welcome images={images_carousel}/>
    <Main></Main>
    </>
  );
};

export default Home;
