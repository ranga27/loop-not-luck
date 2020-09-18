import firebase from 'firebase/app';

export const createAccount = async (newUserInfo) => {
    const createAccountFunction = firebase.functions()
        .httpsCallable('createAccount');
    return await createAccountFunction(newUserInfo);
}