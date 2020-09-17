import React from 'react';
import styled from 'styled-components';
import {
    Button,
    Rating,
    Tag,
    Thumbnail,
} from '../ui';

const ListItemContainer = styled.div`
    align-items: center;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    padding: 16px;
    width: 100%;
`;

const ThumbnailWrap = styled.div`
    flex: 2;
`;

const DetailsSection = styled.div`
    flex: 8;
`;

const MainDetail = styled.div`
    font-weight: bold;
    font-size: 20px;
`;

const ButtonWrap = styled.div`
    flex: 1;
`;

const TagSection = styled.div`
    margin: 16px 0;
`;

/*
    This component displays the basic details for a given restaurant
    in the results section of the Search page.
*/
export const CandidateListItem = ({ item: candidate, onSelect }) => {
    const { firstName, lastName, gender, email } = candidate;
    return (
        <ListItemContainer>
            <ThumbnailWrap>
                <Thumbnail width='100px' height='100px' url={candidate.imageUrl} />
            </ThumbnailWrap>
            <DetailsSection>
                <MainDetail>{firstName} {lastName}</MainDetail>
                <div>
                    {gender},&nbsp;
                    {email}&nbsp;
                </div>
                <TagSection>
                </TagSection>
            </DetailsSection>
            <ButtonWrap>
                <Button
                    type='shadow'
                    onClick={() => onSelect(candidate)}
                >View</Button>
            </ButtonWrap>
        </ListItemContainer>
    );
}