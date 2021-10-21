import React from 'react';
import images_carousel from '../initialState';
import Welcome from '../containers/Welcome.jsx';
import '../assets/styles/MainMenuFood.css';

const Checkout = () => {
  return  (
    <div>
      <Welcome images={images_carousel}/>
      <div className="MenuFoodMain" id="MenuFoodMain">
        Hola como estan todos
      </div>
    </div>

  );
};

export default Checkout;
