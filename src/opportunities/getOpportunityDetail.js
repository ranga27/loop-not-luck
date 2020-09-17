import firebase from 'firebase/app';

export const getOpportunityDetail = async id => {
    const opportunityDoc = await firebase.firestore()
        .collection('opportunities')
        .doc(id)
        .get();

    const opportunity = opportunityDoc.data();

    return {
        ...opportunity,
        id,
    };
}