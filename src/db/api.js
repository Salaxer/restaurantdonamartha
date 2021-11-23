import {appdb, analytics} from './conexiondb';

import { getFirestore, 
    collection, 
    doc, 
    getDocs, 
    addDoc, 
    setDoc, 
    getDoc, 
    deleteDoc, 
    query, 
    where, 
    orderBy,
    arrayUnion, 
    arrayRemove,
    updateDoc,
    limit} from "firebase/firestore";

const db = getFirestore();

const api = {
    async list(reference = 'Menu') {
        const customersOrderQuery = query(
            collection(db, reference),
            limit(9)
        );
        const querySnapshot = (await getDocs(customersOrderQuery));
        return querySnapshot.docs;
    },
    async create(docData, reference = 'Menu') {
        const newDoc = await addDoc(collection(db, reference), docData);
        return newDoc;
    },
    async read(ID, reference = 'Menu') {
        const gettingDoc = await getDoc(doc(db, `${reference}/${ID}`));
        if (gettingDoc.exists()) {
            return gettingDoc.data();
        }else{
            throw new Error("Don't exists the item")
        }
    },
    async update(ID, updates, reference = 'Menu') {
        if (reference == 'Users') {
            const updatingQuery = query(
                collection(db, reference),
                where("userID", "==", `${ID}`)
            );
            const result = await getDocs(updatingQuery);
            console.log(result);
            const newID = result.docs[0].id;
            return await setDoc(doc(db, `${reference}/${newID}`), updates, {merge: true});
        }else{
            await setDoc(doc(db, `${reference}/${ID}`), updates, {merge: true});
        }
        return true
    },
    // Lo hubiera llamado `delete`, pero `delete` es un keyword en JavaScript asi que no es buena idea :P
    async remove(ID, reference = 'Menu') {
        if (reference == 'Users' ) {
            const deletingQuery = query(
                collection(db, reference),
                where("userID", "==", `${ID}`)
            );
            const result = await getDocs(deletingQuery);
            const newID = result.docs[0].id;
            const removeDoc = await deleteDoc(doc(db, `${reference}/${newID}`));
            return console.log(removeDoc);
        }else{
            const removeDoc = await deleteDoc(doc(db, `${reference}/${ID}`));
            return console.log(removeDoc);
        }
    },

    //For the users
    async updateUsersSaves(ID, updates, reference = 'Users'){
        await updateDoc(doc(db, `${reference}/${ID}`), {foodSave: arrayUnion(updates) });
        return true;
    },
    async removeUsersSaves(ID, updates, reference = 'Users'){
        await updateDoc(doc(db, `${reference}/${ID}`), {foodSave: arrayRemove(updates) });
        return true;
    },
    async getUserConection(ID){
        const updatingQuery = query(
            collection(db, 'Users'),
            where("userID", "==", `${ID}`)
        );
        const result = await getDocs(updatingQuery);
        const newID = result.docs[0]; 
        return newID.id;
    }
};

export default api;

