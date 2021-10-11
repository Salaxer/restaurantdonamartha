import React from 'react';
import '../assets/styles/greeting.css';
import plants from '../assets/plants.jpg';

const Greeting = () =>{
    return (
        <>
            <div  className="Greeting" style={{backgroundImage: `url('${plants}')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
            </div>
            <div className="text">
                <h1>Bienvenidos</h1>
                <p>Soy doña martha y espero que disfruten de la buena comida que preparamos</p>
            </div>
        </>
    )
}

export default Greeting;