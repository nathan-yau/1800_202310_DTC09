//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyDU6A77OrBRI0g8hqTxJWmUlWfWZp9vycY",
    authDomain: "fir-c7dbd.firebaseapp.com",
    projectId: "fir-c7dbd",
    storageBucket: "fir-c7dbd.appspot.com",
    messagingSenderId: "885333771692",
    appId: "1:885333771692:web:d0dc7e00d0ad8c6208e609"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();