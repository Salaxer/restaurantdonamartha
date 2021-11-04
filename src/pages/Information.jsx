import React from 'react';
import { useParams} from 'react-router-dom';
import db from '../initialState';

import '../assets/styles/informationFood.css'

const Food = db.AllMenu;

const Information = () => {
  const {FoodId} = useParams();
  const result =  Food.filter(Food =>{
    return `${Food.id}`.includes(FoodId);
  });
  if(result[0]){
    return(
      <div className="InfoFood" id={result[0].id}>
        <div className="ContainerIMG">
          <img src={result[0].image} alt="" className="ContainerIMG__img" srcSet="" />
        </div>
        <h1 className="singleTitleFood">{result[0].title}</h1>
        <div className="singleFood">
          <div className="singleFoodPrice">
            <p>Precio $<span>{result[0].price}</span></p>
          </div>
          <div className="singleFoodIngredients">
            <p>Ingredientes</p>
            {result[0].ingredients.map( (data, index) =>{ return(<p key={index}>{data}</p>) })}
          </div>
          <div className="singleFoodDetails">{result[0].details}</div>
        </div>
      </div>
    )
  }else{
    return <h1>No existe el producto ingresado</h1>;
  }
};

export default Information;
