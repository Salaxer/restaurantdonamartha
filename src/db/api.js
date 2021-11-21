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
        return console.log(newDoc);
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
        if (reference !== 'Menu') {
            const updatingQuery = query(
                collection(db, reference),
                where("userID", "==", `${ID}`)
            );
            const result = await getDocs(updatingQuery);
            const newID = result.docs[0].id;
            return await setDoc(doc(db, `${reference}/${newID}`), updates, {merge: true});
        }else{
            return await setDoc(doc(db, `${reference}/${ID}`), updates, {merge: true});
        }
    },
    // Lo hubiera llamado `delete`, pero `delete` es un keyword en JavaScript asi que no es buena idea :P
    async remove(ID, reference = 'Menu') {
        if (reference !== 'Menu' ) {
            const deletingQuery = query(
                collection(db, reference),
                where("userID", "==", `${ID}`)
            );
            const result = await getDocs(deletingQuery);
            debugger
            const newID = result.docs[0].id;
            const removeDoc = await deleteDoc(doc(db, `${reference}/${newID}`));
            console.log(removeDoc);
            console.log(newID);
            return console.log(removeDoc);
        }else{
            const removeDoc = await deleteDoc(doc(db, `${reference}/${ID}`));
            return console.log(removeDoc);
        }
    },
};

export default api;

