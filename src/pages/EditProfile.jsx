import React, { useEffect, useState } from 'react';
import  { Link, Navigate } from 'react-router-dom'

//Redux
import { useSelector } from 'react-redux';

//auth
import { deleteAccount, modifyProfile } from '../db/auth';

//style
import '../assets/styles/editProfile.css'

//utils
import getGravatarURL from '../utils/gravatar';
import verifyImage from '../utils/verifyImage';
import swal from 'sweetalert';

//components
import LoaderCircle from '../components/LoaderCircle';
import ModalNewImage from '../components/modalNewImage'

const EditProfile = () => {
    const user = useSelector(state=>state.user)

    const verify = async () =>{
        if (!data.form.image == "") {
            setData({...data, loadModal: true});
           if(data.modeUpload == "LINK"){
                const result = await verifyImage(data.form.image, data.modeUpload);
                if (result == 'error') {
                    setData({...data,showImage: false, loadModal: false, errorImage: true, form:{ ...data.form, image: ''}});
                }else{
                    setData({...data, loadModal: false, showImage: true, check: false, errorImage: false});
                }
            }else{
                const result = await verifyImage(data.form.image, data.modeUpload);
                console.log(result);
                if (result == 'error') {
                    setData({...data,showImage: false, loadModal: false, errorImage: true, form:{ ...data.form, image: ''}});
                }else{
                    setData({...data, loadModal: false, showImage: true, check: false, errorImage: false, base: result});
                }
            }
        }
        if (data.modeUpload == "GRAVATAR") {
            setData({...data, loadModal: true});
            const newImage = getGravatarURL(user.email);
            setData({...data,showImage: true, loadModal: false, errorImage: false,check: false, form:{ ...data.form, image: newImage}});
        }
    }
    
    const updateAccount = async() =>{
        if (data.form.name=='' && data.form.image=='') {
            swal("Oops!", `Parece que no hay nada que guardar`, "warning");
        }else{
            try {
                setData({...data, saving: true});
                const result = await modifyProfile(data.form.name, data.form.image, null, false, data.modeUpload);
                if (result) {
                    console.log(result);
                    setData({...data, saving: false});
                    swal({
                        title: "Excelente!",
                        text: "Se han actualizado correctamente tus datos!",
                        icon: "success",
                        dangerMode: false,
                    })
                    .then( () => {
                        window.location=`${window.location.origin}/Profile`;
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    const deleteUSer = async () =>{
        setData({...data, saving: true});
        const result = await deleteAccount();
        if (result) {
            setData({...data, saving: false});
        }
    }

    const [data, setData] = useState({
        check: false, 
        modeUpload: undefined, 
        loadModal: false, 
        form:{
            image: '',
            name: '',
        },
        showImage: false,
        errorImage: false,
        saving: false,
        base: ''
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
        return(()=>{
            setData({});
        })
    },[])
    if (user == null) {
        return <Navigate to='/'/>  
    }else if(user == 'loading'){
        return <LoaderCircle background="white" color="var(--maincolorgreen)" />
    }else{
        return(
            <div className="viewUser">
                <div className="containerProfile">
                    {data.saving ? <LoaderCircle/> : null}
                    <h1 className="title">Editar el perfil</h1>
                    <div className="changue">
                        <label htmlFor="newName">Cambiar Nombre</label>
                        <input onChange={
                            (e) => {updateForm(e)}
                        } value={data.form.name} className="inputsText" type="text" name="name" id="newName" placeholder={user.displayName}/>
                    </div>
                    <div className="changue">
                        <label htmlFor="photo">Cambiar Foto de perfil</label>
                        <button onClick={handleModal} name="photo" className="buttons Google" id="photo">Seleccionar</button>
                        <span style={{
                            width: '100px',
                            height: '100px',
                            display: data.showImage ? 'block' : 'none',
                        }} id="showImage">
                            <img id="previewImage" style={{
                                width: '100px',
                                height: '100px',
                            }} src={data.modeUpload == 'FILE' ? data.base: data.form.image } alt="nueva foto de perfil" />
                        </span>
                    </div>
                    <div className="changue">
                        <label htmlFor="save">Guardar Cambios</label>
                        <button name="save" className="buttons Google" onClick={updateAccount} id="save">Guardar</button>
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
                <ModalNewImage data={data} 
                    handleModal={handleModal} 
                    modeUploadPhoto={modeUploadPhoto}
                    updateForm={updateForm}
                    verify={verify}
                    setData={setData}
                />
            </div>
        );
    }
};

export default EditProfile;