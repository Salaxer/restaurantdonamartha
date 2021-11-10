import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo1_main.png';
import headerOpenClose from '../utils/headerOpenClose';

import {verify} from '../auth';


const Header = () => {
  const [user, setUser] = useState([]);
  useEffect( async ()=>{
    headerOpenClose();
    verify(setUser);
  })
  return (
    <>
        <header id="header" className="header">
            <img className="header__picture--img" src={logo} alt="Logo del restaurante"/>
            <input type="checkbox" name="openClose" id="check" />
            <label className="header__mobile" htmlFor="check">
              <i id="header__mobile--open" className="fas fa-bars"></i>
              <i id="header__mobile--close" className="fas fa-times"></i>
            </label>
            <nav className="header__nav" id="header_nav">
                <ul>
                    <li><Link to="/"><i className="fas fa-store-alt"></i><span className="information">Inicio</span></Link></li>
                    <li><Link to="/menu"><i className="fab fa-elementor"></i><span className="information">Menu</span></Link></li>
                    <li><Link to="/delivery"><i className="fas fa-motorcycle"></i><span className="information">Pedidos</span></Link></li>
                    <li><Link to="/reserve"><i className="fas fa-concierge-bell"></i><span className="information">Reservaciones</span></Link></li>
                    {user.length == [] ?
                    <li><Link to="/signup"><i className="fas fa-sign-in-alt"></i><span className="information">Unete</span></Link></li>:
                    <li><Link to="/user"><img src={user.photoURL} alt={`foto de ${user.displayName}`} /><span className="information">Perfil</span></Link></li>
                    }
                </ul>
            </nav>
        </header> 
    </>
  );
};

export default Header;