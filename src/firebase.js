import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyDiwv2cmvT935ROAg72xZOBBRuMxq1sJZE",
    authDomain: "food-app-d800b.firebaseapp.com",
    projectId: "food-app-d800b",
    storageBucket: "food-app-d800b.appspot.com",
    messagingSenderId: "421656804601",
    appId: "1:421656804601:web:a9b48039b992bf3a683628"
};


export const app = initializeApp(firebaseConfig);