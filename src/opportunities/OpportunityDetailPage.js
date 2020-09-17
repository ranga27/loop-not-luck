import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
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
import { getOpportunityDetail } from '../opportunities';
const ThumbnailWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const DetailsSection = styled.div`
    flex: 8;
`;

const TagSection = styled.div`
    margin: 16px 0;
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

/*
    This page displays detailed information about the selected candidate,
    including a list of reviews that users have left. It also has a "make a reservation"
    button that displays a modal of available reservation times.
*/
export const OpportunityDetailPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [opportunity, setOpportunityDetail] = useState({}); //state for the candidate
    const [reviews, setReviews] = useState([]); //state for the reviews
    const { title,
        organisation,
        location,
        type,
        description,
        qualification,
        howToApply,
        deadline, } = opportunity || {};

    const { id } = useParams();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        // Firebase code for loading the candidate goes here
        const loadOpportunityDetail = async () => {
            const result = await getOpportunityDetail(id);
            setOpportunityDetail(result);
            setIsLoading(false);
        }
        loadOpportunityDetail();
    }, [id]);

    useEffect(() => {
        // Firebase code for loading the candidate's reviews goes here
        const loadReviews = async () => {
            const result = await getReviews(id);
            setReviews(result);
        }
        loadReviews();
    }, [id]);

    // Display a loading message while the Firebase data is loading
    return isLoading ? <Heading>Loading...</Heading> : (
        <MaxWidthContentSection>
            <Heading>{title} {organisation}</Heading>
            <ThumbnailWrap>
                <Thumbnail height='300px' width='600px' url={opportunity.imageUrl} />
            </ThumbnailWrap>
            <DetailsSection>
                <div>
                    {location},&nbsp;
                    {type},&nbsp;
                    {description},&nbsp;
                    {qualification},&nbsp;
                    {howToApply},&nbsp;
                    {deadline}&nbsp;
                </div>
                <TagSection>
                    {/* {tags.map(tag => <Tag key={tag}>{tag}</Tag>)} */}
                </TagSection>
                <div>{description}</div>
            </DetailsSection>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}>
            </Modal>
        </MaxWidthContentSection>
    )
}