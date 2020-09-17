/*This wrapper function uses getCurrentUser wrapper function. 
It'll be used throughout the app as a shortcut for components to get info on the currently authenticated user. 
This'll save the components from doing the getCurrentUser logic directly.*/
import { getCurrentUser } from '../auth';
import { getUserInfo } from './getUserInfo';

export const getCurrentUserInfo = async () => {
    const currentUser = getCurrentUser();
    if (!currentUser) return null;
    return await getUserInfo(currentUser.id);
}