import React, { useEffect, useState, useMemo } from 'react';
import { useParams} from 'react-router-dom';

import '../assets/styles/informationFood.css'

//db
import api from '../db/api'
//REDUX
import { useSelector } from 'react-redux';
//utils
import LoaderCircle from '../components/LoaderCircle';
import NotFound from './NotFound';
import { RatingStar } from 'rating-star';
import swal from 'sweetalert';

const Information = () => {

  //params getting 
  const {FoodId} = useParams();
  const [data, setData] = useState({
    food: 'empty',
    loader: true, 
    saveHeart: 'undefine',
  });

  //get data on api
  const getData = async () =>{
    try {
      const newData = await api.read(FoodId);
      setData({...data, loader: false, food: newData, rating: newData.rating})
    } catch (error) {
      setData({...data, loader: false, food: 'notfound'})
    }
  }
  
  const food = useSelector(state=>state.food);
  const conectionID = useSelector(state=>state.conectionID)
  
  useEffect( ()=>{
    if(food == 'empty' || food == null){ 
      getData();
    }else{
      const single = food.find(element => element.id == FoodId);
      if (single) {
        const _FOOD =  single.data();
        setData({...data, loader: false, food: _FOOD, rating: _FOOD.rating});
      }else{
        setData({...data, loader: false, food: 'notfound'});
      }
    }
    return () => {
      setData({});
    };
  }, [])

  const saveFavorites = async() =>{
    setData({...data, saveHeart: data.saveHeart ? false : true})
    // const unSave = document.getElementById('unsaveHeart');
    setTimeout( async ()=>{
      const save = document.getElementById('saveHeart');
      if (data.saveHeart ? false : true) {
        save.classList.add("heartSound");
        save.style.pointerEvents = 'none';
        const result = await api.updateUsersSaves(conectionID[1], FoodId, 'Users');
        if (result) {
          save.style.pointerEvents = 'all';
        }
      }else{
        save.classList.remove('heartSound');
        save.style.pointerEvents = 'none';
        const result = await api.removeUsersSaves(conectionID[1], FoodId, 'Users');
        if (result) {
          save.style.pointerEvents = 'all';
        }
      }
    },100)
  }

  const verifySave = () =>{
    if (conectionID != 'loading' && conectionID != null) {
      if (conectionID[0].foodSave) {
        const findHeart = conectionID[0].foodSave.find(element => element == FoodId);
        if (findHeart) {
          setData({...data, saveHeart: true});
        }else{
          setData({...data, saveHeart: false});
        }
      }else{
        setData({...data, saveHeart: false});
      }
    }else{
      setData({...data, saveHeart: false});
    }
  }

  const alertSingin = () =>{
    swal("Oops","Para agregarlo a tus favoritos primero tiene que unirte a nosotrs","warning");
  }

  useMemo(() =>{
    verifySave();
  }, [conectionID]);

  if (data.food == 'notfound') {
    return <NotFound/>
  }else{
    return(
      <>
        {data.loader ? <LoaderCircle background="white"/>: 
          <div className="InfoFood">
            <div className="ContainerIMG" style={{textAlign: data.food.type == 'drink' ? 'center': null}}>
              <div onClick={ conectionID == null ? alertSingin :saveFavorites} style={{cursor: 'pointer'}} id="saveHeart" className="savePublic">
                {data.saveHeart == 'undefine' ? null : data.saveHeart ?
                  <i className="fas fa-heart"></i> :
                  <i className="far fa-heart"></i>
                }
              </div>
              <img src={data.food.image} alt="" style={{maxWidth: data.food.type == 'drink' ? '300px': null}} className="ContainerIMG__img" srcSet="" />
            </div>
            <h1 className="singleTitleFood">{data.food.title}</h1>
            <div className="singleFood">
              <div className="singleFoodPrice">
                <p><span style={{fontSize: '3rem', fontWeight: 'lighter'}}>${data.food.price}</span></p>
                <RatingStar
                  maxScore={100}
                  id="MyRating"
                  rating={data.rating}
                />
              </div>
            </div>
            <div className="singleFood">
              <div className="singleFoodDetails">
                  <p>Ingredientes: <span> {data.food.ingredients}</span></p>
                  {/* https://antojandoando.com/wp-content/uploads/2020/04/face.jpg */}
              </div>
            </div>
            <div className="singleFood">
              <div className="singleFoodDetails">
                <p>Descripci&oacute;n: <span>{data.food.details}</span></p>
              </div>
            </div>
            <div className="singleFood">
              <div className="singleFoodWeight"> <p> Tama&ntilde;o: <span> {data.food.size}</span></p> </div>
            </div>
            <div className="singleFood">
              <div className="singleFoodWeight"> </div>
            </div>
          </div>
        }
      </>
    );
  }
};

export default Information;
