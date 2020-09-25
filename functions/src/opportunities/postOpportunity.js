import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

//oncall function so that FE can call as in when wanted 
export const postOpportunity = functions.https.onCall(async (data, context) => {
        const newOpportunity = data;
        const userId = context.auth.uid;
        const {
            title,
            organisation,
            location,
            positionType,
            description,
            qualification,
            howToApply,
            deadline,
            department,
            startDate,
        } = newOpportunity;

        const store = admin.firestore();
        await store.collection('opportunities')
            .add({
                title,
                organisation,
                location,
                positionType,
                description,
                qualification,
                howToApply,
                deadline,
                department,
                startDate,
                userId,
            });
    })