import React from 'react';
import  { Redirect } from 'react-router-dom'

//Redux
import { useSelector } from 'react-redux';
import { closeUser } from '../db/auth';

//Styles
import '../assets/styles/profile.css'

import PageLoading from '../components/PageLoading';

const Profile = () => {
    const user = useSelector(state=>state.user)
    const closeSession = async () =>{
        await closeUser(false);
    }
    if (user == null) {
        return <Redirect to='/'/>  
    }else if(user == 'loading'){
        return <PageLoading/>
    }else{
        return(
            <div className="viewUser">
                    <div className="personalInfo">
                        <img aria-label="foto de perfil" className="personalInfo__IMG" src={`${user.photoURL}&s=200`} alt={`Foto de ${user.displayName}`} srcSet="" />
                        <button className="changePhoto" name="photo" aria-label="Cambiar foto"><i className="fas fa-camera"></i></button>
                    </div>
                    <p className="nameUSer" aria-label="nombre de usuario">Hola, {user.displayName}</p>
                    {/* <span className="userLine"></span> */}
                    <div className="ContainerInfo pointRestauant">
                        <p className="title__info--profile">Puntos acumulados</p>
                    </div>
                    <div className="ContainerInfo favorites">
                        <p className="title__info--profile">Comida guardada</p>
                        <div>
                            Mojarron
                        </div>
                    </div>
                    <div className="ContainerInfo favorites">
                        <p className="title__info--profile">Reviews</p>
                    </div>
                <button onClick={closeSession}>Salir
                </button>
            </div>
        );
    }
};

export default Profile;