import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { validate as isEmail } from 'isemail';
import {
    Button,
    CenteredContentBox,
    ErrorMessage,
    HeadingSmall,
    TextInput,
} from '../ui';
import { signOut } from './signOut';
import { createAccount } from './createAccount';
/* These are styled components, which are used throughout
the application. Basically, they allow us to define CSS
inside our React JavaScript files, instead of having
separate CSS files for each component.*/
const Form = styled.div`
    width: 600px;
    margin: 32px;
`;

const FieldsTable = styled.table`
    width: 100%;
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

export const CreateAccountPage = () => {
    /* All these different state variables are how we usually
    keep track of form input values in React */
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const role = 'candidate';

    /* We can use the "useHistory" hook to change the browser
    URL programmatically, such as after some async operation completes */
    const history = useHistory();

    /* A helper function that makes sure all the fields
    are filled out correctly */
    const validateForm = () => {
        if (!firstName || !lastName || !emailAddress) return 'Please fill out all fields';
        if (!isEmail(emailAddress)) return 'Please enter a valid email address';
        if (password !== confirmPassword) return 'Passwords do not match';
        return null;
    }

    /* Here's the function that will be called when the user
    clicks the "Create Account" button. */
    const onClickCreate = async () => {
        setErrorMessage('');

        /* If there are any validation errors, show an error
        and do not proceed.*/
        const validationError = validateForm();
        if (validationError) {
            setErrorMessage(validationError);
            return;
        }

        const newUserInfo = {
            firstName,
            lastName,
            emailAddress,
            password,
            role,
        };

        await createAccount(newUserInfo)

        //TODO: convert the alert into a modal dialog
        alert('Account created! Please check your inbox for a confirmation email');
        await signOut();
        history.push('/sign-in');
    }

    return (
        <CenteredContentBox>
            <Form>
                <HeadingSmall>Create a Candidate Account</HeadingSmall>
                {errorMessage
                    ? <ErrorMessage style={{
                        marginBottom: '16px',
                    }}>
                        {errorMessage}
                    </ErrorMessage>
                    : null}
                <FieldsTable>
                    <tbody>
                        <tr>
                            <td>First Name:</td>
                            <td>
                                <FullWidthInput
                                    value={firstName}
                                    placeholder='Jane'
                                    onChange={e => setFirstName(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td>Last Name:</td>
                            <td>
                                <FullWidthInput
                                    value={lastName}
                                    placeholder='Doe'
                                    onChange={e => setLastName(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td>Email Address:</td>
                            <td>
                                <FullWidthInput
                                    value={emailAddress}
                                    placeholder='jane.doe@gmail.com'
                                    onChange={e => setEmailAddress(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td>Password:</td>
                            <td>
                                <FullWidthInput
                                    type='password'
                                    value={password}
                                    onChange={e => setPassword(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td>Confirm Password:</td>
                            <td>
                                <FullWidthInput
                                    type='password'
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)} />
                            </td>
                        </tr>
                    </tbody>
                </FieldsTable>
                <FullWidthButton
                    onClick={onClickCreate}
                >Create Account</FullWidthButton>
            </Form>
        </CenteredContentBox>
    )
}