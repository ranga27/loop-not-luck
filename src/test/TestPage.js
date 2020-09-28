import React from 'react';
import { HomePageContainer } from '../ui';
export const TestPage = () => {
    const allowedRoutes = [];
    return (
        <HomePageContainer routes={allowedRoutes}>
            <div>Candidate</div>
        </HomePageContainer>

    );

}