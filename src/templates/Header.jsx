import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo1_main.png'

const Header = () => {
  return (
    <>
        <header id="header" className="header">
            <img className="header__picture--img" src={logo} alt="Logo del restaurante"/>
            <input type="checkbox" name="openClose" id="check" />
            <label className="header__mobile" htmlFor="check">
              <i id="header__mobile--open" class="fas fa-bars"></i>
              <i id="header__mobile--close" class="fas fa-times"></i>
            </label>
            <nav className="header__nav">
                <ul>
                    <li><Link to="/"><i className="fas fa-store-alt"></i><span className="information">Inicio</span></Link></li>
                    <li><Link to="/menu"><i className="fab fa-elementor"></i><span className="information">Menu</span></Link></li>
                    <li><Link to="/delivery"><i className="fas fa-motorcycle"></i><span className="information">Pedidos</span></Link></li>
                    <li><Link to="/reserve"><i className="fas fa-concierge-bell"></i><span className="information">Reservaciones</span></Link></li>
                    <li><Link to="/sig_in"><i className="fas fa-sign-in-alt"></i><span className="information">Inicia Sesión</span></Link></li>
                </ul>
            </nav>
        </header> 
    </>
  );
};

export default Header;