import {getApp,getApps,initializeApp} from "firebase/app"
import {getFirestore} from "firebase/firestore"






const firebaseConfig = {
  apiKey: "AIzaSyBYi_VisSJW-ZRdt89M7XiLIIkIKJ9fWf0",
  authDomain: "chat-gpt-messenger-d2380.firebaseapp.com",
  projectId: "chat-gpt-messenger-d2380",
  storageBucket: "chat-gpt-messenger-d2380.appspot.com",
  messagingSenderId: "304424117958",
  appId: "1:304424117958:web:6b5b2b28a2dbc1c64e59c7"
};


const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db=getFirestore(app);

export{db};