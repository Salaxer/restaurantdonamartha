import {appdb, analytics} from './conexiondb';

import { getFirestore, collection, doc, getDocs, addDoc, setDoc, getDoc, deleteDoc, query, where, orderBy, limit} from "firebase/firestore";

const db = getFirestore();

const api = {
    async list() {
        const customersOrderQuery = query(
            collection(db, 'Menu'),
            limit(2)
        );
        const querySnapshot = (await getDocs(customersOrderQuery));
        return querySnapshot.docs;
    },
    async create(docData) {
        const newDoc = await (await addDoc(collection(db, `Menu`), docData));
        return console.log(newDoc);
    },
    async read(ID) {
        const gettingDoc = await getDoc(doc(db, `Menu/${ID}`));
        if (gettingDoc.exists()) {
            return gettingDoc.data();
        }else{
            throw new Error("Don't exists the item")
        }
    },
    async update(ID, updates) {
        return setDoc(doc(db, `Menu/${ID}`), updates, {merge: true});
    },
    // Lo hubiera llamado `delete`, pero `delete` es un keyword en JavaScript asi que no es buena idea :P
    async remove(ID) {
        const removeDoc = await deleteDoc(doc(db, `Menu/${ID}`));
        return console.log(removeDoc);
    },
};

export default api;

