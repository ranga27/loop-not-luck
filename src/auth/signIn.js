import firebase from 'firebase/app';
import { getCurrentUserInfo } from '../user';

export const signIn = async (email, password) => {
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        const userInfo = await getCurrentUserInfo();
        //whenever we need another property from the result 
        return userInfo['role'];
    }
    catch (e) {
        throw new Error('Error signing in');
    }
}
