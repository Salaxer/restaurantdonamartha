import React from 'react';
import { useParams} from 'react-router-dom';
import db from '../initialState';

const Food = db.AllMenu;

const Information = () => {
  const {FoodId} = useParams();
  const result =  Food.filter(Food =>{
    return `${Food.id}`.includes(FoodId);
  });
  console.log(result);
  if(result[0]){
    return(
      <div>
        Hola como estan
        {result[0].id}
        {result.img}
        {result.title}
        {result.id}
        {result.id}
        {result.id}
        {result.id}
      </div>
    )
  }else{
    return <h1>No existe el producto ingresado</h1>;
  }
};

export default Information;
