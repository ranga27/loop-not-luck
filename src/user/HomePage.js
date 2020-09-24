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
    SelectionList,
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

/*
    This page displays all of the user's current reservations in a list
*/
export const HomePage = () => {
    const [reservations, setReservations] = useState([]);
    const [detailModalIsOpen, setDetailModalIsOpen] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(undefined);

    const onItemSelected = reservation => {
        setSelectedReservation(reservation);
        setDetailModalIsOpen(true);
    }

    const onRequestCloseModal = () => {
        setSelectedReservation(undefined);
        setDetailModalIsOpen(false);
    }

    useEffect(() => {
        //like the add authentication listener wrapper function we created earlier 
        const unsubscribe = subscribeToCurrentUserReservations(results => {
            setReservations(results);
        });
        return unsubscribe;
    }, []);//pass empty array to this useEffect hook, so that this only gets called once when the component mounts.
    return (
        <>
            <MaxWidthContentSection>
                <div style={{ height: '64px' }}>
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
                            </tr>
                        </tbody>
                    </HomePageFieldsTable>
                </Content>
            </MaxWidthContentSection>
        </>
    );
}