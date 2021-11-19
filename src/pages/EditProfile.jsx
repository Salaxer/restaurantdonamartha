import React, { useEffect, useState } from 'react';
import  { Link, Redirect } from 'react-router-dom'

//Redux
import { useSelector } from 'react-redux';

//auth
import { closeUser, deleteAccount } from '../db/auth';

//style
import '../assets/styles/editProfile.css'

import LoaderCircle from '../components/LoaderCircle';

const EditProfile = () => {
    const user = useSelector(state=>state.user)
    const closeSession = async () =>{
        await closeUser(false);
    }

    const deleteUSer = async () =>{
        await deleteAccount();
    }

    const [data, setData] = useState({check: false, modeUpload: undefined})

    const handleModal = (e) =>{
        if (e.target.className == "viewModal" ||  e.target.id == "photo") {
            data.check ? setData({...data, check: false}) : setData({...data, check: true});
        }
    }
    const modeUploadPhoto = (type) =>{
        setData({...data, modeUpload: type})
    }

    useEffect(()=>{
        console.log(data);
    })

    if (user == null) {
        return <Redirect to='/'/>  
    }else if(user == 'loading'){
        return <LoaderCircle background="white" color="var(--maincolorgreen)" />
    }else{
        return(
            <div className="viewUser">
                <div className="containerProfile">
                    <h1 className="title">Editar el perfil</h1>
                    <div className="changue">
                        <label htmlFor="newName">Cambiar Nombre</label>
                        <input className="inputsText" type="text" name="newName" id="newName" placeholder={user.displayName}/>
                    </div>
                    <div className="changue">
                        <label htmlFor="number">Cambiar Numero de celular</label>
                        <input className="inputsText" type="text" name="number" id="number" placeholder={user.phoneNumber}/>
                    </div>
                    <div className="changue">
                        <label htmlFor="photo">Cambiar Foto de perfil</label>
                        <button onClick={handleModal} name="photo" className="buttons Google" id="photo">Seleccionar</button>
                    </div>
                    <div className="changue">
                        <label htmlFor="save">Guardar Cambios</label>
                        <button name="save" className="buttons Google" id="save">Guardar</button>
                    </div>
                    <div className="changue">
                        <label htmlFor="cancel">Cancelar Cambios</label>
                        <button onClick={()=>{window.location=`${window.location.origin}/Profile`}} name="cancel" className="buttons Google" id="cancel">Salir</button>
                    </div>
                    <div className="changue delete">
                        <label htmlFor="delete">Eliminar cuenta</label>
                        <button onClick={deleteUSer} name="delete" className="buttons Google" id="delete">Eliminar</button>
                    </div>
                </div>
                <input type="button" name="close" id="closePhoto"  style={{display: 'none'}}/>
                <div style={{display: `${data.check ? 'block' : 'none'}`}} onClick={(e) => handleModal(e)} className="viewModal">
                    <div className="modalChangePhoto">
                        <h3>Seleccione un modo de subir la imagen</h3>
                        <div className="tab">
                            <button onClick={() => modeUploadPhoto('LINK')}>URL</button>
                            <button onClick={() => modeUploadPhoto('FILE')}>Archivo</button>
                            <button onClick={() => modeUploadPhoto('GRAVATAR')}>Gravatar</button>
                        </div>
                        {data.modeUpload == 'LINK' ? 
                        <>  
                            <h2 style={{marginTop: '20px'}}> Ingrese la url de la imagen</h2>
                            <input type="url" name="url" id="url" className="inputs inputsText" />
                            <button className="buttons Google">Aceptar</button>
                        </> : null}
                        {data.modeUpload == 'FILE' ? <div>Hola como estas</div> : null}
                        {data.modeUpload == 'GRAVATAR' ? <div>Hola como estas</div> : null}
                    </div>
                </div>
            </div>
        );
    }
};

export default EditProfile;