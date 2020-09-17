import firebase from 'firebase/app';

export const getCandidate = async id => {
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