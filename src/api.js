import {appdb, analytics} from './conexiondb';

import { getFirestore, doc, setDoc } from "firebase/firestore";

const firestore = getFirestore();

const specialOfTheDay = doc(firestore, 'dailySpecial/2021-09-14');

async function writeDailySpecial(){
  const docData = {
    description: 'A delicious vanilla latte',
    price: 3.99,
    milk: 'Whole',
    vegan: false,
  };
  try {
    await setDoc(specialOfTheDay, docData, {merge: true})
    console.log(' This value has been written to the database');
  } catch (error) {
    console.log(`I got a error: ${error}`);
  }
}

const runApp = () =>{
  console.log('Hi there');
  writeDailySpecial();
}

export default runApp;

