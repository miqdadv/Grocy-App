// import { initializeApp } from "@react-native-firebase/app";
// import { getAuth } from "@react-native-firebase/auth";

// const firebaseConfig = {
//     apiKey:"AIzaSyCe7Pqmd_9Qh2lXPuaph1AdjgRUuZOcg2A",
//     authDomain:"grocy-app-5119d.firebaseapp.com",
//     projectId:"grocy-app-5119d",
//     storageBucket:"grocy-app-5119d.firebasestorage.app",
//     messagingSenderId:"",
//     appId:"1:127366573528:android:96a225ba3218c63a6e96ad"
// }

// const appPromise = initializeApp(firebaseConfig);

// export const auth = appPromise.then(app => getAuth(app));

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export {auth, firestore};