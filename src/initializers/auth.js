import {appdb, analytics} from './conexiondb';
import { getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  updateProfile,
  sendEmailVerification,
  onAuthStateChanged,
  signOut   
} from "firebase/auth";

import { connect } from 'react-redux';

import md5 from "md5";

const provider = new GoogleAuthProvider();
const auth = getAuth();

export const Google = () =>{
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

export const Facebook = () =>{
    return console.log('Hello');
}

// Sign up with email, then update profile with gravatar and the name and finally sent Email verification to complete the proccess. 
export const Email = async ({name, email, password}) =>{
  const result = await createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    // const user = userCredential.user;
    // console.log('Se ha creado el usuario :)');
    const photo = `https://s.gravatar.com/avatar/${md5(email.trim().toLowerCase(),{encoder:"binary"})}?d=identicon`;
    modifyProfile(name, photo, email, true);
  })
  return result;
}

export const modifyProfile = async (name, photo, email, newUser) =>{
  await updateProfile(auth.currentUser, {
    displayName: name,
    photoURL: photo
  }).then(() => {
    // console.log('Se ha colocado la foto de perfil y el nombre del usuario:)');
    // Profile updated!
    if (newUser) {
      sendEmail(email);
    }
  })
} 

const sendEmail = async (email) =>{
  const result = await sendEmailVerification(auth.currentUser)
  .then(() => {
    console.log(auth.currentUser.displayName);
    console.log(`Se ha enviado el email de verificación`);
    console.log(window.location);
    window.location=`${window.location.origin}/verify/${auth.currentUser.uid}`;
  });
    return result;
}

export const verify = (func) =>{
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // ...
      func(user);
    } else {
      // User is signed out
      // ...
      func([]);
    }
  });
}

export const closeUser = () =>{
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log('Salido con exito');
  }).catch((error) => {
    console.log(`Ha ocurrido un error ${error}`);
    // An error happened.
  });
}

export default {};