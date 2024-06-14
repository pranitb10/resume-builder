import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCX035Nhe02whTHLl7DuTFYw2l1_lB-YlA",

  authDomain: "vitae-791a6.firebaseapp.com",

  projectId: "vitae-791a6",

  storageBucket: "vitae-791a6.appspot.com",

  messagingSenderId: "780224443919",

  appId: "1:780224443919:web:8fe731ca5f8c52e950d57a",

  measurementId: "G-E02NGEETWW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const getUser = () => {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve(user);
        } else {
          resolve(null);
        }
      });
    });
  };
  
export { auth, getUser };