import firebase from "firebase/app";
import 'firebase/analytics'

const firebaseConfig = {
    apiKey: "AIzaSyA-anpkgYd1yqQIBWpMoRZZUUwwgJgUHYc",
    authDomain: "material-minimal-todo.firebaseapp.com",
    databaseURL: "https://material-minimal-todo.firebaseio.com",
    projectId: "material-minimal-todo",
    storageBucket: "material-minimal-todo.appspot.com",
    messagingSenderId: "382588309308",
    appId: "1:382588309308:web:f25c6d82847c2766f9d839",
    measurementId: "G-5X3MJL75MW"
};

const startFirebase = () => {
    firebase.initializeApp(firebaseConfig)
    let analytics
    if (process.env.NODE_ENV === 'production') {
        analytics = firebase.analytics();
    }

    return analytics
}
const initializeFirestore = () => {
    return firebase.firestore();
}

export {startFirebase, initializeFirestore}
