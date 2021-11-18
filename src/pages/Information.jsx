import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';

import '../assets/styles/informationFood.css'

//db
import api from '../db/api'

import LoaderCircle from '../components/LoaderCircle';

const Information = () => {
  const {FoodId} = useParams();

  const [data, seData] = useState({food: null,loader: true});

  const getData = async () =>{
    try {
      const newData = await api.read(FoodId);
      seData({loader: false, food: newData})
      console.log(newData);
    } catch (error) {
      seData({loader: false, food: 'notfound'})
    }
  }
  
  useEffect( ()=>{
    getData();
  }, [])
  if (data.food == 'notfound') {
    return <h1 style={{marginTop: '70px'}}>No existe el producto ingresado</h1>;
  }else{
    return(
      <>
        {data.loader ? <LoaderCircle background="white"/>: 
          <div className="InfoFood" id={data.food.id}>
            <div className="ContainerIMG">
              <img src={data.food.image} alt="" className="ContainerIMG__img" srcSet="" />
            </div>
            <h1 className="singleTitleFood">{data.food.title}</h1>
            <div className="singleFood">
              <div className="singleFoodPrice">
                <p>Precio: <span>${data.food.price}</span></p>
              </div>
              <div className="singleFoodIngredients">
                <p>Ingredientes:</p>
                {data.food.ingredients.map( (data, index) =>{ return(<span key={index}>{data}</span>) })}
              </div>
              <div className="singleFoodDetails">
                <p>Descripci&oacute;n: <span>{data.food.details}</span></p>
              </div>
              <div className="singleFoodWeight"> <p> Tama&ntilde;o: <span>400gr</span></p> </div>
            </div>
          </div>
        }
      </>
    );
  }
};

export default Information;
