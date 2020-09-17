import firebase from 'firebase/app';

export const searchRestaurants = async searchString => {
    const searchRestaurants = firebase.app().functions('europe-west2');
    const searchRestaurantsFunction = searchRestaurants.httpsCallable('searchRestaurants');    
    const results = await searchRestaurantsFunction({ searchString });
    return results.data;
}