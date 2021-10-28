import React from 'react';

import { RatingStar } from "rating-star";
import db from '../initialState';

const MainMenuFood = (props)=>{
    const Food = db.AllMenu;
    props.sort == 'less' ?  Food.sort((a,b) => {return(a.rating - b.rating)}) : Food.sort((a,b) => {return(b.rating - a.rating)});
    return(
     <>
         {Food.map((elements, index)=>{
             return(
                <div key={elements.id} className="slideFood">
                    <div className="FoodDetails">
                        <h1 className="titleFood">{elements.title}</h1>
                        <p className="priceFood">price <span>${elements.price}</span></p>
                        <div>
                        <RatingStar
                            // clickable
                            maxScore={100}
                            id={elements.id}
                            rating={elements.rating}
                        />
                        </div>
                    </div>
                    <img className="slideFood__img" src={elements.image} alt={elements.title} srcSet="" />
                </div>
             )
         })}
     </>   
    );
}

export default MainMenuFood;