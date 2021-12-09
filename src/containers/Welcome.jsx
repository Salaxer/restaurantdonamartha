import React from "react"
import Slide from "../components/Slide";
import '../assets/styles/slide-welcome.css'

const Welcome = () =>{
    return(
        <section id="welcome" className="welcome">
            <div className="slider-container">
                <Slide/>
            </div>
        </section>
    )
}

export default Welcome;