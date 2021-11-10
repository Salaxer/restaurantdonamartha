import { getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  updateProfile,
  sendSignInLinkToEmail,
  onAuthStateChanged  } from "firebase/auth";
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

export const Email = async ({name, email, password}) =>{
  const result = await createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: `https://s.gravatar.com/avatar/${md5(email.trim().toLowerCase(),{encoder:"binary"})}?d=identicon`
    }).then(() => {
      // Profile updated!
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
    })
    // ...
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    return {errorMessage, errorCode};
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
      console.log(user);
    } else {
      // User is signed out
      // ...
      func([]);
    }
  });
}

export default {};