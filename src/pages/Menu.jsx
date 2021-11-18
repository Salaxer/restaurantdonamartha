import React, { useState, useEffect, useMemo } from 'react';
import images_carousel from '../initialState';
import Welcome from '../containers/Welcome.jsx';
import MainMenuFood from '../components/MainMenuFood';
import globalEvents from '../utils/globalEvents';

//Styles
import '../assets/styles/MainMenuFood.css'; 
import LoaderCircle from '../components/LoaderCircle';

//db
import api from '../db/api'

//React Redux
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'


const Checkout = () => {
  globalEvents(true)

  //REDUX
  const dispatch = useDispatch()
  const { getFood } = bindActionCreators(actionCreators, dispatch);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recomended");

  const sortFood =( ev )=>{
    setSort(ev.target.value);
  }

  const searchFood =( ev )=>{
    setSearch(ev.target.value);
  }

  //API TO CALL DATA
  const [data, seData] = useState({loader: true});

  const getData = async () =>{
    try {
      seData({loader: true})
      const newData = await api.list();
      getFood(newData);
      seData({loader: false})
    } catch (error) {
      seData({loader: false})
      getFood('error');
      console.log(error);
      console.log('hay un error :(');
    }
  }

  const food = useSelector(state=>state.food);
  console.log(food);
  
  useEffect( ()=>{
    if(food == 'empty'){ 
      getData();
    }else{
      seData({loader: false});
    }
  }, [])

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
            {data.loader ? <div className="notAvailable"> <LoaderCircle position="relative" ></LoaderCircle> </div>:
            <MainMenuFood food={food} ></MainMenuFood>
            }
        </div> 
      </div>
    </div>

  );
};

export default Checkout;
