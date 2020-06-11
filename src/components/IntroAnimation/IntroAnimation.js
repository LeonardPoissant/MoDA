import React from 'react';
import styled from 'styled-components';

import LetterAnimation from './LetterAnimation'

const IntroAnimation = ({props}) => {
  const letterArray = ['M','O','D','A'];
  console.log(typeof letterArray)
  return (
    <>
      {letterArray.map(letter => {
        return (
          <StyledDiv>
            <LetterAnimation letter={letter}/>
          </StyledDiv>
        )
      })}
    </>
  )
}

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export default IntroAnimation