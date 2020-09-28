import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { SignOutButton } from '../auth';
import Select from "react-select";

import {
    Button,
    ErrorMessage,
    Heading,
    Link,
    MaxWidthContentSection,
    DatePicker,
    TextArea,
    TextInput,
    Thumbnail,
    Checkbox,
    UploadMultipleFilesButton,
} from '../ui';
import { postOpportunity } from './postOpportunity';
import { mapAsync, readFile, uploadFile } from '../util';

const Content = styled.div`
    margin: 0 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
`;

const OpportunityFieldsTable = styled.table`
    width: 100%;
    padding: 32px;

    td {
        padding: 16px;
    }
`;

const FullWidthButton = styled(Button)`
    width: 100%;
`;

const FullWidthInput = styled(TextInput)`
    width: 100%;
`;

const PositionTypes = [
    { label: "Internship", value: 0 },
    { label: "Graduate Scheme", value: 1 },
    { label: "Entry-Level Position", value: 2 },
    { label: "Apprenticeship", value: 3 },
    { label: "Work Experience", value: 4 },
    { label: "Summer Placement", value: 5 },
    { label: "1 year Industrial Placement", value: 6 }
];

/*
    This component allows company and admin user to write and post opportunites.
*/
export const PostAnOpportunityPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [opportunityTitle, setOpportunityTitle] = useState('');
    const [opportunityOrganisation, setOpportunityOrganisation] = useState('');
    const [opportunityLocation, setOpportunityLocation] = useState('');
    const [opportunityType, setOpportunityType] = useState('');
    const [opportunityDepartment, setOpportunityDepartment] = useState('');
    const [opportunityDescription, setOpportunityDescription] = useState('');
    const [opportunityQualification, setOpportunityQualification] = useState('');
    const [opportunityHowToApply, setOpportunityHowToApply] = useState('');
    const [opportunityDeadline, setOpportunityDeadline] = useState('');
    const [opportunityStart, setOpportunityStart] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    const [showError, setShowError] = useState(false);

    // This is how we get URL parameters in React, use this to load certain account specific variables like company name
    // const { id } = useParams();
    const history = useHistory();

    const onClickSubmitOpportunity = async () => {
        // Check to make sure the user has actually filled out the form
        if (opportunityTitle.length > 0 && opportunityOrganisation.length > 0 && opportunityLocation.length > 0 && opportunityDescription.length > 0) {
            // Firebase code for posting oppportunity goes here
            const newOpportunity = {
                title: opportunityTitle,
                organisation: opportunityOrganisation,
                location: opportunityLocation,
                positionType: opportunityType['label'],
                description: opportunityDescription,
                qualification: opportunityQualification,
                howToApply: opportunityHowToApply,
                deadline: opportunityDeadline,
                department: opportunityDepartment,
                startDate: opportunityStart,
                coverLetter: isChecked
            };
            //await postOpportunity(newOpportunity);
            //history.push('/opportunity/thank-you');
        } else {
            console.log(isChecked);

            setShowError(true);
        }
    }

    return isLoading ? <Heading>Loading...</Heading> : (
        <MaxWidthContentSection>
            <div style={{ height: '64px' }}>
                <SignOutButton style={{ float: 'right' }} />
                <Link to='/'>
                    <Button
                        style={{ float: 'right', marginRight: '8px' }}
                    >HomePage</Button>
                </Link>
            </div>
            <Content>
                <Heading>Post an Opportunity</Heading>
                {showError
                    ? <ErrorMessage
                        style={{ marginTop: '16px' }}
                    >Please fill out all fields marked * </ErrorMessage>
                    : null}
                <OpportunityFieldsTable>
                    <tbody>
                        <tr>
                            <td>Title*:</td>
                            <td>
                                <FullWidthInput
                                    value={opportunityTitle}
                                    onChange={e => setOpportunityTitle(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td>Organisation*:</td>
                            <td>
                                <FullWidthInput
                                    value={opportunityOrganisation}
                                    onChange={e => setOpportunityOrganisation(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td>Location*:</td>
                            <td>
                                <FullWidthInput
                                    value={opportunityLocation}
                                    onChange={e => setOpportunityLocation(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td>Position Type:</td>
                            <td><Select
                                onChange={setOpportunityType}
                                options={PositionTypes}
                                value={opportunityType}
                            />
                            </td>
                        </tr>
                        <tr>
                            <td>Department:</td>
                            <td>
                                <FullWidthInput
                                    value={opportunityDepartment}
                                    onChange={e => setOpportunityDepartment(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td>Description*:</td>
                            <td>
                                <TextArea
                                    value={opportunityDescription}
                                    onChange={e => {
                                        setShowError(false);
                                        setOpportunityDescription(e.target.value);
                                    }}
                                    cols='50'
                                    rows='5' />
                            </td>
                        </tr>
                        <tr>
                            <td>Required Qualifications:</td>
                            <td>
                                <TextArea
                                    value={opportunityQualification}
                                    onChange={e => {
                                        setShowError(false);
                                        setOpportunityQualification(e.target.value);
                                    }}
                                    cols='50'
                                    rows='5' />
                            </td>
                        </tr>
                        <tr>
                            <td>How to apply:</td>
                            <td>
                                <TextArea
                                    value={opportunityHowToApply}
                                    onChange={e => {
                                        setShowError(false);
                                        setOpportunityHowToApply(e.target.value);
                                    }}
                                    cols='50'
                                    rows='5' />
                            </td>
                        </tr>
                        <tr>
                            <td>Deadline:</td>
                            <td>
                                <FullWidthInput
                                    placeholder='DD/MM/YYYY'
                                    value={opportunityDeadline}
                                    onChange={e => setOpportunityDeadline(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td>Start Date of Role:</td>
                            <td>
                                <FullWidthInput
                                    placeholder='DD/MM/YYYY'
                                    value={opportunityStart}
                                    onChange={e => setOpportunityStart(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <Checkbox
                                    checked={isChecked}
                                    onChange={setIsChecked}
                                    label='Cover Letter Required'
                                />
                            </td>
                        </tr>
                    </tbody>
                </OpportunityFieldsTable>
                <FullWidthButton
                    onClick={onClickSubmitOpportunity}
                >Submit</FullWidthButton>
            </Content>
        </MaxWidthContentSection>
    );
}