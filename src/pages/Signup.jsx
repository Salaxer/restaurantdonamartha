import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import imgGoogle from '../assets/5847f9cbcef1014c0b5e48c8.png'

import passwordValidator from 'password-validator'; 
import {Google, Facebook, Email} from '../db/auth';
import swal from 'sweetalert';

import LoaderCircle from '../components/LoaderCircle';
import '../assets/styles/signup.css';

var schema = new passwordValidator();
schema
.is().min(8)                                    // Minimum length 8
.is().max(40)                                  // Maximum length 40
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits

const Signup = () => {
  
  const [form, setForm] = useState({data:{name: "", email: "",password: ""}, loader: false});
  
  const authForEmail = async () => {
    const spanError = document.getElementById('errorFom');
    const errorPassword = schema.validate(form.data.password, {details: true});
    if (errorPassword.length == 0) {
      spanError.style.visibility = 'hidden';
      try {
        setForm({
          ...form,
          loader: true,
        });
        await Email({...form.data});
      } catch (error) {
        setForm({
          ...form,
          loader: false,
        });
        if(error.code == 'auth/email-already-in-use'){
          swal("Oops!", "El correo que se ingreso ya existe, porfavor verifica o intenta iniciar sesion con el!", "error");
        }else if(error.code == 'auth/missing-email'){
          swal("Oops!", "Verifica que los campos esten completos", "error");
        }else if(error.code == 'auth/network-request-failed'){ //
          swal("Oops!", "Conectate a una red porfavor", "error");
        }else{
          swal("Oops!", "Sucedio un error inesperado, porfavor reintenta mas tarde", "error");
        }
      }
    }else{
      spanError.style.visibility = 'visible';
      spanError.innerText = `${errorPassword.map(item => {return item.message})}`
      return false;
    }
  }

  const formValue = (e) =>{
    setForm({
      data: { 
          ...form.data,
          [e.target.name]: e.target.value
      },
      loader: false,
    });
    const formEmail = document.getElementById('textForEmail');
    if (e.target.name == 'email' && e.target.value != "") {
      formEmail.classList.add('validemail')
    }else if(e.target.name == 'email' && e.target.value == ""){
      formEmail.classList.remove('validemail')
    }
  }

  return(
    <div className="SignView">
      <div className="Sign">
        <h1 className="title">Registro</h1>
        <button className="inputs buttons Google" onClick={Google}><img className="Google-img" src={imgGoogle} alt="google image"/> Registrate con Google </button>
        <button className="inputs buttons Facebook" onClick={Facebook}> <i className="fab fa-facebook"></i> Registrate con Facebook </button>
        <div className="divisorLine">
          <span className="divisorLine-text">O</span>
        </div>
        <input className="inputs inputsText" id="name" name="name" type="name" autoComplete="true" required onChange={(e) => formValue(e)}/>
        <label className="textForName" htmlFor="name">Nombre</label>
        <input className="inputs inputsText" id="email" name="email" type="email" autoComplete="true" required onChange={(e) => formValue(e)}/>
        <label className="textForEmail" id="textForEmail" htmlFor="email">Correo electronico</label>
        <input className="inputs inputsText" id="password" name="password" type="password" autoComplete="true" required onChange={(e) => formValue(e)}/>
        <label className="textForPass" htmlFor="password">Contrase&ntilde;a</label>
        <button className="inputs buttons buttonRegister" id="buttonSend" onClick={authForEmail}>{form.loader ? <LoaderCircle color="0096C1" /> : `Registrarse` }</button>
        <span style={{visibility:'hidden'}} id="errorFom" className="someError"></span>
      </div>
      <p className="alreadySingup">¿Ya tienes una cuenta?, por favor <Link to="/signin"> Inicia Sesi&oacute;n</Link></p>
    </div>
  )
};

export default Signup;