import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyB3JWqfupxwdXkbgBI3GHjUlDISvI9R0Fg",
    authDomain: "clothing-30928.firebaseapp.com",
    databaseURL: "https://clothing-30928.firebaseio.com",
    projectId: "clothing-30928",
    storageBucket: "clothing-30928.appspot.com",
    messagingSenderId: "7839175547",
    appId: "1:7839175547:web:af0dc379d7e862fa1563de",
    measurementId: "G-RBL2EMBXCZ"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`/user/${userAuth.uid}`)
    // uid是在這裡console.log(userAuth)裡面得到的一系列東西的google產生的一個id
    const snapShot = await userRef.get();
    if(!snapShot.exists){
        const {displayName, email } = userAuth;
        const createAt = new Date();
        try{
            await userRef.set({displayName, email, createAt, ...additionalData})
        }catch(error) {
            console.log('error creating user', error.message)
        }
    }
    // 這個if statement是在判斷如果沒有這個新登陸的用戶資料，就新創造一個，如果有，就什麼都不用做
    return userRef;
}

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;