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
    const userRef = firestore.doc(`/user/${userAuth.uid}`);
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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd)=> {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
        //batch是firestore裡面的一個method，目的跟上面的userRef.set的目的是一樣的，只不過這個是用在collection上面的
    });

    return await batch.commit();
}
//這個是一次性的function，目的是為了讓shop_data這個資料庫能夠上傳到firebase database，但是可以留在這裡不用刪除，以防以後還需要updata
//寫完這個function之後，去app.js(因為app.js可以接觸到shop_data,而且did amount是只會render一次的，which is what we need, 
//this function will run once, once the firebase got the data, it will be deleted)


export const convertCollectionsSnopshotToMap = collections => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } =  doc.data();

        return{
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title, 
            items
        }
    });
    return transformedCollection.reduce((accmulator, collection)=> {
        accmulator[collection.title.toLowerCase()]= collection;
        return accmulator;
    }, {});
};

//這個function的作用是要把firebase得到的array轉換成snopshot object,而且還要把routeName, id都加進來


  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;