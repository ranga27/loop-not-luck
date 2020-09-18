import firebase from 'firebase/app';

export const getOpportunities = async () => {
    const getOpportunitiesFunction = firebase.functions()
        .httpsCallable('getOpportunities');
    const results = await getOpportunitiesFunction();
    return results.data;
}