import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';

import '../assets/styles/informationFood.css'

//db
import api from '../db/api'
//REDUX
import { useSelector } from 'react-redux';
//utils
import LoaderCircle from '../components/LoaderCircle';

const Information = () => {

  //REDUX config

  const {FoodId} = useParams();

  const [data, setData] = useState({food: 'empty',loader: true});

  //get data on api
  const getData = async () =>{
    try {
      const newData = await api.read(FoodId);
      setData({loader: false, food: newData})
    } catch (error) {
      setData({loader: false, food: 'notfound'})
    }
  }
  
  const food = useSelector(state=>state.food);
  
  useEffect( ()=>{
    if(food == 'empty' || food == null){ 
      getData();
    }else{
      const single = food.map((data)=>{
        if (data.id == FoodId) {
          return data;
        }
      })
      console.log(single);
      if (single[0]) {
        setData({loader: false, food: single[0].data()});
      }else{
        setData({loader: false, food: 'notfound'});
      }
    }
    return () => {
      setData({});
    };
  }, [])

  if (data.food == 'notfound') {
    return <h1 style={{marginTop: '70px'}}>No existe el producto ingresado</h1>;
  }else{
    return(
      <>
        {data.loader ? <LoaderCircle background="white"/>: 
          <div className="InfoFood">
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
