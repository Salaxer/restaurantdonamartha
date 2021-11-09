import React, { useState } from 'react';


import '../assets/styles/sign_in.css';

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

const auth = getAuth();


const Signin = () => {
  
  const Google = () =>{
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }
  const [form, setForm] = useState({data:{name: "", email: "",password: ""}});

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
      console.log(e.target.value);
    }else if(e.target.name == 'email' && e.target.value == ""){
      formEmail.classList.remove('validemail')
    }
  }


  return(
    <div className="Sign_inView">
      <div className="Sign_in">
        <h1 className="title">Registro</h1>
        <button className="inputs buttons Google" onClick={Google}><img className="Google-img" src="http://assets.stickpng.com/images/5847f9cbcef1014c0b5e48c8.png" alt="google image"/> Registrate con Google </button>
        <button className="inputs buttons Facebook"> <i className="fab fa-facebook"></i> Registrate con Facebook </button>
        <div className="divisorLine">
          <span className="divisorLine-text">O</span>
        </div>
        <input className="inputs inputsText" id="name" name="name" type="name" autoComplete="true" required onChange={(e) => formValue(e)}/>
        <label className="textForName" htmlFor="name">Nombre</label>
        <input className="inputs inputsText" id="email" name="email" type="email" autoComplete="true" required onChange={(e) => formValue(e)}/>
        <label className="textForEmail" id="textForEmail" htmlFor="email">Correo electronico</label>
        <input className="inputs inputsText" id="password" name="password" type="password" autoComplete="true" required onChange={(e) => formValue(e)}/>
        <label className="textForPass" htmlFor="password">Contrase&ntilde;a</label>
        <button className="inputs buttons buttonRegister">Registrarse</button>
      </div>
    </div>
  )
};

export default Signin;