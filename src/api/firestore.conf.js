// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIRESTORE_APIKEY,
    authDomain: 'crud-test-f4a05.firebaseapp.com',
    projectId: 'crud-test-f4a05',
    storageBucket: 'crud-test-f4a05.appspot.com',
    messagingSenderId: '501906784331',
    appId: process.env.FIRESTORE_APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
