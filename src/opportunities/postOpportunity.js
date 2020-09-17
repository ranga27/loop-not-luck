import firebase from 'firebase/app';

export const postOpportunity = async (newOpportunity) => {
    console.log('From the wrapper: ');
    console.log(newOpportunity);
    const postOpportunity = firebase.app().functions('europe-west2');
    const postOpportunityFunction = postOpportunity.httpsCallable('postOpportunity');
    return await postOpportunityFunction(newOpportunity);
}