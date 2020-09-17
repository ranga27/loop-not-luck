import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const confirmEmail = functions
    .region('europe-west2')
    .https.onRequest(async (req, res) => {
    const confirmationHash = req.query.conf;
    const auth = admin.auth();
    const store = admin.firestore();

    const querySnapshot = await store.collection('temporaryUsers')
        .where('confirmationHash', '==', confirmationHash)
        .get();

    if (querySnapshot.size === 0) {
        return res.redirect('http://localhost:3000/email-confirmation/failure');
    }

    const temporaryUserDoc = querySnapshot.docs[0];

    const {
        authUid,
        emailAddress,
        firstName,
        lastName,
        accountType,
    } = temporaryUserDoc.data();

    await auth.updateUser(authUid, { emailVerified: true });
    await store.collection('users')
        .doc(authUid)
        .set({
            emailAddress,
            firstName,
            lastName,
            accountType,
        });
    await store.collection('temporaryUsers')
        .doc(temporaryUserDoc.id)
        .delete();
    return res.redirect('http://localhost:3000/email-confirmation/success');
});