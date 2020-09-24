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
import { getCandidateDetails } from './getCandidateDetails';

import { updateCandidateDetails } from './updateCandidateDetails';

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
    { label: "Logical", value: 355 },
    { label: "Structured", value: 54 },
    { label: "Spiritual", value: 43 },
    { label: "Visual", value: 61 }
];
/*
    This page loads a user's current profile data (name, bio, etc.)
    and allows them to edit it. When the user clicks "save", the changes
    will be persisted to Firebase.
*/
export const CandidateEditProfilePage = () => {
    const [selectedTags, setselectedTags] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [profilePictureFile, setProfilePictureFile] = useState('');
    const history = useHistory();
    const { id } = useParams();



    useEffect(() => {
        // Firebase code for loading current user info goes here
        const loadCandidateInfo = async () => {
            const userInfo = await getCandidateDetails(id);
            setFirstName(userInfo.firstName || '');
            setLastName(userInfo.lastName || '');
            setselectedTags(userInfo.selectedTags || []);
            setIsLoading(false);
        }
        loadCandidateInfo();//call the function to kick it off
    }, []);

    const handleFileSelect = file => {
        setProfilePictureFile(file);
    }

    const onSubmitChanges = async () => {
        // Firebase code for saving user's changes goes here
        const profilePictureUrl = profilePictureFile
            ? await uploadFile(profilePictureFile, 'profilePictures')
            : null;

        const changes = {
            firstName,
            lastName,
            selectedTags,
            id,
        }
        await updateCandidateDetails(profilePictureUrl
            ? { ...changes, profilePictureUrl }
            : changes);

    }

    return (
        <MaxWidthContentSection>
            <div style={{ height: '64px' }}>
                <SignOutButton style={{ float: 'right' }} />
                <Link to='/candidate-edit'>
                    <Button
                        style={{ float: 'right', marginRight: '8px' }}
                    >Back</Button>
                </Link>
            </div>
            <Form>
                <HeadingSmall>Edit Candidate Profile</HeadingSmall>
                <FieldsTable>
                    <tbody>
                        <tr>
                            <td>First Name:</td>
                            <td>
                                <FullWidthInput
                                    disabled={isLoading}
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td>Last Name:</td>
                            <td>
                                <FullWidthInput
                                    disabled={isLoading}
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)} />
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