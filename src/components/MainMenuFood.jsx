import React from 'react';
import { Link} from 'react-router-dom';

import { RatingStar } from "rating-star";


const MainMenuFood = ({food})=>{
    if (food == 'error' || !food) {
        return <div className="notAvailable"> <p>El producto no se encuentra disponible</p> </div> 
    }else{
        return(
        <>
        {food.map((data, index)=>{
            const elements = data.data();   
                return(
                    <div className="slideFood" key={index}>
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
                        <Link className="slideFood__a" to={`/menu/${data.id}`} >
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