import React from "react";
import { useParams } from 'react-router';
import { Link } from "react-router-dom";

import NotFound from './NotFound';

import '../assets/styles/admin.css';

const admin = () =>{
    const {adminID} = useParams()
    console.log(adminID);
    if (adminID == 'fwef97uewfkj') {
        return (
            <div className="viewAdmin">
                <div className="titleAdmin">
                    <h1>Hola administrador</h1>
                </div>
                <div className="contentAdmin">
                    <p>agregar nueva oferta</p>
                    <div  className="buttons adminButtons"><Link to={`/admin/${adminID}/offer`}>Aceptar</Link></div>
                </div>
                <div className="contentAdmin">
                    <p>agregar nuevo producto</p>
                    <div  className="buttons adminButtons"><Link to={`/admin/${adminID}/product`}>Aceptar</Link></div>
                </div>
                <div className="contentAdmin">
                    <p>Editar productos</p>
                    <div  className="buttons adminButtons"><Link to={`/Menu`}>Aceptar</Link></div>
                </div>
                <div className="contentAdmin">
                    <p>Eliminar producto</p>
                    <div  className="buttons adminButtons"><Link to={`/Menu`}>Aceptar</Link></div>
                </div>
            </div>
        )
    } else {
        return <NotFound/>
    }
}

export default admin