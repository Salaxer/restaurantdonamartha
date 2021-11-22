import React from 'react';
import LoaderCircle from './LoaderCircle';
import '../assets/styles/modalNewImage.css'

const ModalNewImage = ({data,handleModal, modeUploadPhoto, updateForm, verify, setData}) => {
    return (
        <>
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
                </> : null}
                {data.modeUpload == 'FILE' ? <>
                    <input className="buttons" type="file" name="image" id="file" onChange={
                            (e) => {setData({...data, form:{ ...data.form, [e.target.name]: e.target.files[0]}})}
                    }/>
                </> : null}
                {data.modeUpload == 'GRAVATAR' ? <>
                <h2 style={{marginTop: '20px', textAlign: 'center'}}>La foto de perfil se colocara con  
                    <a style={{color: 'black'}} href="http://en.gravatar.com/" target="_blank" rel="noopener noreferrer"> GRAVATAR</a>
                </h2>
                </> : null}
                {data.loadModal ? <LoaderCircle/> : null}
                <button className="buttons Googlea accepted" onClick={(e) => {verify()}}>Aceptar</button>
                <span style={{
                        display: data.errorImage ? 'block' : 'none',
                        color: 'red',
                        fontSize: '1.5rem'
                    }}>Verifica que lo que ingreses sea una imagen</span>
            </div>
        </div>
        </>
    )
};

export default ModalNewImage;