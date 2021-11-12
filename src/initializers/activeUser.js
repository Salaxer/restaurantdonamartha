



const verify = () =>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            // ...
            console.log(user);
            saveUser(user)
        } else {
            // User is signed out
            // ...
        }
    });
}

const mapDispatchToProps = {
    saveUser
}

export default connect(null, mapDispatchToProps)(verify)