import React from 'react';
import images_carousel from '../initialState';
import Welcome from '../containers/Welcome.jsx';
const Checkout = () => {
  return  (
    <div>
      <Welcome images={images_carousel}/>
      Hola como estan todos
    </div>

  );
};

export default Checkout;
