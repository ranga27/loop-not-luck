/*wrapper function for subscribing to reservations, 
this'll populate the reservation with the data of the corresponding restaurant */
import firebase from 'firebase/app';
import { getRestaurant } from '../restaurants';
import { mapAsync } from '../util';

/* define actual subscribe too reservation wrapper function , 
userId of the user whos reservations we want to load and 
callabck (cb) that'll be called whenever there's a change in the user's reservations data. */
export const subscribeToReservations = (userId, cb) => {
    // following callback is going to get called with a query snapshot whenever the data changes
    const callback = async querySnapshot => {
        //getting the raw reservations data out of the querySnapshot that the callback is getting called with
        const reservations = querySnapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
        }));
        //map the reservations with an async function that takes each reservation
        const populatedReservations = await mapAsync(reservations, async reservation=> {
            //and for each reservation load the corressponding restaurant for that reservation
            const restaurant = await getRestaurant(reservation.restaurantId);
            //return all of the reservations properties along with a new restaurant property that contains the loaded restaurant data
            return {
                ...reservation,
                restaurant,
            };
        });
        //call our original callback, the one that we're passing into the function to begin with, with these populated reservations. 
        cb(populatedReservations);

    }

    return firebase.firestore()
        .collection('reservations')
        .where('userId', '==', userId)
        .onSnapshot(callback);
        /*instead of just getting the data once, onSnapshot allows us to subscribe to this query 
        so that whenever the results change, it will call the function that we pass to it. 
        In this case, we've passed our intermediate callback function.*/
}