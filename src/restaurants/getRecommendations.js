import firebase from 'firebase/app';

export const getRecommendations = async () => {
    const getRecommendations = firebase.app().functions('europe-west2');
    const getRecommendationsFunction = getRecommendations.httpsCallable('getRecommendations');
    const results = await getRecommendationsFunction();
    return results.data;
}