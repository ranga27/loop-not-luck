import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const searchRestaurants = functions
    .region('europe-west2')
    .https.onCall(async (data, context) => {
        const { searchString } = data;
        const store = admin.firestore();
       /*TODO: for ensuring that it's only authenticated users that are able to call these functions, what we should do is:
        const authUid = context.auth.uid; And then if this doesn't exist here, return null or return some kind of error*/

        //Extend the search functionality here using machine learning logic
        const querySnapshot = await store.collection('restaurants')
            .where('name', '==', searchString)
            .get();

        const restaurants = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
        }));

        return restaurants;
});