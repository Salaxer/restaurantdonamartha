import React, { useState } from 'react';
import images_carousel from '../initialState';
import Welcome from '../containers/Welcome.jsx';
import '../assets/styles/MainMenuFood.css';
import MainMenuFood from '../components/MainMenuFood';

const Checkout = () => {


  return  (
    <div>
      <Welcome images={images_carousel}/>
      <div className="MenuFoodMain" id="MenuFoodMain">
        <div className="ContainerAllFood">
          <div className="searchFood"> 
            <h1 className="titleFood">Carta</h1>
            <div className="formFood">
              <select className="selectFood" name="" id="">
                <option value="food">Todo</option>
                <option value="food">Comida</option>
                <option value="Drink">bebidas</option>
              </select>
              <input type="search" name="inputfoodSearch" placeholder="Buscar" className="inputfoodSearch" id="" />
              <select className="sortFood" name="" id="">
                <option value="food">Menor precio a mayor</option>
                <option value="Drink">Mayor precio a menor</option>
                <option value="Drink">Mayor pedido</option>
                {/* <option value="Drink">Mejor valorado</option> */}
                <option value="Drink">Recomendados</option>
              </select>
            </div>
          </div>
          <MainMenuFood></MainMenuFood>
        </div>
      </div>
    </div>

  );
};

export default Checkout;
