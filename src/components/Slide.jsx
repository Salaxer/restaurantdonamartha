import React, { useEffect, useMemo, useState } from 'react';
import carrousell from '../utils/carousel';
import { Link } from 'react-router-dom';
import Margin from '../utils/MarginFromMain';

import images from '../initialState'

//REDUX
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state/index'
//DB
import api from '../db/api';
//utils
import LoaderCircle from './LoaderCircle';

const setCarrousell = () =>{
    useEffect(()=>{
        carrousell(false);
        carrousell(true);
        return () => {
            carrousell(false);
        }
    })
}
 
const Slide = () => {

    setCarrousell();

    const dispatch = useDispatch()
    const {setOffer} = bindActionCreators(actionCreators, dispatch);
    const Offers = useSelector(state=>state.offer);

    const [data, setData] = useState({
        loading: false,
        offers: Offers,
    });

    const getOffers = async () =>{
        try {
            const result = await api.list('Offers');
            if (result) {
                setOffer(result);
                setData({...data, offers: result})
            }
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(()=>{
        if (Offers == 'empty' || Offers == null) {
            getOffers();
        }else{
            setData({...data, offers: Offers});
        }
        return(()=>{
            setData({});
        })
    },[])

    

    return(
        <>
            {
                data.offers == 'empty' ? <LoaderCircle/> : data.offers.map((item, index) => {
                    const element = item.data();
                    return(
                        <div key={index} id={`slide-${index}`} className="slide fade">
                            <Link to={`/offers/${item.id}`} id={`image_${index+1}`}> 
                                <img onLoad={((e)=> Margin(e))} className="imageRes" src={element.image} alt={element.title} />
                            </Link>
                        </div>
                    )
                })
            }
            <div id="dots-wrapper" className="points">
                {
                     data.offers == 'empty' ? null : data.offers.map((item, index) => {
                        return(
                            <div data-key={index} key={index} className="dot-nav active-dot"></div>
                        )
                    })
                }
            </div>
            <div id="arrows-wrapper">
                <p id="arrow-prev" className="slider-arrow ">
                    &#10094;
                </p>
                <p id="arrow-next" className="slider-arrow ">
                    &#10095;
                </p>
            </div>
            
        </>
    )
}

export default Slide;