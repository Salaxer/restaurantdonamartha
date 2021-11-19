import {appdb, analytics} from './conexiondb';
import { getStorage, ref } from "firebase/storage";

const storage = getStorage(firebaseApp);
const storageRef = ref(storage);