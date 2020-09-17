import firebase from 'firebase/app';

export const getCandidateDetails = async id => {
    const candidateDoc = await firebase.firestore()
        .collection('candidates')
        .doc(id)
        .get();

    const candidate = candidateDoc.data();

    return {
        ...candidate,
        id,
    };
}