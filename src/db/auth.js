//Firebase
import {appdb, analytics} from './conexiondb';
import { getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
  signInWithEmailAndPassword ,
  deleteUser,
  reauthenticateWithCredential,
  AuthCredential,
  EmailAuthProvider
} from "firebase/auth";


//Utils
import md5 from "md5";
import swal from 'sweetalert';
import api from './api';


const provider = new GoogleAuthProvider();
const auth = getAuth();

export const Google = () =>{
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      // createNewConnectionPublic(true, token);
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
    const photo = `https://s.gravatar.com/avatar/${md5(email.trim().toLowerCase(),{encoder:"binary"})}?d=identicon&s=200`;
    modifyProfile(name, photo, email, true);
  })
  return result;
}

export const newSignIn = async ({email, password}) =>{
  await signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    const emailVerified = user.emailVerified;
    if (!emailVerified) {
      swal({
        title: "Ups!",
        text: "Parece que el correo aun no se ha verificado!, porfavor verificalo e intentelo denuevo",
        icon: "error",
        dangerMode: true,
      })
      .then( () => {
        closeUser(true, email);
      });
    }else{
      window.location=`${window.location.origin}/Profile`;
    }
    // ...
  })
}

//to modify profile of the users
export const modifyProfile = async (name, photo, email, newUser, phone) =>{
  const newName = name ? {displayName: name} : newUser ? {displayName: 'user'} : undefined;
  const newPhoto = photo ? {photoURL: photo} : undefined;
  const newPhone = phone ? {phoneNumber: phone}: undefined;
  const allConstant =  Object.assign(
    typeof newName === 'undefined' ? {} : newName,
    typeof newPhoto === 'undefined' ? {} : newPhoto,
    typeof newPhone === 'undefined' ? {} : newPhone
  );
  await updateProfile(auth.currentUser, allConstant).then(() => {
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
    swal({
      title: "Excelente!",
      text: "Se ha enviado un correo de verificacion, porfavor verificalo e inicia sesion denuevo!",
      icon: "success",
      dangerMode: false,
    })
    .then( () => {
      createNewConnectionPublic(false, undefined ,email);
    });
  });
    return result;
}

const createNewConnectionPublic = async (byGoogle, token = null, email) =>{
  const user = {
    userID: auth.currentUser.uid,
    userName: auth.currentUser.displayName,
    photoURL: auth.currentUser.photoURL,
    type: 'user',
    token,
  }
  await api.create(user, 'Users');
  if (byGoogle) {
    window.location=`${window.location.origin}/Profile`;
  }else{
    closeUser(true, email);
  }
}


export const restorePassword = async (email) =>{
  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: `${window.location.origin}/Signin/?email=${email}`,
    // This must be true.
    handleCodeInApp: true,
  };
  const result = await sendPasswordResetEmail(auth, email, actionCodeSettings)
  .then(() => {
    swal({
      title: "Excelente!",
      text: "Se ha enviado un correo electronico para reestablecer tu contraseña!",
      icon: "success",
      dangerMode: false,
    })
    .then( () => {
      window.location=`${window.location.origin}/Signin/`;
    });
  })
  return result;
}

export const closeUser = (newUSer, email) =>{
  signOut(auth).then(() => {
    // Sign-out successful.
    if (newUSer) {
      window.location=`${window.location.origin}/Signin/?email=${email}`;
    }else{
      window.location=`${window.location.origin}/Signin`;
    }
  }).catch((error) => {
    swal("Oops!", `Sucedio un error inesperado, porfavor reintenta mas tarde ${error.message}`, "error");
    // An error happened.
  });
}

const reAuth = async (password) =>{
  const user = auth.currentUser;
  const credential = EmailAuthProvider.credential(
      user.email,
      password
   );
  const result = await reauthenticateWithCredential(user, credential).then(() => {
    // User re-authenticated.
  });
  return result;
}

const verifyProvider = (user) =>{
  if (user.providerData.length == 1) {
    const result = user.providerData[0];
    return result.providerId;
  }else{
    return 'none'
  }
}

export const deleteAccount = async() =>{
  const user = auth.currentUser;
  const result  = verifyProvider(user);
  if(result == 'password'){
    const passwordTo = await swal({
      title: "¿Estas seguro que desea eliminar su cuenta?",
      text: "Esta acción es permanente y no se puede revertir. Para continuar ingrese contraseña",
      icon: "warning",
      content: "input",
      dangerMode: true,
    });
    if (passwordTo) {
      // auth/wrong-password
      try {
        const verify = await reAuth(passwordTo)
        const res = await deleteUser(user).then(() => {
          // User deleted.
          swal({
            title: "Exito",
            text: "Su cuenta ah sido eliminada exitosamente, lamentamos su retiro",
            icon: "success",
            dangerMode: false,
          })
        }).catch((error) => {
          swal("Error!", "ha ocurrido un error inesperado!", "error");
        });
      } catch (error) {
        if (error.code == "auth/wrong-password") {
          swal("Error!", "Su contraseña es incorrecta", "error");
        }else{
          swal("Error!", "Sucedio un error inesperado", "error");
        }
      }
    }else{
      swal("Error!", "Ingrese su contraseña", "warning");
    }
  }else if(result == 'google.com'){
    swal("Error!", "su cuenta esta enlazada su cuenta de Google, para eliminarla debe de descincular desde su cuenta", "warning");
  }else{
    swal("Error!", "su cuenta esta enlazada a distintos provesores, por favor, desvincule la cuenta antes", "warning");
  }
  
}

export default {};