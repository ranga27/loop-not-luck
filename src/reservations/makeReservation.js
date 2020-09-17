import firebase from 'firebase/app';

export const makeReservation = async (availabilityId, requestedTime, numberOfPeople) => {
    //reference to the firebase function 
    const makeReservation = firebase.app().functions('europe-west2');
    const makeReservationFunction = makeReservation.httpsCallable('makeReservation');
        
    const result = await makeReservationFunction({
        availabilityId,
        requestedTime,
        numberOfPeople,
    });
    return result.data;
}