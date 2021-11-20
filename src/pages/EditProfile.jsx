import React, { useEffect, useState } from 'react';
import  { Link, Redirect } from 'react-router-dom'

//Redux
import { useSelector } from 'react-redux';

//auth
import { deleteAccount } from '../db/auth';

//style
import '../assets/styles/editProfile.css'

//utils
import getGravatarURL from '../utils/gravatar';
import LoaderCircle from '../components/LoaderCircle';
import verifyImage from '../utils/verifyImage';

const EditProfile = () => {
    const user = useSelector(state=>state.user)

    const verify = async () =>{
        setData({...data, loadModal: true});
        if (data.modeUpload == "GRAVATAR") {
            const newImage = getGravatarURL(user.email);
            setData({...data,showImage: true, loadModal: false, errorImage: false,check: false, form:{ ...data.form, image: newImage}});
        }else{
            const result = await verifyImage(data.form.image, data.modeUpload);
            if (result == 'error') {
                setData({...data,showImage: false, loadModal: false, errorImage: true, form:{ ...data.form, image: ''}});
            }else{
                setData({...data, loadModal: false, showImage: true, check: false, errorImage: false});
            }
        }
    }
    
    const deleteUSer = async () =>{
        await deleteAccount();
    }

    const [data, setData] = useState({
        check: false, 
        modeUpload: undefined, 
        loadModal: false, 
        form:{
            image: '',
            name: '',
            phone: '',
        },
        showImage: false,
        errorImage: false,
    })

    const handleModal = (e) =>{
        if (e.target.className == "viewModal" ||  e.target.id == "photo") {
            data.check ? setData({...data, check: false}) : setData({...data, check: true});
        }
    }
    const modeUploadPhoto = (type) =>{
        setData({...data, modeUpload: type})
    }
    const updateForm = (e) =>{
        setData({...data, form:{ ...data.form, [e.target.name]: e.target.value}})
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
                        <input onChange={
                            (e) => {updateForm(e)}
                        } value={data.form.name} className="inputsText" type="text" name="name" id="newName" placeholder={user.displayName}/>
                    </div>
                    <div className="changue">
                        <label htmlFor="number">Cambiar Numero de celular</label>
                        <input onChange={
                            (e) => {updateForm(e)}
                        } value={data.form.phone} className="inputsText" type="text" name="phone" id="number" placeholder={user.phoneNumber}/>
                    </div>
                    <div className="changue">
                        <label htmlFor="photo">Cambiar Foto de perfil</label>
                        <button onClick={handleModal} name="photo" className="buttons Google" id="photo">Seleccionar</button>
                        <span style={{
                            width: '100px',
                            height: '100px',
                            display: data.showImage ? 'block' : 'none',
                        }} id="showImage">
                            <img style={{
                                width: '100px',
                                height: '100px',
                            }} src={data.form.image} alt="nueva foto de perfil" />
                        </span>
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
                            <input value={data.form.image} type="url" name="image" id="url" onChange={
                                (e) => {updateForm(e)}
                            } className="inputs inputsText" />
                            <span style={{
                                display: data.errorImage ? 'block' : 'none',
                                color: 'red',
                                fontSize: '1.5rem'
                            }}>url no valida</span>
                            <button className="buttons Googlea accepted" onClick={(e) => {verify()}}>Aceptar</button>
                        </> : null}
                        {data.modeUpload == 'FILE' ? <>
                            <input className="buttons" type="file" name="image" id="file" onChange={
                                 (e) => {updateForm(e)}
                            }/>
                        </> : null}
                        {data.modeUpload == 'GRAVATAR' ? <>
                        <h2 style={{marginTop: '20px'}}>La foto de perfil se colocara con  
                            <a style={{color: 'black'}} href="http://en.gravatar.com/" target="_blank" rel="noopener noreferrer"> GRAVATAR</a>
                        </h2>
                        <button className="buttons Googlea accepted" onClick={(e) => {verify()}}>Aceptar</button>
                        </> : null}
                        {data.loadModal ? <LoaderCircle/> : null}
                    </div>
                </div>
            </div>
        );
    }
};

export default EditProfile;