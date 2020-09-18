import firebase from 'firebase/app';

export const postOpportunity = async (newOpportunity) => {
    console.log('From the wrapper: ');
    console.log(newOpportunity);
    const postOpportunityFunction = firebase.functions()
        .httpsCallable('postOpportunity');
    return await postOpportunityFunction(newOpportunity);
}