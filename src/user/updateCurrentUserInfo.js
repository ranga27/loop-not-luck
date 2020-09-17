//this wrapper function will help users to update info (edit profile)
import firebase from 'firebase/app';
import { getCurrentUser } from '../auth';

/*an async function that takes a single argument called updates 
that will just be an object that contains all the property changes that we want to make into this user.*/
export const updateCurrentUserInfo = async updates => {
    const currentUser = getCurrentUser();

    if (!currentUser) return;

    await firebase.firestore()
        .collection('users')
        .doc(currentUser.id)
        .update(updates);
}