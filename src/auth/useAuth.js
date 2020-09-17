import {useState, useEffect } from 'react';
import { getCurrentUser } from './getCurrentUser';
import { addAuthListener } from './addAuthListener';

export const useAuth = () => {
    const [authInfo, setAuthInfo] = useState(() => {
        const user = getCurrentUser();  
        const isLoading = !user; //true if there's no current user object and false if there's a current user 
        return {isLoading, user};
    });

    useEffect (() => {
        const unsubscribe = addAuthListener(user => {
            setAuthInfo({isLoading: false, user});
        });
        return unsubscribe; //unsubscribe, which basically means that React will automatically call this function when the hook unmounts. 
    }, []); //pass an empty array to useEffect hook, since this means that it will only execute and add the event listener when the component first mounts. We're not adding this to addAuthListener. This makes sure that we don't re-add the event listener every time the component updates.
    return authInfo;
}

export const hasRole = (user, roles) =>
  roles.some(role => user.roles.includes(role));