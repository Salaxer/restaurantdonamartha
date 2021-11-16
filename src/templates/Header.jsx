import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo1_main.png';
import headerOpenClose from '../utils/headerOpenClose';

import { useSelector } from 'react-redux';



const Header = () => {

  const user = useSelector(state=>state.user)
  useEffect( async ()=>{
    headerOpenClose();
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
                    <li><Link to="/" aria-label="Inicio"><i alt="Hii" className="fas fa-store-alt"></i><span className="information">Inicio</span></Link></li>
                    <li><Link to="/menu" aria-label="Menu"><i className="fab fa-elementor"></i><span className="information">Menu</span></Link></li>
                    <li><Link to="/delivery" aria-label="Pedidos a domicilio"><i className="fas fa-motorcycle"></i><span className="information">Pedidos</span></Link></li>
                    <li><Link to="/reserve" aria-label="Reservaciones"><i className="fas fa-concierge-bell"></i><span className="information">Reservaciones</span></Link></li>
                    {user == null ?
                    <li><Link to="/signup" aria-label="Unete a nosotros"><i className="fas fa-sign-in-alt"></i><span className="information">Unete</span></Link></li>:
                    <li><Link to="/profile" aria-label="Perfil de usuario"><img src={user.photoURL} alt={`foto de ${user.displayName}`} /><span className="information">Perfil</span></Link></li>
                    }
                </ul>
            </nav>
        </header> 
    </>
  );
};

export default Header;