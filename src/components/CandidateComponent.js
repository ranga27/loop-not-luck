import React from 'react';
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

export const CandidateComponent = () => {
    return (
        <div>
            <HomePageFieldsTable>
                <tbody>
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
        </div>
    );
}