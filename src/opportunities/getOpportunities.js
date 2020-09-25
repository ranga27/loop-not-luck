import firebase from 'firebase/app';

export const getOpportunities = async () => {
    const getOpportunitiesFunction = firebase.functions()
        .httpsCallable('getOpportunities');
    const results = await getOpportunitiesFunction();
    console.log(results);
    return results.data;
}