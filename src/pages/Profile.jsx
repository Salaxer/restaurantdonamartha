import React , { useState } from 'react';
import  { Redirect } from 'react-router-dom'

import '../assets/styles/profile.css'

import { closeUser } from '../db/auth';

const Profile = () => {

    const closeSession = async () =>{
        await closeUser(false);
    }
    // if (user == []) {
    //     return <Redirect to='/'  />
    // }
    return(
        <div className="viewUser">
            <h1>Hi there</h1>
            <h2>Hola</h2>
            <button onClick={closeSession}>Salir</button>
        </div>
    );
};

export default Profile;