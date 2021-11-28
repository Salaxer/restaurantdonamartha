import React, { useState, useEffect, useMemo } from 'react';
import images_carousel from '../initialState';
import Welcome from '../containers/Welcome.jsx';
import MainMenuFood from '../components/MainMenuFood';

//Styles
import '../assets/styles/MainMenuFood.css'; 
import LoaderCircle from '../components/LoaderCircle';

//db
import api from '../db/api'
import { QueryMenu } from '../db/queryCreators';

//React Redux
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'

//utils
import globalEvents from '../utils/globalEvents';


const Menu = () => {

  //REDUX config
  const dispatch = useDispatch()
  const { setFood, addFood } = bindActionCreators(actionCreators, dispatch);
  
  //Sentences to decide the movement of the page
  const [lastData, setLastData] = useState();
  const [update, setUpdate] = useState(false)
  const [data, setData] = useState({
    loader: true, 
    verifyScroll: false, 
    newLoader: false,
  });

  const NewUpdate = async () =>{
    if (lastData) {
      update ? setData({...data, verifyScroll: true, newLoader: true}) : setData({...data, verifyScroll: false});
      const obtainQuery = QueryMenu(lastData);
      try {
        const datanew = await api.list('Menu', obtainQuery)
        setLastData(datanew[datanew.length-1])
        addFood(datanew);
        console.log(datanew);
      } catch (error) {
        console.log(error);
      }
    }
  }
  
  //know if the user watch all items to reload new
  useMemo(()=>{
    NewUpdate();
  },[update])

  //getting new data from api if doesn't exist yet
  const getData = async () =>{
    try {
      setData({...data, loader: true})
      const newData = await api.list();
      setFood(newData);
      setLastData(newData[newData.length-1])
      setData({...data, loader: false})
      globalEvents(setUpdate);
    } catch (error) {
      setData({...data, loader: false})
      setFood('error');
    }
  }

  //getting data already used
  const food = useSelector(state=>state.food);
  console.log(food);
  useEffect( ()=>{
    if(food == 'empty' || food == null){ 
      getData();
    }else{
      setLastData(food[food.length-1]);
      setData({...data, loader: false});
      globalEvents(setUpdate);
    }
    return () => {
      setData({});
      globalEvents(false);
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
              food == 'empty' ? null : <MainMenuFood food={food} ></MainMenuFood>
            }
            { data.newLoader ? <div className="containSlide"><div className="slideFood"><LoaderCircle position="relative" ></LoaderCircle></div></div> : null}
        </div> 
      </div>
    </div>

  );
};

export default Menu;
