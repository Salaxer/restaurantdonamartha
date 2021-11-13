import React from 'react';
import  { Redirect } from 'react-router-dom'

//Redux
import { useSelector } from 'react-redux';
import { closeUser } from '../db/auth';

//Styles
import '../assets/styles/profile.css'

const Profile = () => {
    const user = useSelector(state=>state.user)

    const closeSession = async () =>{
        await closeUser(false);
    }
    if (user == null) {
        return <Redirect to='/'  />
    }
    return(
    <div className="viewUser">
            <div className="personalInfo">
                <img className="personalInfo__IMG" src={user.photoURL} alt={`Foto de ${user.displayName}`} srcSet="" />
                <button className="changePhoto" name="Cambiar foto"><i className="fas fa-camera"></i></button>
            </div>
            <p className="nameUSer">{user.displayName}</p>
            <span className="userLine"></span>
            <div className="pointRestauant">
                <div>Puntos acumulados</div>
            </div>
            <div className="favorites">
                <p>Comida guardada</p>
            </div>
            <div>
                <p>Reviews</p>
            </div>
            <button onClick={closeSession}>Salir</button>
        </div>
    );
};

export default Profile;