import firebase from 'firebase/app';

export const getOpportunities = async () => {
    const getOpportunities = firebase.app().functions('europe-west2');
    const getOpportunitiesFunction = getOpportunities.httpsCallable('getOpportunities');
    const results = await getOpportunitiesFunction();
    return results.data;
}