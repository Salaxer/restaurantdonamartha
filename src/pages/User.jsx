import React , { useState } from 'react';
import  { Redirect } from 'react-router-dom'

import '../assets/styles/user.css'

import {closeUser, verify} from '../auth';

const User = () => {

    const closeSession = async () =>{
        closeUser();
    }
    if (user == []) {
        return <Redirect to='/'  />
    }
    return(
        <div className="viewUser">
            <h1>Hi there</h1>
            <h2>Hola</h2>
            <button onClick={closeSession}>Salir</button>
        </div>
    );
};

export default User;