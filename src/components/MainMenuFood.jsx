import React, { useMemo, useState } from 'react';
import { RatingStar } from "rating-star";
import db from '../initialState';
import { Link} from 'react-router-dom';

import api from '../api';


const MainMenuFood = ({sort, search})=>{
    const Food = db.AllMenu;
    const [filterFood, setFilterFood] = useState(Food)
    useMemo(() =>{
        const result =  Food.filter(Food =>{
            return `${Food.title}`.toLowerCase().includes(search.toLowerCase());
        });
        if(filterFood.length !== result.length){
            setFilterFood(result);
          }
        sort == 'less' ?  filterFood.sort((a,b) => {return(a.rating - b.rating)}) : filterFood.sort((a,b) => {return(b.rating - a.rating)});
    },[sort,search, Food]);
    
    if(filterFood.length === 0){ return(
        <>
            <div className="notAvailable"> <p>Lo sentimos, el producto que usted busca no esta disponible</p></div>
        </>
        )
     }else{ return(
        <>
        {filterFood.map((elements, index)=>{
            return(
                <div className="slideFood" key={elements.id}>
                        <div className="FoodDetails">
                            <h1 className="titleFood">{elements.title}</h1>
                            <p className="priceFood">price <span>${elements.price}</span></p>
                            <div>
                            <RatingStar
                                maxScore={100}
                                id={index.toString()}
                                rating={elements.rating}
                            />
                            </div>
                        </div>
                        <Link className="slideFood__a" to={`/menu/${elements.id}`} >
                            <img className="slideFood__img" src={elements.image} alt={elements.title} srcSet="" />
                        </Link>
                    </div>
                )
            })}
        </>   
       );  
    }
}

export default MainMenuFood;