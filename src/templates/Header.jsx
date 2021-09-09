import React from 'react';
import logo from '../assets/Logo1_main.png'

const Header = () => {
  return (
    <>
        <header className="header">
            <img className="header__picture--img" src={logo} alt="Logo del restaurante"/>
            <nav className="header__nav">
                <ul>
                    <li><a href="#"><i className="fas fa-store-alt"></i><span className="information">Inicio</span></a></li>
                    <li><a href="#"><i className="fab fa-elementor"></i><span className="information">Menu</span></a></li>
                    <li><a href="#"><i className="fas fa-motorcycle"></i><span className="information">Pedidos</span></a></li>
                    <li><a href="#"><i className="fas fa-concierge-bell"></i><span className="information">Reservaciones</span></a></li>
                    <li><a href="#"><i className="fas fa-sign-in-alt"></i><span className="information">Inicia Sesión</span></a></li>
                </ul>
            </nav>
        </header> 
    </>
  );
};

export default Header;