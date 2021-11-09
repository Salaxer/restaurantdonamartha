import React, { useState } from 'react';

import imgGoogle from '../assets/5847f9cbcef1014c0b5e48c8.png'
import '../assets/styles/sign_in.css';

import passwordValidator from 'password-validator'; 

import {Google, Facebook, Email} from '../auth';

var schema = new passwordValidator();
schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits

const Signin = () => {
  
  
  const [form, setForm] = useState({data:{name: "", email: "",password: ""}});

  const formValue = (e) =>{
    const buttonSend = document.getElementById('buttonSend');
    setForm({
      data: { 
          ...form.data,
          [e.target.name]: e.target.value
      }
    });
    const spanError = document.getElementById('errorFom');
    const errorPassword = e.target.name == 'password' ? schema.validate(e.target.value, {details: true}): [];
    if (errorPassword.length == 0) {
      buttonSend.disabled = false;
      spanError.style.visibility = 'hidden';
    }else{
      buttonSend.disabled = true;
      spanError.style.visibility = 'visible';
      spanError.innerText = `${errorPassword.map(item => {return item.message})}`
    }
    const formEmail = document.getElementById('textForEmail');
    if (e.target.name == 'email' && e.target.value != "") {
      formEmail.classList.add('validemail')
    }else if(e.target.name == 'email' && e.target.value == ""){
      formEmail.classList.remove('validemail')
    }
  }


  return(
    <div className="Sign_inView">
      <div className="Sign_in">
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
        <button className="inputs buttons buttonRegister" id="buttonSend" disabled onClick={Email({...form.data})}>Registrarse</button>
        <span style={{visibility:'hidden'}} id="errorFom" className="someError"></span>
      </div>
    </div>
  )
};

export default Signin;