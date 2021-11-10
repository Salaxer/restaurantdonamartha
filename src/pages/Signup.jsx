import React, { useState } from 'react';

import imgGoogle from '../assets/5847f9cbcef1014c0b5e48c8.png'
import '../assets/styles/signup.css';

import passwordValidator from 'password-validator'; 

import {Google, Facebook, Email} from '../auth';

var schema = new passwordValidator();
schema
.is().min(8)                                    // Minimum length 8
.is().max(40)                                  // Maximum length 40
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits

const Signup = () => {
  
  const [form, setForm] = useState({data:{name: "", email: "",password: ""}});
  
  const authForEmail = async () => {
    const spanError = document.getElementById('errorFom');
    const errorPassword = schema.validate(form.data.password, {details: true});
    if (errorPassword.length == 0) {
      spanError.style.visibility = 'hidden';
      const register = await Email({...form.data});
      console.log(register);
      if (register.errorMessage) {
        alert(`El email que esta  ingresando ya esta en uso`);
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
      }
    });
    const formEmail = document.getElementById('textForEmail');
    if (e.target.name == 'email' && e.target.value != "") {
      formEmail.classList.add('validemail')
    }else if(e.target.name == 'email' && e.target.value == ""){
      formEmail.classList.remove('validemail')
    }
  }


  return(
    <div className="SignupView">
      <div className="Signup">
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
        <button className="inputs buttons buttonRegister" id="buttonSend" onClick={authForEmail}>Registrarse</button>
        <span style={{visibility:'hidden'}} id="errorFom" className="someError"></span>
      </div>
    </div>
  )
};

export default Signup;