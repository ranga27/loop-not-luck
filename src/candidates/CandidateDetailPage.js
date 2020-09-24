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
export const CandidateDetailPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [candidate, setCandidate] = useState({}); //state for the candidate
    const [reviews, setReviews] = useState([]); //state for the reviews
    const { firstName, lastName, email , phoneNumber, selectedTags = [] } = candidate || {};

    const { id } = useParams();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        // Firebase code for loading the candidate goes here
        const loadCandidate = async () => {
            const result = await getCandidateDetails(id);
            setCandidate(result);
            setIsLoading(false);
        }
        loadCandidate();
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
            <Heading>{firstName} {lastName}</Heading>
            <ThumbnailWrap>
                <Thumbnail height='300px' width='300px' url={candidate.imageUrl} />
            </ThumbnailWrap>
            <DetailsSection>

                <div>
                    {email},&nbsp;
                    {phoneNumber}&nbsp;
                </div>
                <TagSection>
                    {selectedTags.map(tag => <Tag key={tag.label}>{tag.label}</Tag>)}
                </TagSection>
                <div></div>
            </DetailsSection>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}>
            </Modal>
        </MaxWidthContentSection>
    )
}