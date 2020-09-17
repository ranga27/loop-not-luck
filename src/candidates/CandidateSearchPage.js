import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { SignOutButton } from '../auth';
import {
    Button,
    Heading,
    Link,
    MaxWidthContentSection,
    SelectionList,
    TextInput,
} from '../ui';
import { RestaurantListItem, searchRestaurants } from '../restaurants';
import {CandidateListItem, getRecommendations} from '../candidates';

const SearchSection = styled.div`
    align-content: center;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 16px;
`;

/*
    This component has an input box that allows the user to search for restaurants.
    It displays a list of the search results, or if the user hasn't searched anything yet,
    it displays a list of recommended restaurants.
*/
export const CandidateSearchPage = () => {
    const [recommendations, setRecommendations] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchInputValue, setSearchInputValue] = useState('');
    const [searchString, setSearchString] = useState('');

    const history = useHistory();

    const onClickSearch = string => {
        setSearchString(searchInputValue);
    }

    useEffect(() => {
        // Firebase code for loading initial recommendations goes here
        const loadRecommendations = async () => {
            const results = await getRecommendations();
            setRecommendations(results);
        }

        loadRecommendations();
    }, []);

    useEffect(() => {
        // Firebase code for loading search results goes here
        const loadSearchResults = async () => {
            const results = await searchRestaurants(searchString);
            setSearchResults(results);
        }

        loadSearchResults();
    }, [searchString]);
    
    return (
        <MaxWidthContentSection>
             <div style={{ height: '64px' }}>
                <SignOutButton style={{ float: 'right' }} />
                <Link to='/'>
                    <Button
                        style={{ float: 'right', marginRight: '8px' }}
                    >HomePage</Button>
                </Link>
            </div>
            <Heading>View Candidates</Heading>
            <SearchSection>
                <TextInput
                    placeholder='Search using free text'
                    style={{ flex: 5, marginRight: '8px' }}
                    value={searchInputValue}
                    onChange={e => setSearchInputValue(e.target.value)} />
                <Button
                    onClick={onClickSearch}
                    style={{ flex: 1 }}
                >Search</Button>
            </SearchSection>
            <SelectionList
                title='Recommendations'
                items={searchString ? searchResults : recommendations}
                keyProperty='id'
                onItemSelected={candidate => {
                    history.push(`/candidates/${candidate.id}`);
                }}
                itemComponent={CandidateListItem}/>
        </MaxWidthContentSection>
    )
};