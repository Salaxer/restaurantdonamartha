import {getFirestore, collection, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore";  

const db = getFirestore();


export const QueryMenu = (lastData) =>{
    const next = query(collection(db, "Menu"),
    startAfter(lastData),
    limit(2));
    return next;
}
