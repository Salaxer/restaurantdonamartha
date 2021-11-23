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

const Offer = () => {

  //params getting 
  const {offerID} = useParams();
  const [data, setData] = useState({
    food: 'empty',
    loader: true, 
    saveHeart: 'undefine',
  });

  //get data on api
  const getData = async () =>{
    try {
      const newData = await api.read(offerID, 'Offers');
      setData({...data, loader: false, food: newData, rating: newData.rating})
    } catch (error) {
      setData({...data, loader: false, food: 'notfound'})
    }
  }
  
  const offer = useSelector(state=>state.offer);
  
  useEffect( ()=>{
    if(offer == 'empty' || offer == null){ 
      getData();
    }else{
      const single = offer.find(element => element.id == offerID);
      if (single) {
        const _FOOD =  single.data();
        setData({...data, loader: false, food: _FOOD, rating: _FOOD.rating});
      }else{
        setData({...data, loader: false, food: 'notfound'});
      }
    }
    return () => {
      setData({});
      console.log(offer);
    };
  }, [])


  if (data.offer == 'notfound') {
    return <NotFound/>
  }else{
    return(
      <>
        {data.loader ? <LoaderCircle background="white"/>: 
          <div className="InfoFood">
            <div className="" style={{textAlign: data.food.type == 'drink' ? 'center': null}}>
              <img src={data.food.image} alt="" style={{maxWidth: data.food.type == 'drink' ? '300px': null}} className="imageRes" srcSet="" />
            </div>
            <h1 className="singleTitleFood" style={{top: '0'}}>{data.food.title}</h1>
            <div className="singleFood">
              <div className="singleFoodDetails">
                  <p>Descripci&oacute;n: <span> {data.food.description}</span></p>
              </div>
            </div>
            <div className="singleFood">
              <div className="singleFoodDetails">
                <p>Terminos y condiciones: <span>{data.food.terms}</span></p>
              </div>
            </div>
          </div>
        }
      </>
    );
  }
};

export default Offer;
