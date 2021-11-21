import React from 'react';
import  { Link, Redirect } from 'react-router-dom'

//Redux
import { useSelector } from 'react-redux';
import { closeUser } from '../db/auth';

//Styles
import '../assets/styles/profile.css'

import LoaderCircle from '../components/LoaderCircle';

const Profile = () => {
    const user = useSelector(state=>state.user)
    const closeSession = async () =>{
        await closeUser(false);
    }
    if (user == null) {
        return <Redirect to='/'/>  
    }else if(user == 'loading'){
        return <LoaderCircle background="white" color="var(--maincolorgreen)" />
    }else{
        return(
            <div className="viewUser">
                    <div className="personalInfo">
                        <img aria-label="foto de perfil" className="personalInfo__IMG" src={`${user.photoURL}`} alt={`Foto de ${user.displayName}`} srcSet="" />
                        <Link to="/Profile/edit" className="editProfile" name="edit" aria-label="Editar perfil"><i className="far fa-edit"></i></Link>
                    </div>
                    <p className="nameUSer" aria-label="nombre de usuario">Hola, {user.displayName}</p>
                    {/* <span className="userLine"></span> */}
                    <div className="ContainerInfo pointRestauant">
                        <h1 className="title__info--profile">Puntos acumulados</h1>
                        <p>0</p>
                    </div>
                    <div className="ContainerInfo favorites">
                        <h1 className="title__info--profile">Comida guardada</h1>
                        <p>Aun no tienes comida guardada</p>
                    </div>
                    <div className="ContainerInfo favorites">
                        <h1 className="title__info--profile">Rese&ntilde;as</h1>
                        <p>Aun no tienes ninguna rese&ntilde;a</p>
                    </div>
                <button name="salir" id="signOut" onClick={closeSession} className="buttons">Cerrar sesi&oacute;n<i className="fas fa-sign-out-alt"></i>
                </button>
            </div>
        );
    }
};

export default Profile;