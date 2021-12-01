import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/menuFood.css';
import api from '../db/api';
//db
import { collection, getFirestore, limit, orderBy, query } from '@firebase/firestore';

const db =  getFirestore();

const MenuFood = () => {

  const [data, setData] = useState({
    food: 'loading',
    idFood: undefined,
  })
  
  const getData = async () =>{
    const customersOrderQuery = query(
      collection(db, 'Menu'),
      orderBy("rating", "desc"),
      limit(1)
    );
    try {
      const result = await api.list('Menu',customersOrderQuery);
      // setData({food: result[0]});
      const newFood = result[0].data();
      const newID = result[0].id;
      setData({food: newFood, idFood: newID});
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getData();
  },[])

  return (
      <>
        <div className="grid_Menu">
          <h1 className="general_title_little_menu">Lo mas destacado en el restaurante</h1>
          <div className="target_food">
              <h1>Mas pedido</h1>
              <p>Mojarra frita</p>
              <Link to="./hi" className="container_image_little">
                <img src="https://antojandoando.com/wp-content/uploads/2020/04/face.jpg" alt="mojarra frita" srcSet="" />
              </Link>
          </div>
          <div className="target_food">
              {data.food === 'loading' ? null : 
              <>
                <h1>Mejor valorado</h1>
                <p>{data.food.title}</p>
                <Link to={`/menu/${data.idFood}`} className="container_image_little">
                  <img src={data.food.image} alt={data.food.title} srcSet="" />
                </Link>
              </>
            } 
                
          </div>
          <div className="target_food">
              <h1>Recomendado</h1>
              <p>camarones al mojo de ajo</p>
              <Link to="/Menu/7bcD56UWnA7p2ekR82mi" className="container_image_little">
                <img src="https://firebasestorage.googleapis.com/v0/b/restaurantdmartha.appspot.com/o/adminStorage%2FEGlxhMjAU8lZDCOmd04c?alt=media&token=0a0dd8ee-4823-4cae-8eee-97134495d1cd" alt="mojarra frita" srcSet="" />
              </Link>
          </div>
          <div className="link_all_menu target_food">
              <Link to="./menu">
                <h1>Mostrar el menu completo</h1>
              </Link>
          </div>
        </div>
      </>
  );
};

export default MenuFood;