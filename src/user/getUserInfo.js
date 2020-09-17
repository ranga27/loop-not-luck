//wrapper function to load data for given userId
import firebase from 'firebase/app';

//async function that takes single argument: userId for the user that we want to load 
export const getUserInfo = async userId => {
    // since firestore queries return a document snapshot instead of directly returning the data in firestore
    const userInfoDoc = await firebase.firestore() 
        .collection('users')
        .doc(userId)
        .get();
    // the above will return document snapshot, for actual data we do the following:
    const userInfo = userInfoDoc.data();
    //if userInfo doesn't exist return null
    if (!userInfo) return null;
    // for returning all properties for userInfo
    return {
        ...userInfo,
        id: userInfoDoc.id,
    };
}