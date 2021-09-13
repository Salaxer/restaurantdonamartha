import React from "react"
import Slide from "../components/Slide";
import '../assets/styles/slide-welcome.css'

const Welcome = (images_carousel) =>{
    return(
        <section id="welcome" className="welcome">
            <div className="slider-container">
                <Slide images={images_carousel}/>
            </div>
        </section>
    )
}

export default Welcome;