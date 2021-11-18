import React, {useState} from "react";

import {restorePassword} from "../db/auth";

import swal from "sweetalert";

import '../assets/styles/Restore.css'
import LoaderCircle from "../components/LoaderCircle";

const Restore = () =>{
    const [form, setForm] = useState({email: '', loader: false})

    const handleSubmit = async (e) =>{
        try{
            setForm({
                ...form,
                loader: true,
            });
            await restorePassword(form.email);
        }catch(error){
            if ( error.code == 'auth/network-request-failed') {
                swal("Oops!" , "Parece que no hay internet", "error");
            }else if(error.code == 'auth/invalid-email'){
                swal("Error" , "Ingresa un correo valido", "error");
            }else if(error.code == 'auth/user-not-found'){
                swal({
                    title: "Error",
                    text: "La cuenta no se encontro, registrate ahora",
                    icon: "warning",
                    dangerMode: false,
                    button: {
                        text: "Aceptar!",
                      }
                  })
                  .then(willDelete => {
                    if (willDelete) {
                        window.location=`${window.location.origin}/Signup/?email=${form.email}`;
                    }
                  });
            } else {
                swal("Lo sentimos" , "Ocurrio un error inesperado", "error");
            }
            setForm({
                ...form,
                loader: false,
            });
        }
    }
    const verifyEmail = (e) =>{
        setForm({
            ...form,
            email: e.target.value
        });
    }

    return (
        <div className="viewRestore">
            <form className="viewBoxRestore">
                {form.loader ? <LoaderCircle position="absolute"/> : null}
                <p className="titleRestore" aria-label="ingresa tu email">Restablece la contraseña ingresando tu email</p>
                <input className="inputs inputsText emailRestore" name="email" type="email" placeholder="Ingresa tu email" onChange={(e) => {verifyEmail(e)}} value={form.email}required/>
                <button type="button" className="inputs buttons buttonRestore" onClick={e => {handleSubmit(e)}}>Restablecer</button>
            </form>
        </div>
    )
}

export default Restore;