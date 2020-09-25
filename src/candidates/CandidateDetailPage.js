import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { SignOutButton } from '../auth';

import {
    Button,
    Heading,
    Link,
    MaxWidthContentSection,
    Modal,
    Rating,
    SelectionList,
    Tag,
    Thumbnail,
} from '../ui';
import { ReviewListItem, getReviews } from '../reviews';
import { MakeAReservationForm } from '../reservations';
import { getCandidateDetails } from '../candidates';
const ThumbnailWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const DetailsSection = styled.div`
    flex: 8;
`;

const DescriptionSection = styled.div`
    margin: 24px;
    text-align: justify;
    text-justify: inter-word;
`;

const FullWidthButton = styled(Button)`
    margin-top: 16px;
    display: block;
    width: 100%;
`;

const CenteredButton = styled(Button)`
    display: block;
    margin: auto;
`;

const FieldsTable = styled.table`
margin: 32px;
td {
        padding: 8px;
        width: 50%;
    }
    tr {
        padding: 16px;
    }
`;
/*
    This page displays detailed information about the selected candidate,
    including a list of reviews that users have left. It also has a "make a reservation"
    button that displays a modal of available reservation times.
*/
export const CandidateDetailPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [candidate, setCandidate] = useState({}); //state for the candidate
    const { firstName,
        lastName,
        selectedTags = [],
        gender,
        isLivingInUK,
        ethnicity,
        hasDisability,
        disability,
        haveParentsAttendedUni,
        typeOfSecondarySchoolAttended,
        currentEducationLevel,
        university,
        titleOfDegree,
        graduationYear,
        industriesOfInterest,
        personalDescription,
        opportunitiesInterest,
        interestedInDiscoveringOpportunities,
        interestedInMentorship,
        interestedInNetworking,
        interestedInPersonalDevelopment,
        interestedInCareerGuidance,
        interestedInTraining,
        otherInterests,
        isBetaTester } = candidate || {};

    const { id } = useParams();

    useEffect(() => {
        // Firebase code for loading the candidate goes here
        const loadCandidate = async () => {
            const result = await getCandidateDetails(id);
            setCandidate(result);
            setIsLoading(false);
        }
        loadCandidate();
    }, [id]);

    // Display a loading message while the Firebase data is loading
    return isLoading ? <Heading>Loading...</Heading> : (
        <MaxWidthContentSection>
            <div style={{ height: '64px' }}>
                <SignOutButton style={{ float: 'right' }} />
                <Link to='/candidate-search'>
                    <Button
                        style={{ float: 'right', marginRight: '8px' }}
                    >Back</Button>
                </Link>
            </div>
            <Heading>{firstName} {lastName}</Heading>
            <ThumbnailWrap>
                <Thumbnail height='200px' width='200px' url={candidate.imageUrl} />
            </ThumbnailWrap>
            <DetailsSection>
                <DescriptionSection>
                    {personalDescription}
                </DescriptionSection>
                <FieldsTable>
                    <tbody>
                        <tr>
                            <td>Tags:</td>
                            <td>{selectedTags.map(tag => <Tag key={tag.label}>{tag.label}</Tag>)}</td>
                        </tr>
                        <tr>
                            <td>Gender</td>
                            <td>{gender}</td>
                        </tr>
                        <tr>
                            <td>United Kingdom Resident?</td>
                            <td>{isLivingInUK}</td>
                        </tr>
                        <tr>
                            <td>Ethnicity</td>
                            <td>{ethnicity}</td>
                        </tr>
                        <tr>
                            <td>Any disability?</td>
                            <td>{hasDisability}</td>
                        </tr>
                        <tr>
                            <td>Did parents attend university?</td>
                            <td>{haveParentsAttendedUni}</td>
                        </tr>
                        <tr>
                            <td>Type of secondary school attended </td>
                            <td>{typeOfSecondarySchoolAttended}</td>
                        </tr>
                        <tr>
                            <td>Current education level</td>
                            <td>{currentEducationLevel}</td>
                        </tr>
                        <tr>
                            <td>University</td>
                            <td>{university}</td>
                        </tr>
                        <tr>
                            <td>Degree Title</td>
                            <td>{titleOfDegree}</td>
                        </tr>
                        <tr>
                            <td>Graduation year</td>
                            <td>{graduationYear}</td>
                        </tr>
                        <tr>
                            <td>Industries of Interest</td>
                            <td>{industriesOfInterest.map(industry => <p key={industry}>{industry}</p>)}</td>
                        </tr>
                        <tr>
                            <td>Opportunity Interests</td>
                            <td>{opportunitiesInterest.map(opportunity => <p key={opportunity}>{opportunity}</p>)}</td>
                        </tr>
                    </tbody>
                </FieldsTable>
            </DetailsSection>
        </MaxWidthContentSection>
    )
}