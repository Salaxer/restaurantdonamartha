import React from 'react';
import images from '../initialState';
import '../assets/styles/discover.css';

const Discover = () => {
    return (
        <div className="main__discover">
            <div className="container-all">
                <div className="slidefood">
                    {images.image_discover.map( (item, index) => {
                        return(
                            <>
                                <div key={index} className="item-slidefood">
                                    <img src={item.image} alt={item.alt}/>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default Discover;