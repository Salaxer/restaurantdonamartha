import React, { useEffect } from 'react';
import carrousell from '../utils/carousel';
import images from '../initialState'

const setCarrousell = () =>{
    useEffect(()=>{
        carrousell(true)
        return () => {
            carrousell(false)
        }
    })
}

const Slide = () => {
    setCarrousell();
    return(
        <>
            {
                images.images_carousel.map((item, index) => {
                    return(
                        <div key={index} id={`slide-${index}`} className="slide fade">
                            <a href={item.page} id={`image_${index+1}`}> 
                                <img src={item.image} alt={item.alt} srcSet="" />
                            </a>
                        </div>
                    )
                })
            }
            <div id="dots-wrapper" className="points">
                {
                    images.images_carousel.map((item, index) => {
                        return(
                            <div key={index} className="dot-nav active-dot"></div>
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