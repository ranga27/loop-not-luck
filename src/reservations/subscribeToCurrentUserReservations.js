/* this function will take care of the logic of getting the currently authenticated user's ID 
and using that to load the corresponding reservations */
import { getCurrentUser } from'../auth';
import { subscribeToReservations } from './subscribeToReservations';

//takes a callback argument
export const subscribeToCurrentUserReservations = cb => {
    const currentUser = getCurrentUser();
    //if the currentUser doesn't exist
    if (!currentUser) return cb([]);
    //if the currentUser does exist
    return subscribeToReservations(currentUser.id, cb);
}