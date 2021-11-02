import React, { useState } from 'react';
import images_carousel from '../initialState';
import Welcome from '../containers/Welcome.jsx';
import MainMenuFood from '../components/MainMenuFood';

import '../assets/styles/MainMenuFood.css'; 

const Checkout = () => {

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recomended");
  const sortFood =( ev )=>{
    setSort(ev.target.value);
  }
  const searchFood =( ev )=>{
    setSearch(ev.target.value);
  }
  return  (
    <div>
      <Welcome images={images_carousel}/>
      <div className="MenuFoodMain" id="MenuFoodMain">
        <div className="ContainerAllFood">
          <div className="searchFood"> 
            <h1 className="titleFood">Carta</h1>
            <div className="formFood">
              <select className="selectFood" name="" id="">
                <option value="all">Todo</option>
                <option value="food">Comida</option>
                <option value="Drink">bebidas</option>
              </select>
              <input onChange={searchFood} type="search" name="inputfoodSearch" placeholder="Buscar" className="inputfoodSearch" id="" />
              <select onChange={sortFood} className="sortFood" name="" id="">
                <option value="recomended">Recomendados</option>
                <option value="less">Menor precio a mayor</option>
                <option value="more">Mayor precio a menor</option>
                <option value="give">Mas pedido</option>
                <option value="rating">Mejor valorado</option>
              </select>
            </div>
          </div>
          <MainMenuFood sort={sort} search={search}></MainMenuFood>
        </div> 
      </div>
    </div>

  );
};

export default Checkout;
