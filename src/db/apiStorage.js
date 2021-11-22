import {appdb, analytics} from './conexiondb';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject} from "firebase/storage";

const storage = getStorage();

// Create a reference to 'mountains.jpg'

export const deleteStorageImages = async (id, database = 'UsersPhoto') =>{
    const desertRef = ref(storage,  `${database}/${id}`);
    // Delete the file
    return await deleteObject(desertRef).then((something) => {
        return something;
    })
}


export const uploadStorageImages = async (img, id, database = 'UsersPhoto') =>{
    const reference = ref(storage, `${database}/${id}`);
    const result = await uploadBytes(reference, img).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        const result = getDownloadURL(reference)
        .then((url) => {
            return url;
        })
        return result;
    });
    return result;
}

export default {};

// .catch((error) => {
        //     // A full list of error codes is available at
        //     // https://firebase.google.com/docs/storage/web/handle-errors
        //     switch (error.code) {
        //     case 'storage/object-not-found':
        //         // File doesn't exist
        //         break;
        //     case 'storage/unauthorized':
        //         // User doesn't have permission to access the object
        //         break;
        //     case 'storage/canceled':
        //         // User canceled the upload
        //         break;
        //     case 'storage/unknown':
        //         // Unknown error occurred, inspect the server response
        //         break;
        //     }
        // });