import React, { useState } from 'react';
import {Link, useLocation, BrowserRouter as Router } from "react-router-dom";

import imgGoogle from '../assets/5847f9cbcef1014c0b5e48c8.png'
import LoaderCircle from '../components/LoaderCircle';

import {Google, Facebook, newSignIn} from '../db/auth';
import swal from 'sweetalert';

import '../assets/styles/signup.css';
import '../assets/styles/signin.css';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Signin = () => {
    const query = useQuery();
  
    const [form, setForm] = useState({
        data:{
            email: query.get("email") ? query.get("email"): "", 
            password: ""
        },
        loader: false, 
    });

    const newSession = async() =>{
        if (form.data.email !== "" && form.data.password !== "") {
            try {
                setForm({
                    ...form,
                    loader: true
                });
                await newSignIn({...form.data})
            } catch (error) {
                setForm({
                    ...form,
                    loader: false
                });
                console.log(error.code);
                if (error.code == 'auth/wrong-password') {
                    swal("Oops!", "El correo o la contraseña no son correctas, por favor verifica denuevo", "error");
                }else if(error.code == 'auth/user-not-found'){ 
                    swal("Oops!", "Parece que el correo ingresado no existe, porfavor crea una cuenta nueva", "error");
                }else if(error.code == 'auth/network-request-failed'){ //
                    swal("Oops!", "Conectate a una red porfavor", "error");
                }else{
                    swal("Oops!", "Sucedio un error inesperado, porfavor reintenta mas tarde", "error");
                }
            }
        }else{
            swal("Oops!", "Porfavor ingresa los datos en los capos que se muestran", "error");
        }
    }
    
    const formValue = (e) =>{
        const formEmail = document.getElementById('textForEmail1');
        setForm({
        data: { 
            ...form.data,
            [e.target.name]: e.target.value
        },
        loader: false
        });
        if (e.target.name == 'email' && e.target.value != "") {
        formEmail.classList.add('validemail1')
        }else if(e.target.name == 'email' && e.target.value == ""){
        formEmail.classList.remove('validemail1')
        }
    }

  return(
    <div className="SignView">
      <div className="Sign">
        <h1 className="title">Inicia Sesi&oacute;n</h1>
        <button className="inputs buttons Google" onClick={Google}><img className="Google-img" src={imgGoogle} alt="google image"/> Inicia con Google </button>
        <button className="inputs buttons Facebook" onClick={Facebook}> <i className="fab fa-facebook"></i> Inicia con Facebook </button>
        <div className="divisorLine">
          <span className="divisorLine-text">O</span>
        </div>
        <input className="inputs inputsText" id="email" name="email" value={form.data.email} type="email" autoComplete="true" required onChange={(e) => formValue(e)}/>
        <label className={`textForEmail1 ${query.get("email") ? "validemail1":""}`} id="textForEmail1" htmlFor="email">Correo electronico</label>
        <input className="inputs inputsText" id="password" name="password" type="password" autoComplete="true" required onChange={(e) => formValue(e)}/>
        <label className="textForPass1" htmlFor="password">Contrase&ntilde;a</label>
        <button className="inputs buttons buttonRegister" id="buttonSend" onClick={newSession}>{form.loader ? <LoaderCircle color="var(--maincolorblue)" /> : `Entrar` }</button>
      </div>
      <p className="alreadySingup">¿No tienes una cuenta?, por favor <Link to="/signup"> Registrate</Link></p>
      <p className="alreadySingup">¿Olvidaste tu contrase&ntilde;a?, Restablecela <Link aria-label="restablecer contraseña" to="/Restore"> Aqui </Link></p>
    </div>
  )
};

export default Signin;