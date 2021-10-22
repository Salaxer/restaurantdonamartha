import React from 'react';
import images_carousel from '../initialState';
import Welcome from '../containers/Welcome.jsx';
import '../assets/styles/MainMenuFood.css';

const Checkout = () => {
  return  (
    <div>
      <Welcome images={images_carousel}/>
      <div className="MenuFoodMain" id="MenuFoodMain">
        <div className="ContainerAllFood">
          <div className="titleFood"> 
            <h1>Title of food</h1>
            <input type="search" name="foodSearch" id="" />
            <select className="" name="" id="">
              <option value="food">
                Comida
              </option>
              <option value="Drink">bebidas</option>
            </select>
          </div>
          <div className="slideFood">
              <h1 className="titleFood"> Hola</h1>
          </div>
          <div className="slideFood">
              <h1 className="titleFood"> Hola</h1>
          </div>
          <div className="slideFood">
              <h1 className="titleFood"> Hola</h1>
          </div>
          <div className="slideFood">
              <h1 className="titleFood"> Hola</h1>
          </div>
          <div className="slideFood">
              <h1 className="titleFood"> Hola</h1>
          </div>
          <div className="slideFood">
              <h1 className="titleFood"> Hola</h1>
          </div>
          <div className="slideFood">
              <h1 className="titleFood"> Hola</h1>
          </div>
          <div className="slideFood">
              <h1 className="titleFood"> Hola</h1>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Checkout;
