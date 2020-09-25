import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import { SignOutButton } from '../auth';
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import {
    Button,
    CenteredContentBox,
    HeadingSmall,
    TextInput,
    TextArea,
    Link,
    MaxWidthContentSection,
    UploadSingleFileButton,
} from '../ui';
import { uploadFile } from '../util';
import { getOpportunityDetail } from './getOpportunityDetail';

import { updateOpportunityDetails } from './updateOpportunityDetails';

const Form = styled.div`
    width: 600px;
    margin: 32px;
`;

const FieldsTable = styled.table`
    td {
        padding: 8px;
        width: 50%;
    }
`;

const FullWidthInput = styled(TextInput)`
    width: 100%;
`;

const FullWidthButton = styled(Button)`
    width: 100%;
`;
const animatedComponents = makeAnimated();

const Tags = [
    { label: "Confident", value: 355 },
    { label: "Analytical", value: 54 },
    { label: "Proactive", value: 43 },
    { label: "Creative", value: 61 }
];
/*
    This page loads a user's current profile data (name, bio, etc.)
    and allows them to edit it. When the user clicks "save", the changes
    will be persisted to Firebase.
*/
export const OpportunityEditDetailsPage = () => {
    const [selectedTags, setselectedTags] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [opportunityTitle, setOpportunityTitle] = useState('');
    const [opportunityOrganisation, setOpportunityOrganisation] = useState('');
    const [profilePictureFile, setProfilePictureFile] = useState('');
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        // Firebase code for loading the candidate goes here
        const loadOpportunityDetail = async () => {
            const opportunity = await getOpportunityDetail(id);
            setOpportunityTitle(opportunity.title);
            setOpportunityOrganisation(opportunity.organisation);
            setselectedTags(opportunity.selectedTags || []);
            setIsLoading(false);
        }
        loadOpportunityDetail();
    }, [id]);

    const handleFileSelect = file => {
        setProfilePictureFile(file);
    }

    const onSubmitChanges = async () => {
        // Firebase code for saving user's changes goes here
        const profilePictureUrl = profilePictureFile
            ? await uploadFile(profilePictureFile, 'profilePictures')
            : null;

        const changes = {
            opportunityTitle,
            opportunityOrganisation,
            selectedTags,
            id,
        }
        await updateOpportunityDetails(profilePictureUrl
            ? { ...changes, profilePictureUrl }
            : changes);

    }

    return (
        <MaxWidthContentSection>
            <div style={{ height: '64px' }}>
                <SignOutButton style={{ float: 'right' }} />
                <Link to='/edit-opportunity'>
                    <Button
                        style={{ float: 'right', marginRight: '8px' }}
                    >Back</Button>
                </Link>
            </div>
            <Form>
                <HeadingSmall>Edit Opportunity Details</HeadingSmall>
                <FieldsTable>
                    <tbody>
                        <tr>
                            <td>Title:</td>
                            <td>
                                <FullWidthInput
                                    disabled={isLoading}
                                    value={opportunityTitle}
                                    onChange={e => setOpportunityTitle(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td>Organisation:</td>
                            <td>
                                <FullWidthInput
                                    disabled={isLoading}
                                    value={opportunityOrganisation}
                                    onChange={e => setOpportunityOrganisation(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td>Select Tags:</td>
                            <td>
                                <Select
                                    onChange={setselectedTags}
                                    options={Tags}
                                    isMulti
                                    components={animatedComponents}
                                    value={selectedTags}
                                />
                            </td>
                        </tr>
                    </tbody>
                </FieldsTable>
                <FullWidthButton
                    disabled={isLoading}
                    onClick={onSubmitChanges}
                >Save Changes</FullWidthButton>
            </Form>
        </MaxWidthContentSection>
    )
}