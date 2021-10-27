import React from 'react';

import { RatingStar } from "rating-star";
import db from '../initialState';

const MainMenuFood = ()=>{

    const Food = db.AllMenu;

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
                            id="123"
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