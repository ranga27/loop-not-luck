import firebase from 'firebase/app';

export const submitReview = async (restaurantId, newReview) => {
    const submitReview = firebase.app().functions('europe-west2');
    const submitReviewFunction = submitReview.httpsCallable('submitReview');
    return await submitReviewFunction({ restaurantId, newReview });
}