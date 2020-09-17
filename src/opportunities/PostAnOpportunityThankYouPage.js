import React from 'react';
import { LanderPage } from '../ui';

/*
    This component is shown after a user successfully submits
    a review for a restaurant.
*/
export const PostAnOpportunityThankYouPage = () => (
    <LanderPage
        heading="Opportunity Posted"
        message="Thanks for posting the opportunity!"
        buttonText='Done'
        redirectUrl='/' />
);
