import React, { useState, useMemo } from 'react';
import  { Link, Navigate } from 'react-router-dom'

//Redux
import { useSelector } from 'react-redux';
import { closeUser } from '../db/auth';

//Styles
import '../assets/styles/profile.css'

import LoaderCircle from '../components/LoaderCircle';
import api from '../db/api';

const Profile = () => {
    const user = useSelector(state=>state.user);
    const conectionID = useSelector(state=>state.conectionID);

    const closeSession = async () =>{
        await closeUser(false);
    }

    const [data, setData] = useState({
        myUser: conectionID,
        food: [],
        loader: false,
    })

    const verifyFood = async () =>{
        let newFood = [];
        if (conectionID !== 'loading') {
            if (conectionID[0].foodSave) {
                for (let i = 0; i < conectionID[0].foodSave.length; ++i) {
                    let id = conectionID[0].foodSave[i];
                    let result;
                    try {
                        result = await api.read(id);
                        newFood.push(result)
                    } catch (error) {
                        setData({...data, food: 'notFound'})
                    }
                }
                if (newFood.length >= 1) {
                    setData({...data, food: newFood})
                }else{
                    setData({...data, food: 'notFound'})
                }
            }else{
                setData({...data, food: 'notFound'})
            }
        }
    }
    
    useMemo(() =>{
        verifyFood();
    }, [conectionID]);

    if (user === null) {
        return <Navigate to='/'/>  
    }else if(user === 'loading'){
        return <LoaderCircle background="white" color="var(--maincolorgreen)" />
    }else{
        return(
            <div className="viewUser">
                    {conectionID[0].type ==="owner" ? <Link id="adminButton" className="buttons Google" to={`/admin/${conectionID[0].userID}`}>Administrar</Link> : null }
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
                        <div className="ContainerSaveFood ContainerAllFood" style={{backgroundColor: 'transparent', boxShadow: 'none'}}>
                            {data.food === 'notFound' ? <p>Aun no tienes comida guardada</p> : data.food.length === 0 ? 
                                <LoaderCircle position='relative' size="30px" background="transparent"/> :
                                data.food.map((item, index)=>{
                                    return (
                                        <Link style={{color: 'black', textDecoration: 'none', marginTop: '20px'}}  key={index} to={`/Menu/${conectionID[0].foodSave[index]}`}>
                                            <div className="slideFood" style={{margin: '5px', width: '95%'}}>
                                                <div className="FoodDetails" style={{width:'95%', height: '80%'}}>
                                                    <p style={{color: 'black', paddingBottom: '10px', textDecoration: 'none'}} className="title__info--profile">{item.title}</p>
                                                    <img className="slideFood__img" src={item.image} alt="" />
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>
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