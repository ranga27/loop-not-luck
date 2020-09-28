import React, { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from 'react-select/animated';

import styled from 'styled-components';
import {getRecommendations} from '../candidates';

import { Button,
  MaxWidthContentSection,
} from '../ui';

const FullWidthButton = styled(Button)`
margin: 16px;
    width: 20%;
`;
const animatedComponents = makeAnimated();

const Countries = [
  { label: "Albania", value: 355 },
  { label: "Argentina", value: 54 },
  { label: "Austria", value: 43 },
  { label: "Cocos Islands", value: 61 },
  { label: "Kuwait", value: 965 },
  { label: "Sweden", value: 46 },
  { label: "Venezuela", value: 58 }
];

export const TestPage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  const onClickSubmitOpportunity = async () => {
    // Check to make sure the user has actually filled out the form
    console.log(selectedOption);
}

useEffect(() => {
  // Firebase code for loading initial recommendations goes here
  const loadRecommendations =  () => {
      const results =  getRecommendations();
      setRecommendations(results);
      console.log(recommendations);
  }

  loadRecommendations();
}, []);
  return (
    <MaxWidthContentSection>

    <div>
      <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={Countries}
        isMulti
        components={animatedComponents}
      />
      <FullWidthButton
                    onClick={onClickSubmitOpportunity}
                >Submit</FullWidthButton>
    </div>
    </MaxWidthContentSection>
  );
}