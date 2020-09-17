/*This wrapper function gets Current User Account Type for routing and checks purposes.*/
import { getCurrentUserInfo } from '../user';

export const isCandidate = async () => {
    const userInfo = await getCurrentUserInfo();
    if (!!userInfo)
    return (userInfo['accountType'] === 'candidate');

        return false;
}