import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const getOpportunities = functions
    .region('europe-west2')
    .https.onCall(async (data, context) => {
        const store = admin.firestore();
        //to limit our query, best practice else its expensive
        //to do put role based access in the query
        const querySnapshot = await store.collection('opportunities')
            .limit(3)
            .get();

        const opportunities = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
        }));

        return opportunities;
});