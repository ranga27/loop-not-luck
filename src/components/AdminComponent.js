import React  from 'react';
import styled from 'styled-components';

import {
    Button,
    Divider,
    Heading,
    Link,
    MaxWidthContentSection,
    Modal,
    SelectionList, Thumbnail,

} from '../ui';

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

export const AdminComponent = () => {
    return (
        <div>
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
        </div>
    );
}