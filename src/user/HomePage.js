import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SignOutButton } from '../auth';
import {
    Button,
    Divider,
    Heading,
    Link,
    MaxWidthContentSection,
    Modal,
    SelectionList, Thumbnail,

} from '../ui';
import { ReservationsListItem, ReservationDetailForm, subscribeToCurrentUserReservations } from '../reservations';

const Content = styled.div`
    margin: 0 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
`;

const ButtonWrap = styled.div`
    flex: 1;
    width: 150px;
    height: 50px;
    padding: 32px;
`;

const HomePageFieldsTable = styled.table`
    width: 100%;
    padding: 8px;

    td {
        padding: 8px;
    }
`;

const FullWidthButton = styled(Button)`
    width: 300px;
`;

const ThumbnailWrap = styled.div`
    flex: 2;
`;

/*
    This page displays all of the user's current reservations in a list
*/
export const HomePage = () => {
    return (
        <>
            <MaxWidthContentSection>
                <div style={{ height: '64px' }}>
                    <ThumbnailWrap style={{ float: 'left' }}>
                        <Thumbnail width='120px' height='120px' url={'https://storage.googleapis.com/loopnotluck.appspot.com/assets/LoopWhite.png'} />
                    </ThumbnailWrap>
                    <SignOutButton style={{ float: 'right' }} />
                </div>
                <Content>
                    <Heading>Home Page</Heading>
                    <Divider />
                    <HomePageFieldsTable>
                        <tbody>
                            <tr>
                                <td>
                                    <Link to='/candidate-search'>
                                        <FullWidthButton
                                            type='shadow'
                                        >View Candidates</FullWidthButton>
                                    </Link>
                                </td>
                                <td>
                                    <Link to='/candidate-edit'>
                                        <FullWidthButton
                                            type='shadow'
                                        >Edit Candidate</FullWidthButton>
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Link to='/post-an-opportunity'>
                                        <FullWidthButton
                                            type='shadow'
                                        >Post Opportunity</FullWidthButton>
                                    </Link>
                                </td>
                                <td>
                                    <Link to='/edit-opportunity'>
                                        <FullWidthButton
                                            type='shadow'
                                        >Edit Opportunity</FullWidthButton>
                                    </Link>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Link to='/view-opportunities'>
                                        <FullWidthButton
                                            type='shadow'
                                        >View Opportunities</FullWidthButton>
                                    </Link>
                                </td>
                                <td>
                                    <Link to='/match-candidates'>
                                        <FullWidthButton
                                            type='shadow'
                                        >Match Candidates</FullWidthButton>
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </HomePageFieldsTable>
                </Content>
            </MaxWidthContentSection>
        </>
    );
}