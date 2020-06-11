import React from 'react';
import styled, {keyframes} from 'styled-components';

const LetterAnimation = ({letter}) => {
  console.log(letter)
  let iterator = 0
  return (
    <LetterWrapper>
      MoDA
    </LetterWrapper>
  )
}

const pop = keyframes`
  0% {
    top: 300px,
  }
  40% {
    top: 100px
  }
  60% {
    top: 150px
  }
  100% {
    top: 150px
  }
`

const LetterWrapper = styled.div`
  animation: ${pop} 2s linear;
  position: absolute;
  top: 150px;
`
export default LetterAnimation