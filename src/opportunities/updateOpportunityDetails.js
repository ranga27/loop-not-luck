//this wrapper function will help users to update info (edit profile)
import firebase from 'firebase/app';
import { getCurrentUser } from '../auth';

/*an async function that takes a single argument called updates 
that will just be an object that contains all the property changes that we want to make into this user.*/
export const updateOpportunityDetails = async updates => {
    const {
        id,
    } = updates;
console.log(updates);
    await firebase.firestore()
        .collection('opportunities')
        .doc(id)
        .update(updates);
}