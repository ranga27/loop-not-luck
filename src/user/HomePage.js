import React from 'react';
import styled from 'styled-components';

import { SignOutButton } from '../auth';
import {
    HomePageContainer, MaxWidthContentSection, Thumbnail,
} from '../ui';
import { HomeRoutes } from '../user';

const ThumbnailWrap = styled.div`
    flex: 2;
`;

export const HomePage = () => {
    const userRole = 'Admin';
    const result = HomeRoutes.find(({ role }) => role === userRole).component;
    return (
        <MaxWidthContentSection>
            <div style={{ height: '160px' }}>
                <ThumbnailWrap style={{ float: 'left' }}>
                    <Thumbnail width='120px' height='120px' url={'https://storage.googleapis.com/loopnotluck.appspot.com/assets/LoopWhite.png'} />
                </ThumbnailWrap>
                <SignOutButton style={{ float: 'right' }} />
            </div>
            <HomePageContainer itemComponent={result} >
            </HomePageContainer>
        </MaxWidthContentSection>

    );

}