import firebase from 'firebase/app';

export const makeReservation = async (availabilityId, requestedTime, numberOfPeople) => {
    //reference to the firebase function 
    const makeReservationFunction = firebase.functions()
    .httpsCallable('makeReservation');
        
    const result = await makeReservationFunction({
        availabilityId,
        requestedTime,
        numberOfPeople,
    });
    return result.data;
}