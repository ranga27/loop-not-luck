import firebase from 'firebase/app';

export const cancelReservation = async reservationId => {
    const cancelReservation = firebase.app().functions('europe-west2');
    const cancelReservationFunction = cancelReservation.httpsCallable('cancelReservation');
    return await cancelReservationFunction({ reservationId });
}