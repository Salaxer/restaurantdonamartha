import React, { useState } from "react";
import { useParams } from 'react-router';

//pages
import NotFound from './NotFound';

//DB
import api from "../db/api";
import {uploadStorageImages} from "../db/apiStorage";

//utils
import LoaderCircle from "../components/LoaderCircle";
import verifyImage from "../utils/verifyImage";
import swal from "sweetalert";
import ModalNewImage from "../components/modalNewImage";

// import '../assets/styles/admin.css';

//Redux
import { useSelector } from 'react-redux';

const NewProduct = () =>{
    const {adminID} = useParams()
    const conectionID = useSelector(state=>state.conectionID);
    const user = useSelector(state=>state.user);

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
            swal("error", "opcion no disponible para subir", "error")
        }
    }

    const modeUploadPhoto = (type) =>{
        setData({...data, modeUpload: type})
    }

    const uploadProduct = async () =>{
        const form = data.form;
        const _DETAILS = form.details;
        const _INGRE = form.ingredients;
        const _PRICE = form.price;
        const _TIME = form.time;
        const _TITLE = form.title;
        const _TYPE = form.type;
        const _FILE = form.image;
        const _SIZE = form.size;
        if (_DETAILS == '' || _INGRE == '' || _PRICE == 0 || _TIME == '' || _TITLE == '' || _TYPE == '' || _FILE == '' || _SIZE == ''){
           swal("Error","Hay campos vacios", "warning"); 
        }else{
            setData({...data, loader: true});
            if (data.modeUpload == 'FILE') {
                console.log(data);
                console.log('Hola');
                try {
                    const result = await api.create({
                        details: _DETAILS,
                        image: '',
                        ingredients: _INGRE,
                        price: _PRICE,
                        rating: data.form.rating,
                        time: _TIME,
                        title: _TITLE,
                        type: _TYPE,
                        size: _SIZE,
                    });
                    console.log(result);
                    const _newID = result.id;
                    console.log(_newID);
                    const newUrl = await uploadStorageImages(_FILE, _newID, 'adminStorage')
                    console.log(newUrl);
                    const final = await api.update(_newID, {image: newUrl});
                    console.log(final);
                    setData({...data, loader: false});
                    if (final) {
                        swal("Exito","Se ha subido con exito","success");
                    }
                } catch (error) {
                    setData({...data, loader: false});
                    console.log(error.message);
                    swal("Error!","algo fallo al subir, intente denuevo","error");
                }
            }else{
                try {
                    const result = await api.create({...data.form});
                    setData({...data, loader: false});
                    if (result) {
                        swal("Exito","Se ha subido con exito","success");
                    }
                } catch (error) {
                    setData({...data, loader: false});
                    swal("Error!","algo fallo al subir, intente denuevo","error");
                }
            }
        } 
    }

    const [data, setData] = useState({
        loader: false,
        form:{
            title: '',
            price: 0,
            details: '',
            ingredients: '',
            image: '',
            rating: 100,
            time: '',
            type: '',
            size: '',
        },
        modeUpload: undefined, 
        showImage: false,
        errorImage: false,
        check: false, 
    })

    const handleModal = (e) =>{
        if (e.target.className == "viewModal" ||  e.target.name == "photo") {
            data.check ? setData({...data, check: false}) : setData({...data, check: true});
        }
    }

    const updateData = (e) =>{
        setData({
            ...data,
            form:{
                ...data.form,
                [e.target.name]: e.target.value,
            }
        })
    }
    const updateForm = (e) =>{
        setData({...data, form:{ ...data.form, [e.target.name]: e.target.value}})
    }

    if (adminID === user.uid && conectionID[0].type === "owner") {
        return (
            <div className="viewAdmin">
                {data.loader ? <LoaderCircle background='white'/>: 
                    <>
                        <div className="titleAdmin">
                            <h1>Agregar nuevo producto</h1>
                        </div>
                        <div className="contentAdmin">
                            <p>titulo</p>
                            <input onChange={updateData} type="text" name="title" className="inputsText" id="" />
                        </div>
                        <div className="contentAdmin">
                            <p>Precio</p>
                            <input onChange={updateData} type="number" name="price" className="inputsText" id="" />
                        </div>
                        <div className="contentAdmin">
                            <p>Ingredientes</p>
                            <input onChange={updateData} type="text" className="inputsText" name="ingredients" id="" />
                        </div>
                        <div className="contentAdmin">
                            <p>tipo</p>
                            <select onChange={updateData} className="buttons adminButtons"  name="type" id="">
                                <option value=""></option>
                                <option value="food">Comida</option>
                                <option value="drink">Bebida</option>
                                <option value="snack">Botana</option>
                            </select>
                        </div>
                        <div className="contentAdmin">
                            <p>Tiempo(en minutos)</p>
                            <input onChange={updateData} type="number"  className="inputsText" name="time" id="" />
                        </div>
                        <div className="contentAdmin">
                            <p>Descripcion</p>
                            <textarea className="inputsText" name="details" onChange={updateData} rows="10" cols="40"/>
                        </div>
                        <div className="contentAdmin">
                            <p>Tamaño</p>
                            <input onChange={updateData} type="text" className="inputsText" name="size" id="" />
                        </div>
                        <div className="contentAdmin">
                            <p>Imagen</p>
                            <button onClick={handleModal} name="photo" className="buttons adminButtons">Seleccionar</button>
                            <span style={{
                                marginTop: '30px',
                                width: '300px',
                                height: '150px',
                                display: data.showImage ? 'block' : 'none',
                            }} id="showImage">
                                <img id="previewImage" style={{
                                    width: '300px',
                                    height: '150px',
                                }} src={data.modeUpload == 'FILE' ? data.base: data.form.image } alt="nueva foto de perfil" />
                            </span>
                        </div>
                        <button onClick={uploadProduct} className="buttons adminButtons" style={{
                            backgroundColor: 'var(--fillingcolor)', color: 'white', marginBottom: '50px', width: '150px', height: '50px',
                            fontSize: '2rem'
                        }}>Subir</button>
                        <ModalNewImage
                            data={data}
                            handleModal={handleModal}
                            verify={verify}
                            modeUploadPhoto={modeUploadPhoto}
                            setData={setData}
                            updateForm={updateForm}
                        />
                    </>
                }
            </div>
        )
    } else {
        return <NotFound/>
    }
}

export default NewProduct