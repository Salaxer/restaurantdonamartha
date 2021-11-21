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


const Menu = () => {

  //REDUX config
  const dispatch = useDispatch()
  const { setFood, addFood } = bindActionCreators(actionCreators, dispatch);

  //know if the user watch all items to reload new
  const dataMax = (decided) =>{
    decided ? setData({verifyScroll: true, newLoader: true}) : setData({verifyScroll: false});
    // if (decided) {
    //   addFood({prueba: 'sorry'});
    // }
  }

  //Sentences to decide the movement of the page
  const [data, setData] = useState({
    loader: true, 
    verifyScroll: false, 
    lastData: 'none',
    newLoader: false,
  });
 
  //getting new data from api if doesn't exist yet
  const getData = async () =>{
    try {
      setData({loader: true})
      const newData = await api.list();
      setFood(newData);
      setData({loader: false, lastData: newData})
    } catch (error) {
      setData({loader: false})
      setFood('error');
    }
  }

  //getting data already used
  const food = useSelector(state=>state.food);
  useEffect( ()=>{
    if(food == 'empty' || food == null){ 
      getData();
    }else{
      setData({loader: false});
    }
    globalEvents(dataMax)
    return () => {
      setData({});
    };
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
              <input type="search" name="inputfoodSearch" placeholder="Buscar" className="inputfoodSearch" id="" />
              <select className="sortFood" name="" id="">
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
            { data.newLoader ? <div className="slideFood"><LoaderCircle position="relative" ></LoaderCircle></div> : null}
        </div> 
      </div>
    </div>

  );
};

export default Menu;
