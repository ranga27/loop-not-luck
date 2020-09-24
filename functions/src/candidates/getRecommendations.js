import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const getRecommendations = functions.https.onCall(async (data, context) => {
        const store = admin.firestore();
        //to limit our query, best practice else its expensive
        const querySnapshot = await store.collection('candidates')
            //.limit(3)
            .get();

        const candidates = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
        }));

        return candidates;
});