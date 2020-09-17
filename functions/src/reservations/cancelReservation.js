import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const cancelReservation = functions
    .region('europe-west2')
    .https.onCall(async (data, context) => {
        const userId = context.auth.uid;
        const { reservationId } = data;

        const store = admin.firestore();
        const reservationDoc = await store.collection('reservations')
            .doc(reservationId)
            .get();

        const reservation = reservationDoc.data();

        if (reservation.userId !== userId) {
            return { status: 'error', code: 404, message: 'Reservation not found' };
        }

        await store.collection('reservations')
            .doc(reservationId)
            .delete();

        const querySnapshot = await store.collection('dateAvailabilities')
            .where('restaurantId', '==', reservation.restaurantId)
            .where('date', '==', reservation.date)
            .get();
        
            //since its going to return 1 record only
        const availabilityInfoDoc = querySnapshot.docs[0];
        const availableTimes = availabilityInfoDoc.data().availableTimes;

        await store.collection('dateAvailabilities')
            .doc(availabilityInfoDoc.id)
            .update({
                availableTimes: availableTimes.concat(reservation.time),
            });
        
        return { code: 200, message: 'Success' };
});